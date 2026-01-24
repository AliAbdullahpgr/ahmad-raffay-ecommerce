# Ahmad Rafay Handwork

> Beautiful Embroidery, Honest Prices

A modern e-commerce website for traditional hand-embroidered women's wear (shirts & trousers) from Rajanpur, Pakistan. Built with the T3 Stack.

![Ahmad Rafay Handwork](https://placehold.co/1200x600/1B4D3E/FDF8F3?text=Ahmad+Rafay+Handwork)

## Features

### Public Website
- 🏠 **Landing Page** with Hero, Featured Products, Categories, About, and How to Order sections
- 🛍️ **Product Gallery** with category filters and responsive grid
- 📱 **Product Detail Pages** with image gallery and WhatsApp ordering
- 📱 **WhatsApp Integration** for easy ordering with pre-filled messages
- 🎨 **Beautiful UI** with custom brand colors and animations
- 📱 **Fully Responsive** mobile-first design
- 🔍 **SEO Optimized** with metadata, sitemap, and Open Graph

### Admin Panel
- 🔐 **Secure Authentication** with NextAuth.js
- 📊 **Dashboard** with product statistics
- 📦 **Product Management** - Create, edit, delete products with images
- 📁 **Category Management** - Organize products into categories
- ⚙️ **Site Settings** - Update contact info and content

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| API | tRPC |
| Database | PostgreSQL + Prisma |
| Auth | NextAuth.js |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL database (local or cloud like Neon/Supabase)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ahmad-rafay-handwork.git
   cd ahmad-rafay-handwork
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your values:
   ```env
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   pnpm db:generate
   
   # Push schema to database
   pnpm db:push
   
   # Seed with sample data
   pnpm db:seed
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Open the app**
   - Website: http://localhost:3000
   - Admin: http://localhost:3000/admin/login
   
   Default admin credentials:
   - Email: `admin@ahmadrafay.com`
   - Password: `admin123`

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── gallery/           # Product gallery
│   ├── product/[slug]/    # Product detail
│   ├── admin/             # Admin panel
│   └── api/               # API routes (tRPC, auth)
├── components/
│   ├── layout/            # Navbar, Footer, AdminSidebar
│   ├── sections/          # Homepage sections
│   ├── ui/                # Reusable UI components
│   └── admin/             # Admin-specific components
├── server/
│   ├── api/               # tRPC routers
│   ├── auth.ts            # NextAuth config
│   └── db.ts              # Prisma client
├── lib/                   # Utilities and constants
├── styles/                # Global CSS
├── trpc/                  # tRPC client setup
└── types/                 # TypeScript types
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:push` | Push schema to database |
| `pnpm db:migrate` | Run migrations (dev) |
| `pnpm db:seed` | Seed database |
| `pnpm db:studio` | Open Prisma Studio |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL` - Your production URL
4. Deploy!

### Database Setup

We recommend **Neon** for PostgreSQL:
1. Create a free account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string to `DATABASE_URL`
4. Run `pnpm db:migrate:deploy` to apply migrations

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Emerald | `#1B4D3E` | Primary, headers |
| Warm Gold | `#D4AF37` | Accents, CTAs |
| Terracotta | `#C75B39` | Hover states |
| Cream | `#FDF8F3` | Backgrounds |
| Charcoal | `#2D2D2D` | Text |

## Contact

- **WhatsApp:** 03199119572
- **Instagram:** [@ahmadrafayhandwork](https://instagram.com/ahmadrafayhandwork)
- **Facebook:** [Ahmad Rafay Handwork](https://facebook.com/ahmadrafayhandwork)

## License

This project is proprietary. All rights reserved.

---

Made with ❤️ in Rajanpur, Pakistan
