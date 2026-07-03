## 📸 Client Application Interface Showcase
The UI client implements custom micro-scaled responsive data tiles designed with strict typography tracking metrics to guarantee compact corporate readability.

<table width="100%">
  <tr>
    <td width="50%"><b align="center">1. Main Search Portal</b><br><img src="justice-frontend/src/assets/images/ui-main.png" alt="Search Portal" width="100%"/></td>
    <td width="50%"><b align="center">2. Discovery Results Matrix</b><br><img src="justice-frontend/src/assets/images/ui-results.png" alt="Results Grid" width="100%"/></td>
  </tr>
</table>

---

## 🗄️ ETL Data Ingestion Pipeline & Database Infrastructure
A standout feature of this system is its capability to handle raw unstructured legal data sets and map them directly into searchable query arrays.

### Production Storage Layout (MongoDB Compass)
<table width="100%">
  <tr>
    <td width="50%"><b align="center">1. Database Collections</b><br><img src="justice-frontend/src/assets/images/db-collections.png" alt="Database Collections" width="100%"/></td>
    <td width="50%"><b align="center">2. Parsed Law Documents</b><br><img src="justice-frontend/src/assets/images/db-documents.png" alt="Hydrated Law Documents" width="100%"/></td>
  </tr>
</table>

---

## 🔐 Identity Access Management & Route Diagnostics
The backend incorporates dedicated authorization routers to manage platform access controls securely using tokenized hashing schemas.

### Authentication Diagnostics (Postman Workspace)
<table width="100%">
  <tr>
    <td width="50%"><b align="center">1. User Registration (POST /register)</b><br><img src="justice-frontend/src/assets/images/api-register.png" alt="User Registration Endpoint" width="100%"/></td>
    <td width="50%"><b align="center">2. Identity Verification (POST /login)</b><br><img src="justice-frontend/src/assets/images/api-login.png" alt="User Login Endpoint" width="100%"/></td>
  </tr>
</table>
# 🏛️ JusticeEase — Full-Stack Pakistan Penal Code Discovery Engine

An enterprise-ready, decoupled full-stack platform engineered to parse unstructured legal codices, store relational structures via optimized database indices, and serve data down into an interactive high-density search interface.

---

## 🧭 System Architecture & Operation Lifecycle

The system operates over a modular decoupled layout separating user UI context lifecycles, business logic controller APIs, and data indexing pipelines.

### End-to-End Application Data Flow
```mermaid
graph LR
    %% Styling definitions
    classDef client fill:#F6EFE5,stroke:#1F110A,stroke-width:2px,color:#1F110A;
    classDef server fill:#001A72,stroke:#001A72,stroke-width:1px,color:#FFFFFF;
    classDef database fill:#ffffff,stroke:#1F110A,stroke-width:2px,color:#1F110A;
    classDef pipeline fill:#664B5E,stroke:#664B5E,stroke-width:1px,color:#FFFFFF;

    %% Ingestion
    X[Pakistan Penal Code.pdf]:::pipeline -->|extract.js| Z[lawsData.json]:::pipeline
    Z -->|seed.mongodb.js| F[(MongoDB Law Collection)]:::database

    %% Frontend Request
    A[Home.jsx / Search UI]:::client -->|api.js| C[server.js Entry]:::server
    C -->|Express Router| D[LawRoutes.js]:::server
    D -->|Sanitization| E[lawController.js]:::server

    %% Database Link
    E -->|Mongoose Query| F
    F -.->|JSON Response < 50ms| E
    
    %% Return Path
    E -.->|Status 200 OK| A

    %% Formatting Links
    linkStyle default stroke:#1F110A,stroke-width:1px;

