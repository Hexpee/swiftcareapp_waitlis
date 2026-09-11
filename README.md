# Swift Care App Waitlist

A modern healthcare waitlist management application built with Next.js and PostgreSQL. This project provides a seamless way to collect, manage, and verify healthcare provider waitlist submissions.

## 🚀 Features

- **Waitlist Management**: Collect and organize healthcare provider waitlist entries
- **Email Verification**: Secure token-based email verification system
- **Database Persistence**: PostgreSQL-backed storage for reliable data management
- **Responsive Design**: Bootstrap-powered responsive UI with Lucide icons
- **Type Safety**: Full TypeScript support with comprehensive type checking
- **Testing**: Integrated test suite with Node.js native test runner

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, Bootstrap 5.3
- **Backend**: Next.js API routes, Node.js
- **Database**: PostgreSQL
- **Language**: TypeScript
- **Validation**: Zod
- **Icons**: Lucide React
- **Fonts**: Manrope, Source Sans 3

## 📋 Prerequisites

- Node.js >= 22.13.0
- PostgreSQL database
- npm or yarn

## 🏁 Getting Started

### 1. Installation

Clone the repository and install dependencies:

```bash
npm install
```

### 2. Environment Setup

Create a `.env.local` file with your configuration:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/swiftcare
# Add other required environment variables
```

### 3. Database Migrations

Run database migrations to set up your schema:

```bash
npm run db:migrate
```

### 4. Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production with webpack |
| `npm start` | Start production server (listens on 0.0.0.0) |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run db:migrate` | Run database migrations |
| `npm run db:remove` | Remove/rollback database changes |
| `npm run test` | Run test suite |

## 📁 Project Structure

```
swiftcareapp_waitlis/
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                    # Utility libraries and helpers
├── migrations/             # Database migration scripts
├── public/                 # Static assets
├── scripts/                # Build and maintenance scripts
├── tests/                  # Test files
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── next.config.ts         # Next.js configuration
└── README.md              # This file
```

## 🧪 Testing

Run the test suite with:

```bash
npm test
```

For integration tests with PostgreSQL:

```bash
npm run test:integration
```

## ✅ Verification Status

The application has been verified for:
- ✅ Source syntax and module bundling (esbuild)
- ✅ Signed token validation (age, signature, expiry)
- ✅ Asset optimization and local imports

**Note**: Full dependency installation, complete build/typecheck suite, and PostgreSQL integration tests require proper network access and a live database instance. See `VERIFICATION.md` for details.


## 🗄️ Database

This project uses PostgreSQL for data persistence. Migrations are located in the `migrations/` directory and can be run with:

```bash
npm run db:migrate
```

To revert changes:

```bash
npm run db:remove
```

## 🔒 Security

- **Token-based verification** with expiry (2-hour window)
- **Tamper detection** for verification tokens
- **Type-safe data validation** with Zod
- **Environment-based configuration** for sensitive data

## 📧 Email Configuration

The application includes email verification functionality. Configure your email provider in the `.env.local` file before going live.

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

The production server will listen on `0.0.0.0` for container deployments.

### Environment Variables

Ensure all required environment variables are set in your production environment. See `.env.local` template for available options.

## 📄 License

This project is private. See LICENSE file for details.

## 👤 Author

Created by [Hexpee](https://github.com/Hexpee)

## 📞 Support

For issues, questions, or contributions, please open an issue on the [GitHub repository](https://github.com/Hexpee/swiftcareapp_waitlis).

---

**Last Updated**: September 2026
