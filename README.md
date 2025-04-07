# 🚀 University Internship Management System
_A microservices architecture with Spring Cloud Gateway and Eureka service discovery_

## 📌 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [API Documentation](#-api-documentation)
- [Development Guide](#-development-guide)
- [Troubleshooting](#-troubleshooting)

## 🌟 Features
| Feature               | Description                          | Implementation Proof              |
|-----------------------|--------------------------------------|-----------------------------------|
| Service Discovery     | Eureka-server for dynamic scaling    | ![Eureka Dashboard](./docs/images/eureka.png) |
| API Gateway           | Route filtering & load balancing     | [Gateway Config](./config/GatewayConfig.java) |
| JWT Authentication    | Secured endpoints                    | [JWT Filter](./gateway/src/main/java/com/example/gateway/filters/JwtFilter.java) |
| Swagger Documentation | Auto-generated API docs              | [View Docs](http://localhost:8081/swagger-ui.html) |

## 🛠 Tech Stack
- **Service Discovery**: Eureka Server
- **API Gateway**: Spring Cloud Gateway
- **Microservices**:
  - `evenement-service` (Port: 8081)
  - `soutenance-service` (Port: 8082)
- **Database**: MySQL 8.0
- **Auth**: JWT
- **Tools**:
  ```bash
  Java 17 | Maven 3.9.6 | Docker 24.0
