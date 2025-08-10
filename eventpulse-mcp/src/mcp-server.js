#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { SSEServerTransport } = require('@modelcontextprotocol/sdk/server/sse.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');
const express = require('express');
const cors = require('cors');

const campaignGenerator = require('./campaign-generator');
const { validateRequest } = require('./utils');

class EventPulseMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'eventpulse-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'generate_festival_campaign',
            description: 'Generate hyper-local marketing campaigns for festivals and events',
            inputSchema: {
              type: 'object',
              properties: {
                business_type: {
                  type: 'string',
                  description: 'Type of business (e.g., sweet shop, clothing store, restaurant)',
                  enum: ['sweet_shop', 'clothing_store', 'restaurant', 'jewelry_shop', 'electronics', 'beauty_salon', 'flower_shop', 'gift_shop']
                },
                event: {
                  type: 'string',
                  description: 'Festival or event name',
                  enum: ['diwali', 'holi', 'eid', 'navratri', 'raksha_bandhan', 'ganesh_chaturthi', 'karva_chauth', 'christmas']
                },
                language: {
                  type: 'string',
                  description: 'Language for campaign content',
                  enum: ['hindi', 'gujarati', 'english', 'tamil', 'bengali', 'marathi']
                },
                location: {
                  type: 'string',
                  description: 'Business location (optional)',
                  default: 'Mumbai'
                },
                goal: {
                  type: 'string',
                  description: 'Marketing goal (optional)',
                  enum: ['increase_sales', 'brand_awareness', 'customer_engagement'],
                  default: 'increase_sales'
                },
                budget: {
                  type: 'string',
                  description: 'Marketing budget level (optional)',
                  enum: ['low', 'medium', 'high'],
                  default: 'medium'
                }
              },
              required: ['business_type', 'event', 'language']
            }
          },
          {
            name: 'get_festival_insights',
            description: 'Get cultural insights and best practices for festival marketing',
            inputSchema: {
              type: 'object',
              properties: {
                event: {
                  type: 'string',
                  description: 'Festival or event name',
                  enum: ['diwali', 'holi', 'eid', 'navratri', 'raksha_bandhan', 'ganesh_chaturthi', 'karva_chauth', 'christmas']
                },
                region: {
                  type: 'string',
                  description: 'Region for cultural context (optional)',
                  default: 'north_india'
                }
              },
              required: ['event']
            }
          },
          {
            name: 'validate',
            description: 'Validate and return user number in country code format for hackathon submission',
            inputSchema: {
              type: 'object',
              properties: {
                number: {
                  type: 'string',
                  description: 'User phone number'
                },
                country_code: {
                  type: 'string',
                  description: 'Country code (e.g., +91 for India)',
                  default: '+91'
                }
              },
              required: []
            }
          }
        ]
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'generate_festival_campaign':
            return await this.handleCampaignGeneration(args);
          
          case 'get_festival_insights':
            return await this.handleFestivalInsights(args);
          
          case 'validate':
            return await this.handleValidate(args);
          
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`
            }
          ],
          isError: true
        };
      }
    });
  }

  async handleCampaignGeneration(args) {
    console.log('🎯 Generating campaign with args:', args);
    
    // Validate request
    const validation = validateRequest(args);
    if (!validation.valid) {
      throw new Error(`Invalid request: ${validation.message}`);
    }

    // Generate campaign
    const campaign = await campaignGenerator.generateCampaign(args);
    
    // Format response for MCP
    const response = {
      campaign_id: campaign.campaign_id,
      business_type: args.business_type,
      event: args.event,
      language: args.language,
      location: args.location || 'Mumbai',
      whatsapp_message: campaign.whatsapp_message,
      social_media_posts: campaign.social_media_posts,
      hashtags: campaign.hashtags,
      promotional_offers: campaign.promotional_offers,
      scheduling_suggestions: campaign.scheduling_suggestions,
      cultural_insights: campaign.cultural_insights,
      generated_at: new Date().toISOString()
    };

    return {
      content: [
        {
          type: 'text',
          text: `# 🎉 Festival Marketing Campaign Generated

## Campaign Details
- **Campaign ID**: ${response.campaign_id}
- **Business**: ${args.business_type}
- **Event**: ${args.event}
- **Language**: ${args.language}
- **Location**: ${response.location}

## 📱 WhatsApp Message
${response.whatsapp_message}

## 📱 Social Media Posts
${response.social_media_posts.map((post, i) => `**Post ${i + 1}**: ${post}`).join('\n\n')}

## 🏷️ Hashtags
${response.hashtags.join(' ')}

## 🎁 Promotional Offers
${response.promotional_offers.map((offer, i) => `${i + 1}. ${offer}`).join('\n')}

## 📅 Scheduling Suggestions
- **Best posting times**: ${response.scheduling_suggestions.best_times.join(', ')}
- **Campaign duration**: ${response.scheduling_suggestions.duration}
- **Peak engagement**: ${response.scheduling_suggestions.peak_days.join(', ')}

## 🎭 Cultural Insights
${response.cultural_insights}

---
*Generated by EventPulse MCP at ${response.generated_at}*`
        }
      ]
    };
  }

  async handleFestivalInsights(args) {
    const { event, region = 'north_india' } = args;
    
    // Load festival data
    const festivals = require('../data/festivals.json');
    const festivalData = festivals.find(f => f.name.toLowerCase() === event.toLowerCase());
    
    if (!festivalData) {
      throw new Error(`Festival data not found for: ${event}`);
    }

    const insights = `# 🎭 ${festivalData.name} Cultural Insights

## Festival Overview
${festivalData.description}

## Cultural Significance
${festivalData.cultural_significance}

## Marketing Opportunities
${festivalData.marketing_opportunities.map((opp, i) => `${i + 1}. ${opp}`).join('\n')}

## Regional Variations (${region})
${festivalData.regional_variations[region] || 'Standard celebrations across the region'}

## Best Practices
- Start campaigns ${festivalData.campaign_timing.start} before the festival
- Peak engagement during ${festivalData.campaign_timing.peak}
- Focus on ${festivalData.key_themes.join(', ')} themes
- Use colors: ${festivalData.colors.join(', ')}

## Traditional Elements to Include
${festivalData.traditional_elements.map((element, i) => `• ${element}`).join('\n')}`;

    return {
      content: [
        {
          type: 'text',
          text: insights
        }
      ]
    };
  }

  async handleValidate(args) {
    // This is the required validate tool for hackathon submission
    // Returns user number in {country_code}{number} format
    const { number = '', country_code = '+91' } = args;
    
    // For hackathon submission - you can customize this with your actual number
    const userNumber = number || '1234567890'; // Replace with your actual number
    const formattedNumber = `${country_code}${userNumber}`;
    
    return {
      content: [
        {
          type: 'text',
          text: `Validated number: ${formattedNumber}`
        }
      ]
    };
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  async run() {
    const app = express();
    app.use(cors());
    app.use(express.json());

    // Health check endpoint
    app.get('/', (req, res) => {
      res.json({
        name: 'EventPulse MCP Server',
        version: '1.0.0',
        status: 'running',
        description: 'Hyper-local event-driven marketing campaigns for small businesses',
        mcp_endpoint: '/sse',
        tools: ['generate_festival_campaign', 'get_festival_insights', 'validate']
      });
    });

    // MCP SSE endpoint - This is the streamable HTTP transport
    app.get('/sse', async (req, res) => {
      console.log('🔗 New MCP SSE connection established');
      
      // Set up SSE headers
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control'
      });

      const transport = new SSEServerTransport('/sse', res);
      await this.server.connect(transport);
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 EventPulse MCP Server running on port ${port}`);
      console.log(`📡 MCP SSE endpoint: http://localhost:${port}/sse`);
      console.log(`🏥 Health check: http://localhost:${port}/`);
    });
  }
}

// Run the server
if (require.main === module) {
  const server = new EventPulseMCPServer();
  server.run().catch(console.error);
}

module.exports = EventPulseMCPServer;