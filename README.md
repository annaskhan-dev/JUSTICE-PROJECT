# 🏛️ JusticeEase — Full-Stack Pakistan Penal Code Discovery Engine

An enterprise-ready, decoupled full-stack platform engineered to parse unstructured legal codices, store relational structures via optimized database indices, and serve data down into an interactive high-density search interface.

---

## 🧭 System Architecture & Operation Lifecycle

The platform segregates infrastructure responsibilities into isolated layers: asynchronous automation pipelines, structured persistence schemas, controller routing APIs, and reactive view environments.

### End-to-End Application Data Flow
```mermaid
graph LR
    %% Theme Setup
    classDef client fill:#f4f6f9,stroke:#001A72,stroke-width:2px,color:#1f2937;
    classDef server fill:#001A72,stroke:#001A72,stroke-width:1px,color:#ffffff;
    classDef database fill:#ffffff,stroke:#10b981,stroke-width:2px,color:#1f2937;
    classDef pipeline fill:#6b7280,stroke:#374151,stroke-width:1px,color:#ffffff;

    %% Ingestion Track
    subgraph ETL [Data Ingestion Pipeline]
        A[PPC PDF/Text]:::pipeline -->|extract.js| B[lawsData.json]:::pipeline
        B -->|seed.mongodb.js| C[(MongoDB Atlas)]:::database
    end

    %% Client / Server Lifecycle
    subgraph UI [justice-frontend]
        D[Search Interface]:::client -->|API Service Call| E[Axios Instance]:::client
    end

    subgraph API [justice-backend]
        E -->|HTTP GET /api/laws| F[server.js Entry]:::server
        F -->|Express Router| G[LawRoutes.js]:::server
        G -->|Sanitization| H[lawController.js]:::server
    end

    %% Storage Hook
    H -->|Mongoose Schema Queries| C
    C -->|JSON Payload Response| H
    H -->|Status 200 OK| E
    E -->|State Update Re-Render| D

    %% Link Cleanups
    style ETL fill:none,stroke:#d1d5db,stroke-width:1px,stroke-dasharray: 5 5
    style UI fill:none,stroke:#d1d5db,stroke-width:1px,stroke-dasharray: 5 5
    style API fill:none,stroke:#d1d5db,stroke-width:1px,stroke-dasharray: 5 5
