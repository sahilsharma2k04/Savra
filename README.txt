SAVRA – Teacher Insights Analytics Platform

Overview

SAVRA is a full-stack analytics platform designed to provide school
administrators with structured, real-time insights into teacher
performance, academic content creation, and engagement patterns across
grades and subjects.

This project demonstrates strong full-stack engineering fundamentals
including data modeling, aggregation pipelines, secure authentication,
global state architecture, and scalable system design.

------------------------------------------------------------------------

Admin Access

Email: admin@savra.com Password: admin123

------------------------------------------------------------------------

Key Engineering Objectives

• Design a secure analytics backend using JWT authentication
• Build dynamic MongoDB aggregation pipelines
• Implement global state management using React Context API
• Enable dynamic filtering with real-time UI updates
• Structure a scalable and modular full-stack architecture
• Demonstrate data integrity and duplicate prevention

------------------------------------------------------------------------

Technical Stack

Frontend - React - Tailwind CSS - Recharts (Data Visualization) - React
Router - Context API (AuthContext + FilterContext) - Axios with Request
Interceptor

Backend - Node.js - Express.js - MongoDB - Mongoose - JWT Authentication
Middleware

------------------------------------------------------------------------

Core Functional Modules

1. Authentication Layer

-   JWT-based login system
-   Protected backend routes
-   Token validation middleware
-   Axios interceptor for automatic Authorization header injection
-   Persistent session handling using localStorage

2. Dashboard Overview

Displays aggregated analytics including: - Active Teachers - Total
Lessons Created - Total Quizzes Conducted - Total Assessments
Generated - Most Active Teacher - Weekly Activity Trend (Area Chart) -
AI Pulse Summary (rule-based insight engine)

3. Teacher Insights Module

-   Teacher-level analytics breakdown
-   Weekly performance visualization
-   Class-wise and subject-wise insights
-   Dynamic response to global filters

4. Global Filtering System

Managed using FilterContext:

-   Grade-based filtering
-   Subject-based filtering
-   Time range selection (extensible)

All filters trigger backend refetch through controlled useEffect
dependencies.

------------------------------------------------------------------------

Data Aggregation Strategy

MongoDB Aggregation Pipeline is used to calculate analytics efficiently.

Overview Aggregation Flow:

1.  $match (Grade and Subject filtering)
2.  $group by teacherId and teacherName
3.  Conditional $sum for lesson/quiz/assessment counts
4.  $project to structure response

Totals Aggregation:

-   Aggregates matched activities
-   Computes totalLessons, totalQuizzes, totalAssessments

Weekly Trends:

-   Groups by day or week using MongoDB date operators
-   Returns structured dataset for visualization layer

This ensures server-side computation efficiency and reduces frontend
processing.

------------------------------------------------------------------------

Database Design & Data Integrity

Activity Schema:

{ teacherId: String, teacherName: String, activityType: [“lesson”,
“quiz”, “assessment”], subject: String, class: String, createdAt: Date }

Duplicate Prevention:

A compound unique index is implemented:

{ teacherId, activityType, createdAt, subject, class }

This ensures no duplicate academic activity entries and maintains data
integrity.

------------------------------------------------------------------------

Security Architecture

JWT Protection Middleware verifies:

Authorization: Bearer

Axios Interceptor Implementation:

API.interceptors.request.use((config) => { const token =
localStorage.getItem(“token”); if (token) { config.headers.Authorization
= Bearer ${token}; } return config; });

Benefits: - Centralized token handling - Clean separation of concerns -
Scalable API security pattern

------------------------------------------------------------------------

AI Pulse Summary Engine

Current implementation uses deterministic rule-based logic to generate
insights such as:

-   Identification of most active teacher
-   Total activity volume analysis
-   Contribution distribution trends

This system is architected to support future integration with real AI
agents (OpenAI, Gemini, etc.) for natural language insight generation.

------------------------------------------------------------------------

Scalability & Future Enhancements

1.  AI Agent Integration

-   Connect aggregation output to LLM APIs
-   Generate contextual performance narratives
-   Add anomaly detection and trend forecasting
-   Implement response caching

2.  Rate Limiting & API Governance

-   Add express-rate-limit middleware
-   Implement API throttling
-   Integrate request-level interceptor throttling
-   Protect against abuse and brute force

3.  Performance Optimization

-   Redis caching for aggregation-heavy endpoints
-   Query indexing optimization
-   Precomputed analytics snapshots

4.  Multi-Role Architecture

-   Admin
-   Principal
-   Teacher
-   Restricted analytics views

5.  Real-Time Dashboard

-   WebSocket integration
-   Live activity feed
-   Real-time analytics refresh

6.  Reporting & Exporting

-   PDF/CSV export generation
-   Scheduled report emails
-   AI-generated report summaries

7.  Expansion Modules (Currently Structured but Vacant)

-   Classrooms Analytics
-   Advanced Reporting Section

------------------------------------------------------------------------

How to Run Locally

Backend: 1. npm install 2. npm run dev

Frontend: 1. npm install 2. npm start

------------------------------------------------------------------------

Engineering Strengths Demonstrated

• Clean separation of frontend and backend responsibilities
• Proper state management using Context API
• Secure JWT-based authentication
• Server-side data aggregation for performance efficiency
• Data integrity enforcement through compound indexing
• Modular and scalable folder architecture
• Extensible design for AI and performance enhancements

------------------------------------------------------------------------

Conclusion

SAVRA is designed not just as a dashboard but as a scalable analytics
foundation.

It demonstrates:

-   Full-stack development competency
-   Secure API design principles
-   Aggregation-based data engineering
-   Clean React architecture
-   Extensible system thinking

The system is production-ready in structure and designed for future
expansion into a comprehensive academic analytics platform.
