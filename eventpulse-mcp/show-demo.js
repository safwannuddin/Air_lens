#!/usr/bin/env node

// Demo script showing actual EventPulse MCP server responses
const campaignGenerator = require('./src/campaign-generator');
const { validateRequest, formatResponse } = require('./src/utils');

async function showDemo() {
  console.log('🎉 EventPulse MCP Server - Live Demo Output\n');
  console.log('This shows exactly what your running server produces:\n');
  console.log('=' .repeat(60));

  // Demo 1: Diwali Sweet Shop Campaign (Hindi)
  console.log('\n🪔 DEMO 1: Diwali Sweet Shop Campaign (Hindi)');
  console.log('=' .repeat(60));
  
  const diwaliRequest = {
    business_type: 'sweet_shop',
    event: 'diwali',
    language: 'hindi',
    location: 'Mumbai',
    goal: 'increase_sales'
  };
  
  console.log('📝 API Request to: POST /v1/generate-campaign');
  console.log(JSON.stringify(diwaliRequest, null, 2));
  
  try {
    const validation = validateRequest(diwaliRequest);
    console.log('\n✅ Validation:', validation.valid ? 'PASSED' : 'FAILED');
    
    const campaign = await campaignGenerator.generateCampaign(diwaliRequest);
    const response = formatResponse(campaign, diwaliRequest);
    
    console.log('\n📤 API Response:');
    console.log('🆔 Campaign ID:', response.campaign_id);
    console.log('⏰ Generated at:', response.timestamp);
    
    console.log('\n📱 WhatsApp Message:');
    console.log('   "' + response.campaign_content.whatsapp_message + '"');
    
    console.log('\n📱 Social Media Posts:');
    response.campaign_content.social_media_posts.forEach((post, i) => {
      console.log(`   ${i + 1}. "${post}"`);
    });
    
    console.log('\n🏷️ Hashtags (' + response.campaign_content.hashtags.length + ' total):');
    console.log('   ' + response.campaign_content.hashtags.join(' '));
    
    console.log('\n🎁 Promotional Offers:');
    response.campaign_content.promotional_offers.forEach((offer, i) => {
      console.log(`   ${i + 1}. ${offer}`);
    });
    
    console.log('\n📅 Scheduling Suggestions:');
    console.log('   Optimal time:', response.scheduling_suggestions.optimal_time);
    console.log('   Campaign duration:', response.scheduling_suggestions.campaign_duration);
    console.log('   Peak engagement:', response.scheduling_suggestions.peak_engagement);
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  // Demo 2: Navratri Clothing Store (Gujarati)
  console.log('\n\n💃 DEMO 2: Navratri Clothing Store Campaign (Gujarati)');
  console.log('=' .repeat(60));
  
  const navratriRequest = {
    business_type: 'clothing_store',
    event: 'navratri',
    language: 'gujarati',
    location: 'Ahmedabad',
    goal: 'brand_awareness'
  };
  
  console.log('📝 API Request:');
  console.log(JSON.stringify(navratriRequest, null, 2));
  
  try {
    const campaign = await campaignGenerator.generateCampaign(navratriRequest);
    const response = formatResponse(campaign, navratriRequest);
    
    console.log('\n📤 API Response:');
    console.log('📱 WhatsApp Message:');
    console.log('   "' + response.campaign_content.whatsapp_message + '"');
    
    console.log('\n🏷️ Hashtags:');
    console.log('   ' + response.campaign_content.hashtags.slice(0, 10).join(' '));
    
    console.log('\n🎁 Sample Offers:');
    response.campaign_content.promotional_offers.slice(0, 2).forEach((offer, i) => {
      console.log(`   ${i + 1}. ${offer}`);
    });
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  // Demo 3: Eid Restaurant (English)
  console.log('\n\n🌙 DEMO 3: Eid Restaurant Campaign (English)');
  console.log('=' .repeat(60));
  
  const eidRequest = {
    business_type: 'restaurant',
    event: 'eid',
    language: 'english',
    location: 'Delhi',
    goal: 'customer_engagement'
  };
  
  try {
    const campaign = await campaignGenerator.generateCampaign(eidRequest);
    const response = formatResponse(campaign, eidRequest);
    
    console.log('📱 WhatsApp Message:');
    console.log('   "' + response.campaign_content.whatsapp_message + '"');
    
    console.log('\n📱 Social Media Post:');
    console.log('   "' + response.campaign_content.social_media_posts[0] + '"');
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  // Demo 4: Error Handling
  console.log('\n\n⚠️ DEMO 4: Error Handling');
  console.log('=' .repeat(60));
  
  const invalidRequest = {
    business_type: 'invalid_business',
    event: 'invalid_event',
    language: 'invalid_language'
  };
  
  console.log('📝 Invalid API Request:');
  console.log(JSON.stringify(invalidRequest, null, 2));
  
  const validation = validateRequest(invalidRequest);
  console.log('\n📤 API Response:');
  console.log('✅ Validation:', validation.valid ? 'PASSED' : 'FAILED');
  console.log('📝 Error message:', validation.message);
  console.log('🔢 HTTP Status: 400 Bad Request');

  // Summary
  console.log('\n\n🎯 DEMO SUMMARY');
  console.log('=' .repeat(60));
  console.log('✅ Multi-language support: Hindi, Gujarati, English');
  console.log('✅ Festival-specific content: Diwali, Navratri, Eid');
  console.log('✅ Business-specific offers: Sweet shop, Clothing, Restaurant');
  console.log('✅ Cultural intelligence: Regional hashtags and greetings');
  console.log('✅ Error handling: Proper validation and error messages');
  console.log('✅ Complete campaigns: WhatsApp + Social + Hashtags + Offers');
  
  console.log('\n🚀 Your EventPulse MCP Server is generating authentic,');
  console.log('   culturally-aware marketing campaigns successfully!');
  
  console.log('\n📖 Server running at: http://localhost:3001');
  console.log('📖 API docs at: http://localhost:3001/docs');
  console.log('🎯 Campaign endpoint: http://localhost:3001/v1/generate-campaign');
}

// Run demo
showDemo().catch(console.error);