System Documentation (Work-in-Progress)
Pharmacy Inventory System
Developer: Hasanor Dimasimapan

1. System Overview
1.1 Purpose
The Pharmacy Inventory Management System (PIMS) is a web-based application designed to:
•	Track medicine stock levels and expiration dates
•	Manage user roles and permissions
•	Provide real-time inventory updates
•	Generate operational reports

1.2 Technical Specifications
Category	Technology Stack
Frontend Framework	React 18 (TypeScript)
State Management	Zustand 4.0
API Communication	Axios 1.3 + React Query
Backend Framework	Node.js 18 + Express.js
Database System	Supabase (PostgreSQL)
Authentication	Supabase Auth + JWT
Realtime Services	Socket.IO 4.7 + Supabase Realtime
UI Components	Tailwind CSS 3.3 + ShadCN UI

2. System Architecture





2.2 Component Breakdown
Frontend Layer
•	Auth Module: Handles user authentication flows
•	Inventory Dashboard: Displays stock levels and alerts
•	Admin Console: Create/edit/delete user medicine.

Backend Layer
•	API Services: RESTful endpoints for CRUD operations
•	Realtime Engine: Socket.IO server for live updates
•	Database Proxy: Supabase client integration

Data Layer
•	PostgreSQL: Primary data store
•	Row-Level Security: Data access policies
•	Database Functions: Stored procedures for complex queries

3. Implementation Status
3.1 Completed Features
Module	Completion	Details
User Authentication	100%	Email/Password
Medicine Catalog	55%	CRUD operations implemented
Product/Medicine	80%	UI components nearly completed
Reporting Engine	65%	PDF generation complete


4. Development Guide
4.1 Prerequisites
•	Node.js v18+
•	Express 5+
•	Supabase account

4.2 Installation
# Clone repository
•	git clone https://github.com/org/pharmacy-inventory.git
# Install dependencies
•	cd frontend && npm install
•	cd backend && npm install

4.3	Configuration
•	4.1 Create .env files
•	Configure environment:
o	PORT = 7001
o	SUPABASE_URL = https://mrqgvv...
o	SUPABASE_KEY = eyJhbGciOiJIUzI1Ni…
o	JWT_SECRET= 3ZZpKqwLtRj/…
4.4 Testing
bash
•	Start development servers
o	npm run dev
5. Security Considerations
5.1 Authentication
•	JWT expiration: 24 hours
•	Password requirements: 6+ characters	
•	Protected routes
5.2 Data Protection
•	All database tables implement RLS
•	Sensitive fields encrypted at rest
3.2 Running the System
Component	|| Command || Access
Backend - npm run dev - localhost: 5001
Frontend - npm run dev - localhost:5173
MySQL -Start via XAMPP Control - localhost:3306
4 Development Setup
•	Configure Supabase for authentication and database
•	Launch backend: npm start dev
•	Run frontend:  npm start dev

5. Constraints
•	Must use Supabase for authentication and database 
•	Frontend must use Zustand for state management.
•	Backend must expose RESTful APIs using Express.
•	Socket.IO must be used for real-time ticket updates.
6. Assumptions and Dependencies
•	Users have internet access.
•	Axios is available for HTTP communication.
•	Socket.IO is configured for real-time communication.

