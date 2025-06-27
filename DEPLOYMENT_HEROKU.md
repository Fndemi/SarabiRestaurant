# Heroku Deployment Guide

## Prerequisites
1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Create Heroku account

## Backend Deployment

### 1. Prepare your FastAPI app
I've created a Procfile for you in the chatbot-api directory.

### 2. Deploy to Heroku
```bash
# Navigate to chatbot-api
cd chatbot-api

# Login to Heroku
heroku login

# Create Heroku app
heroku create your-restaurant-api

# Set environment variables
heroku config:set GEMINI_API_KEY=your_actual_api_key_here

# Deploy
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

## Frontend Deployment
You can deploy the frontend to:
- Netlify (drag and drop)
- Vercel
- GitHub Pages

## Update API URLs
After deployment, update your frontend JavaScript to use the Heroku API URL.

## Expected Costs
- Heroku: No longer offers free tier, starts at $5/month per dyno
