# Nexvia Marketplace — Frontend

A modern React-based frontend for **Nexvia**, a multi-vendor e-commerce marketplace where customers can shop, vendors can manage their stores, and administrators can manage the marketplace.

## Tech Stack

- React 19
- Vite
- React Router
- Tailwind CSS
- Axios
- Lucide React

## Features

### Customer
- Browse products and categories
- Search products
- Shopping cart management
- Apply coupons
- Checkout with Razorpay or Cash on Delivery
- View order history
- Product reviews

### Vendor
- Vendor dashboard
- Add, update and manage products
- Upload product images
- View and manage product orders
- Manage order fulfillment

### Admin
- Admin dashboard and marketplace statistics
- Manage users and vendors
- Manage products and orders
- Marketplace administration
- Create and manage discount coupons
- Update coupon discounts, expiry dates and usage  limits

### General
- JWT-based authentication
- Role-protected routes
- API integration with the Nexvia backend
- Responsive user interface

## Requirements

- Node.js 20.19+ or 22.12+
- npm
- Nexvia Marketplace Backend running locally or remotely

## Installation

Clone the repository:

```bash
git clone https://github.com/Abhijitkr82/Nexvia-Marketplace-Frontend.git
```

Move into the project directory:

```bash
cd Nexvia-Marketplace-Frontend
```

Install dependencies:

```bash
npm ci
```

## Environment Configuration

Create a `.env` file in the frontend root directory.

Add the following variable:

```env
VITE_API_URL=http://localhost:5000/api
```

`VITE_API_URL` specifies the base URL of the backend API.

For local development, the default backend URL is:

```text
http://localhost:5000/api
```

For production, replace it with your deployed backend URL.

**Important:** Never store private API keys, JWT secrets, AWS credentials or Razorpay secret keys in frontend environment variables. Vite exposes variables prefixed with `VITE_` to the browser.

## Run Locally

Start the development server:

```bash
npm run dev
```

Open the local URL shown in your terminal. By default, Vite uses:

```text
http://localhost:5173
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates the production build |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs Oxlint |

## Production Build

Generate an optimized production build:

```bash
npm run build
```

The generated production files are stored in the `dist/` directory.

Preview the production build locally:

```bash
npm run preview
```

## Deployment

This project can be deployed as a static Vite application using platforms such as Vercel or Netlify.

Build configuration:

- Framework: Vite
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`

Configure the following environment variable in the hosting provider:

```env
VITE_API_URL=https://YOUR-BACKEND-DOMAIN/api
```

Replace the example URL with your actual deployed backend API URL.

Make sure the backend is accessible and its CORS configuration allows requests from the deployed frontend origin.

## Security Notes

- Never commit `.env` files.
- Never expose backend secrets in frontend code.
- Only use public configuration values in variables prefixed with `VITE_`.
- Keep Razorpay secret credentials on the backend.

## Repository

GitHub: [Nexvia Marketplace Frontend](https://github.com/Abhijitkr82/Nexvia-Marketplace-Frontend)

---

**Nexvia Marketplace Frontend**