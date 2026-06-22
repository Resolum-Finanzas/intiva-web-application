# Intiva — Automotive Credit

`intiva-web-application` is the financial web application of the Intiva project, designed to simulate vehicle credits using the French amortization method and the Smart Purchase (Compra Inteligente) modality.

This application provides an interface to simulate credits, manage catalogs, handle users and profiles, configure settings, and navigate through an experience built with i18n and Tailwind CSS.

## Purpose

In the current version, the application is designed to:

- Simulate vehicle credits using the French amortization method
- Generate payment schedules including partial and total grace periods
- Calculate financial indicators such as VAN and TIR
- Support the Smart Purchase (Compra Inteligente) modality with balloon payments
- Manage product or service catalogs
- Control authentication and user sessions
- Handle user profiles and settings
- Provide a multilingual experience with i18n
- Offer navigation with React Router and remote state management with React Query

## Bounded Contexts

### Analytics

The Analytics context handles simulations and credit data analysis.

Main responsibility:

- process and expose simulation results
- display financial behavior metrics

Main domain concept:

- `Simulation`

### Catalog

The Catalog context manages catalogs of available products or plans.

Main responsibility:

- list and filter catalog items
- manage catalog resources

Main domain concept:

- `Catalog`

### Home

The Home context exposes the initial screen and main navigation.

Main responsibility:

- present welcome content and platform value proposition
- link to the main sections of the application

Main domain concept:

- `Dashboard`

### IAM

The IAM context manages user identity and authentication.

Main responsibility:

- authenticate users and maintain sessions
- handle registration and access

Main domain concept:

- `User`

### Profile

The Profile context handles personal data and user preferences.

Main responsibility:

- store user preferences
- display profile information

Main domain concept:

- `Profile`

### Settings

The Settings context manages application configurations.

Main responsibility:

- handle application options and settings
- expose institutional credit parameters such as interest rates and insurance rates

Main domain concept:

- `Setting`

### Simulator

The Simulator context manages the credit simulation experience.

Main responsibility:

- calculate credit values using the French amortization method
- support balloon payments and grace periods
- display payment schedules and financial indicators (VAN, TIR, TCEA)

Main domain concept:

- `Credit Simulation`

### Shared

The Shared context groups shared components and utilities.

Main responsibility:

- reuse UI components and common functions
- provide infrastructure for the application

Main domain concept:

- `Shared Component`

## Architecture

Each context follows a structure inspired by DDD principles.

### Domain Layer

Contains the core business concepts and domain rules.

Responsibilities:

- define entities
- enforce business rules

### Application Layer

Coordinates use cases and application flows.

Responsibilities:

- orchestrate domain entities and infrastructure calls
- expose use cases to the presentation layer

### Infrastructure Layer

Contains technical implementations required by the project.

Responsibilities:

- define API calls and external services
- implement technical adapters

### Presentation Layer

Exposes views and sections of the application to the user.

Responsibilities:

- present data in the interface
- handle user interactions
- coordinate with the application layer

## Project Structure

```text
intiva/
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
└── src/
    ├── app/
    │   ├── index.css
    │   └── main.tsx
    ├── assets/
    ├── core/
    │   ├── enums/
    │   ├── i18n/
    │   ├── navigation/
    │   ├── network/
    │   └── storage/
    ├── features/
    │   ├── analytics/
    │   │   ├── data/
    │   │   ├── domain/
    │   │   ├── presentation/
    │   │   └── index.ts
    │   ├── catalog/
    │   │   ├── data/
    │   │   ├── domain/
    │   │   ├── presentation/
    │   │   └── index.ts
    │   ├── home/
    │   │   ├── presentation/
    │   │   └── index.ts
    │   ├── iam/
    │   │   ├── data/
    │   │   ├── domain/
    │   │   ├── presentation/
    │   │   └── index.ts
    │   ├── profile/
    │   │   ├── data/
    │   │   ├── domain/
    │   │   ├── presentation/
    │   │   └── index.ts
    │   ├── settings/
    │   │   ├── data/
    │   │   ├── domain/
    │   │   ├── presentation/
    │   │   └── index.ts
    │   └── simulator/
    │       ├── data/
    │       ├── domain/
    │       ├── presentation/
    │       └── index.ts
    ├── i18n/
    │   ├── en.json
    │   └── es.json
    └── shared/
        └── presentation/
            └── components/
                ├── error/
                ├── header/
                ├── i18n/
                ├── layout/
                ├── loader/
                ├── pagecontainer/
                └── index.ts
```

## Tech Stack

- TypeScript
- React 19
- Vite
- PNPM
- Tailwind CSS
- i18next
- React Router
- React Query (@tanstack/react-query)

## Installation

Project dependencies:

```bash
pnpm install
```

Additional dependencies:

```bash
pnpm add @tanstack/react-query awilix i18next i18next-browser-languagedetector lucide-react react react-dom react-i18next react-router-dom
pnpm install tailwindcss @tailwindcss/vite
```

## Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm preview
```