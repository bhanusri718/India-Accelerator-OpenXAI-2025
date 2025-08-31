require('dotenv').config({ path: '.env.local' });

if (process.env.HF_API_KEY) {
  console.log('HF_API_KEY loaded');
} else {
  console.log('HF_API_KEY not set, using local LLaVA');
}

// Start your server or LLaVA code here
