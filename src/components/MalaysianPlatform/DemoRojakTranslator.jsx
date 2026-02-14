import React, { useState } from 'react';
import { Languages, Copy, Check } from 'lucide-react';
import DemoWrapper from '../UI/DemoWrapper';
import mockDataEngine from '../../utils/mockDataEngine';

const DemoRojakTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [style, setStyle] = useState('casual');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const sampleTexts = [
    "Hello everyone",
    "Thank you",
    "Big sale today",
    "Limited time only",
    "Check it out",
    "Don't miss out"
  ];

  const styles = [
    { id: 'casual', label: 'Casual', emoji: '😎', description: 'Everyday Malaysian chat' },
    { id: 'professional', label: 'Professional', emoji: '💼', description: 'Business communications' },
    { id: 'genz', label: 'Gen Z', emoji: '✨', description: 'Young trendy vibe' }
  ];

  const translate = () => {
    if (!inputText.trim()) return;
    const translated = mockDataEngine.rojakTranslator(inputText, style);
    setResult(translated);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DemoWrapper
      title="Rojak Translator"
      description="Translate content into authentic Malaysian Rojak style"
      demoType="interactive"
      limitations="Demo uses pre-defined phrases. Full version handles custom text with AI-powered code-switching."
    >
      <div className="space-y-6">
        {/* Style Selector */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
            Choose Translation Style
          </label>
          <div className="grid grid-cols-3 gap-3">
            {styles.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  style === s.id
                    ? 'border-primary bg-primary/5 shadow-button'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                }`}
              >
                <div className="text-3xl mb-2">{s.emoji}</div>
                <div className="font-bold text-sm text-navy dark:text-white">{s.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            English Text
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter English text to translate..."
            rows={4}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-primary outline-none bg-white dark:bg-navy-dark text-navy dark:text-white resize-none"
          />
          
          {/* Sample Phrases */}
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 py-1">Quick fill:</span>
            {sampleTexts.map((text, index) => (
              <button
                key={index}
                onClick={() => setInputText(text)}
                className="px-2 py-1 bg-gray-100 dark:bg-navy/20 text-gray-600 dark:text-gray-400 text-xs rounded hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        {/* Translate Button */}
        <button
          onClick={translate}
          disabled={!inputText.trim()}
          className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Languages size={20} />
          Translate to Rojak {style.charAt(0).toUpperCase() + style.slice(1)}
        </button>

        {/* Result */}
        {result && (
          <div className="p-6 bg-gradient-to-br from-teal/10 to-primary/5 rounded-lg border-2 border-teal/20 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                {style.toUpperCase()} STYLE
              </span>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-navy rounded-lg text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="text-2xl font-bold text-navy dark:text-white leading-relaxed">
              {result}
            </div>
          </div>
        )}

        {/* Examples Section */}
        {!result && (
          <div className="p-6 bg-gray-50 dark:bg-navy/10 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-navy dark:text-white mb-3">✨ Example Translations</h4>
            <div className="space-y-3">
              {sampleTexts.slice(0, 3).map((text, i) => (
                <div key={i} className="text-sm">
                  <div className="text-gray-500 dark:text-gray-400 mb-1">"{text}"</div>
                  <div className="flex gap-2 pl-4">
                    <span className="text-gray-400">→</span>
                    <div className="space-y-1">
                      <div className="text-navy dark:text-white font-semibold">
                        <span className="text-xs text-gray-500 mr-2">Casual:</span>
                        {mockDataEngine.rojakTranslator(text, 'casual')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DemoWrapper>
  );
};

export default DemoRojakTranslator;
