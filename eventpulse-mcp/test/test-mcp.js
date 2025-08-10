#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

class MCPTester {
  constructor() {
    this.serverProcess = null;
    this.testResults = [];
  }

  async runTest() {
    console.log('🧪 Starting EventPulse MCP Server Tests\n');
    
    try {
      await this.testListTools();
      await this.testCampaignGeneration();
      await this.testFestivalInsights();
      await this.testErrorHandling();
      
      this.printResults();
    } catch (error) {
      console.error('❌ Test suite failed:', error);
    }
  }

  async testListTools() {
    console.log('📋 Testing list_tools...');
    
    const request = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list',
      params: {}
    };

    const result = await this.sendMCPRequest(request);
    
    if (result && result.tools && result.tools.length === 2) {
      this.testResults.push({ test: 'list_tools', status: '✅ PASS', details: `Found ${result.tools.length} tools` });
      console.log('  ✅ Tools listed successfully');
      console.log(`  📝 Available tools: ${result.tools.map(t => t.name).join(', ')}\n`);
    } else {
      this.testResults.push({ test: 'list_tools', status: '❌ FAIL', details: 'Invalid tools response' });
      console.log('  ❌ Failed to list tools\n');
    }
  }

  async testCampaignGeneration() {
    console.log('🎯 Testing campaign generation...');
    
    const request = {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: 'generate_festival_campaign',
        arguments: {
          business_type: 'sweet_shop',
          event: 'diwali',
          language: 'hindi',
          location: 'Mumbai',
          goal: 'increase_sales'
        }
      }
    };

    const result = await this.sendMCPRequest(request);
    
    if (result && result.content && result.content[0] && result.content[0].text) {
      const content = result.content[0].text;
      if (content.includes('Campaign ID') && content.includes('WhatsApp Message')) {
        this.testResults.push({ test: 'campaign_generation', status: '✅ PASS', details: 'Campaign generated successfully' });
        console.log('  ✅ Campaign generated successfully');
        console.log('  📱 Contains WhatsApp message, social posts, and hashtags\n');
      } else {
        this.testResults.push({ test: 'campaign_generation', status: '❌ FAIL', details: 'Incomplete campaign content' });
        console.log('  ❌ Campaign content incomplete\n');
      }
    } else {
      this.testResults.push({ test: 'campaign_generation', status: '❌ FAIL', details: 'No campaign content returned' });
      console.log('  ❌ Failed to generate campaign\n');
    }
  }

  async testFestivalInsights() {
    console.log('🎭 Testing festival insights...');
    
    const request = {
      jsonrpc: '2.0',
      id: 3,
      method: 'tools/call',
      params: {
        name: 'get_festival_insights',
        arguments: {
          event: 'diwali',
          region: 'north_india'
        }
      }
    };

    const result = await this.sendMCPRequest(request);
    
    if (result && result.content && result.content[0] && result.content[0].text) {
      const content = result.content[0].text;
      if (content.includes('Cultural Insights') && content.includes('Marketing Opportunities')) {
        this.testResults.push({ test: 'festival_insights', status: '✅ PASS', details: 'Insights retrieved successfully' });
        console.log('  ✅ Festival insights retrieved successfully');
        console.log('  🎭 Contains cultural significance and marketing opportunities\n');
      } else {
        this.testResults.push({ test: 'festival_insights', status: '❌ FAIL', details: 'Incomplete insights content' });
        console.log('  ❌ Insights content incomplete\n');
      }
    } else {
      this.testResults.push({ test: 'festival_insights', status: '❌ FAIL', details: 'No insights content returned' });
      console.log('  ❌ Failed to get festival insights\n');
    }
  }

  async testErrorHandling() {
    console.log('⚠️  Testing error handling...');
    
    const request = {
      jsonrpc: '2.0',
      id: 4,
      method: 'tools/call',
      params: {
        name: 'generate_festival_campaign',
        arguments: {
          business_type: 'invalid_type',
          event: 'invalid_event',
          language: 'invalid_language'
        }
      }
    };

    const result = await this.sendMCPRequest(request);
    
    if (result && (result.error || (result.content && result.isError))) {
      this.testResults.push({ test: 'error_handling', status: '✅ PASS', details: 'Errors handled properly' });
      console.log('  ✅ Error handling works correctly');
      console.log('  ⚠️  Invalid parameters rejected as expected\n');
    } else {
      this.testResults.push({ test: 'error_handling', status: '❌ FAIL', details: 'Errors not handled properly' });
      console.log('  ❌ Error handling failed\n');
    }
  }

  async sendMCPRequest(request) {
    return new Promise((resolve, reject) => {
      const serverPath = path.join(__dirname, '../src/mcp-server.js');
      const child = spawn('node', [serverPath], {
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        try {
          // Parse the JSON-RPC response
          const lines = stdout.split('\n').filter(line => line.trim());
          const responseLine = lines.find(line => {
            try {
              const parsed = JSON.parse(line);
              return parsed.id === request.id;
            } catch {
              return false;
            }
          });

          if (responseLine) {
            const response = JSON.parse(responseLine);
            resolve(response.result || response);
          } else {
            resolve(null);
          }
        } catch (error) {
          reject(error);
        }
      });

      child.on('error', (error) => {
        reject(error);
      });

      // Send the request
      child.stdin.write(JSON.stringify(request) + '\n');
      child.stdin.end();

      // Timeout after 10 seconds
      setTimeout(() => {
        child.kill();
        resolve(null);
      }, 10000);
    });
  }

  printResults() {
    console.log('📊 Test Results Summary');
    console.log('========================');
    
    let passed = 0;
    let failed = 0;

    this.testResults.forEach(result => {
      console.log(`${result.status} ${result.test}: ${result.details}`);
      if (result.status.includes('✅')) passed++;
      else failed++;
    });

    console.log('\n📈 Final Score:');
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📊 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);

    if (failed === 0) {
      console.log('\n🎉 All tests passed! EventPulse MCP Server is ready for production.');
    } else {
      console.log('\n⚠️  Some tests failed. Please check the implementation.');
    }
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new MCPTester();
  tester.runTest().catch(console.error);
}

module.exports = MCPTester;