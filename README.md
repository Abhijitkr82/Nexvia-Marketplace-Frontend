# Nexvia Marketplace — Frontend

React + Vite frontend for the Nexvia multi-vendor e-commerce marketplace.

## Features

- Customer storefront, search, categories, cart, coupons, checkout and order history
- Vendor dashboard for products, images and per-product order fulfillment
- Admin dashboard for marketplace statistics, users, vendors, products and orders
- JWT-based role-protected routes
- Razorpay checkout and COD checkout flows

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Local setup

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Create a `.env` file in the project root:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Production build

```bash
npm run build
```

The production files are generated in `dist/`.

## Deployment

Deploy this project as a static Vite application (for example, on Vercel or Netlify).

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL=https://YOUR-BACKEND-DOMAIN/api`

Set `VITE_API_URL` to the deployed backend URL, including `/api`, before building. Do not put private API keys or backend secrets in frontend environment variables.

## Notes

- The backend must be running and reachable from the browser.
- The backend CORS configuration must allow the deployed frontend origin if you later restrict CORS.
- Never commit `.env` files containing secrets.
