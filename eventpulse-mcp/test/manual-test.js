#!/usr/bin/env node

const campaignGenerator = require('../src/campaign-generator');
const { validateRequest } = require('../src/utils');

async function runManualTests() {
  console.log('🧪 EventPulse MCP Manual Tests\n');

  // Test 1: Campaign Generation
  console.log('🎯 Test 1: Campaign Generation');
  console.log('================================');
  
  const testRequest = {
    business_type: 'sweet_shop',
    event: 'diwali',
    language: 'hindi',
    location: 'Mumbai',
    goal: 'increase_sales'
  };

  console.log('📝 Request:', JSON.stringify(testRequest, null, 2));
  
  try {
    const validation = validateRequest(testRequest);
    console.log('✅ Validation:', validation.valid ? 'PASSED' : 'FAILED');
    
    if (validation.valid) {
      const campaign = await campaignGenerator.generateCampaign(testRequest);
      console.log('✅ Campaign Generated Successfully!');
      console.log('\n📱 WhatsApp Message:');
      console.log(campaign.whatsapp_message);
      console.log('\n📱 Social Media Posts:');
      campaign.social_media_posts.forEach((post, i) => {
        console.log(`${i + 1}. ${post}`);
      });
      console.log('\n🏷️ Hashtags:', campaign.hashtags.join(' '));
      console.log('\n🎁 Offers:', campaign.promotional_offers.join(', '));
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 2: Different Language
  console.log('🎯 Test 2: Gujarati Campaign');
  console.log('=============================');
  
  const gujaratiRequest = {
    business_type: 'clothing_store',
    event: 'navratri',
    language: 'gujarati',
    location: 'Ahmedabad',
    goal: 'brand_awareness'
  };

  console.log('📝 Request:', JSON.stringify(gujaratiRequest, null, 2));
  
  try {
    const campaign = await campaignGenerator.generateCampaign(gujaratiRequest);
    console.log('✅ Gujarati Campaign Generated!');
    console.log('\n📱 WhatsApp Message:');
    console.log(campaign.whatsapp_message);
    console.log('\n🏷️ Hashtags:', campaign.hashtags.join(' '));
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 3: Error Handling
  console.log('🎯 Test 3: Error Handling');
  console.log('=========================');
  
  const invalidRequest = {
    business_type: 'invalid_type',
    event: 'invalid_event',
    language: 'invalid_language'
  };

  console.log('📝 Invalid Request:', JSON.stringify(invalidRequest, null, 2));
  
  const validation = validateRequest(invalidRequest);
  console.log('✅ Validation Result:', validation.valid ? 'PASSED (unexpected)' : 'FAILED (expected)');
  console.log('📝 Validation Message:', validation.message);

  console.log('\n🎉 Manual tests completed!');
}

// Run tests
runManualTests().catch(console.error);