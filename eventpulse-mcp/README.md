# EventPulse MCP Server

🎉 **Hyper-local event-driven marketing campaigns for small businesses using AI**

EventPulse is a Model Context Protocol (MCP) server that generates culturally-aware marketing campaigns for festivals and events. Perfect for small businesses looking to engage their local communities with authentic, multilingual content.

## 🚀 Features

- **🌍 Multi-language Support**: Generate campaigns in Hindi, Gujarati, English, Tamil, Bengali, and Marathi
- **🎭 Cultural Intelligence**: Leverages regional insights and cultural nuances
- **🎊 Festival-Specific Content**: Optimized for Indian festivals and celebrations
- **🏪 Business-Specific Offers**: Tailored promotional content for different business types
- **📱 Social Media Ready**: Content optimized for WhatsApp, Instagram, Facebook, and Twitter
- **⚡ Real-time Generation**: Fast AI-powered campaign creation
- **🔧 MCP Compatible**: Works with any MCP-compatible client (Claude, etc.)

## 🎊 Supported Festivals

- 🪔 Diwali
- 🌈 Holi
- 🌙 Eid
- 💃 Navratri
- 🎗️ Raksha Bandhan
- 🐘 Ganesh Chaturthi
- 👫 Karva Chauth
- 🎄 Christmas

## 🏪 Supported Business Types

- 🍬 Sweet Shops
- 👗 Clothing Stores
- 🍽️ Restaurants
- 💎 Jewelry Shops
- 📱 Electronics Stores
- 💄 Beauty Salons
- 🌸 Flower Shops
- 🎁 Gift Shops

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key (optional - works with mock data for testing)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eventpulse-mcp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your OpenAI API key (optional)
   ```

4. **Test the installation**
   ```bash
   npm run test:manual
   ```

## 🔧 Usage

### As MCP Server

1. **Start the MCP server**
   ```bash
   npm run mcp
   ```

2. **Configure in your MCP client** (e.g., Claude Desktop)
   ```json
   {
     "mcpServers": {
       "eventpulse": {
         "command": "node",
         "args": ["path/to/eventpulse-mcp/src/mcp-server.js"],
         "env": {
           "OPENAI_API_KEY": "your-key-here"
         }
       }
     }
   }
   ```

### As REST API Server

1. **Start the API server**
   ```bash
   npm start
   ```

2. **Make requests to the API**
   ```bash
   curl -X POST http://localhost:3000/v1/generate-campaign \
     -H "Content-Type: application/json" \
     -d '{
       "business_type": "sweet_shop",
       "event": "diwali",
       "language": "hindi",
       "location": "Mumbai",
       "goal": "increase_sales"
     }'
   ```

## 🛠️ MCP Tools

### `generate_festival_campaign`

Generate a complete marketing campaign for a festival.

**Parameters:**
- `business_type` (required): Type of business
- `event` (required): Festival or event name
- `language` (required): Content language
- `location` (optional): Business location
- `goal` (optional): Marketing objective
- `budget` (optional): Budget level

**Example:**
```json
{
  "business_type": "sweet_shop",
  "event": "diwali",
  "language": "hindi",
  "location": "Mumbai",
  "goal": "increase_sales"
}
```

### `get_festival_insights`

Get cultural insights and best practices for festival marketing.

**Parameters:**
- `event` (required): Festival name
- `region` (optional): Regional context

## 📊 API Endpoints

### `GET /`
Health check and server information

### `POST /v1/generate-campaign`
Generate marketing campaign

### `GET /docs`
API documentation

### Example Response
```json
{
  "campaign_id": "ep_1704123456_abc123def",
  "timestamp": "2024-01-01T10:00:00.000Z",
  "campaign_content": {
    "whatsapp_message": "🪔 दीपावली की शुभकामनाएं! Special Diwali offers at our sweet shop! 🍬✨",
    "social_media_posts": [
      "🪔✨ Celebrating the Festival of Lights with traditional sweets and joy! Visit us for authentic Diwali treats. #Diwali #TraditionalSweets",
      "🎊 Special Diwali collection now available! Don't miss our exclusive festive offers. #DiwaliOffers #SweetTreats"
    ],
    "hashtags": ["#Diwali", "#FestivalOfLights", "#TraditionalSweets", "#Mumbai"],
    "promotional_offers": [
      "Special Diwali collection: traditional sweets",
      "Buy 2 get 1 free on selected items",
      "Free gift wrapping with festive packaging"
    ]
  },
  "scheduling_suggestions": {
    "optimal_time": "10:00 AM",
    "campaign_duration": "5-7 days before festival",
    "peak_engagement": "morning and evening hours"
  }
}
```

## 🧪 Testing

```bash
# Run all tests
npm run test:all

# Test core functionality
npm run test:manual

# Test API server
npm test

# Test MCP functionality
npm run test:mcp
```

## 🔧 Development

### Project Structure
```
eventpulse-mcp/
├── src/
│   ├── server.js          # REST API server
│   ├── mcp-server.js      # MCP protocol server
│   ├── campaign-generator.js # Core campaign logic
│   ├── content-enhancer.js   # Content enhancement
│   └── utils.js           # Utility functions
├── data/
│   ├── festivals.json     # Festival data
│   ├── templates.json     # Content templates
│   └── regional-hashtags.json # Hashtag data
├── test/
│   ├── test-manual.js     # Manual functionality tests
│   ├── test-server.js     # API server tests
│   └── test-mcp-simple.js # MCP functionality tests
└── package.json
```

### Adding New Festivals

1. Add festival data to `data/festivals.json`
2. Add templates to `data/templates.json`
3. Update validation in `src/utils.js`
4. Add test cases

### Adding New Languages

1. Add language templates to `data/templates.json`
2. Add cultural context to festival data
3. Update validation in `src/utils.js`
4. Test with sample campaigns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- 📖 Check the `/docs` endpoint for API documentation
- 🧪 Run tests to verify functionality
- 📝 Check logs for debugging information

---

**Made with ❤️ for small businesses and festival celebrations**