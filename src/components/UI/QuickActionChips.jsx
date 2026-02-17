import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Generate contextual chips using Gemini API
const generateContextualChips = async (userQuestion, aiResponse) => {
  try {
    const prompt = `You are a helpful assistant generating follow-up question suggestions for a portfolio chatbot tour guide.

USER'S LAST QUESTION: "${userQuestion}"
AI'S RESPONSE: "${aiResponse}"

Generate EXACTLY 2 short, natural follow-up questions that:
1. Reference the specific topic the user just asked about
2. Help them learn more about that topic
3. Feel like natural conversation continuations
4. Are concise (max 6 words each)
5. Use conversational language (like asking a friend)

Format as JSON array:
["Follow-up question 1", "Follow-up question 2"]

Examples:
- If user asked about "Cream of Creams experience" → ["What was the biggest challenge?", "How did you grow engagement?"]
- If user asked about "projects" → ["Tell me about the chatbot", "What was the hardest project?"]
- If user asked about "skills" → ["How did you learn React?", "What automation tools do you use?"]
- If user asked about "achievements" → ["What was the strategy?", "How did you measure success?"]
- If user asked about "work experience" → ["Tell me about JungleWalla", "What did you learn there?"]

IMPORTANT:
- Make questions specific to what was JUST discussed
- Don't ask generic questions like "Tell me more"
- Reference specific names/projects/companies mentioned
- Keep it conversational and natural

Return ONLY the JSON array, no explanations.`;

    const response = await fetch('/api/generate-chips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      console.error('Chip generation API error:', response.status);
      return [];
    }

    const data = await response.json();
    return data.chips || [];
  } catch (error) {
    console.error('Error generating chips:', error);
    return [];
  }
};

const QuickActionChips = ({ messageText, userQuestion, onChipClick }) => {
  const [chips, setChips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChips = async () => {
      setLoading(true);

      // Generate contextual chips using AI if we have user question
      if (userQuestion && messageText) {
        const generatedChips = await generateContextualChips(userQuestion, messageText);

        if (generatedChips.length === 2) {
          setChips([
            { text: generatedChips[0], action: generatedChips[0], type: 'conversational' },
            { text: generatedChips[1], action: generatedChips[1], type: 'conversational' }
          ]);
        } else {
          // Fallback to generic chips if AI generation fails
          setChips(getFallbackChips());
        }
      } else {
        // First message or no context - show default welcome chips
        setChips(getFallbackChips());
      }

      setLoading(false);
    };

    loadChips();
  }, [messageText, userQuestion]);

  const getFallbackChips = () => [
    {
      text: "Tell me about projects",
      action: "What projects has Sean built?",
      type: 'conversational'
    },
    {
      text: "Show me the portfolio",
      action: "Can I see the full portfolio?",
      type: 'conversational'
    }
  ];

  // Don't show chips while loading or if no chips available
  if (loading || chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {chips.map((chip, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onChipClick(chip.action)}
          className="px-3 py-1.5 text-xs font-medium bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-full border border-purple-500/30 hover:border-purple-500/50 transition-all duration-200 hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {chip.text}
        </motion.button>
      ))}
    </div>
  );
};

export default QuickActionChips;
