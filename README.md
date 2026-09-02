# Project Cost Estimator API

> A NestJS REST API that estimates software project cost from structured
> requirements — built as a portfolio project to practise clean backend
> architecture end to end.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

## Overview

Freelancers and small agencies estimate project cost by feel. This API does it
from structured inputs: each project holds a set of requirements, and the
estimation engine weights them by complexity, developer seniority and regional
factors to produce a cost figure.

## Status

Built over roughly nine days in November 2025 as a deliberate-practice exercise
in backend architecture. **It runs locally; it is not deployed and has no CI
pipeline.** Not actively maintained.

**Implemented and working:**

- GitHub OAuth2 authentication with stateless JWT
- RBAC via guards and custom decorators
- Projects CRUD with soft deletes
- Nested requirements CRUD, scoped per project
- Cost estimation engine (complexity, seniority and regional weighting)
- PostgreSQL schema through Prisma, with 3 migrations
- Environment validation (Joi) and DTO validation (class-validator)
- Swagger documentation
- 9 test files, unit plus a separate e2e configuration

**Not included:** CI pipeline, deployment, caching layer, and a currency
conversion module that was started but never finished.

## Tech Stack

| | |
|---|---|
| **Core** | NestJS, TypeScript |
| **Database** | PostgreSQL 16 |
| **ORM** | Prisma |
| **Auth** | OAuth2 (GitHub strategy) + stateless JWT |
| **Authorization** | RBAC with guards and decorators |
| **Validation** | Joi (env vars), class-validator (DTOs) |
| **Testing** | Jest, Supertest |
| **Infrastructure** | Docker Compose (local development) |
| **Architecture** | Modular monolith |

## Getting Started

### Prerequisites

- Node.js (LTS)
- Docker and Docker Compose
- npm or pnpm

### Installation

```bash
git clone https://github.com/jlescalonap/project-cost-estimator-api.git
cd project-cost-estimator-api
npm install
```

Set up the environment — update `.env` with your GitHub OAuth credentials:

```bash
cp .env.example .env
```

Start the database, run migrations and launch the app:

```bash
docker-compose up -d
npx prisma migrate dev
npm run start:dev
```

The API is served at `http://localhost:3000/api`, with Swagger docs at
`http://localhost:3000/api/docs`.

### Tests

```bash
npm run test        # unit
npm run test:e2e    # end-to-end
```

## Project Structure

Modular monolith — each domain owns its module, controller, service and DTOs.

```
src/
├── auth/           # OAuth2, JWT, guards, RBAC
├── projects/       # Project CRUD, soft deletes
├── requirements/   # Nested requirement CRUD
├── estimation/     # Cost calculation engine
├── prisma/         # Global database module
├── app.module.ts   # Root module and config validation
└── main.ts         # Entry point, global pipes, Swagger
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/auth/github` | Initiate GitHub OAuth flow |
| `GET` | `/api/auth/github/callback` | OAuth callback, returns JWT |

### Projects
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/projects` | Create a project |
| `GET` | `/api/projects` | List the user's projects |
| `GET` | `/api/projects/:id` | Get project details |
| `PATCH` | `/api/projects/:id` | Update a project |
| `DELETE` | `/api/projects/:id` | Soft delete a project |

### Requirements
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/projects/:projectId/requirements` | Add a requirement |
| `GET` | `/api/projects/:projectId/requirements` | List requirements |
| `GET` | `/api/projects/:projectId/requirements/:id` | Get requirement details |
| `PATCH` | `/api/projects/:projectId/requirements/:id` | Update a requirement |
| `DELETE` | `/api/projects/:projectId/requirements/:id` | Delete a requirement |

### Estimation
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/projects/:projectId/calculate-cost` | Calculate a cost estimate |

## License

MIT
