# Railway Deployment Guide

## Prerequisites
1. Create a Railway account at https://railway.app
2. Install Railway CLI: `npm install -g @railway/cli`
3. Have your GEMINI_API_KEY ready

## Steps

### 1. Deploy the Backend (FastAPI)
```bash
# Login to Railway
railway login

# Navigate to chatbot-api directory
cd chatbot-api

# Initialize Railway project
railway init

# Set environment variables
railway variables set GEMINI_API_KEY=your_actual_api_key_here

# Deploy
railway up
```

### 2. Deploy the Frontend
```bash
# Go back to root directory
cd ..

# Create a new Railway service for frontend
railway init

# Deploy frontend
railway up
```

### 3. Update Frontend API URLs
After deployment, update your frontend JavaScript files to use the Railway backend URL instead of localhost.

## Expected Costs
- Railway offers a free tier with generous limits
- Perfect for small to medium projects
