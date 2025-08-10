// Utility functions for EventPulse MCP

/**
 * Validate incoming request for campaign generation
 */
function validateRequest(body) {
  const required = ['business_type', 'event', 'language'];
  const missing = required.filter(field => !body[field]);
  
  if (missing.length > 0) {
    return {
      valid: false,
      message: `Missing required fields: ${missing.join(', ')}`
    };
  }
  
  // Validate language support
  const supportedLanguages = ['hindi', 'gujarati', 'english', 'tamil', 'bengali', 'marathi'];
  if (!supportedLanguages.includes(body.language.toLowerCase())) {
    return {
      valid: false,
      message: `Unsupported language. Supported: ${supportedLanguages.join(', ')}`
    };
  }
  
  // Validate business type
  const supportedBusinessTypes = ['sweet_shop', 'clothing_store', 'restaurant', 'jewelry_shop', 'electronics', 'beauty_salon', 'flower_shop', 'gift_shop'];
  const normalizedBusinessType = body.business_type.toLowerCase().replace(/\s+/g, '_');
  if (!supportedBusinessTypes.includes(normalizedBusinessType)) {
    return {
      valid: false,
      message: `Unsupported business type. Supported: ${supportedBusinessTypes.join(', ')}`
    };
  }
  
  // Validate event
  const supportedEvents = ['diwali', 'holi', 'eid', 'navratri', 'raksha_bandhan', 'ganesh_chaturthi', 'karva_chauth', 'christmas'];
  if (!supportedEvents.includes(body.event.toLowerCase())) {
    return {
      valid: false,
      message: `Unsupported event. Supported: ${supportedEvents.join(', ')}`
    };
  }
  
  return { valid: true };
}

/**
 * Format campaign response for Push AI MCP integration
 */
function formatResponse(campaign, originalRequest) {
  const timestamp = new Date().toISOString();
  const campaignId = `ep_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    campaign_id: campaignId,
    timestamp: timestamp,
    request_info: {
      business_type: originalRequest.business_type,
      event: originalRequest.event,
      language: originalRequest.language,
      location: originalRequest.location || 'India'
    },
    campaign_content: {
      whatsapp_message: campaign.whatsapp_message,
      social_media_posts: campaign.social_media_posts,
      hashtags: campaign.hashtags,
      promotional_offers: campaign.promotional_offers
    },
    scheduling_suggestions: campaign.scheduling_suggestions,
    actions: [
      {
        type: 'share_whatsapp',
        label: 'Share on WhatsApp',
        content: campaign.whatsapp_message
      },
      {
        type: 'post_social',
        label: 'Post on Social Media',
        content: campaign.social_media_posts[0]
      },
      {
        type: 'schedule_campaign',
        label: 'Schedule Campaign',
        timing: campaign.scheduling_suggestions.optimal_time
      }
    ],
    metadata: {
      generated_by: 'EventPulse MCP v1.0.0',
      ai_model: 'gpt-4o-mini',
      processing_time_ms: campaign.processing_time || 0
    }
  };
}

/**
 * Generate unique campaign ID
 */
function generateCampaignId() {
  return `ep_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get current festival season context
 */
function getCurrentFestivalContext() {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12
  const day = now.getDate();
  
  // Simple festival calendar (can be expanded)
  const festivals = {
    'diwali': { months: [10, 11], priority: 'high' },
    'holi': { months: [3], priority: 'high' },
    'eid': { months: [4, 5, 11, 12], priority: 'high' },
    'christmas': { months: [12], priority: 'medium' },
    'new_year': { months: [1, 12], priority: 'medium' },
    'raksha_bandhan': { months: [8], priority: 'medium' },
    'navratri': { months: [9, 10], priority: 'high' }
  };
  
  const currentFestivals = [];
  for (const [festival, info] of Object.entries(festivals)) {
    if (info.months.includes(month)) {
      currentFestivals.push({ name: festival, priority: info.priority });
    }
  }
  
  return currentFestivals;
}

/**
 * Log request for analytics
 */
function logRequest(request, response, processingTime) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    business_type: request.business_type,
    event: request.event,
    language: request.language,
    location: request.location,
    processing_time_ms: processingTime,
    success: !!response
  };
  
  console.log('📊 Request logged:', logEntry);
  // In production, this would go to a proper analytics service
}

module.exports = {
  validateRequest,
  formatResponse,
  generateCampaignId,
  getCurrentFestivalContext,
  logRequest
};