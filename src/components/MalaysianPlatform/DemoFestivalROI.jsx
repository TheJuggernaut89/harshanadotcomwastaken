import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Calendar } from 'lucide-react';
import DemoWrapper from '../UI/DemoWrapper';
import mockDataEngine from '../../utils/mockDataEngine';

const DemoFestivalROI = () => {
  const [budget, setBudget] = useState(100000);
  const [results, setResults] = useState(null);

  const calculateROI = () => {
    const data = mockDataEngine.festivalROI(budget);
    setResults(data);
  };

  const budgetPresets = [
    { label: 'Startup', amount: 50000 },
    { label: 'SME', amount: 100000 },
    { label: 'Corporate', amount: 500000 }
  ];

  // Calculate totals
  const getTotals = () => {
    if (!results) return null;
    const totalBudget = results.reduce((sum, f) => 
      sum + (budget * f.allocation) / 100, 0
    );
    const totalRevenue = results.reduce((sum, f) => 
      sum + parseFloat(f.projectedRevenue.replace(/[^\d.]/g, '')), 0
    );
    const totalProfit = totalRevenue - totalBudget;
    return { totalBudget, totalRevenue, totalProfit };
  };

  const totals = getTotals();

  return (
    <DemoWrapper
      title="Festival ROI Maximizer"
      description="Optimize marketing budget across Malaysian festivals based on historical data"
      demoType="interactive"
      limitations="Demo uses average Malaysian market data. Full version customizes for your industry and past performance."
    >
      <div className="space-y-6">
        {/* Budget Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
            Total Annual Marketing Budget
          </label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              min="10000"
              step="10000"
              className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-primary outline-none bg-white dark:bg-navy-dark text-navy dark:text-white text-lg font-bold"
            />
          </div>
          
          {/* Budget Presets */}
          <div className="mt-3 flex gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 py-2">Presets:</span>
            {budgetPresets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => setBudget(preset.amount)}
                className="px-3 py-1 bg-gray-100 dark:bg-navy/20 text-gray-700 dark:text-gray-300 text-xs rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {preset.label} (RM {preset.amount.toLocaleString()})
              </button>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateROI}
          className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
        >
          <TrendingUp size={20} />
          Calculate Optimal Allocation
        </button>

        {/* Results */}
        {results && (
          <div className="space-y-4 animate-fade-in">
            {/* Summary Cards */}
            {totals && (
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-navy/10 to-navy/5 rounded-lg border border-navy/20">
                  <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">
                    Total Budget
                  </div>
                  <div className="text-2xl font-black text-navy dark:text-white">
                    RM {totals.totalBudget.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-teal/10 to-teal/5 rounded-lg border border-teal/20">
                  <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">
                    Projected Revenue
                  </div>
                  <div className="text-2xl font-black text-teal">
                    RM {totals.totalRevenue.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                  <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">
                    Total Profit
                  </div>
                  <div className="text-2xl font-black text-primary">
                    RM {totals.totalProfit.toLocaleString()}
                  </div>
                </div>
              </div>
            )}

            {/* Festival Breakdown */}
            <div className="space-y-3">
              {results.map((festival, index) => (
                <div
                  key={index}
                  className="p-5 bg-white dark:bg-navy/20 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-card transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-navy dark:text-white mb-1">
                        {festival.name}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users size={14} />
                        <span>{festival.audience}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-primary">{festival.allocation}%</div>
                      <div className="text-xs text-gray-500">of budget</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Budget</div>
                      <div className="font-bold text-navy dark:text-white">{festival.budgetAmount}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Expected ROI</div>
                      <div className="font-bold text-teal">{festival.historicalROI}x</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Revenue</div>
                      <div className="font-bold text-navy dark:text-white">{festival.expectedReturn}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Profit</div>
                      <div className="font-bold text-primary">{festival.netProfit}</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-gray-200 dark:bg-navy rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-teal transition-all duration-1000"
                      style={{ width: `${festival.allocation}%` }}
                    />
                  </div>

                  {/* Details */}
                  <div className="grid md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Channels: </span>
                      <span className="text-navy dark:text-white font-semibold">
                        {festival.recommendedChannels.join(', ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Duration: </span>
                      <span className="text-navy dark:text-white font-semibold">
                        {festival.campaignDuration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Insights */}
            <div className="p-5 bg-gradient-to-br from-teal/10 to-primary/5 rounded-lg border border-teal/20">
              <h4 className="font-bold text-navy dark:text-white mb-3 flex items-center gap-2">
                <TrendingUp size={18} className="text-teal" />
                Key Insights
              </h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>{results[0].name}</strong> gets highest allocation ({results[0].allocation}%) 
                    due to best historical ROI ({results[0].historicalROI}x)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Combined projected revenue: <strong className="text-teal">RM {totals.totalRevenue.toLocaleString()}</strong> 
                    {' '}from RM {totals.totalBudget.toLocaleString()} investment
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Focus on <strong>multi-channel approach</strong> for major festivals (CNY, Raya) 
                    and <strong>digital-only</strong> for smaller ones
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </DemoWrapper>
  );
};

export default DemoFestivalROI;
