# CareerAI Platform

A comprehensive career management and AI-powered orientation platform built with Laravel 11 and React.

## Project Structure

- **backend/**: Laravel 11 API project.
- **frontend/**: React + Vite + Tailwind CSS frontend project.

## Main Features

- 🤖 AI Chatbot Assistant (Gemini Pro / 2.5 Flash)
- 📝 AI Cover Letter Generator
- 🧠 AI Career Quiz & Personality Analysis
- 📄 CV Builder with PDF Export
- 💼 Job Board & Favorites Management
- 👤 Secure User Profiles & Authentication

## Setup Instructions

### Backend
1. `cd backend`
2. `composer install`
3. `cp .env.example .env`
4. `php artisan key:generate`
5. Configure your database in `.env`
6. `php artisan migrate`
7. `php artisan serve`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## GitHub Repository
To push this to your own GitHub:
1. Create a new repository on GitHub.
2. Run: `git remote add origin YOUR_GITHUB_REPO_URL`
3. Run: `git push -u origin master`
