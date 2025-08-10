const express = require('express');
const cors = require('cors');
require('dotenv').config();

const campaignGenerator = require('./campaign-generator');
const { validateRequest, formatResponse } = require('./utils');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'EventPulse MCP Server',
    version: '1.0.0',
    status: 'running',
    description: 'Hyper-local event-driven marketing campaigns for small businesses',
    endpoints: {
      campaign: '/v1/generate-campaign',
      health: '/',
      docs: '/docs'
    }
  });
});

// Main MCP endpoint for campaign generation
app.post('/v1/generate-campaign', async (req, res) => {
  try {
    console.log('📥 Campaign request received:', req.body);
    
    // Validate request
    const validation = validateRequest(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        error: 'Invalid request',
        message: validation.message,
        required_fields: ['business_type', 'event', 'language'],
        supported_languages: ['hindi', 'gujarati', 'english', 'tamil', 'bengali', 'marathi'],
        supported_events: ['diwali', 'holi', 'eid', 'navratri', 'raksha_bandhan', 'ganesh_chaturthi', 'karva_chauth', 'christmas']
      });
    }

    // Generate campaign
    const campaign = await campaignGenerator.generateCampaign(req.body);
    
    // Format response for Push AI
    const response = formatResponse(campaign, req.body);
    
    console.log('✅ Campaign generated successfully');
    res.json(response);
    
  } catch (error) {
    console.error('❌ Campaign generation error:', error);
    res.status(500).json({
      error: 'Campaign generation failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Documentation endpoint
app.get('/docs', (req, res) => {
  res.json({
    title: 'EventPulse MCP API Documentation',
    version: '1.0.0',
    endpoints: {
      'POST /v1/generate-campaign': {
        description: 'Generate hyper-local marketing campaign',
        required_params: {
          business_type: 'string (e.g., "sweet shop", "clothing store")',
          event: 'string (e.g., "Diwali", "Eid", "Christmas")',
          language: 'string (e.g., "hindi", "gujarati", "english")'
        },
        optional_params: {
          location: 'string (e.g., "Mumbai", "Delhi", "Ahmedabad")',
          goal: 'string (e.g., "increase sales", "brand awareness", "customer engagement")',
          budget: 'string (e.g., "low", "medium", "high")'
        },
        supported_languages: ['hindi', 'gujarati', 'english', 'tamil', 'bengali', 'marathi'],
        supported_events: ['diwali', 'holi', 'eid', 'navratri', 'raksha_bandhan', 'ganesh_chaturthi', 'karva_chauth', 'christmas'],
        supported_business_types: ['sweet_shop', 'clothing_store', 'restaurant', 'jewelry_shop', 'electronics', 'beauty_salon', 'flower_shop', 'gift_shop'],
        response_format: {
          campaign_id: 'string',
          whatsapp_message: 'string',
          social_media_posts: 'array',
          hashtags: 'array',
          promotional_offers: 'array',
          scheduling_suggestions: 'object'
        }
      }
    },
    example_requests: [
      {
        business_type: 'sweet shop',
        event: 'diwali',
        language: 'hindi',
        location: 'Mumbai',
        goal: 'increase sales'
      },
      {
        business_type: 'clothing store',
        event: 'navratri',
        language: 'gujarati',
        location: 'Ahmedabad',
        goal: 'brand awareness'
      },
      {
        business_type: 'restaurant',
        event: 'eid',
        language: 'english',
        location: 'Delhi',
        goal: 'customer engagement'
      }
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 EventPulse MCP Server running on port ${PORT}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}/docs`);
  console.log(`🎯 Campaign Endpoint: http://localhost:${PORT}/v1/generate-campaign`);
});

module.exports = app;