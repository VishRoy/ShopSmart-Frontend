# ShopSmart AI — Frontend

React frontend for ShopSmart AI, a RAG-powered shopping assistant. Lets users search a product catalog using natural language and see AI-generated, retrieval-grounded recommendations.

**Live demo:** [shop-smart-frontend-ecru.vercel.app](https://shop-smart-frontend-ecru.vercel.app)
**Backend repo:** [ShopSmart-AI](https://github.com/VishRoy/ShopSmart-AI)

## Tech stack

- React (Vite)
- Plain CSS (no UI library)

## Running locally

```bash
npm install

# Add a .env file with:
# VITE_API_URL=http://127.0.0.1:8000   (or your deployed backend URL)

npm run dev
```

The backend must be running separately — see the [ShopSmart-AI](https://github.com/VishRoy/ShopSmart-AI) repo for setup instructions.

## Deployment

Deployed on Vercel. The `VITE_API_URL` environment variable is set in Vercel's project settings (not committed to the repo) and points to the backend hosted on Hugging Face Spaces.
