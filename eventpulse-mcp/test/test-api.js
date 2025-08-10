// Simple test script for EventPulse MCP API
const axios = require('axios');

const BASE_URL = process.env.API_URL || 'http://localhost:3000';

// Test data
const testRequests = [
  {
    name: 'Diwali Sweet Shop (Hindi)',
    data: {
      business_type: 'sweet shop',
      event: 'diwali',
      language: 'hindi',
      location: 'Mumbai',
      goal: 'increase sales'
    }
  },
  {
    name: 'Navratri Clothing Store (Gujarati)',
    data: {
      business_type: 'clothing store',
      event: 'navratri',
      language: 'gujarati',
      location: 'Ahmedabad',
      goal: 'brand awareness'
    }
  },
  {
    name: 'Eid Restaurant (English)',
    data: {
      business_type: 'restaurant',
      event: 'eid',
      language: 'english',
      location: 'Delhi',
      goal: 'customer engagement'
    }
  }
];

async function runTests() {
  console.log('🧪 Starting EventPulse MCP API Tests\n');
  
  // Test health endpoint
  try {
    console.log('📋 Testing health endpoint...');
    const healthResponse = await axios.get(`${BASE_URL}/`);
    console.log('✅ Health check passed:', healthResponse.data.name);
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return;
  }
  
  // Test campaign generation
  for (const test of testRequests) {
    console.log(`\n🎯 Testing: ${test.name}`);
    console.log('Request:', JSON.stringify(test.data, null, 2));
    
    try {
      const startTime = Date.now();
      const response = await axios.post(`${BASE_URL}/v1/generate-campaign`, test.data);
      const endTime = Date.now();
      
      console.log('✅ Campaign generated successfully');
      console.log(`⏱️  Processing time: ${endTime - startTime}ms`);
      console.log('📝 WhatsApp Message:', response.data.campaign_content.whatsapp_message);
      console.log('📱 Social Posts:', response.data.campaign_content.social_media_posts.length, 'posts');
      console.log('🏷️  Hashtags:', response.data.campaign_content.hashtags.join(', '));
      console.log('🎁 Offers:', response.data.campaign_content.promotional_offers.length, 'offers');
      
    } catch (error) {
      console.error('❌ Test failed:', error.response?.data || error.message);
    }
  }
  
  // Test error handling
  console.log('\n🚨 Testing error handling...');
  try {
    await axios.post(`${BASE_URL}/v1/generate-campaign`, {
      business_type: 'invalid',
      // Missing required fields
    });
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('✅ Error handling works correctly');
    } else {
      console.error('❌ Unexpected error response:', error.response?.status);
    }
  }
  
  console.log('\n🎉 Tests completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests };