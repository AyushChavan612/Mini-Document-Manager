# 📂 Mini Document Manager

A robust, full-stack document management system built with **Node.js**, **Express**, **MySQL**, and **React**. This application supports file uploads, antivirus scanning, metadata tracking, and bulk downloads.

---

## 🏗️ Architecture

```mermaid
flowchart LR
    %% Components
    subgraph Frontend [Frontend — React + Vite]
        UI["User Interface"]
    end

    subgraph Backend [Backend — Node.js]
        direction TB
        API["API Controller"]
        Zipper["Bulk Zip Streamer"]
        AV["Antivirus (ClamAV)"]
    end

    subgraph Data [Data Layer]
        Pool["MySQL Connection Pool"]
        SQL["MySQL Database"]
        Disk["Local Storage (uploads/)"]
    end

    %% Flows
    UI -->|Upload| API
    API -->|Scan| AV
    AV -->|Safe?| API
    API -->|Save| Disk
    API -->|Metadata| Pool
    Pool --> SQL
    
    %% Bulk Download
    UI -.->|Request Bulk| API
    API -.->|Stream| Zipper
    Disk -.->|Read Files| Zipper
    Zipper -.->|Pipe ZIP| UI