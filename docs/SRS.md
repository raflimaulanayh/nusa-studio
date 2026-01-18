# Software Requirements Specification (SRS)

## Nusa Creative Studio - Web Application & Admin Panel

**Version:** 2.0  
**Date:** 18 Januari 2026  
**Status:** Active Development

---

## TABLE OF CONTENTS

1. [Introduction](#1-introduction)
   - 1.1 [Purpose](#11-purpose)
   - 1.2 [Document Conventions](#12-document-conventions)
   - 1.3 [Intended Audience and Reading Suggestions](#13-intended-audience-and-reading-suggestions)
   - 1.4 [Product Scope](#14-product-scope)
   - 1.5 [References](#15-references)

2. [Overall Description](#2-overall-description)
   - 2.1 [Product Perspective](#21-product-perspective)
   - 2.2 [Product Functions](#22-product-functions)
   - 2.3 [User Classes and Characteristics](#23-user-classes-and-characteristics)
   - 2.4 [Operating Environment](#24-operating-environment)
   - 2.5 [Design and Implementation Constraints](#25-design-and-implementation-constraints)
   - 2.6 [User Documentation](#26-user-documentation)
   - 2.7 [Assumptions and Dependencies](#27-assumptions-and-dependencies)

3. [External Interface Requirements](#3-external-interface-requirements)
   - 3.1 [User Interfaces (Style Guide, Sitemap & Wireframes)](#31-user-interfaces)
   - 3.2 [Hardware Interfaces](#32-hardware-interfaces)
   - 3.3 [Software Interfaces](#33-software-interfaces)
   - 3.4 [Communications Interfaces](#34-communications-interfaces)

4. [System Features](#4-system-features)
   - 4.1 [Home Page (Landing & Gateway)](#41-home-page)
   - 4.2 [Work Page (Portfolio Listing)](#42-work-page)
   - 4.3 [Project Detail Page (Case Study)](#43-project-detail-page)
   - 4.4 [Services Page](#44-services-page)
   - 4.5 [Contact Page & Booking System](#45-contact-page--booking-system)
   - 4.6 [AI Chatbot Assistant](#46-ai-chatbot-assistant)
   - 4.7 [Admin Dashboard](#47-admin-dashboard)
   - 4.8 [Booking Management System](#48-booking-management-system)
   - 4.9 [Message Management System](#49-message-management-system)
   - 4.10 [Content Management System (CMS)](#410-content-management-system)

5. [Other Nonfunctional Requirements](#5-other-nonfunctional-requirements)
   - 5.1 [Performance Requirements](#51-performance-requirements)
   - 5.2 [Safety Requirements](#52-safety-requirements)
   - 5.3 [Security Requirements](#53-security-requirements)
   - 5.4 [Software Quality Attributes](#54-software-quality-attributes)
   - 5.5 [Business Rules](#55-business-rules)

6. [Other Requirements](#6-other-requirements)

7. [Appendix A: Glossary](#appendix-a-glossary)

8. [Appendix B: Analysis Models](#appendix-b-analysis-models)

---

## 1. INTRODUCTION

### 1.1 Purpose

Dokumen Spesifikasi Kebutuhan Perangkat Lunak (SRS) ini memberikan deskripsi lengkap tentang aplikasi web dan panel admin Nusa Creative Studio. Dokumen ini menjelaskan kebutuhan fungsional dan non-fungsional untuk para pemangku kepentingan termasuk pengembang, desainer, manajer proyek, dan klien.

Sistem ini memiliki dua tujuan utama:

1. **Website Publik**: Menampilkan layanan kreatif, portofolio, dan memungkinkan interaksi klien
2. **Panel Admin**: Mengelola booking, pesan, konten, dan memantau metrik bisnis

### 1.2 Document Conventions

- **Tingkat Prioritas:**
  - **High**: Kritis untuk operasi sistem
  - **Medium**: Penting tapi tidak kritis
  - **Low**: Peningkatan yang diinginkan

- **Identifikasi Kebutuhan:**
  - FR-X: Functional Requirement
  - NFR-X: Non-Functional Requirement
  - UI-X: User Interface Requirement

### 1.3 Intended Audience and Reading Suggestions

**Primary Audiences:**

- **Developers**: Spesifikasi teknis lengkap (Section 3-4)
- **Project Managers**: Lingkup produk dan fitur (Section 1-2)
- **Designers**: Kebutuhan UI/UX (Section 3.1)
- **QA Engineers**: Kebutuhan pengujian (Section 5)
- **Stakeholders**: Deskripsi umum dan aturan bisnis (Section 2, 5.5)

### 1.4 Product Scope

**Nusa Creative Studio** adalah platform web komprehensif yang:

**Untuk Public Users:**

- Menampilkan portofolio layanan kreatif
- Memungkinkan booking proyek dan pertanyaan
- Menyediakan dukungan pelanggan AI
- Menampilkan studi kasus dan testimoni

**Untuk Administrators:**

- Mengelola booking dengan alur status
- Menangani pesan dan pertanyaan pelanggan
- Memantau metrik bisnis via dashboard analitik
- Mengelola konten website (layanan, artikel, knowledge base)
- Melacak notifikasi untuk pengajuan baru

**Business Goals:**

- Meningkatkan akuisisi klien melalui kehadiran web profesional
- Menyederhanakan manajemen booking dan pertanyaan
- Mengurangi waktu respons dengan chatbot AI
- Meningkatkan efisiensi operasional dengan alur kerja otomatis

**Out of Scope (Current Version):**

- Payment processing integration
- Multi-language support
- Mobile native applications

### 1.5 References

1. **IEEE Std 830-1998** - IEEE Recommended Practice for SRS
2. **Next.js Documentation** - https://nextjs.org/docs
3. **Google Apps Script Reference** - https://developers.google.com/apps-script
4. **NextAuth.js Documentation** - https://next-auth.js.org
5. **Tailwind CSS Documentation** - https://tailwindcss.com
6. **SWR Documentation** - https://swr.vercel.app

---

## 2. OVERALL DESCRIPTION

### 2.1 Product Perspective

Nusa Creative Studio adalah **standalone web application** yang terintegrasi dengan layanan eksternal:

#### Technology Stack

| Category             | Technology                   | Version     | Purpose                           |
| -------------------- | ---------------------------- | ----------- | --------------------------------- |
| **Framework**        | Next.js                      | 16.x        | React framework dengan App Router |
| **Language**         | TypeScript                   | 5.x         | Type-safe JavaScript              |
| **UI Library**       | React                        | 19.x        | Component-based UI                |
| **Styling**          | Tailwind CSS                 | 4.x         | Utility-first CSS framework       |
| **State Management** | SWR                          | 2.x         | Data fetching dan caching         |
| **State Management** | Zustand                      | 5.x         | Global state management           |
| **Authentication**   | NextAuth.js                  | 4.x         | Authentication dengan JWT         |
| **Forms**            | React Hook Form + Zod        | 7.x / 3.x   | Form handling dan validation      |
| **Animation**        | Framer Motion                | 12.x        | Declarative animations            |
| **Animation**        | GSAP                         | 3.x         | Advanced animations               |
| **3D Graphics**      | Three.js + React Three Fiber | 0.182 / 9.x | 3D rendering                      |
| **Charts**           | Recharts                     | 2.x         | Data visualization                |
| **Icons**            | Phosphor Icons               | 2.x         | Icon library                      |
| **Icons**            | Lucide React                 | 0.562       | Additional icons                  |
| **UI Components**    | Radix UI                     | Various     | Headless UI primitives            |
| **Carousel**         | Embla Carousel               | 8.x         | Touch-friendly carousels          |
| **Date**             | date-fns + Moment            | 4.x / 2.x   | Date utilities                    |
| **AI SDK**           | Vercel AI SDK                | 5.x         | AI/LLM integration                |
| **Markdown**         | React Markdown               | 10.x        | Markdown rendering                |
| **Smooth Scroll**    | Lenis                        | 1.x         | Smooth scrolling                  |
| **Toast**            | Sonner                       | 2.x         | Toast notifications               |
| **HTTP Client**      | Axios                        | 1.x         | HTTP requests                     |
| **PWA**              | next-pwa                     | 5.x         | Progressive Web App support       |

#### Progressive Web App (PWA) Support

Aplikasi mendukung **Progressive Web App (PWA)**, memungkinkan pengguna untuk:

| Feature                | Description                                    |
| ---------------------- | ---------------------------------------------- |
| **Installable**        | Dapat di-install sebagai app di desktop/mobile |
| **Offline Support**    | Caching assets untuk akses offline             |
| **App Icon**           | Custom icon di home screen                     |
| **Splash Screen**      | Branding saat app loading                      |
| **Full Screen**        | Mode standalone tanpa browser chrome           |
| **Push Notifications** | (Future) Support untuk push notifications      |

**PWA Configuration:**

- **Manifest**: `public/manifest.json` dengan app name, icons, theme colors
- **Service Worker**: Auto-generated oleh next-pwa
- **Caching Strategy**: Network-first untuk API, Cache-first untuk static assets

#### Component Architecture (Atomic Design)

Struktur komponen mengikuti pola **Atomic Design** untuk maintainability dan reusability:

```
src/components/
├── atoms/          # Basic UI elements (Button, Input, Badge, Card, etc.)
├── molecules/      # Combinations of atoms (ArticleCard, ProjectCard, etc.)
├── organisms/      # Complex UI sections (Navbar, Footer, Sidebar, etc.)
├── templates/      # Page layouts (GeneralLayout, Container, etc.)
└── providers/      # Context providers (ClientProvider, etc.)
```

| Layer         | Description                   | Examples                                           |
| ------------- | ----------------------------- | -------------------------------------------------- |
| **Atoms**     | Komponen UI paling dasar      | Button, Input, Badge, Card, Skeleton, Dialog       |
| **Molecules** | Kombinasi dari beberapa atoms | ArticleCard, ProjectCard, ServiceCard              |
| **Organisms** | Section kompleks dengan logic | Navbar, Footer, Sidebar, StatusCard, OverviewChart |
| **Templates** | Layout halaman                | GeneralLayout, Container, DetailView               |
| **Providers** | Context dan state providers   | ClientProvider, ThemeProvider                      |

#### External Integrations

| Service              | Purpose       | Description                                                               |
| -------------------- | ------------- | ------------------------------------------------------------------------- |
| **Google Sheets**    | Database      | Penyimpanan data utama (Bookings, Messages, CMS data) via Apps Script API |
| **Google Drive**     | Media Storage | Penyimpanan gambar, video, dan asset files lainnya                        |
| **Google Gemini AI** | AI Chatbot    | Mendukung respons chatbot cerdas                                          |
| **Email Services**   | Communication | Link mailto untuk komunikasi langsung                                     |
| **WhatsApp API**     | Communication | Integrasi pesan langsung                                                  |
| **Vercel**           | Hosting       | Hosting dan deployment platform                                           |

### 2.2 Product Functions

**A. Public-Facing Features**

1. **Portfolio Showcase** - Tampilkan karya kreatif dengan gambar dan studi kasus
2. **Service Presentation** - Deskripsi layanan lengkap dengan harga
3. **Client Interaction** - Form kontak, sistem booking, chatbot AI
4. **Content Delivery** - Sistem blog/artikel, knowledge base, informasi perusahaan

**B. Administrative Features**

1. **Dashboard Analytics** - Total booking, pesan, statistik, chart tren bulanan
2. **Booking Management** - Lihat, filter, status workflow, auto-mark, export CSV
3. **Message Management** - Inbox, tracking status, nomor tiket, template email
4. **Content Management** - CRUD untuk layanan, artikel, knowledge base
5. **Notification System** - Bell notifikasi real-time

### 2.3 User Classes and Characteristics

| User Class          | Description                               | Frequency | Priority |
| ------------------- | ----------------------------------------- | --------- | -------- |
| Public Visitors     | Calon klien yang mengunjungi website      | Harian    | High     |
| Prospective Clients | Pengguna yang aktif mencari layanan       | Sesekali  | High     |
| Administrators      | Staf yang mengelola operasi               | Harian    | Critical |
| Content Managers    | Staf yang bertanggung jawab update konten | Mingguan  | Medium   |

### 2.4 Operating Environment

**Client-Side Requirements:**

- **Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Screen Resolutions**: 320px - 3840px (fully responsive)
- **JavaScript**: Harus diaktifkan

**Server-Side Environment:**

- **Hosting**: Vercel Platform
- **Runtime**: Node.js 18+
- **Build Tool**: Next.js 16 dengan Turbopack
- **Database**: Google Sheets (via Apps Script)

### 2.5 Design and Implementation Constraints

**Technical Constraints:**

1. **Google Sheets API Limitations** - Rate limits: 100 request per 100 detik
2. **Response Time** - Read: ~2-5 detik, Write: ~2-7 detik
3. **Maximum** - 10 juta sel per spreadsheet

**Performance Budget:**

- Initial page load: < 3 detik
- Largest Contentful Paint: < 2.5 detik
- First Input Delay: < 100ms

### 2.6 User Documentation

**Public User Documentation:**

- FAQ Section
- Service Guides
- Booking Process Guide

**Administrator Documentation:**

- Admin Guide (navigasi dashboard, manajemen booking, CMS)
- API Documentation (spesifikasi endpoint, autentikasi)

### 2.7 Assumptions and Dependencies

**Assumptions:**

- Pengguna memiliki browser modern dengan JavaScript aktif
- Administrator memiliki koneksi internet stabil
- Layanan Google Sheets tetap tersedia

**External Dependencies:**

- Google Services (Sheets API, Apps Script, Gemini AI)
- Third-party Libraries (Next.js, React, NextAuth.js, SWR, Tailwind CSS)
- Vercel Hosting

---

## 3. EXTERNAL INTERFACE REQUIREMENTS

### 3.1 User Interfaces

#### Design Prototypes & Mockups

Semua design UI/UX tersedia dalam Figma. Prototype mencakup style guide, public pages, dan admin pages.

> **🎨 Full Prototype**: [View in Figma](https://www.figma.com/design/nuC98E5ZpdVX8vFBOdg7f4/Studio---Nusacaraka?node-id=7-361&t=ZLVdhmobtr8b87xQ-1)

| Category     | Description                            | Pages Included                                                                                  |
| ------------ | -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Style Guide  | Logo, color palette, typography system | Brand guidelines                                                                                |
| Public Pages | Halaman yang dapat diakses publik      | Home, Portfolio, Work Detail, Services, Service Detail, Articles, Article Detail, Contact, Book |
| Admin Pages  | Panel administrasi untuk manajemen     | Login, Dashboard, Bookings List, Booking Detail, Messages, Message Detail                       |

#### Design Philosophy

- **Modern & Premium**: Palet warna terkurasi, gradien halus, micro-animations
- **Responsive First**: Dioptimalkan untuk mobile, tablet, dan desktop
- **Accessible**: Target kepatuhan WCAG 2.1 AA
- **Performant**: Skeleton loading, optimistic updates

**Color Palette:**

- Primary: #2563eb (Blue - Trust & Professional)
- Secondary: #f59e0b (Amber - Energy & Creativity)
- Success: #10b981 (Green)
- Error: #ef4444 (Red)

#### Sitemap (Complete Pages)

Sistem memiliki **21 halaman** yang terbagi menjadi Public Website dan Admin Panel:

```
Public Website (13 pages):
├── /                           → Home/Landing Page
├── /work                       → Portfolio Listing
│   └── /work/[slug]            → Project Detail (Case Study)
├── /services                   → Services Overview
│   └── /services/[slug]        → Service Detail
├── /articles                   → Blog/Articles Listing
│   └── /articles/[slug]        → Article Detail
├── /book                       → Booking Form
├── /contact                    → Contact Form
├── /chat                       → AI Chatbot (Full Page)
├── /auth/login                 → Login Page
├── /terms                      → Terms & Conditions
└── /privacy                    → Privacy Policy

Admin Panel (8 pages):
└── /admin
    ├── /dashboard              → Analytics Dashboard
    ├── /bookings               → Bookings List
    │   └── /bookings/[id]      → Booking Detail
    ├── /messages               → Message Inbox
    │   └── /messages/[id]      → Message Detail
    └── /cms
        ├── /services           → Service Management
        ├── /articles           → Article Management
        └── /knowledge          → Knowledge Base Management
```

| Route                  | Type   | Description                                   |
| ---------------------- | ------ | --------------------------------------------- |
| `/`                    | Public | Landing page dengan hero, services, portfolio |
| `/work`                | Public | Grid portfolio semua proyek                   |
| `/work/[slug]`         | Public | Detail case study proyek                      |
| `/services`            | Public | Daftar semua layanan                          |
| `/services/[slug]`     | Public | Detail layanan spesifik                       |
| `/articles`            | Public | Blog listing                                  |
| `/articles/[slug]`     | Public | Detail artikel                                |
| `/book`                | Public | Form booking layanan                          |
| `/contact`             | Public | Form kontak umum                              |
| `/chat`                | Public | AI chatbot full page                          |
| `/auth/login`          | Public | Login admin                                   |
| `/terms`               | Public | Terms & conditions                            |
| `/privacy`             | Public | Privacy policy                                |
| `/admin/dashboard`     | Admin  | Dashboard dengan statistik                    |
| `/admin/bookings`      | Admin  | Daftar booking dengan filter                  |
| `/admin/bookings/[id]` | Admin  | Detail booking + actions                      |
| `/admin/messages`      | Admin  | Inbox pesan                                   |
| `/admin/messages/[id]` | Admin  | Detail pesan + reply                          |
| `/admin/cms/services`  | Admin  | CRUD services                                 |
| `/admin/cms/articles`  | Admin  | CRUD articles                                 |
| `/admin/cms/knowledge` | Admin  | CRUD knowledge base                           |

### 3.2 Hardware Interfaces

Tidak ada antarmuka perangkat keras langsung. Sistem adalah aplikasi web.

### 3.3 Software Interfaces

**A. Google Sheets Integration**

- Type: REST API via Google Apps Script
- Operations: GET, POST, PATCH untuk bookings dan messages
- Data Format: JSON
- Authentication: JWT Token

**B. Google Gemini AI**

- Type: REST API
- Endpoint: POST /api/chat
- Input: Pesan pengguna + konteks knowledge base
- Output: AI-generated response

**C. NextAuth.js**

- Type: Node.js Library
- Provider: Credentials (username/password)
- Session: JWT tokens dalam HTTP-only cookies

### 3.4 Communications Interfaces

- **Protocol**: HTTPS only (TLS 1.2+)
- **Port**: 443
- **Content-Type**: application/json
- **CDN**: Vercel Edge Network

---

## 4. SYSTEM FEATURES

### 4.1 Home Page (Landing & Gateway)

**Feature ID**: SF-01 | **Priority**: High

**Functional Requirements:**

- FR-01.1: Hero section dengan CTA
- FR-01.2: Services overview (cards)
- FR-01.3: Featured projects (carousel)
- FR-01.4: Client testimonials
- FR-01.5: Statistics/achievements
- FR-01.6: Final CTA section

### 4.2 Work Page (Portfolio Listing)

**Feature ID**: SF-02 | **Priority**: High

**Functional Requirements:**

- FR-02.1: Grid display proyek (3 kolom desktop, 1 mobile)
- FR-02.2: Category filtering
- FR-02.3: Card interaction (hover, click to detail)
- FR-02.4: Load more pagination

### 4.3 Project Detail Page (Case Study)

**Feature ID**: SF-03 | **Priority**: Medium

**Functional Requirements:**

- FR-03.1: Project header (hero image, title, category)
- FR-03.2: Project description (Markdown)
- FR-03.3: Image gallery
- FR-03.4: Related projects

### 4.4 Services Page

**Feature ID**: SF-04 | **Priority**: High

**Functional Requirements:**

- FR-04.1: Service listing
- FR-04.2: Service detail page
- FR-04.3: Booking integration (link ke form)

### 4.5 Contact Page & Booking System

**Feature ID**: SF-05 | **Priority**: Critical

**Functional Requirements:**

- FR-05.1: Contact form (Name, Email, Phone, Service, Message)
- FR-05.2: Booking form (tambahan: Company, Budget, Date)
- FR-05.3: Form validation (client + server side)
- FR-05.4: Automatic order number generation (ORD-YYYYMMDD-XXX)
- FR-05.5: Confirmation dan email otomatis
- FR-05.6: Google Sheets integration
- FR-05.7: Quick WhatsApp contact

### 4.6 AI Chatbot Assistant

**Feature ID**: SF-06 | **Priority**: High

**Functional Requirements:**

- FR-06.1: Chat interface (floating button, expandable window)
- FR-06.2: AI response generation (Google Gemini)
- FR-06.3: Knowledge base (admin-managed FAQ)
- FR-06.4: Conversation flow (welcome message, typing indicator)
- FR-06.5: Session management (simpan di localStorage)
- FR-06.6: Escalation to human (redirect ke form kontak)

### 4.7 Admin Dashboard

**Feature ID**: SF-07 | **Priority**: Critical

**Functional Requirements:**

- FR-07.1: Authentication & access control
- FR-07.2: Key metrics display (Total Booking, Messages, New items)
- FR-07.3: Monthly overview chart (bookings per month)
- FR-07.4: Recent bookings table (3 terakhir)
- FR-07.5: Notification bell dengan badge count

### 4.8 Booking Management System

**Feature ID**: SF-08 | **Priority**: Critical

**Functional Requirements:**

- FR-08.1: Booking list view (card/table)
- FR-08.2: Search & filter (name, email, service, status)
- FR-08.3: Load more pagination (10 item awal, +10 per load)
- FR-08.4: Booking detail page (header, contact, message, sidebar)
- FR-08.5: Auto-mark as Read (saat admin lihat detail)
- FR-08.6: Auto-update to Contacted (saat klik tombol kontak)
- FR-08.7: Status management (dropdown New/Read/Contacted/Completed/Cancelled)
- FR-08.8: Export to CSV
- FR-08.9: Soft delete booking (mark as deleted, hide from list)

**Status Workflow:**

```
New → Read (saat dilihat) → Contacted (saat klik WA/Email) → Completed/Cancelled
```

### 4.9 Message Management System

**Feature ID**: SF-09 | **Priority**: Critical

**Functional Requirements:**

- FR-09.1: Message inbox (list dengan status)
- FR-09.2: Search & filter (name, email, ticket number)
- FR-09.3: Load more pagination
- FR-09.4: Message detail page (header, content, sidebar)
- FR-09.5: Auto-mark as Read (saat admin lihat)
- FR-09.6: Auto-update to Replied (saat klik Reply)
- FR-09.7: Pre-filled email reply template
- FR-09.8: Ticket number generation (TKT-YYYYMMDD-XXX)
- FR-09.9: Soft delete message (mark as deleted, hide from inbox)

**Status Workflow:**

```
New → Read (saat dilihat) → Replied (saat klik Reply)
```

### 4.10 Content Management System (CMS)

**Feature ID**: SF-10 | **Priority**: Medium

**Functional Requirements:**

- FR-10.1: Service management (CRUD)
- FR-10.2: Article/blog management (CRUD, Markdown editor)
- FR-10.3: Knowledge base management (untuk chatbot)
- FR-10.4: Media library (upload images)
- FR-10.5: Content preview

---

## 5. OTHER NONFUNCTIONAL REQUIREMENTS

### 5.1 Performance Requirements

| ID     | Requirement          | Target               | Priority |
| ------ | -------------------- | -------------------- | -------- |
| NFR-01 | Page load time       | < 3 detik (3G)       | High     |
| NFR-02 | Time to Interactive  | < 3.5 detik          | High     |
| NFR-03 | API response (read)  | < 2 detik (95%)      | Medium   |
| NFR-04 | API response (write) | < 5 detik (95%)      | Medium   |
| NFR-05 | Concurrent users     | 100 tanpa degradasi  | Medium   |
| NFR-06 | Image size           | < 200KB, format WebP | High     |
| NFR-07 | Initial JS bundle    | < 200KB (gzipped)    | Medium   |

### 5.2 Safety Requirements

| ID     | Requirement        | Implementation                           | Priority |
| ------ | ------------------ | ---------------------------------------- | -------- |
| NFR-08 | Data backup        | Google Sheets auto-save, export mingguan | High     |
| NFR-09 | Error handling     | Semua error ditangkap dan di-log         | High     |
| NFR-10 | Input sanitization | DOMPurify untuk rich text                | Critical |

### 5.3 Security Requirements

| ID     | Requirement       | Implementation              | Priority |
| ------ | ----------------- | --------------------------- | -------- |
| NFR-11 | Authentication    | NextAuth.js dengan JWT      | Critical |
| NFR-12 | Authorization     | Role-based access (Admin)   | High     |
| NFR-13 | HTTPS             | TLS 1.2+, Vercel auto-HTTPS | Critical |
| NFR-14 | API Security      | Validasi JWT setiap request | Critical |
| NFR-15 | Password Security | Hashed dengan bcrypt        | Critical |
| NFR-16 | CSRF Protection   | NextAuth.js built-in        | High     |

### 5.4 Software Quality Attributes

| ID     | Attribute       | Target                                  | Priority |
| ------ | --------------- | --------------------------------------- | -------- |
| NFR-17 | Usability       | Booking selesai < 2 menit               | High     |
| NFR-18 | Accessibility   | WCAG 2.1 AA                             | High     |
| NFR-19 | Maintainability | TypeScript, ESLint, arsitektur komponen | High     |
| NFR-20 | Scalability     | Dapat scale 10x traffic                 | Medium   |
| NFR-21 | Reliability     | 99.9% uptime                            | High     |
| NFR-22 | Portability     | Semua browser/OS utama                  | High     |
| NFR-23 | SEO             | Score Lighthouse > 90                   | High     |

### 5.5 SEO Requirements

Implementasi SEO best practices untuk meningkatkan visibility di search engines:

| ID     | Requirement       | Implementation                                          | Priority |
| ------ | ----------------- | ------------------------------------------------------- | -------- |
| SEO-01 | Meta Tags         | Title, description, keywords pada setiap halaman        | Critical |
| SEO-02 | Open Graph        | og:title, og:description, og:image untuk social sharing | High     |
| SEO-03 | Twitter Cards     | twitter:card, twitter:title, twitter:image              | Medium   |
| SEO-04 | Sitemap           | Auto-generated sitemap.xml                              | High     |
| SEO-05 | Robots.txt        | Konfigurasi crawling yang tepat                         | High     |
| SEO-06 | Canonical URLs    | Prevent duplicate content issues                        | Medium   |
| SEO-07 | Structured Data   | JSON-LD untuk Article, Service, Organization            | High     |
| SEO-08 | Image Alt Text    | Deskriptif alt text pada semua gambar                   | High     |
| SEO-09 | Heading Hierarchy | Single H1 per page, proper H2-H6 structure              | High     |
| SEO-10 | URL Structure     | Clean, readable URLs dengan slugs                       | High     |
| SEO-11 | Performance       | Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1     | Critical |
| SEO-12 | Mobile First      | Responsive design, mobile-friendly                      | Critical |

**Meta Tags Implementation:**

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Nusa Creative Studio',
  description: 'Creative studio for branding, web design, and digital solutions',
  keywords: ['creative studio', 'branding', 'web design', 'indonesia'],
  openGraph: { ... },
  twitter: { ... }
}
```

### 5.6 Accessibility Requirements (WCAG 2.1 AA)

Sistem harus accessible untuk semua pengguna, termasuk yang memiliki disabilitas:

| ID      | Category       | Requirement           | Implementation                                | Priority |
| ------- | -------------- | --------------------- | --------------------------------------------- | -------- |
| A11Y-01 | Perceivable    | Text Alternatives     | Alt text pada semua images                    | Critical |
| A11Y-02 | Perceivable    | Color Contrast        | Minimum ratio 4.5:1 untuk text                | Critical |
| A11Y-03 | Perceivable    | Resize Text           | Dapat zoom 200% tanpa loss of content         | High     |
| A11Y-04 | Perceivable    | Non-text Content      | Icons dengan aria-label                       | High     |
| A11Y-05 | Operable       | Keyboard Navigation   | Semua fungsi accessible via keyboard          | Critical |
| A11Y-06 | Operable       | Focus Visible         | Clear focus indicators                        | Critical |
| A11Y-07 | Operable       | Skip Links            | Skip to main content link                     | Medium   |
| A11Y-08 | Operable       | No Keyboard Traps     | User bisa navigate keluar dari semua komponen | Critical |
| A11Y-09 | Understandable | Language              | `lang="id"` pada html element                 | High     |
| A11Y-10 | Understandable | Labels                | Form inputs dengan associated labels          | Critical |
| A11Y-11 | Understandable | Error Messages        | Clear, helpful error messages                 | High     |
| A11Y-12 | Understandable | Consistent Navigation | Same navigation pattern across pages          | High     |
| A11Y-13 | Robust         | Valid HTML            | W3C valid HTML5 markup                        | High     |
| A11Y-14 | Robust         | ARIA                  | Proper ARIA roles, states, properties         | High     |

**Accessibility Implementation Examples:**

```tsx
// Accessible Button
<Button aria-label="Submit booking form">Submit</Button>

// Form dengan labels
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" aria-required="true" />

// Skip link
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// Image dengan alt
<Image src="/hero.jpg" alt="Team collaborating on design project" />

// Semantic HTML
<nav aria-label="Main navigation">...</nav>
<main id="main-content">...</main>
<footer>...</footer>
```

**Accessibility Testing Tools:**

- Lighthouse Accessibility Audit
- WAVE Web Accessibility Evaluator
- axe DevTools
- Keyboard navigation testing
- Screen reader testing (VoiceOver, NVDA)

### 5.7 Business Rules

| ID    | Rule                                                           |
| ----- | -------------------------------------------------------------- |
| BR-01 | Booking workflow: New → Read → Contacted → Completed/Cancelled |
| BR-02 | Message workflow: New → Read → Replied                         |
| BR-03 | Order number format: ORD-YYYYMMDD-XXX                          |
| BR-04 | Ticket number format: TKT-YYYYMMDD-XXX                         |
| BR-05 | Status tidak bisa mundur (Completed → New)                     |
| BR-06 | Hanya admin terotentikasi yang bisa akses /admin/\*            |
| BR-07 | Notification bell menampilkan count item "New" saja            |
| BR-08 | Session berakhir setelah 7 hari tidak aktif                    |
| BR-09 | Jam operasional: Senin-Jumat, 09:00-17:00 WIB                  |
| BR-10 | WhatsApp: +62 851-2802-5700                                    |

---

## 6. OTHER REQUIREMENTS

### Database Schema (Google Sheets)

**Sheet 1: Bookings**
| Column | Type | Description |
|--------|------|-------------|
| Timestamp | ISO 8601 | Waktu pengajuan |
| Order Number | Text | ORD-YYYYMMDD-XXX |
| Name | Text | Nama klien |
| Email | Email | Email klien |
| Phone | Text | Nomor telepon |
| Company | Text | Nama perusahaan (optional) |
| Service | Text | Layanan yang dipilih |
| Budget | Text | Range budget |
| Message | Long Text | Deskripsi proyek |
| Status | Enum | New/Read/Contacted/Completed/Cancelled |
| Row Index | Auto | Unique ID |

**Sheet 2: Messages**
| Column | Type | Description |
|--------|------|-------------|
| Timestamp | ISO 8601 | Waktu dikirim |
| Ticket Number | Text | TKT-YYYYMMDD-XXX |
| Name | Text | Nama pengirim |
| Email | Email | Email pengirim |
| Service | Text | Topik layanan |
| Message | Long Text | Isi pesan |
| Status | Enum | New/Read/Replied |
| Row Index | Auto | Unique ID |

### Deployment Requirements

- **Platform**: Vercel
- **Environment Variables**: NEXTAUTH_SECRET, NEXTAUTH_URL, GOOGLE_SHEETS_API_URL, GEMINI_API_KEY
- **Build Command**: `bun run build`
- **Node Version**: 18.x

### Deployment & Access Information

#### Live Application

| Item                  | Value                                         |
| --------------------- | --------------------------------------------- |
| **Production URL**    | https://nusa-studio.vercel.app                |
| **Admin Panel**       | https://nusa-studio.vercel.app/auth/login     |
| **GitHub Repository** | https://github.com/raflimaulanayh/nusa-studio |
| **Status**            | ✅ Production                                 |

#### Demo Account (Admin Panel)

> ⚠️ **Note**: Gunakan credentials ini untuk testing dan demo purposes.

| Field        | Value           |
| ------------ | --------------- |
| **Email**    | `admin@ncs.com` |
| **Password** | `admin123`      |

#### External Services

| Service                | Description                                     | Link                                                                                                                                                |
| ---------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Google Sheets**      | Database untuk Bookings, Messages, dan CMS data | [View Spreadsheet](https://docs.google.com/spreadsheets/d/1HizlG1xpSUnoSSihHzaFxXwklKzQUOlOZOqJKMRSBQI/edit?usp=sharing)                            |
| **Google Drive**       | Penyimpanan gambar, video, dan asset files      | Media storage untuk portfolio dan artikel                                                                                                           |
| **Google Apps Script** | Backend API untuk CRUD operations               | [View Apps Script](https://docs.google.com/spreadsheets/d/1HizlG1xpSUnoSSihHzaFxXwklKzQUOlOZOqJKMRSBQI/edit?usp=sharing) (Extensions > Apps Script) |
| **Google Gemini AI**   | AI API untuk chatbot                            | Configured via environment variable                                                                                                                 |
| **Vercel**             | Hosting platform                                | Auto-deployed from GitHub                                                                                                                           |

---

## APPENDIX A: GLOSSARY

| Term              | Definition                                                       |
| ----------------- | ---------------------------------------------------------------- |
| Admin Panel       | Antarmuka backend untuk mengelola booking, pesan, dan konten     |
| Apps Script       | Platform JavaScript Google untuk memperluas Google Workspace     |
| Booking           | Permintaan layanan yang diajukan oleh calon klien                |
| CMS               | Content Management System untuk mengelola konten website         |
| JWT               | JSON Web Token, digunakan untuk autentikasi                      |
| Load More         | Pola paginasi yang memuat item tambahan saat tombol diklik       |
| Optimistic Update | Update UI sebelum konfirmasi API untuk kecepatan yang dirasakan  |
| Order Number      | Identifikasi unik untuk setiap booking (ORD-YYYYMMDD-XXX)        |
| SWR               | Library React Hooks untuk data fetching (stale-while-revalidate) |
| Ticket Number     | Identifikasi unik untuk setiap pesan (TKT-YYYYMMDD-XXX)          |

---

## APPENDIX B: ANALYSIS MODELS

### UML Diagrams (PlantUML)

Semua UML diagram tersedia dalam format PlantUML di folder `docs/uml/`. Gunakan PlantUML viewer atau extension untuk melihat diagram.

**File References:**

| Diagram Type                 | File Location                                                                             | Description                                                               |
| ---------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Use Case Diagram             | [`docs/uml/use-case-diagram.puml`](/docs/uml/use-case-diagram.puml)                       | Diagram use case untuk semua actors (Public User, Admin, Content Manager) |
| Activity: Booking Submission | [`docs/uml/activity-booking-submission.puml`](/docs/uml/activity-booking-submission.puml) | Alur proses pengajuan booking oleh client                                 |
| Activity: Booking Management | [`docs/uml/activity-booking-management.puml`](/docs/uml/activity-booking-management.puml) | Alur manajemen booking oleh admin                                         |
| Activity: Chatbot            | [`docs/uml/activity-chatbot.puml`](/docs/uml/activity-chatbot.puml)                       | Alur interaksi AI chatbot                                                 |
| Class Diagram                | [`docs/uml/class-diagram.puml`](/docs/uml/class-diagram.puml)                             | Struktur class, entities, enums, dan relationships                        |
| Sequence: Booking Submission | [`docs/uml/sequence-booking-submission.puml`](/docs/uml/sequence-booking-submission.puml) | Sequence pengajuan booking client → API → Sheets                          |
| Sequence: Auto Status Update | [`docs/uml/sequence-auto-status-update.puml`](/docs/uml/sequence-auto-status-update.puml) | Sequence optimistic update saat klik contact                              |
| Sequence: Chatbot            | [`docs/uml/sequence-chatbot.puml`](/docs/uml/sequence-chatbot.puml)                       | Sequence interaksi chatbot dengan Gemini AI                               |
| Sequence: Authentication     | [`docs/uml/sequence-authentication.puml`](/docs/uml/sequence-authentication.puml)         | Sequence login, session, dan logout                                       |
| Multilayer Architecture      | [`docs/uml/multilayer-architecture.puml`](/docs/uml/multilayer-architecture.puml)         | Arsitektur sistem (Presentation, Application, Business, Data)             |

### Use Case Diagram: Administrator

```
┌──────────────┐
│ Administrator│
└──────┬───────┘
       │
       ├──► Login ke Admin Panel
       ├──► View Dashboard
       ├──► Manage Bookings
       │    ├──► View List
       │    ├──► View Detail
       │    ├──► Update Status
       │    ├──► Contact Client
       │    └──► Export Data
       │
       ├──► Manage Messages
       │    ├──► View Inbox
       │    ├──► View Detail
       │    ├──► Reply to Message
       │    └──► Update Status
       │
       └──► Manage Content (CMS)
```

### State Diagram: Booking Workflow

```
┌─────┐
│ New │ ◄── Initial state (booking submitted)
└──┬──┘
   │ (Admin views booking)
   ▼
┌──────┐
│ Read │
└──┬───┘
   │ (Admin clicks WhatsApp/Email)
   ▼
┌───────────┐
│ Contacted │
└─────┬─────┘
      │ (Manual status change)
      ├──► Completed
      └──► Cancelled
```

### State Diagram: Message Workflow

```
┌─────┐
│ New │ ◄── Initial state (message received)
└──┬──┘
   │ (Admin views message)
   ▼
┌──────┐
│ Read │
└──┬───┘
   │ (Admin clicks Reply)
   ▼
┌─────────┐
│ Replied │ ◄── Terminal state
└─────────┘
```

---

## Document History

| Version | Date       | Author           | Changes                                                        |
| ------- | ---------- | ---------------- | -------------------------------------------------------------- |
| 1.0     | 01-12-2025 | Development Team | Initial SRS creation                                           |
| 1.5     | 10-01-2026 | Development Team | Added admin panel requirements                                 |
| 2.0     | 18-01-2026 | Development Team | Added auto-status updates, optimistic UI, load more pagination |
| 2.1     | 18-01-2026 | Development Team | Added UML diagrams (PlantUML files)                            |

---

**End of Software Requirements Specification**
