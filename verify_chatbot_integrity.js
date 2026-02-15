import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiDir = path.join(__dirname, 'api');

// 1. Create mock
const mockContent = `
export const capturedPrompts = [];
export class GoogleGenerativeAI {
    constructor(apiKey) { this.apiKey = apiKey; }
    getGenerativeModel({ model }) {
        return {
            generateContent: async (prompt) => {
                capturedPrompts.push(prompt);
                let text = "This is a mock response from Gemini.";
                // Simulate NAV response if prompt asks for game
                if (prompt.includes("2D game")) text = "[NAV: #indie-game] Sure, let me show you my 2D game.";
                return { response: { text: () => text } };
            }
        };
    }
}
`;
fs.writeFileSync(path.join(apiDir, 'mock_gemini.js'), mockContent);

// 2. Create test version of chat.js
const chatJsPath = path.join(apiDir, 'chat.js');
const chatTestJsPath = path.join(apiDir, 'chat_test.js');
let chatJsContent = fs.readFileSync(chatJsPath, 'utf8');

// Replace import
chatJsContent = chatJsContent.replace(
    'import { GoogleGenerativeAI } from "@google/generative-ai";',
    'import { GoogleGenerativeAI } from "./mock_gemini.js";'
);

fs.writeFileSync(chatTestJsPath, chatJsContent);

// 3. Run tests
async function runTests() {
    console.log("Starting System Integrity Check...");

    // Import the modified handler and the mock
    const { handler } = await import('./api/chat_test.js');
    const { capturedPrompts } = await import('./api/mock_gemini.js');

    // Helper to run a test case
    async function test(name, body, checkFn) {
        console.log(`\nRunning Test: ${name}`);
        capturedPrompts.length = 0; // Clear prompts
        process.env.GEMINI_API_KEY = 'mock-key';

        const event = {
            httpMethod: 'POST',
            body: JSON.stringify(body)
        };

        const result = await handler(event, {});

        if (result.statusCode !== 200) {
            console.error(`FAILED: StatusCode ${result.statusCode}`, result.body);
            return false;
        }

        const prompt = capturedPrompts[0];
        if (!prompt) {
            console.error("FAILED: No prompt generated.");
            return false;
        }

        try {
            checkFn(prompt, result);
            console.log("PASSED ✅");
            return true;
        } catch (e) {
            console.error("FAILED ❌:", e.message);
            return false;
        }
    }

    let allPassed = true;

    // Test 1: Data Sync
    allPassed &= await test("Data Sync Integrity", { message: "What is the tech stack of Legal Transcription?" }, (prompt) => {
        if (!prompt.includes("Legal Transcription Automation")) throw new Error("Missing project title in context");
        // Check for tools mentioned in content.js for this project
        // In content.js: tools: ["Speech-to-text AI", "n8n automation", "Client delivery system"]
        if (!prompt.includes("Speech-to-text AI")) throw new Error("Missing 'Speech-to-text AI' in context");
        if (!prompt.includes("n8n automation")) throw new Error("Missing 'n8n automation' in context");
    });

    // Test 2: Regional Switcher
    allPassed &= await test("Regional Switcher (MY)", { message: "I'm from KL", userRegion: "MY" }, (prompt) => {
        if (!prompt.includes("[MALAYSIAN_MODIFIER]")) throw new Error("Missing Malaysian Modifier");
        if (!prompt.includes("Manglish")) throw new Error("Missing 'Manglish' instruction");
    });

    allPassed &= await test("Regional Switcher (SG)", { message: "I'm from Singapore", userRegion: "SG" }, (prompt) => {
        if (!prompt.includes("[SINGAPOREAN_MODIFIER]")) throw new Error("Missing Singaporean Modifier");
        if (!prompt.includes("efficiency")) throw new Error("Missing 'efficiency' instruction");
    });

    // Test 3: Persona Logic
    allPassed &= await test("Persona Logic (Dev)", { message: "Hi", persona: "dev" }, (prompt) => {
         if (!prompt.includes("[DEV_PERSONA]")) throw new Error("Missing Dev Persona modifier");
         if (!prompt.includes("technical jargon")) throw new Error("Missing 'technical jargon' instruction");
    });

    allPassed &= await test("Persona Logic (Recruiter)", { message: "Hi", persona: "recruiter" }, (prompt) => {
         if (!prompt.includes("[RECRUITER_PERSONA]")) throw new Error("Missing Recruiter Persona modifier");
    });

    // Test 4: Command Mode (Prompt Instruction Check)
    allPassed &= await test("Command Mode Instructions", { message: "Let me show you my 2D game" }, (prompt) => {
        if (!prompt.includes("[NAV: #id]")) throw new Error("Missing [NAV] instructions");
        if (!prompt.includes("[SIMULATE: type]")) throw new Error("Missing [SIMULATE] instructions");
    });

    // Test 5: Sweet Tooth Trigger
    allPassed &= await test("Sweet Tooth Trigger", { message: "I love cheesecake" }, (prompt) => {
        if (!prompt.includes("[SWEET_TOOTH_TRIGGER]")) throw new Error("Missing Sweet Tooth Trigger modifier");
        if (!prompt.includes("Baking Expert")) throw new Error("Missing 'Baking Expert' instruction");
    });

    // Test 6: Edge Case (Response format check)
    // We can't easily mock content.js failure here without rewriting content.js import in chat_test.js to a mock
    // But we can check if the system handles requests gracefully.
    // The current handler doesn't wrap content.js import in try/catch (it's top level).
    // So if content.js fails, the module fails to load.
    // We can test if "message" is missing (API level edge case).

    console.log(`\nRunning Test: Edge Case (Missing Message)`);
    const edgeEvent = {
        httpMethod: 'POST',
        body: JSON.stringify({})
    };
    try {
        const edgeResult = await handler(edgeEvent, {});
        if (edgeResult.statusCode === 400 && edgeResult.body.includes("Message is required")) {
            console.log("PASSED ✅");
        } else {
            console.error("FAILED ❌: Did not handle missing message correctly", edgeResult);
            allPassed = false;
        }
    } catch (e) {
        console.error("FAILED ❌:", e);
        allPassed = false;
    }

    if (!allPassed) {
        console.error("\nSOME TESTS FAILED");
        process.exit(1);
    } else {
        console.log("\nALL TESTS PASSED");
        process.exit(0);
    }
}

runTests().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(() => {
    // Cleanup
    try {
        if (fs.existsSync(chatTestJsPath)) fs.unlinkSync(chatTestJsPath);
        if (fs.existsSync(path.join(apiDir, 'mock_gemini.js'))) fs.unlinkSync(path.join(apiDir, 'mock_gemini.js'));
    } catch (e) {
        console.error("Cleanup failed:", e);
    }
});
