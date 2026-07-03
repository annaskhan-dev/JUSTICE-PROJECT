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

    %% Presentation Tier (Client)
    subgraph Frontend [justice-frontend]
        A[Home.jsx / Search UI]:::client -->|Triggers Async Action| B[services/api.js]:::client
        M[UI Micro-Grid Matrix]:::client -.->|Re-renders Search Results| A
    end

    %% Routing & Logic Tier (Server API)
    subgraph Backend [justice-backend]
        B -->|HTTP GET Request /api/laws| C[server.js Entry Point]:::server
        C -->|Express Router| D[routes/LawRoutes.js]:::server
        D -->|Invokes Query Sanitization| E[controllers/lawController]:::server
    end

    %% Infrastructure Data Pipelines (ETL)
    subgraph Data Pipeline [Data Ingestion Pipeline]
        X[Pakistan Penal Code.pdf]:::pipeline -->|Node Script Engine| Y(extract.js):::pipeline
        Y -->|Generates Structured Fixture| Z[lawsData.json]:::pipeline
        Z -->|Database Seeding Script| W(scripts/seed.mongodb.js):::pipeline
    end

    %% Persistence Tier (Database)
    subgraph Database [Database Cluster]
        E -->|Mongoose Schema / Law.js| F[(MongoDB Law Collection)]:::database
        W -->|Hydrates Production Collections| F
    end

    %% Response Flow Lifecycle
    F -->|Returns Indexed Query Array < 50ms| E
    E -->|Sends JSON Payload Status 200| B
    B -->|Hydrates Component State| M

    %% Formatting Links
    linkStyle default stroke:#1F110A,stroke-width:1px;