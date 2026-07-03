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
