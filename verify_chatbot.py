from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:5174")

        # Wait for floating button
        page.wait_for_selector(".floating-ai-button")

        # Click button
        page.click(".floating-ai-button")

        # Wait for Persona Selection
        try:
            page.wait_for_selector("text=Choose Your Experience", timeout=5000)
            print("Persona selection visible")
        except:
            print("Persona selection not found, dumping content")
            print(page.content())

        # Screenshot 1: Selection Screen
        os.makedirs("verification", exist_ok=True)
        page.screenshot(path="verification/persona_selection.png")

        # Click Dev Mode
        # Finding button by text "Dev Mode"
        dev_button = page.locator("button", has_text="Dev Mode")
        dev_button.click()

        # Wait for Dev Mode UI (Green elements)
        # Check for DEV_MODE badge
        page.wait_for_selector("text=> DEV_MODE", timeout=5000)

        # Screenshot 2: Dev Mode
        page.screenshot(path="verification/dev_mode.png")

        browser.close()

if __name__ == "__main__":
    run()
