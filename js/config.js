// Configuration for different environments
const CONFIG = {
  // Change this to your deployed API URL after deployment
  API_BASE_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:8000'  // Local development
    : 'https://your-api-domain.com', // Production - UPDATE THIS AFTER DEPLOYMENT
  
  // Add other config options here
  ENDPOINTS: {
    CHAT: '/chat'
  }
};

// Export for use in other files
window.CONFIG = CONFIG;
