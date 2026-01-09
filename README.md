# Next.js Authentication System

A production-ready, scalable authentication system built with Next.js, NextAuth.js, Redis, Prisma, and Supabase. This project demonstrates modern authentication patterns with email verification, password reset, and secure session management.

![Landing Page](./screenshots/LandingPage.png)

## 🚀 Features

- **User Registration** - Secure user registration with email validation
- **Email Verification** - OTP-based email verification system
- **User Login** - Credential-based authentication with NextAuth.js
- **Password Reset** - Secure password reset flow with OTP verification
- **Session Management** - JWT-based session management with 30-day expiration
- **Type Safety** - Full TypeScript implementation with type-safe API routes
- **Modern UI** - Beautiful, responsive UI built with Tailwind CSS and Shandcn
- **Redis Caching** - Temporary data storage for OTPs and registration tokens using Upstash Redis
- **Database Integration** - PostgreSQL database managed by Supabase with Prisma ORM
- **Email Service** - Automated email sending with Nodemailer for OTP delivery

## 🛠️ Tech Stack

### Core Technologies

- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type-safe development
- **NextAuth.js 4.24.13** - Authentication library

### Database & Caching

- **Prisma 7.2.0** - Type-safe ORM
- **PostgreSQL** - Relational database (via Supabase)
- **Upstash Redis** - Serverless Redis for caching and temporary storage

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Shandcn UI library** - Accessible component primitives
- **React Hot Toast** - Toast notifications

### Additional Tools

- **bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **Axios** - HTTP client

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18+ and npm/yarn
- PostgreSQL database (Supabase recommended)
- Upstash Redis account
- Gmail account for email service (or SMTP credentials)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd 3_next-auth-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@host:port/database"

   # NextAuth
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"

   # Redis (Upstash)
   UPSTASH_REDIS_REST_URL="your-upstash-redis-url"
   UPSTASH_REDIS_REST_TOKEN="your-upstash-redis-token"

   # Email Service (Gmail)
   COMPANY_EMAIL="your-email@gmail.com"
   COMAPNY_EMAIL_PASS="your-app-password"

   # Server URL (optional)
   NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
3_next-auth-system/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   └── auth/             # Authentication endpoints
│   │       ├── [...nextauth]/ # NextAuth handler
│   │       ├── register/     # User registration
│   │       ├── verify-email/ # Email verification
│   │       └── forgot/       # Password reset flow
│   ├── login/                # Login page
│   ├── register/             # Registration page
│   ├── verify/               # Email verification page
│   ├── forgot/               # Password reset pages
│   ├── profile/              # User profile page
│   └── page.tsx              # Homepage
├── components/               # React components
│   └── ui/                   # Reusable UI components
├── lib/                      # Utility libraries
│   ├── authOptions.ts        # NextAuth configuration
│   ├── prisma.ts             # Prisma client singleton
│   ├── redis.ts              # Redis client singleton
│   ├── mail.ts               # Email service
│   ├── mailTemplates.ts      # Email templates
│   └── generateOtp.ts        # OTP generation utility
├── prisma/                   # Prisma schema
│   └── schema.prisma         # Database schema
└── public/                   # Static assets
```

## 🔐 Authentication Flow

### Registration Flow

1. User submits email and password
2. System validates input and checks for existing user
3. Password is hashed with bcrypt
4. OTP is generated and stored in Redis (5-minute expiration)
5. OTP is sent to user's email
6. User verifies email with OTP
7. User account is created in database

### Login Flow

1. User submits credentials
2. NextAuth validates credentials against database
3. Password is verified using bcrypt
4. JWT session is created (30-day expiration)
5. User is redirected to profile page

### Password Reset Flow

1. User requests password reset with email
2. System validates email exists in database
3. OTP is generated and stored in Redis (5-minute expiration)
4. OTP is sent to user's email
5. User submits OTP and new password
6. System validates OTP and updates password in database

## 🗄️ Database Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String
  createdAt DateTime @default(now())
  UpdatedAt DateTime @updatedAt
}
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/verify-email` - Verify email with OTP
- `POST /api/auth/forgot/validate/email` - Request password reset
- `POST /api/auth/forgot/validate/reassign` - Reset password with OTP
- `GET/POST /api/auth/[...nextauth]` - NextAuth handler

## 🔒 Security Features

- **Password Hashing** - Passwords are hashed using bcrypt with salt rounds of 10
- **JWT Sessions** - Secure session management with NextAuth.js
- **OTP Expiration** - OTPs expire after 5 minutes
- **Email Validation** - Email format validation on client and server
- **Type Safety** - Full TypeScript implementation prevents common errors
- **Input Validation** - Form validation on both client and server side

## 🎨 UI Components

The project uses a custom component library built on Radix UI primitives:

- `Button` - Customizable button component
- `Card` - Card container with header, content, and footer
- `Input` - Form input component
- `Label` - Form label component

## 🚧 Future Improvements

- [ ] Add Zod schema validation for API routes
- [ ] Implement rate limiting for authentication endpoints
- [ ] Add two-factor authentication (2FA)
- [ ] Implement refresh token rotation
- [ ] Add comprehensive error logging
- [ ] Add password strength meter
- [ ] Implement account lockout after failed attempts

## 📝 Environment Variables Reference

| Variable                   | Description                      | Required |
| -------------------------- | -------------------------------- | -------- |
| `DATABASE_URL`             | PostgreSQL connection string     | Yes      |
| `NEXTAUTH_SECRET`          | Secret key for JWT signing       | Yes      |
| `NEXTAUTH_URL`             | Base URL of your application     | Yes      |
| `UPSTASH_REDIS_REST_URL`   | Upstash Redis REST API URL       | Yes      |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST API token     | Yes      |
| `COMPANY_EMAIL`            | Email address for sending emails | Yes      |
| `COMAPNY_EMAIL_PASS`       | App password for email service   | Yes      |
| `NEXT_PUBLIC_SERVER_URL`   | Public server URL (optional)     | No       |

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Prisma Commands

- `npx prisma generate` - Generate Prisma Client
- `npx prisma db push` - Push schema changes to database
- `npx prisma studio` - Open Prisma Studio (database GUI)

## 📄 License

This is a personal project. Feel free to use it as a reference or starting point for your own projects.

## 👤 Author

**Srijan**

Built with ❤️ using Next.js 16

---

**Note**: This project is actively maintained and updated regularly. Contributions and suggestions are welcome!
