# 🎨 Nusa Creative Studio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa)

**Creative studio web application for branding, web design, and digital solutions.**

[🌐 Live Demo](https://nusa-studio.vercel.app) · [📖 Documentation](docs/SRS.md) · [🎨 Figma Design](https://www.figma.com/design/nuC98E5ZpdVX8vFBOdg7f4/Studio---Nusacaraka?node-id=7-361&t=ZLVdhmobtr8b87xQ-1)

</div>

---

## ✨ Features

### Public Website

- 🏠 **Landing Page** - Modern hero section with animations
- 💼 **Portfolio** - Showcase of creative works with case studies
- 🛠️ **Services** - Comprehensive service offerings
- 📝 **Blog/Articles** - Content management for articles
- 📅 **Booking System** - Complete booking form with order tracking
- 💬 **AI Chatbot** - Powered by Google Gemini AI
- 📱 **PWA Support** - Installable as mobile/desktop app

### Admin Panel

- 📊 **Dashboard** - Analytics with charts and metrics
- 📋 **Booking Management** - View, filter, and manage bookings
- ✉️ **Message Management** - Inbox with reply functionality
- 🔔 **Notifications** - Real-time notification bell
- 📝 **CMS** - Content management for services, articles, knowledge base

---

## 🚀 Tech Stack

| Category      | Technology                    |
| ------------- | ----------------------------- |
| **Framework** | Next.js 16 (App Router)       |
| **Language**  | TypeScript 5                  |
| **UI**        | React 19, Tailwind CSS 4      |
| **State**     | SWR, Zustand                  |
| **Auth**      | NextAuth.js (JWT)             |
| **Forms**     | React Hook Form + Zod         |
| **Animation** | Framer Motion, GSAP           |
| **3D**        | Three.js, React Three Fiber   |
| **Charts**    | Recharts                      |
| **Icons**     | Phosphor Icons, Lucide        |
| **AI**        | Vercel AI SDK + Google Gemini |
| **Backend**   | Google Apps Script + Sheets   |
| **PWA**       | next-pwa                      |

---

## 📁 Project Structure

```
nusa-studio/
├── 📂 src/
│   ├── 📂 app/                    # Next.js App Router pages
│   │   ├── 📂 (public)/           # Public pages
│   │   ├── 📂 admin/              # Admin panel pages
│   │   └── 📂 api/                # API routes
│   ├── 📂 components/             # React components (Atomic Design)
│   │   ├── 📂 atoms/              # Basic UI elements
│   │   ├── 📂 molecules/          # Combinations of atoms
│   │   ├── 📂 organisms/          # Complex sections
│   │   ├── 📂 templates/          # Page layouts
│   │   └── 📂 providers/          # Context providers
│   ├── 📂 hooks/                  # Custom React hooks
│   ├── 📂 services/               # External services
│   └── 📂 data/                   # Static data
├── 📂 docs/                       # Documentation
│   ├── 📄 SRS.md                  # Software Requirements Specification
│   └── 📂 uml/                    # UML diagrams (PlantUML)
├── 📂 appscript-code/             # Google Apps Script backend
└── 📂 public/                     # Static assets
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/raflimaulanayh/nusa-studio.git
   cd nusa-studio
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Required variables:

   ```env
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   APPSCRIPT_URL=your-google-apps-script-url
   GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key
   ```

4. **Run development server**

   ```bash
   bun run dev
   # or
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

---

## 📖 Documentation

### Software Requirements Specification (SRS)

Complete documentation available at **[docs/SRS.md](docs/SRS.md)**, including:

- ✅ System Features (10 main features)
- ✅ Functional Requirements (50+ requirements)
- ✅ Non-Functional Requirements (performance, security, quality)
- ✅ Technology Stack details
- ✅ Database Schema
- ✅ SEO & Accessibility requirements
- ✅ Business Rules

### UML Diagrams

Located at `docs/uml/`, available in PlantUML format:

| Diagram                 | File                               |
| ----------------------- | ---------------------------------- |
| Use Case                | `use-case-diagram.puml`            |
| Class Diagram           | `class-diagram.puml`               |
| Activity: Booking       | `activity-booking-submission.puml` |
| Activity: Admin         | `activity-booking-management.puml` |
| Activity: Chatbot       | `activity-chatbot.puml`            |
| Sequence: Booking       | `sequence-booking-submission.puml` |
| Sequence: Status Update | `sequence-auto-status-update.puml` |
| Sequence: Chatbot       | `sequence-chatbot.puml`            |
| Sequence: Auth          | `sequence-authentication.puml`     |
| Architecture            | `multilayer-architecture.puml`     |

---

## 🔗 Links

| Resource            | URL                                                                                                                          |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 🌐 **Live Demo**    | https://nusa-studio.vercel.app                                                                                               |
| 🔐 **Admin Panel**  | https://nusa-studio.vercel.app/auth/login                                                                                    |
| 🎨 **Figma Design** | [View Prototype](https://www.figma.com/design/nuC98E5ZpdVX8vFBOdg7f4/Studio---Nusacaraka?node-id=7-361&t=ZLVdhmobtr8b87xQ-1) |
| 📊 **Database**     | [Google Sheets](https://docs.google.com/spreadsheets/d/1HizlG1xpSUnoSSihHzaFxXwklKzQUOlOZOqJKMRSBQI/edit?usp=sharing)        |

### Demo Credentials

```
Email: admin@ncs.com
Password: admin123
```

---

## 🧪 Available Scripts

| Command                   | Description               |
| ------------------------- | ------------------------- |
| `bun run dev`             | Start development server  |
| `bun run build`           | Build for production      |
| `bun run start`           | Start production server   |
| `bun run lint`            | Run ESLint                |
| `bun run lint:fix`        | Fix ESLint errors         |
| `bun run typecheck`       | Run TypeScript check      |
| `bun run prettier:format` | Format code with Prettier |

---

## 📄 License

This project is for educational purposes.

---

<div align="center">

Made by [Rafli Maulana](https://github.com/raflimaulanayh)

</div>
