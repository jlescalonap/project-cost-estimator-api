# DevsWorth API

> **Professional Project Estimation for Serious Developers.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with NestJS](https://img.shields.io/badge/Built%20with-NestJS-red.svg)](https://nestjs.com/)

## Overview

DevsWorth API is a specialized backend solution designed to streamline project cost estimation. It uses an advanced algorithm to calculate software development costs based on variable complexity, developer seniority, and regional economic factors.

## Tech Stack

- **Core:** NestJS (Node.js), TypeScript
- **Database:** PostgreSQL 16
- **ORM:** Prisma (Type-safe database access)
- **Authentication:** OAuth2 (GitHub Strategy) + JWT (Stateless)
- **Authorization:** RBAC (Role-Based Access Control)
- **Caching/Queue:** Redis
- **Infrastructure:** Docker & Docker Compose
- **Validation:** Joi (Env vars) + class-validator (DTOs)
- **Architecture:** Modular Monolith

## Getting Started

### Prerequisites

- Node.js (LTS)
- Docker & Docker Compose
- pnpm (recommended) or npm

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/jlescalonap/devs-worth-api.git
    cd devs-worth-api
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Environment Setup:

    ```bash
    cp .env.example .env
    ```

    _Update `.env` with your GitHub OAuth Credentials._

4.  Start Infrastructure (DB & Redis):

    ```bash
    docker-compose up -d
    ```

5.  Run Migrations:

    ```bash
    npx prisma migrate dev
    ```

6.  Start the Application:
    ```bash
    npm run start:dev
    ```
    The API will be available at `http://localhost:3000/api`.

## Project Structure

The project follows a strict Modular Monolith architecture.

```
src/
├── auth/           # Authentication Domain (OAuth, JWT, Guards, RBAC)
├── projects/       # Project Management (CRUD, Soft Deletes)
├── requirements/   # Requirements Management (Nested CRUD)
├── estimation/     # Cost Calculator Engine
├── prisma/         # Global Database Module
├── app.module.ts   # Root Module & Config Validation
└── main.ts         # Entry point (Global Pipes, Swagger Setup)
```

## API Endpoints

### Authentication

- `GET /api/auth/github` - Initiate GitHub OAuth flow
- `GET /api/auth/github/callback` - OAuth callback (returns JWT)

### Projects

- `POST /api/projects` - Create a new project
- `GET /api/projects` - List user's projects
- `GET /api/projects/:id` - Get project details
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Soft delete project

### Requirements

- `POST /api/projects/:projectId/requirements` - Add requirement to project
- `GET /api/projects/:projectId/requirements` - List project requirements
- `GET /api/projects/:projectId/requirements/:id` - Get requirement details
- `PATCH /api/projects/:projectId/requirements/:id` - Update requirement
- `DELETE /api/projects/:projectId/requirements/:id` - Delete requirement

### Estimation

- `POST /api/projects/:projectId/calculate-cost` - Calculate project cost estimate

## License

This project is licensed under the MIT License.
