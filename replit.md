# Mineral Balls - Makhana E-commerce Platform

## Overview

This is a full-stack e-commerce application for selling premium makhana (fox nuts/lotus seeds) products. The application follows a modern full-stack architecture with Express.js backend, React frontend, and PostgreSQL database integration using Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: Zustand for cart state management
- **Data Fetching**: TanStack React Query for server state management
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: In-memory storage with session-based cart management

### Database Design
- **Database**: PostgreSQL (configured via Drizzle)
- **Schema Management**: Drizzle Kit for migrations
- **Connection**: Neon Database serverless connection

## Key Components

### Database Schema
The application uses three main database tables:
- **Products**: Core product information including pricing, categories, nutritional data
- **Categories**: Product categorization system with slugs for URL routing
- **Cart Items**: Session-based shopping cart implementation

### Frontend Components
- **Page Components**: Home, Products, Product Detail, About, Benefits, Contact
- **UI Components**: Comprehensive shadcn/ui component library
- **Business Components**: Product cards, cart management, category navigation
- **Layout Components**: Header with navigation, Footer with company information

### Backend Services
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **API Routes**: RESTful endpoints for products, categories, and cart operations
- **Development Setup**: Vite integration for hot reloading in development

## Data Flow

1. **Client Requests**: React frontend makes API calls using TanStack React Query
2. **Server Processing**: Express.js routes handle requests and interact with storage layer
3. **Data Storage**: Drizzle ORM manages database operations with type safety
4. **State Management**: Client-side state managed through Zustand (cart) and React Query (server data)
5. **Session Handling**: Cart operations tied to session IDs for user persistence

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router
- **zustand**: State management library

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Utility for creating variant-based component APIs

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type safety and development experience
- **tsx**: TypeScript execution for Node.js

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Type Checking**: TypeScript compilation verification
4. **Database Migration**: Drizzle Kit handles schema updates

### Environment Configuration
- **Development**: Hot reloading with Vite middleware integration
- **Production**: Static file serving with Express.js
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

### Replit Integration
- **Runtime Error Overlay**: Development error handling
- **Cartographer Plugin**: Replit-specific development enhancements
- **Banner Integration**: Development environment indicators

The architecture prioritizes type safety, developer experience, and scalability while maintaining a clean separation of concerns between frontend and backend components.

## Changelog
- July 06, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.