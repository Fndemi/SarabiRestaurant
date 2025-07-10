# Vercel + Render Deployment Guide

## This approach separates frontend and backend deployment

### Frontend (Vercel)
1. Install Vercel CLI: `npm install -g vercel`
2. Build your CSS: `npm run dev` (then stop it after build)
3. Deploy: `vercel --prod`

### Backend (Render)
1. Push your code to GitHub
2. Create account at https://render.com
3. Create new Web Service
4. Connect your GitHub repository
5. Set these settings:
   - Root Directory: `chatbot-api`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn src.main:app --host 0.0.0.0 --port $PORT`
   - Environment Variables: Add `GEMINI_API_KEY`

### Update CORS Settings
You'll need to update your FastAPI CORS settings to include your Vercel domain.

## Expected Costs
- Vercel: Free tier available
- Render: Free tier with limitations, $7/month for better performance
