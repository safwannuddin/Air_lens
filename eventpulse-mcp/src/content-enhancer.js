// Content enhancement utilities for EventPulse MCP

/**
 * Enhance WhatsApp message with emojis and formatting
 */
function enhanceWhatsAppMessage(message, eventName, businessType) {
  // Add appropriate emojis based on festival and business
  const festivalEmojis = getFestivalEmojis(eventName);
  const businessEmojis = getBusinessEmojis(businessType);
  
  // Add emojis at strategic positions
  let enhanced = message;
  
  // Add festival emoji at the beginning if not present
  if (!enhanced.includes(festivalEmojis[0])) {
    enhanced = `${festivalEmojis[0]} ${enhanced}`;
  }
  
  // Add business emoji before business mention
  const businessWords = ['shop', 'store', 'restaurant', 'salon', 'center'];
  businessWords.forEach(word => {
    if (enhanced.toLowerCase().includes(word) && !enhanced.includes(businessEmojis[0])) {
      enhanced = enhanced.replace(new RegExp(word, 'gi'), `${businessEmojis[0]} ${word}`);
    }
  });
  
  // Add call-to-action emoji at the end
  if (!enhanced.includes('📞') && !enhanced.includes('📱')) {
    enhanced += ' 📞';
  }
  
  return enhanced;
}

/**
 * Enhance social media post with engagement elements
 */
function enhanceSocialMediaPost(post, eventName, businessType, language) {
  let enhanced = post;
  
  // Add festival emojis
  const festivalEmojis = getFestivalEmojis(eventName);
  if (!enhanced.includes(festivalEmojis[0])) {
    enhanced = `${festivalEmojis.slice(0, 2).join('')} ${enhanced}`;
  }
  
  // Add call-to-action based on language
  const callToActions = {
    'hindi': ['आज ही आएं!', 'संपर्क करें!', 'अभी खरीदें!'],
    'gujarati': ['આજે જ આવો!', 'સંપર્ક કરો!', 'હવે ખરીદો!'],
    'english': ['Visit today!', 'Contact us now!', 'Shop now!'],
    'tamil': ['இன்றே வாருங்கள்!', 'தொடர்பு கொள்ளுங்கள்!', 'இப்போதே வாங்குங்கள்!'],
    'bengali': ['আজই আসুন!', 'যোগাযোগ করুন!', 'এখনই কিনুন!'],
    'marathi': ['आजच या!', 'संपर्क साधा!', 'आत्ताच खरेदी करा!']
  };
  
  const cta = callToActions[language] || callToActions['english'];
  const randomCTA = cta[Math.floor(Math.random() * cta.length)];
  
  if (!enhanced.includes('!')) {
    enhanced += ` ${randomCTA}`;
  }
  
  return enhanced;
}

/**
 * Get festival-specific emojis
 */
function getFestivalEmojis(eventName) {
  const emojiMap = {
    'diwali': ['🪔', '✨', '🎆', '🏮', '💫'],
    'holi': ['🎨', '🌈', '💐', '🎊', '🎉'],
    'eid': ['🌙', '⭐', '🕌', '🎁', '🤲'],
    'navratri': ['💃', '🥁', '🎵', '🌺', '🎭'],
    'raksha_bandhan': ['👫', '🎀', '💝', '🤗', '❤️'],
    'ganesh_chaturthi': ['🐘', '🙏', '🌺', '🎊', '✨'],
    'karva_chauth': ['🌙', '💍', '👰', '💕', '🪔'],
    'christmas': ['🎄', '🎅', '🎁', '⭐', '❄️']
  };
  
  return emojiMap[eventName.toLowerCase()] || ['🎉', '✨', '🎊'];
}

/**
 * Get business-specific emojis
 */
function getBusinessEmojis(businessType) {
  const emojiMap = {
    'sweet_shop': ['🍬', '🧁', '🍯', '🎂'],
    'clothing_store': ['👗', '👔', '👘', '🛍️'],
    'restaurant': ['🍽️', '🍛', '🥘', '👨‍🍳'],
    'jewelry_shop': ['💍', '💎', '👑', '✨'],
    'electronics': ['📱', '💻', '🔌', '⚡'],
    'beauty_salon': ['💄', '💅', '✂️', '🪞'],
    'flower_shop': ['🌸', '🌺', '🌹', '💐'],
    'gift_shop': ['🎁', '🛍️', '🎀', '💝']
  };
  
  return emojiMap[businessType.toLowerCase().replace(/\s+/g, '_')] || ['🏪', '🛒', '💼'];
}

/**
 * Add cultural context to content
 */
function addCulturalContext(content, eventName, language, location) {
  // Add regional variations
  const regionalContext = getRegionalContext(location, eventName);
  const culturalGreeting = getCulturalGreeting(eventName, language);
  
  // Enhance content with cultural elements
  let enhanced = content;
  
  // Add regional context if applicable
  if (regionalContext && !enhanced.toLowerCase().includes(regionalContext.toLowerCase())) {
    enhanced = enhanced.replace(eventName, `${eventName} ${regionalContext}`);
  }
  
  return enhanced;
}

/**
 * Get regional context for festivals
 */
function getRegionalContext(location, eventName) {
  const regionalMap = {
    'mumbai': {
      'ganesh_chaturthi': 'Bappa Morya',
      'navratri': 'Garba Nights'
    },
    'ahmedabad': {
      'navratri': 'Garba Capital',
      'diwali': 'Business City Celebration'
    },
    'delhi': {
      'diwali': 'Capital Celebration',
      'holi': 'Colors of Delhi'
    }
  };
  
  const locationKey = location?.toLowerCase();
  return regionalMap[locationKey]?.[eventName.toLowerCase()] || '';
}

/**
 * Get cultural greeting based on festival and language
 */
function getCulturalGreeting(eventName, language) {
  const greetings = {
    'diwali': {
      'hindi': 'दीपावली की हार्दिक शुभकामनाएं',
      'gujarati': 'દિવાળીની હાર્દિક શુભકામનાઓ',
      'english': 'Warm Diwali Wishes'
    },
    'holi': {
      'hindi': 'होली की रंगभरी शुभकामनाएं',
      'gujarati': 'હોળીની રંગભરી શુભકામનાઓ',
      'english': 'Colorful Holi Wishes'
    }
  };
  
  return greetings[eventName.toLowerCase()]?.[language] || '';
}

/**
 * Optimize content length for platform
 */
function optimizeContentLength(content, platform, maxLength) {
  if (content.length <= maxLength) return content;
  
  // Smart truncation preserving important elements
  const sentences = content.split(/[.!?]+/);
  let optimized = '';
  
  for (const sentence of sentences) {
    if ((optimized + sentence).length <= maxLength - 3) {
      optimized += sentence + (sentence.includes('?') ? '?' : '.');
    } else {
      break;
    }
  }
  
  return optimized || content.substring(0, maxLength - 3) + '...';
}

module.exports = {
  enhanceWhatsAppMessage,
  enhanceSocialMediaPost,
  addCulturalContext,
  optimizeContentLength,
  getFestivalEmojis,
  getBusinessEmojis
};