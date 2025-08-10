#!/usr/bin/env node

const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function runDemo() {
  console.log('🎉 EventPulse MCP Server Live Demo\n');
  console.log('Server URL:', BASE_URL);
  console.log('=' .repeat(50));

  try {
    // Demo 1: Health Check
    console.log('\n🏥 Demo 1: Health Check');
    console.log('-'.repeat(30));
    const health = await axios.get(`${BASE_URL}/`);
    console.log('✅ Server Status:', health.data.status);
    console.log('📝 Server Name:', health.data.name);
    console.log('🔢 Version:', health.data.version);

    // Demo 2: Diwali Sweet Shop Campaign (Hindi)
    console.log('\n🪔 Demo 2: Diwali Sweet Shop Campaign (Hindi)');
    console.log('-'.repeat(50));
    const diwaliRequest = {
      business_type: 'sweet_shop',
      event: 'diwali',
      language: 'hindi',
      location: 'Mumbai',
      goal: 'increase_sales'
    };
    
    console.log('📝 Request:', JSON.stringify(diwaliRequest, null, 2));
    const diwaliResponse = await axios.post(`${BASE_URL}/v1/generate-campaign`, diwaliRequest);
    
    console.log('\n✅ Campaign Generated Successfully!');
    console.log('🆔 Campaign ID:', diwaliResponse.data.campaign_id);
    console.log('\n📱 WhatsApp Message:');
    console.log('   ', diwaliResponse.data.campaign_content.whatsapp_message);
    console.log('\n📱 Social Media Posts:');
    diwaliResponse.data.campaign_content.social_media_posts.forEach((post, i) => {
      console.log(`   ${i + 1}. ${post}`);
    });
    console.log('\n🏷️ Hashtags:');
    console.log('   ', diwaliResponse.data.campaign_content.hashtags.join(' '));
    console.log('\n🎁 Promotional Offers:');
    diwaliResponse.data.campaign_content.promotional_offers.forEach((offer, i) => {
      console.log(`   ${i + 1}. ${offer}`);
    });

    // Demo 3: Navratri Clothing Store Campaign (Gujarati)
    console.log('\n💃 Demo 3: Navratri Clothing Store Campaign (Gujarati)');
    console.log('-'.repeat(55));
    const navratriRequest = {
      business_type: 'clothing_store',
      event: 'navratri',
      language: 'gujarati',
      location: 'Ahmedabad',
      goal: 'brand_awareness'
    };
    
    console.log('📝 Request:', JSON.stringify(navratriRequest, null, 2));
    const navratriResponse = await axios.post(`${BASE_URL}/v1/generate-campaign`, navratriRequest);
    
    console.log('\n✅ Gujarati Campaign Generated!');
    console.log('📱 WhatsApp Message:');
    console.log('   ', navratriResponse.data.campaign_content.whatsapp_message);
    console.log('\n🏷️ Hashtags:');
    console.log('   ', navratriResponse.data.campaign_content.hashtags.slice(0, 8).join(' '));

    // Demo 4: Eid Restaurant Campaign (English)
    console.log('\n🌙 Demo 4: Eid Restaurant Campaign (English)');
    console.log('-'.repeat(45));
    const eidRequest = {
      business_type: 'restaurant',
      event: 'eid',
      language: 'english',
      location: 'Delhi',
      goal: 'customer_engagement'
    };
    
    const eidResponse = await axios.post(`${BASE_URL}/v1/generate-campaign`, eidRequest);
    console.log('✅ English Campaign Generated!');
    console.log('📱 WhatsApp Message:');
    console.log('   ', eidResponse.data.campaign_content.whatsapp_message);

    // Demo 5: Error Handling
    console.log('\n⚠️ Demo 5: Error Handling');
    console.log('-'.repeat(30));
    try {
      await axios.post(`${BASE_URL}/v1/generate-campaign`, {
        business_type: 'invalid_business',
        event: 'invalid_event',
        language: 'invalid_language'
      });
    } catch (error) {
      console.log('✅ Error handling works correctly!');
      console.log('📝 Error message:', error.response.data.message);
    }

    // Demo 6: API Documentation
    console.log('\n📖 Demo 6: API Documentation');
    console.log('-'.repeat(35));
    const docs = await axios.get(`${BASE_URL}/docs`);
    console.log('✅ Documentation available');
    console.log('📝 Title:', docs.data.title);
    console.log('🔢 Supported languages:', docs.data.endpoints['POST /v1/generate-campaign'].supported_languages.length);
    console.log('🎊 Supported events:', docs.data.endpoints['POST /v1/generate-campaign'].supported_events.length);

    console.log('\n' + '='.repeat(50));
    console.log('🎉 Demo completed successfully!');
    console.log('🚀 Your EventPulse MCP Server is working perfectly!');
    console.log('📖 Visit http://localhost:3001/docs for full API documentation');

  } catch (error) {
    console.error('❌ Demo failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure the server is running with: npm start');
    }
  }
}

// Run demo
runDemo().catch(console.error);