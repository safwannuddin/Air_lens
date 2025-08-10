#!/usr/bin/env node

const { spawn } = require('child_process');
const axios = require('axios');
const path = require('path');

class ServerTester {
  constructor() {
    this.serverProcess = null;
    this.baseUrl = 'http://localhost:3001'; // Use different port to avoid conflicts
  }

  async runTests() {
    console.log('🧪 Starting EventPulse Server Tests\n');
    
    try {
      await this.startServer();
      await this.waitForServer();
      await this.runAPITests();
    } catch (error) {
      console.error('❌ Test suite failed:', error.message);
    } finally {
      await this.stopServer();
    }
  }

  async startServer() {
    console.log('🚀 Starting EventPulse server...');
    
    const serverPath = path.join(__dirname, '../src/server.js');
    this.serverProcess = spawn('node', [serverPath], {
      env: { ...process.env, PORT: '3001' },
      stdio: ['pipe', 'pipe', 'pipe']
    });

    this.serverProcess.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('EventPulse MCP Server running')) {
        console.log('✅ Server started successfully');
      }
    });

    this.serverProcess.stderr.on('data', (data) => {
      console.error('Server error:', data.toString());
    });

    // Wait a bit for server to start
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  async waitForServer() {
    console.log('⏳ Waiting for server to be ready...');
    
    for (let i = 0; i < 10; i++) {
      try {
        await axios.get(`${this.baseUrl}/`);
        console.log('✅ Server is ready');
        return;
      } catch (error) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    throw new Error('Server failed to start within timeout');
  }

  async runAPITests() {
    console.log('📋 Running API tests...\n');

    // Test 1: Health check
    await this.testHealthCheck();
    
    // Test 2: Campaign generation
    await this.testCampaignGeneration();
    
    // Test 3: Error handling
    await this.testErrorHandling();
    
    // Test 4: Documentation
    await this.testDocumentation();
  }

  async testHealthCheck() {
    console.log('🏥 Testing health endpoint...');
    
    try {
      const response = await axios.get(`${this.baseUrl}/`);
      
      if (response.data.name === 'EventPulse MCP Server') {
        console.log('  ✅ Health check passed');
        console.log(`  📝 Server: ${response.data.name} v${response.data.version}\n`);
      } else {
        console.log('  ❌ Health check failed - invalid response\n');
      }
    } catch (error) {
      console.log('  ❌ Health check failed:', error.message, '\n');
    }
  }

  async testCampaignGeneration() {
    console.log('🎯 Testing campaign generation...');
    
    const testRequest = {
      business_type: 'sweet_shop',
      event: 'diwali',
      language: 'hindi',
      location: 'Mumbai',
      goal: 'increase_sales'
    };

    try {
      const startTime = Date.now();
      const response = await axios.post(`${this.baseUrl}/v1/generate-campaign`, testRequest);
      const endTime = Date.now();
      
      if (response.data.campaign_content) {
        console.log('  ✅ Campaign generated successfully');
        console.log(`  ⏱️  Processing time: ${endTime - startTime}ms`);
        console.log(`  📱 WhatsApp: ${response.data.campaign_content.whatsapp_message.substring(0, 50)}...`);
        console.log(`  📱 Social posts: ${response.data.campaign_content.social_media_posts.length} posts`);
        console.log(`  🏷️  Hashtags: ${response.data.campaign_content.hashtags.length} hashtags`);
        console.log(`  🎁 Offers: ${response.data.campaign_content.promotional_offers.length} offers\n`);
      } else {
        console.log('  ❌ Campaign generation failed - no content returned\n');
      }
    } catch (error) {
      console.log('  ❌ Campaign generation failed:', error.response?.data?.message || error.message, '\n');
    }
  }

  async testErrorHandling() {
    console.log('⚠️  Testing error handling...');
    
    const invalidRequest = {
      business_type: 'invalid_type',
      event: 'invalid_event',
      language: 'invalid_language'
    };

    try {
      await axios.post(`${this.baseUrl}/v1/generate-campaign`, invalidRequest);
      console.log('  ❌ Error handling failed - should have returned error\n');
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('  ✅ Error handling works correctly');
        console.log(`  📝 Error message: ${error.response.data.message}\n`);
      } else {
        console.log('  ❌ Unexpected error response:', error.response?.status, '\n');
      }
    }
  }

  async testDocumentation() {
    console.log('📖 Testing documentation endpoint...');
    
    try {
      const response = await axios.get(`${this.baseUrl}/docs`);
      
      if (response.data.title && response.data.endpoints) {
        console.log('  ✅ Documentation endpoint works');
        console.log(`  📝 Title: ${response.data.title}`);
        console.log(`  📋 Endpoints: ${Object.keys(response.data.endpoints).length} documented\n`);
      } else {
        console.log('  ❌ Documentation endpoint failed - invalid response\n');
      }
    } catch (error) {
      console.log('  ❌ Documentation endpoint failed:', error.message, '\n');
    }
  }

  async stopServer() {
    if (this.serverProcess) {
      console.log('🛑 Stopping server...');
      this.serverProcess.kill();
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('✅ Server stopped');
    }
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new ServerTester();
  tester.runTests().catch(console.error);
}

module.exports = ServerTester;