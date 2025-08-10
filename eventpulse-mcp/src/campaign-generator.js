const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const { enhanceWhatsAppMessage, enhanceSocialMediaPost, addCulturalContext } = require('./content-enhancer');

// Initialize OpenAI (optional for testing)
let openai = null;
try {
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    console.log('✅ OpenAI client initialized');
  } else {
    console.log('⚠️  OpenAI not configured, using mock data for testing');
  }
} catch (error) {
  console.log('⚠️  OpenAI initialization failed, using mock data:', error.message);
}

// Load data files
const festivalsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/festivals.json'), 'utf8'));
const templatesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/templates.json'), 'utf8'));
const hashtagsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/regional-hashtags.json'), 'utf8'));

/**
 * Main campaign generation function
 */
async function generateCampaign(request) {
  const startTime = Date.now();
  
  try {
    console.log('🎯 Generating campaign for:', request);
    
    // Get festival and business context
    const festivalContext = getFestivalContext(request.event);
    const businessContext = getBusinessContext(request.business_type);
    const languageTemplate = getLanguageTemplate(request.language);
    
    // Generate different types of content
    const [whatsappMessage, socialPosts, hashtags, offers] = await Promise.all([
      generateWhatsAppMessage(request, festivalContext, businessContext, languageTemplate),
      generateSocialMediaPosts(request, festivalContext, businessContext, languageTemplate),
      generateHashtags(request, festivalContext),
      generatePromotionalOffers(request, festivalContext, businessContext)
    ]);
    
    // Get scheduling suggestions
    const schedulingSuggestions = getSchedulingSuggestions(request.event);
    
    const processingTime = Date.now() - startTime;
    
    return {
      whatsapp_message: whatsappMessage,
      social_media_posts: socialPosts,
      hashtags: hashtags,
      promotional_offers: offers,
      scheduling_suggestions: schedulingSuggestions,
      processing_time: processingTime
    };
    
  } catch (error) {
    console.error('❌ Campaign generation error:', error);
    throw new Error(`Campaign generation failed: ${error.message}`);
  }
}

/**
 * Generate WhatsApp message
 */
async function generateWhatsAppMessage(request, festivalContext, businessContext, languageTemplate) {
  const prompt = `
${languageTemplate.whatsapp_template.replace('{business_type}', request.business_type).replace('{event}', request.event)}

Context:
- Festival: ${request.event} (${festivalContext.description})
- Business: ${request.business_type}
- Language: ${request.language}
- Location: ${request.location || 'India'}
- Cultural greeting: ${festivalContext.cultural_context[request.language] || festivalContext.cultural_context.english}

Business opportunities for this festival: ${festivalContext.business_opportunities[request.business_type]?.join(', ') || 'general festive offers'}

Requirements:
1. Start with appropriate festival greeting in ${request.language}
2. Mention 1-2 specific offers relevant to the business and festival
3. Include business appeal and call-to-action
4. Keep it under 160 characters for WhatsApp
5. Use emojis appropriately
6. End with contact encouragement

Generate a compelling WhatsApp message:
`;

  if (openai) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
        temperature: 0.7
      });
      
      let message = response.choices[0].message.content.trim();
      
      // Enhance message with emojis and cultural context
      message = enhanceWhatsAppMessage(message, request.event, request.business_type);
      message = addCulturalContext(message, request.event, request.language, request.location);
      
      return message;
    } catch (error) {
      console.error('WhatsApp generation error:', error);
    }
  }
  
  // Use fallback if OpenAI is not available
  return getFallbackWhatsAppMessage(request, festivalContext);
}

/**
 * Generate social media posts
 */
async function generateSocialMediaPosts(request, festivalContext, businessContext, languageTemplate) {
  const prompt = `
${languageTemplate.social_template.replace('{business_type}', request.business_type).replace('{event}', request.event)}

Context:
- Festival: ${request.event}
- Business: ${request.business_type}
- Language: ${request.language}
- Cultural context: ${festivalContext.cultural_context[request.language] || festivalContext.cultural_context.english}

Generate 2 different social media posts:
1. One focused on festival celebration and community
2. One focused on special offers and business promotion

Each post should be engaging, use appropriate emojis, and be suitable for Instagram/Facebook.
`;

  if (openai) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,
        temperature: 0.8
      });
      
      const content = response.choices[0].message.content.trim();
      let posts = content.split('\n\n').filter(post => post.trim().length > 0);
      
      // Enhance posts with cultural context and engagement elements
      posts = posts.map(post => {
        let enhanced = enhanceSocialMediaPost(post, request.event, request.business_type, request.language);
        enhanced = addCulturalContext(enhanced, request.event, request.language, request.location);
        return enhanced;
      });
      
      return posts.length >= 2 ? posts.slice(0, 2) : posts.length > 0 ? posts : [content];
    } catch (error) {
      console.error('Social media generation error:', error);
    }
  }
  
  // Use fallback if OpenAI is not available
  return getFallbackSocialPosts(request, festivalContext);
}

/**
 * Generate relevant hashtags
 */
async function generateHashtags(request, festivalContext) {
  const baseHashtags = festivalContext.popular_hashtags || [];
  const businessHashtags = getBusinessHashtags(request.business_type);
  const locationHashtags = getLocationHashtags(request.location);
  const trendingHashtags = getTrendingHashtags(request.event);
  const seasonalHashtags = getSeasonalHashtags();
  
  // Combine and return unique hashtags
  const allHashtags = [
    ...baseHashtags,
    ...businessHashtags,
    ...locationHashtags,
    ...trendingHashtags,
    ...seasonalHashtags
  ];
  
  return [...new Set(allHashtags)].slice(0, 12);
}

/**
 * Generate promotional offers
 */
async function generatePromotionalOffers(request, festivalContext, businessContext) {
  const businessOpportunities = festivalContext.business_opportunities[request.business_type] || [];
  const commonOffers = businessContext.common_offers || [];
  
  const offers = [];
  
  // Festival-specific offers
  if (businessOpportunities.length > 0) {
    offers.push(`Special ${request.event} collection: ${businessOpportunities[0]}`);
    if (businessOpportunities.length > 1) {
      offers.push(`${request.event} exclusive: ${businessOpportunities[1]}`);
    }
  }
  
  // Business-specific offers with dynamic values
  if (commonOffers.length > 0) {
    const discountPercentage = getRandomDiscount();
    const minAmount = getRandomAmount(request.business_type);
    
    offers.push(
      commonOffers[0]
        .replace('{percentage}', discountPercentage)
        .replace('{amount}', minAmount)
    );
    
    if (commonOffers.length > 1) {
      offers.push(commonOffers[1].replace('{amount}', minAmount));
    }
  }
  
  // Festival-specific value-added offers
  const festivalOffers = getFestivalSpecificOffers(request.event, request.business_type);
  offers.push(...festivalOffers);
  
  return offers.slice(0, 4);
}

/**
 * Get random discount percentage
 */
function getRandomDiscount() {
  const discounts = ['10', '15', '20', '25', '30'];
  return discounts[Math.floor(Math.random() * discounts.length)];
}

/**
 * Get random minimum amount based on business type
 */
function getRandomAmount(businessType) {
  const amountMap = {
    'sweet_shop': ['299', '499', '799'],
    'clothing_store': ['999', '1499', '1999'],
    'restaurant': ['399', '599', '899'],
    'jewelry_shop': ['2999', '4999', '9999'],
    'electronics': ['4999', '9999', '14999']
  };
  
  const amounts = amountMap[businessType.toLowerCase().replace(/\s+/g, '_')] || ['499', '999', '1499'];
  return amounts[Math.floor(Math.random() * amounts.length)];
}

/**
 * Get festival-specific offers
 */
function getFestivalSpecificOffers(eventName, businessType) {
  const festivalOffers = {
    'diwali': [
      'Free gift wrapping with festive packaging',
      'Complimentary Diwali greeting card',
      'Lucky draw entry with every purchase'
    ],
    'holi': [
      'Free color-safe packaging',
      'Complimentary herbal gulal',
      'Group booking discounts available'
    ],
    'eid': [
      'Free dates with every purchase',
      'Special Eid gift packaging',
      'Family combo offers'
    ],
    'navratri': [
      'Free garba accessories',
      'Dandiya stick complimentary',
      '9-day festival package deals'
    ]
  };
  
  const offers = festivalOffers[eventName.toLowerCase()] || ['Free festival packaging'];
  return offers.slice(0, 1);
}

/**
 * Get festival context from data
 */
function getFestivalContext(eventName) {
  const festival = festivalsData.festivals[eventName.toLowerCase()];
  if (festival) {
    return festival;
  }
  
  // Fallback for unknown festivals
  return {
    name: eventName,
    description: 'Special celebration',
    business_opportunities: {
      'sweet_shop': ['special sweets', 'gift boxes'],
      'clothing_store': ['festive wear', 'special collection'],
      'restaurant': ['special menu', 'family packages']
    },
    cultural_context: {
      'hindi': 'शुभकामनाएं',
      'gujarati': 'શુભકામનાઓ',
      'english': 'Best wishes'
    },
    popular_hashtags: [`#${eventName}`, '#Festival', '#Celebration']
  };
}

/**
 * Get business context from data
 */
function getBusinessContext(businessType) {
  return festivalsData.business_types[businessType.toLowerCase().replace(/\s+/g, '_')] || {
    keywords: ['business', 'service', 'quality'],
    common_offers: ['special discount', 'limited time offer']
  };
}

/**
 * Get language template
 */
function getLanguageTemplate(language) {
  return templatesData.prompt_templates[language.toLowerCase()] || templatesData.prompt_templates.english;
}

/**
 * Get scheduling suggestions
 */
function getSchedulingSuggestions(eventName) {
  const timing = templatesData.timing_suggestions[eventName.toLowerCase()];
  if (timing) {
    return {
      optimal_time: timing.optimal_posting_times[0],
      all_optimal_times: timing.optimal_posting_times,
      campaign_duration: timing.campaign_duration,
      peak_engagement: timing.peak_engagement
    };
  }
  
  return {
    optimal_time: '10:00 AM',
    all_optimal_times: ['10:00 AM', '2:00 PM', '6:00 PM'],
    campaign_duration: '5-7 days before festival',
    peak_engagement: 'morning and evening hours'
  };
}

/**
 * Get business-specific hashtags
 */
function getBusinessHashtags(businessType) {
  const businessKey = businessType.toLowerCase().replace(/\s+/g, '_');
  return hashtagsData.business_trending[businessKey] || ['#Business', '#Quality', '#Service'];
}

/**
 * Get location-specific hashtags
 */
function getLocationHashtags(location) {
  if (!location) return [];
  
  const locationKey = location.toLowerCase().replace(/\s+/g, '');
  const locationHashtags = hashtagsData.regional_hashtags[locationKey];
  
  if (locationHashtags) {
    return locationHashtags.slice(0, 3);
  }
  
  // Fallback for unknown locations
  return [`#${location.replace(/\s+/g, '')}`];
}

/**
 * Get trending hashtags for festival
 */
function getTrendingHashtags(eventName) {
  const eventKey = eventName.toLowerCase().replace(/\s+/g, '_');
  const festivalTrending = hashtagsData.festival_trending[eventKey];
  
  if (festivalTrending) {
    const currentYear = new Date().getFullYear().toString();
    const yearlyTags = festivalTrending[currentYear] || [];
    const generalTags = festivalTrending.general || [];
    
    return [...yearlyTags.slice(0, 2), ...generalTags.slice(0, 2)];
  }
  
  return [];
}

/**
 * Get seasonal hashtags
 */
function getSeasonalHashtags() {
  const month = new Date().getMonth() + 1;
  let season = 'spring';
  
  if (month >= 12 || month <= 2) season = 'winter';
  else if (month >= 3 && month <= 5) season = 'spring';
  else if (month >= 6 && month <= 9) season = 'monsoon';
  else if (month >= 10 && month <= 11) season = 'summer';
  
  return hashtagsData.seasonal_hashtags[season]?.slice(0, 1) || [];
}

/**
 * Fallback WhatsApp message if AI fails
 */
function getFallbackWhatsAppMessage(request, festivalContext) {
  const greeting = festivalContext.cultural_context[request.language] || 'Best wishes';
  const festivalEmojis = require('./content-enhancer').getFestivalEmojis(request.event);
  const businessEmojis = require('./content-enhancer').getBusinessEmojis(request.business_type);
  
  return `${festivalEmojis[0]} ${greeting}! Special ${request.event} offers at our ${businessEmojis[0]} ${request.business_type}! Visit us today. 📞`;
}

/**
 * Fallback social posts if AI fails
 */
function getFallbackSocialPosts(request, festivalContext) {
  const greeting = festivalContext.cultural_context[request.language] || 'Celebrating';
  const festivalEmojis = require('./content-enhancer').getFestivalEmojis(request.event);
  const businessEmojis = require('./content-enhancer').getBusinessEmojis(request.business_type);
  
  return [
    `${festivalEmojis.slice(0, 2).join('')} ${greeting} ${request.event} with joy and happiness! Visit our ${businessEmojis[0]} ${request.business_type} for special celebrations.`,
    `${festivalEmojis[0]} Special ${request.event} offers now available! Don't miss out on our exclusive deals. #${request.event} #SpecialOffers`
  ];
}

module.exports = {
  generateCampaign
};