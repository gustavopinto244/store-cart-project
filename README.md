# Store Cart Project

A full-stack e-commerce application built as a portfolio project. Shopping cart with authentication, product catalog, filters, and checkout — all backed by a serverless PostgreSQL database.

## Tech Stack

| Layer    | Technology                    | Deployment |
| -------- | ----------------------------- | ---------- |
| Frontend | React 19, TypeScript, Vite    | **Vercel** |
| Backend  | Express 5, TypeScript         | **Render** |
| Database | PostgreSQL (serverless)       | **Neon**   |
| Auth     | JWT (jsonwebtoken) + bcryptjs | —          |
| Styling  | Plain CSS + styled-components | —          |

## Features

- **Authentication** — Register, login, and logout with JWT tokens. Protected routes on both frontend and backend.
- **Product Catalog** — 24 products seeded automatically from the database. Filter by price range, product type, and brand. Sort by newest, price, or name.
- **Shopping Cart** — Add products from the store. Cart persists in `localStorage` with minimal payload (`{id, quantity}`). Item data is enriched from the API on page load.
- **Checkout** — Finalize orders. Backend validates prices server-side against the database before accepting the order. Orders are stored with transactional integrity (all-or-nothing inserts).
- **Toast Notifications** — Visual feedback when items are added to the cart.
- **Responsive Design** — Mobile-first layout with collapsible filters and adaptive grids.

## Architecture

```
┌─────────────────────────────────────────────────┐
│                    Vercel                        │
│  ┌───────────────────────────────────────────┐  │
│  │         React 19 + Vite (SPA)             │  │
│  │  pages/ contexts/ api/                    │  │
│  │  AuthContext  CartContext  StorePage ...   │  │
│  └──────────────────┬────────────────────────┘  │
└─────────────────────┼───────────────────────────┘
                      │ HTTPS
┌─────────────────────┼───────────────────────────┐
│                    Render                       │
│  ┌──────────────────▼────────────────────────┐  │
│  │         Express 5 API                     │  │
│  │  /login  /products  /checkout             │  │
│  │  JWT middleware  controllers  models      │  │
│  └──────────────────┬────────────────────────┘  │
└─────────────────────┼───────────────────────────┘
                      │ SSL
┌─────────────────────┼───────────────────────────┐
│                     Neon                        │
│  ┌──────────────────▼────────────────────────┐  │
│  │     PostgreSQL (serverless)               │  │
│  │  users  products  orders  order_items     │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

**Data flow:**

1. Frontend renders the UI, fetches products from `GET /products`.
2. Cart state lives in `localStorage` as `[{id, quantity}]`. On mount, the CartContext calls `/products` to enrich items with name, price, image, etc.
3. At checkout, the frontend sends `{items, total}` to `POST /checkout` (with JWT in `Authorization` header).
4. The backend validates prices against the `products` table, then inserts into `orders` + `order_items` in a single database transaction.

## API Endpoints

### Authentication

| Method | Path              | Auth   | Description                                        |
| ------ | ----------------- | ------ | -------------------------------------------------- |
| POST   | `/login/login`    | No     | Sign in. Returns `{success, token, user}`          |
| POST   | `/login/register` | No     | Create account. Returns `{success, token, user}`   |
| POST   | `/login/logout`   | No     | Logout (stateless — frontend discards token)       |
| GET    | `/login/me`       | Bearer | Check auth status. Returns `{authenticated, user}` |

### Products

| Method | Path        | Auth | Description                                        |
| ------ | ----------- | ---- | -------------------------------------------------- |
| GET    | `/products` | No   | Returns `{success, data: Product[]}` (24 products) |

### Checkout

| Method | Path        | Auth   | Description                                                                                                               |
| ------ | ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/checkout` | Bearer | Create order. Body: `{items: [{product_id, product_name, price, quantity}], total}`. Returns `{success, data: {orderId}}` |

All responses follow the same shape:

```json
// Success
{ "success": true, "data": { ... } }

// Error
{ "success": false, "errors": ["message 1", "message 2"] }
```

## Database Schema

| Table         | Key Columns                                                         | Purpose                                                |
| ------------- | ------------------------------------------------------------------- | ------------------------------------------------------ |
| `users`       | `id`, `email`, `password`, `name`, `created_at`                     | Authentication credentials                             |
| `products`    | `id`, `name`, `price_value`, `type`, `brand`                        | Product catalog (source of truth, 24 rows seeded)      |
| `orders`      | `id`, `user_id`, `total`, `created_at`                              | Each completed checkout                                |
| `order_items` | `id`, `order_id`, `product_id`, `product_name`, `price`, `quantity` | Line items (snapshot of product data at purchase time) |

Tables are auto-created on server startup (`CREATE TABLE IF NOT EXISTS`). Products are auto-seeded if the table is empty.

## Project Structure

```
store-cart-project/
├── backend/
│   └── src/
│       ├── config/database.ts     # PostgreSQL pool + table creation + seed
│       ├── controllers/           # Route handlers (auth, products, checkout)
│       ├── middlewares/auth.ts    # JWT verification (requireAuth, optionalAuth)
│       ├── models/                # Database queries (UserModel, ProductModel, OrderModel)
│       ├── routes/                # Express routers (login, products, checkout)
│       ├── seed/seedProducts.ts   # 24-product seed data
│       ├── types/express.d.ts     # Extended Express Request type
│       ├── utils/token.ts         # JWT generate + verify
│       ├── app.ts                 # Express app setup (Express class)
│       └── server.ts              # Server entry point (port 3000)
├── src/
│   ├── api/axios.ts               # Axios instance (auth interceptor, 401 handling)
│   ├── contexts/
│   │   ├── AuthContext.tsx         # User auth state (login, register, logout, checkAuth)
│   │   └── CartContext.tsx         # Cart state + localStorage sync + toast notifications
│   ├── layouts/
│   │   ├── Header.tsx              # Navigation bar (auth-aware links)
│   │   └── Footer.tsx              # Footer with dynamic year
│   ├── pages/
│   │   ├── HomePage/               # Landing page (hero, benefits, featured products)
│   │   ├── StorePage/              # Product catalog (filters, sorting, add to cart)
│   │   ├── CartPage/               # Cart (quantity controls, remove, checkout)
│   │   ├── LoginPage/              # Login + Registration forms
│   │   └── UserPage/               # User profile, cart summary, logout
│   ├── routes/index.tsx            # React Router config + ProtectedRoute wrapper
│   ├── styles/GlobalStyles.tsx     # Global CSS (body gradient, toast styles)
│   ├── types/Product.ts            # Product type definition
│   └── utils/tokenStorage.ts       # JWT localStorage helpers
├── .env.example                    # Required environment variables
├── vite.config.ts                  # Vite config (+ dev proxy to backend)
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) PostgreSQL database (free tier works)
- (Optional) [Render](https://render.com) account for backend deployment
- (Optional) [Vercel](https://vercel.com) account for frontend deployment

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable         | Where          | Description                                                                |
| ---------------- | -------------- | -------------------------------------------------------------------------- |
| `DATABASE_URL`   | Render + local | Neon PostgreSQL connection string                                          |
| `JWT_SECRET`     | Render + local | Secret key for JWT signing                                                 |
| `JWT_EXPIRATION` | Render + local | Token expiration (default: `7d`)                                           |
| `PORT`           | Render + local | Backend server port (default: `3000`)                                      |
| `FRONTEND_URL`   | Render         | Your Vercel deployment URL (enables CORS)                                  |
| `VITE_API_URL`   | Vercel         | Your Render backend URL (leave empty for local dev, Vite proxy handles it) |

### Local Development

npm install

````

2. Start the backend:
```bash
npm run back:dev
````

This starts Express on `http://localhost:3000`, creates tables, and seeds 24 products.

3. In a separate terminal, start the frontend:

```bash
npm run dev
```

This starts Vite on `http://localhost:5173`. API calls to `/login`, `/products`, and `/checkout` are proxied to the backend.

4. Open `http://localhost:5173` in your browser. Register an account, browse the store, add items to your cart, and test the checkout flow.

### Scripts

| Script               | Description                                            |
| -------------------- | ------------------------------------------------------ |
| `npm run dev`        | Start Vite dev server (frontend)                       |
| `npm run build`      | TypeScript check + Vite production build               |
| `npm run preview`    | Preview production build locally                       |
| `npm run back:dev`   | Start backend with hot-reload (tsx watch)              |
| `npm run back:build` | Compile backend TypeScript to `dist-backend/`          |
| `npm run back:start` | Start compiled backend (`node dist-backend/server.js`) |
| `npm run lint`       | Run ESLint on all files                                |

## Deployment Guide

### Database — Neon

1. Create a Neon project at [neon.tech](https://neon.tech).
2. Copy the connection string from the dashboard.
3. Set it as `DATABASE_URL` in both Render and local `.env`.
4. On first server start, tables are created and products are seeded automatically.

### Backend — Render

1. Create a new **Web Service** on Render.
2. Connect the GitHub repository.
3. Configure the service:
   - **Runtime:** Node
   - **Build Command:** `npm install && npm run back:build`
   - **Start Command:** `npm run back:start`
   - **Environment Variables:**
     - `DATABASE_URL` — your Neon connection string
     - `JWT_SECRET` — any strong secret string
     - `JWT_EXPIRATION` — token expiry (e.g., `7d`)
     - `FRONTEND_URL` — your Vercel deployment URL (e.g., `https://store-cart.vercel.app`) — enables CORS
     - `PORT` — `3000` (or let Render assign it)
4. The service will be available at `https://store-cart-project.vercel.app/`.

The build step compiles TypeScript from `backend/src/` to `dist-backend/` (CommonJS), and `node dist-backend/server.js` starts the server.

### Frontend — Vercel

1. Import the project into Vercel (connect GitHub repo).
2. Configure the project:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Environment Variable:** `VITE_API_URL` = your Render backend URL (e.g., `https://your-app.onrender.com`)
3. Deploy. The frontend will be available at `https://your-app.vercel.app`.

**Important:** The Vite proxy configured in `vite.config.ts` only works in development. In production, the frontend communicates directly with the Render backend via `VITE_API_URL`. Make sure CORS is configured on the backend if needed, or use same-domain proxying.

## Security

- Passwords hashed with **bcryptjs** (12 salt rounds).
- JWT tokens with configurable expiration.
- All API routes use **parameterized SQL queries** — no string concatenation, preventing SQL injection.
- Checkout endpoint validates prices **server-side** against the database — client-submitted prices are rejected if they don't match.
- Cart data in `localStorage` contains only `{id, quantity}` (no sensitive data).
- Helmet.js adds security headers to the Express server.

## Author

**Gustavo Pinto da Conceição**  
[GitHub](https://github.com/gustavopinto244) — [LinkedIn](https://linkedin.com/in/gustavo-pinto-da-conceicao)

## License

MIT
