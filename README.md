# 🏛️ JusticeEase — Full-Stack Pakistan Penal Code Discovery Engine

An enterprise-ready, decoupled full-stack platform engineered to parse unstructured legal codices, store relational structures via optimized database indices, and serve data down into an interactive high-density search interface.

---

## 🧭 System Architecture & Dynamic Flow Chart

The system operates over a modular decoupled layout separating user UI context lifecycles, business logic controller APIs, and data indexing pipelines.

### Application Architecture Flow
GitHub will automatically render the following code block into an interactive architectural diagram:

```mermaid
graph TD
    %% Styling definitions
    classDef client fill:#F6EFE5,stroke:#1F110A,stroke-width:2px,color:#1F110A;
    classDef server fill:#001A72,stroke:#001A72,stroke-width:1px,color:#FFFFFF;
    classDef database fill:#ffffff,stroke:#1F110A,stroke-width:2px,color:#1F110A;
    classDef pipeline fill:#664B5E,stroke:#664B5E,stroke-width:1px,color:#FFFFFF;

    %% Data Ingestion Pipeline (Top Layer)
    subgraph Pipeline [1. Data Ingestion Pipeline ETL]
        X[Pakistan Penal Code.pdf]:::pipeline -->|Node Extraction Engine| Y(extract.js):::pipeline
        Y -->|Generates Local Structured File| Z[lawsData.json]:::pipeline
        Z -->|Database Seeding Script| W(scripts/seed.mongodb.js):::pipeline
    end

    %% Database Core Storage
    subgraph DB [2. Core Database Layer]
        F[(MongoDB Law Collection)]:::database
        W -->|Hydrates Production Collections| F
    end

    %% Application Core Lifecycle (Bottom Layer)
    subgraph AppFlow [3. Request & Response Lifecycle]
        A[Home.jsx / Search UI Component]:::client -->|Triggers Async Event| B[services/api.js]:::client
        B -->|Asynchronous HTTP GET Request| C[server.js Entry Point]:::server
        C -->|Express API Router Link| D[routes/LawRoutes.js]:::server
        D -->|Invokes Input Query Sanitization| E[controllers/lawController]:::server
        E -->|Queries Mongoose Schema Layout / Law.js| F
        F -.->|Returns Indexed Array Results < 50ms| E
        E -.->|Sends Clean JSON Response Payload Status 200| B
        B -.->|Updates Global State Matrix Engine| M[UI Micro-Grid Matrix Layout]:::client
    end

    %% Links
    linkStyle default stroke:#1F110A,stroke-width:1px;
