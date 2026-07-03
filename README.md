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

<img width="1595" height="1005" alt="api-register png" src="https://github.com/user-attachments/assets/7c16e85b-9e91-46df-9fec-9916facc8b2f" />
<img width="1607" height="1006" alt="api-login png" src="https://github.com/user-attachments/assets/6aa0196f-8bfd-4c4a-96ca-51ef9cb3b540" />
<img width="1896" height="902" alt="ui-results png" src="https://github.com/user-attachments/assets/bf3552d0-ef12-494b-a5ea-e361618974d5" />
<img width="1896" height="912" alt="ui-main png" src="https://github.com/user-attachments/assets/717dad24-3b5e-4b37-8e81-2e5e5fa4f33f" />
<img width="1472" height="875" alt="db-documents png" src="https://github.com/user-attachments/assets/04a09f6a-339b-414a-b4c9-443597a3782c" />
<img width="1487" height="896" alt="db-collections png" src="https://github.com/user-attachments/assets/174e71e7-c032-45df-9aa5-2c722004c637" />



