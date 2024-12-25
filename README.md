TBC-project

Overview

This project is a modern web application built using the following technologies:

Next.js - React framework for server-side rendering and static site generation.

TypeScript - Superset of JavaScript for type-safe code.

Tailwind CSS - Utility-first CSS framework for styling.

Supabase - Backend as a Service (BaaS) providing authentication, database, and storage.

Stripe - Payment processing integration.

Features

User authentication and authorization.

Secure database integration using Supabase.

Payment processing with Stripe.

Responsive and modern UI with Tailwind CSS.

Server-side rendering (SSR) and static site generation (SSG).

Installation

Clone the repository:

git clone <repository-url>
cd <project-directory>

Install dependencies:

npm install
# or
yarn install

Set up environment variables:
Create a .env.local file in the root directory and add the following:

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

Run the development server:

npm run dev
# or
yarn dev

The application will be available at http://localhost:3000

