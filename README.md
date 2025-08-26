# AutoPilot Garage

This is a comprehensive web application for "AutoPilot Garage," a modern auto repair shop. The application provides a seamless experience for both customers and staff, leveraging cutting-edge technology for diagnostics, booking, and management.

## Key Features

### Customer Portal (`/`)

-   **Homepage**: An engaging landing page showcasing services, customer testimonials, and FAQs.
-   **Service Booking**: An intuitive online form for customers to book appointments.
-   **About & Contact**: Detailed information about the garage and easy ways to get in touch.
-   **User Authentication**: Secure login and signup for customers to manage their accounts.
-   **Account Dashboard**: A personal area for customers to view their vehicles, service history, book new appointments, and manage their profile.

### Admin Dashboard (`/dashboard`)

-   **Business Overview**: At-a-glance charts for revenue, job status, and customer growth.
-   **Work Order Management**: A Kanban-style board to track jobs from "Received" to "Complete".
-   **Appointment & Customer Management**: Detailed views for managing appointments and customer information.
-   **Inventory Tracking**: Tools to monitor and manage part inventory levels.
-   **AI-Powered Tools**:
    -   **Photo Analysis**: Upload or capture images of vehicle parts for AI-driven issue identification.
    -   **Report Generation**: Automatically generate diagnostic summaries and recommendations from raw data.

## Tech Stack

-   **Framework**: Next.js (with App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS with shadcn/ui components
-   **Generative AI**: Google's Gemini models via Genkit

To get started, explore the customer-facing site at the root URL or log in to the admin dashboard at `/dashboard/login` (credentials: `admin@autopilot.co.ke` / `admin1234`).
