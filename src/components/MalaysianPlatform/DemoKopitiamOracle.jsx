import React, { useState } from 'react';
import { TrendingUp, Search, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import DemoWrapper from '../UI/DemoWrapper';
import mockDataEngine from '../../utils/mockDataEngine';

const DemoKopitiamOracle = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  const popularSearches = ['bubble tea', 'nasi lemak', 'sambal', 'kopi', 'durian', 'roti canai'];

  const analyzeTrend = (searchQuery = query) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const data = mockDataEngine.kopitiamOracle(searchQuery);
      setResult(data);
      setLoading(false);
    }, 1200);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <DemoWrapper
      title="Kopitiam Oracle"
      description="F&B trend prediction engine powered by social media monitoring"
      demoType="interactive"
      limitations="Demo uses sample dataset. Full version monitors real-time social media, blogs, and TikTok."
    >
      {/* Search Input */}
      <div className="mb-6">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && analyzeTrend()}
              placeholder="Enter food/drink to analyze... (e.g., bubble tea)"
              className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-primary outline-none bg-white dark:bg-navy-dark text-navy dark:text-white transition-colors"
            />
          </div>
          <button
            onClick={() => analyzeTrend()}
            disabled={loading || !query.trim()}
            className="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
          >
            {loading ? '⏳ Analyzing...' : 'Analyze'}
          </button>
        </div>
        
        {/* Popular Searches */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 py-2">Try:</span>
          {popularSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => {
                setQuery(search);
                analyzeTrend(search);
              }}
              className="px-3 py-1 bg-gray-100 dark:bg-navy/20 text-gray-700 dark:text-gray-300 text-xs rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Trend Score Card */}
          <div className="p-6 bg-gradient-to-br from-teal/10 to-primary/5 rounded-lg border border-teal/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                TREND SCORE
              </span>
              <TrendingUp className="text-teal" size={24} />
            </div>
            <div className="text-5xl md:text-6xl font-black text-teal mb-2">{result.trendScore}/100</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Velocity: <span className="text-primary font-bold">{result.velocity}</span>
            </div>
            <div className="mt-4 h-2 bg-gray-200 dark:bg-navy rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal to-primary transition-all duration-1000"
                style={{ width: `${result.trendScore}%` }}
              />
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-navy/20 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                Peak Month
              </div>
              <div className="text-lg font-bold text-navy dark:text-white">{result.peakMonth}</div>
            </div>
            <div className="p-4 bg-white dark:bg-navy/20 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                Avg Price
              </div>
              <div className="text-lg font-bold text-navy dark:text-white">{result.avgPrice}</div>
            </div>
            <div className="p-4 bg-white dark:bg-navy/20 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                Competitors
              </div>
              <div className="text-lg font-bold text-navy dark:text-white">{result.competitors} brands</div>
            </div>
            <div className="p-4 bg-white dark:bg-navy/20 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                Hotspots
              </div>
              <div className="text-sm font-semibold text-navy dark:text-white">
                {result.hotspots.join(', ')}
              </div>
            </div>
          </div>

          {/* Expandable Sections */}
          <div className="space-y-3">
            {/* Insights */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('insights')}
                className="w-full p-4 bg-white dark:bg-navy/20 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-navy/30 transition-colors"
              >
                <span className="font-bold text-navy dark:text-white">💡 Marketing Insights</span>
                {expandedSection === 'insights' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSection === 'insights' && (
                <div className="p-4 bg-gray-50 dark:bg-navy/10 border-t border-gray-200 dark:border-gray-700">
                  <ul className="space-y-2">
                    {result.insights.map((insight, i) => (
                      <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Red Flags */}
            {result.redFlags && (
              <div className="border border-red-200 dark:border-red-900 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('redflags')}
                  className="w-full p-4 bg-red-50 dark:bg-red-900/10 flex items-center justify-between hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                >
                  <span className="font-bold text-red-700 dark:text-red-400">🚩 Red Flags</span>
                  {expandedSection === 'redflags' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSection === 'redflags' && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/10 border-t border-red-200 dark:border-red-900">
                    <ul className="space-y-2">
                      {result.redFlags.map((flag, i) => (
                        <li key={i} className="text-sm text-red-700 dark:text-red-400 flex items-start gap-2">
                          <AlertCircle size={16} className="mt-1 flex-shrink-0" />
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Opportunities */}
            {result.opportunities && (
              <div className="border border-teal-200 dark:border-teal-900 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('opportunities')}
                  className="w-full p-4 bg-teal-50 dark:bg-teal-900/10 flex items-center justify-between hover:bg-teal-100 dark:hover:bg-teal-900/20 transition-colors"
                >
                  <span className="font-bold text-teal-700 dark:text-teal-400">🎯 Opportunities</span>
                  {expandedSection === 'opportunities' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSection === 'opportunities' && (
                  <div className="p-4 bg-teal-50 dark:bg-teal-900/10 border-t border-teal-200 dark:border-teal-900">
                    <ul className="space-y-2">
                      {result.opportunities.map((opp, i) => (
                        <li key={i} className="text-sm text-teal-700 dark:text-teal-400 flex items-start gap-2">
                          <span className="mt-1">→</span>
                          <span>{opp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!result && !loading && (
        <div className="text-center py-16 text-gray-400">
          <TrendingUp size={64} className="mx-auto mb-4 opacity-20" />
          <p className="text-lg mb-2">Enter a food or drink to analyze trends</p>
          <p className="text-sm">Try popular searches: bubble tea, nasi lemak, sambal, kopi</p>
        </div>
      )}
    </DemoWrapper>
  );
};

export default DemoKopitiamOracle;
