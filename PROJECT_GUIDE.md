# Todo App Refactored --- Project Guide

Author: Evan Engels\
Project Type: Clean Code Refactoring\
Tech Stack: Node.js, Express, React, TypeScript, Docker, MySQL, SQLite,
Playwright, Jest

------------------------------------------------------------------------

# 1. Project Overview

This project is a refactored full-stack Todo application designed to
demonstrate:

-   Clean Code principles
-   Test-driven refactoring
-   Architecture isolation
-   Type safety using TypeScript
-   Dependency management and architecture rules
-   Full Dockerized development environment
-   Automated testing at multiple levels

The project includes:

-   Backend API (Node.js + Express + TypeScript)
-   Frontend (React + TypeScript + Vite)
-   Database (MySQL / SQLite)
-   End-to-end testing (Playwright)
-   Integration testing (Supertest)
-   Architecture validation (dependency-cruiser)
-   Code quality validation (ESLint + Prettier)

------------------------------------------------------------------------

# 2. Architecture

High-level architecture:

Client (React) ↓ Proxy (Traefik) ↓ Backend API (Express) ↓ Persistence
Layer ↓ Database (MySQL or SQLite)

The backend follows a layered architecture:

routes → services → persistence

This ensures separation of concerns and testability.

------------------------------------------------------------------------

# 3. Requirements

Required software:

-   Docker Desktop
-   Node.js 22+ (only required for local development)
-   npm

Recommended:

-   VSCode

------------------------------------------------------------------------

# 4. Installation

Clone the repository:

git clone `<repository-url>`{=html}

Enter project directory:

cd todo-app-refactored

npm install

nvm use

cd client
npm install

cd backend
npm install

------------------------------------------------------------------------

# 5. Running the Application

Start the full application:

docker compose up --build --watch

Access the application:

http://localhost

Database interface:

http://db.localhost

------------------------------------------------------------------------

# 6. Running Tests

All tests are run from the root directory.

## Backend tests

cd backend npm run quality

This runs:

-   Unit tests (Jest)
-   Integration tests (Supertest)
-   Architecture validation (dependency-cruiser)
-   Code formatting validation (Prettier)
-   Lint validation (ESLint)

------------------------------------------------------------------------

## Frontend build test

cd client npm run build

------------------------------------------------------------------------

## End-to-end tests

From project root:

npx playwright test

This tests:

-   Application startup
-   Todo creation
-   Todo completion
-   Todo deletion

------------------------------------------------------------------------

# 7. Project Structure

Root structure:

backend/ Backend API

client/ Frontend application

docs/ Architecture decisions and refactoring plan

e2e/ End-to-end tests

compose.yaml Docker orchestration

Dockerfile Container definitions

------------------------------------------------------------------------

# 8. Development Workflow

Start development:

docker compose up --watch

Stop environment:

docker compose down

Backend development commands:

cd backend

npm run dev npm run test npm run quality

Frontend development:

cd client

npm run dev npm run build

------------------------------------------------------------------------

# 9. Quality Assurance

Quality is enforced through:

Unit tests Integration tests E2E tests Architecture validation Type
safety Code linting Code formatting

All quality checks:

cd backend

npm run quality

------------------------------------------------------------------------

# 10. Refactoring Decisions

Major improvements introduced:

Migration to TypeScript Service layer introduction Architecture
isolation Dependency validation rules Centralized error handling Input
validation Full test coverage Docker-based reproducible environment

Architecture decisions are documented in:

docs/adr/

------------------------------------------------------------------------

# 11. Test Coverage Strategy

Tests implemented:

Unit tests Integration tests Persistence tests Error handling tests
End-to-end tests

Ensures safe refactoring and regression prevention.

------------------------------------------------------------------------

# 12. Deployment Strategy

Docker ensures:

Reproducibility Isolation Environment consistency Easy deployment

Start production environment:

docker compose up --build

------------------------------------------------------------------------

# 13. Demonstration Checklist

Before demonstration:

docker compose up --build

Open browser:

http://localhost

Run backend quality:

cd backend npm run quality

Run E2E tests:

npx playwright test

------------------------------------------------------------------------

# 14. Clean Code Principles Applied

Separation of concerns Single responsibility principle Dependency
isolation Type safety Architecture validation Test-driven refactoring

------------------------------------------------------------------------

# 15. Conclusion

This project demonstrates a full clean code refactoring process
including:

Architecture redesign Type safety implementation Comprehensive testing
Dependency management Clean development workflow Docker-based
reproducibility

The application is production-ready, testable, and maintainable.

# 16. Future Improvements

- Add authentication and authorization
- Add user management
- Add RGPD compliance
- Add password reset
- Add audit logging
- Add API versioning
- Add new 24 LTS Node version