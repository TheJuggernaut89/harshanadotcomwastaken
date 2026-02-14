/**
 * Chatbot Analytics Tracker
 *
 * Simple analytics to track chatbot engagement and conversion metrics.
 * Works without external dependencies - stores data in localStorage.
 *
 * Usage:
 * import { trackChatbotEvent, getChatbotStats } from './utils/chatbotAnalytics';
 *
 * trackChatbotEvent('chatbot_opened');
 * trackChatbotEvent('quick_reply', { action: 'skills' });
 * trackChatbotEvent('conversion', { type: 'download_resume' });
 */

const STORAGE_KEY = 'chatbot_analytics';
const SESSION_KEY = 'chatbot_session';

/**
 * Get or create session ID
 */
const getSessionId = () => {
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
};

/**
 * Get current analytics data
 */
const getAnalyticsData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {
      events: [],
      sessions: {},
      conversions: [],
      startDate: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error reading analytics:', error);
    return { events: [], sessions: {}, conversions: [], startDate: new Date().toISOString() };
  }
};

/**
 * Save analytics data
 */
const saveAnalyticsData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving analytics:', error);
  }
};

/**
 * Track a chatbot event
 *
 * @param {string} eventName - Name of the event (e.g., 'chatbot_opened', 'message_sent')
 * @param {object} metadata - Additional data about the event
 */
export const trackChatbotEvent = (eventName, metadata = {}) => {
  const sessionId = getSessionId();
  const data = getAnalyticsData();

  const event = {
    id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: eventName,
    sessionId,
    timestamp: new Date().toISOString(),
    metadata
  };

  data.events.push(event);

  // Update session data
  if (!data.sessions[sessionId]) {
    data.sessions[sessionId] = {
      id: sessionId,
      startTime: new Date().toISOString(),
      events: [],
      conversions: []
    };
  }
  data.sessions[sessionId].events.push(eventName);
  data.sessions[sessionId].lastActivity = new Date().toISOString();

  // Track conversions
  if (isConversionEvent(eventName)) {
    const conversion = {
      id: `conv_${Date.now()}`,
      type: eventName,
      sessionId,
      timestamp: new Date().toISOString(),
      metadata
    };
    data.conversions.push(conversion);
    data.sessions[sessionId].conversions.push(eventName);
  }

  saveAnalyticsData(data);

  // Also send to Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'Chatbot',
      event_label: metadata.action || eventName,
      session_id: sessionId,
      ...metadata
    });
  }

  return event;
};

/**
 * Check if event is a conversion
 */
const isConversionEvent = (eventName) => {
  const conversionEvents = [
    'download_resume',
    'email_click',
    'schedule_click',
    'calendar_open',
    'linkedin_click'
  ];
  return conversionEvents.includes(eventName);
};

/**
 * Get chatbot statistics
 *
 * @returns {object} Analytics summary
 */
export const getChatbotStats = () => {
  const data = getAnalyticsData();

  const totalSessions = Object.keys(data.sessions).length;
  const totalEvents = data.events.length;
  const totalConversions = data.conversions.length;

  // Calculate engagement metrics
  const sessionsWithInteraction = Object.values(data.sessions).filter(
    s => s.events.length > 1
  ).length;

  const engagementRate = totalSessions > 0
    ? (sessionsWithInteraction / totalSessions * 100).toFixed(2)
    : 0;

  const conversionRate = totalSessions > 0
    ? (totalConversions / totalSessions * 100).toFixed(2)
    : 0;

  // Event distribution
  const eventCounts = data.events.reduce((acc, event) => {
    acc[event.name] = (acc[event.name] || 0) + 1;
    return acc;
  }, {});

  // Most popular actions
  const quickReplyActions = data.events
    .filter(e => e.name === 'quick_reply')
    .reduce((acc, event) => {
      const action = event.metadata.action || 'unknown';
      acc[action] = (acc[action] || 0) + 1;
      return acc;
    }, {});

  // Average messages per session
  const avgMessagesPerSession = totalSessions > 0
    ? (totalEvents / totalSessions).toFixed(2)
    : 0;

  // Conversion types
  const conversionTypes = data.conversions.reduce((acc, conv) => {
    acc[conv.type] = (acc[conv.type] || 0) + 1;
    return acc;
  }, {});

  return {
    overview: {
      totalSessions,
      totalEvents,
      totalConversions,
      engagementRate: `${engagementRate}%`,
      conversionRate: `${conversionRate}%`,
      avgMessagesPerSession
    },
    events: eventCounts,
    quickReplyActions,
    conversions: conversionTypes,
    sessions: data.sessions,
    rawData: data
  };
};

/**
 * Get chatbot funnel metrics
 * Shows drop-off at each stage
 */
export const getChatbotFunnel = () => {
  const data = getAnalyticsData();
  const sessions = Object.values(data.sessions);

  const funnel = {
    chatbotOpened: sessions.length,
    messagesSent: sessions.filter(s => s.events.includes('message_sent')).length,
    quickReplyClicked: sessions.filter(s => s.events.includes('quick_reply')).length,
    sectionNavigated: sessions.filter(s => s.events.some(e => e.includes('section_'))).length,
    converted: sessions.filter(s => s.conversions.length > 0).length
  };

  // Calculate drop-off rates
  const dropOff = {
    openedToMessage: funnel.chatbotOpened > 0
      ? ((1 - funnel.messagesSent / funnel.chatbotOpened) * 100).toFixed(2) + '%'
      : '0%',
    messageToQuickReply: funnel.messagesSent > 0
      ? ((1 - funnel.quickReplyClicked / funnel.messagesSent) * 100).toFixed(2) + '%'
      : '0%',
    quickReplyToNavigation: funnel.quickReplyClicked > 0
      ? ((1 - funnel.sectionNavigated / funnel.quickReplyClicked) * 100).toFixed(2) + '%'
      : '0%',
    navigationToConversion: funnel.sectionNavigated > 0
      ? ((1 - funnel.converted / funnel.sectionNavigated) * 100).toFixed(2) + '%'
      : '0%'
  };

  return { funnel, dropOff };
};

/**
 * Export analytics data as CSV
 */
export const exportAnalyticsCSV = () => {
  const data = getAnalyticsData();

  const csvRows = [
    ['Event ID', 'Event Name', 'Session ID', 'Timestamp', 'Metadata']
  ];

  data.events.forEach(event => {
    csvRows.push([
      event.id,
      event.name,
      event.sessionId,
      event.timestamp,
      JSON.stringify(event.metadata)
    ]);
  });

  const csvContent = csvRows.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chatbot_analytics_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};

/**
 * Clear all analytics data
 */
export const clearAnalytics = () => {
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(SESSION_KEY);
  console.log('Analytics data cleared');
};

/**
 * Print analytics summary to console
 */
export const printAnalyticsSummary = () => {
  const stats = getChatbotStats();
  const funnel = getChatbotFunnel();

  console.log('=== CHATBOT ANALYTICS SUMMARY ===\n');
  console.log('Overview:', stats.overview);
  console.log('\nEvent Distribution:', stats.events);
  console.log('\nQuick Reply Actions:', stats.quickReplyActions);
  console.log('\nConversions:', stats.conversions);
  console.log('\nFunnel:', funnel.funnel);
  console.log('\nDrop-off Rates:', funnel.dropOff);
  console.log('\n=================================');

  return stats;
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  window.chatbotAnalytics = {
    getStats: getChatbotStats,
    getFunnel: getChatbotFunnel,
    exportCSV: exportAnalyticsCSV,
    clear: clearAnalytics,
    print: printAnalyticsSummary
  };
}
