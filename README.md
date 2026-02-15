![alt text](diagram-export-2-14-2026-10_35_19-PM.png)
![alt text](diagram-export-2-14-2026-10_36_31-PM.png)
🚀 Cloud Native DevOps Platform

Production-grade Cloud Native microservices platform built on Azure Kubernetes Service (AKS) using GitOps, Helm, and ArgoCD with full CI/CD automation.

📌 Overview

This project demonstrates a complete DevOps lifecycle:

Microservices architecture (Frontend + Core + Auth)

Containerization with Docker
CI with GitHub Actions
Image registry via Azure Container Registry (ACR)
GitOps deployment using ArgoCD
Multi-environment setup (dev / staging / prod)
Kubernetes-native configuration with Helm
Ingress-based routing
Resilience layer between services
Monitoring integration
Persistent database layer (PostgreSQL)

This repository simulates a real-world production-ready DevOps workflow.
----------------------------------------------------------------
🏗 Architecture

The system is composed of:

Frontend (Static Web UI)
Core Service (Business Logic)
Auth Service (Authentication / Identity)
PostgreSQL (Stateful database)
NGINX Ingress Controller
ArgoCD GitOps Controller
Azure Monitor + Log Analytics

High-Level Flow
User → Public IP → Azure Load Balancer → NGINX Ingress → frontend → core-service → auth-service → PostgreSQL
----------------------------------------------------------------
CI/CD Flow:

Developer pushes code → GitHub Actions triggers → Builds Docker images → Pushes to ACR → ArgoCD detects changes → Syncs to Kubernetes → Helm deploys updates
----------------------------------------------------------------
Environments
Single AKS cluster with namespace isolation:

dev

staging

prod

Each environment has:

Independent deployments

Separate Helm values files

Isolated ingress routing

Dedicated scaling configuration
----------------------------------------------------------------
🔄 CI/CD Pipeline

Each microservice has its own GitHub Actions workflow:

On push:

Build Docker image

Tag image with Git SHA

Push image to ACR

Update Helm values file

Commit updated image tag

ArgoCD auto-sync deploys new version

Fully automated GitOps deployment.
-----------------------------------------------------------
🔐 Security Layer

Kubernetes Secrets for credentials

Network Policies between services

Non-root containers

Read-only root filesystem

Resource limits

Namespace isolation
----------------------------------------------------------------
♻ Resilience Strategy

Core service implements:

Timeout control

Retry mechanism

Graceful fallback response

Degraded mode handling

This prevents cascading failure if Auth service is temporarily unavailable.
--------------------------------------------------------------------------
📦 Helm Structure
helm/
  auth-service/
  core-service/
  frontend/


Each chart contains:

Deployment

Service

Ingress

HPA

NetworkPolicy

ServiceAccount

Values per environment
-----------------------------------------------------------------------------
📊 Monitoring

Azure Monitor

Log Analytics

Kubernetes health probes

Liveness & Readiness checks
----------------------------------------------------------------
🗄 Database Layer

PostgreSQL deployed as:

StatefulSet

Persistent Volume

Secret-based credentials

Internal service access
----------------------------------------------------------------
🚀 Example Endpoints
http://dev.<ip>.nip.io/
http://staging.<ip>.nip.io/
http://api.<ip>.nip.io/core/check-auth
----------------------------------------------------------------
📂 Repository Structure
services/
  auth-service/
  core-service/
  frontend/

helm/
  auth-service/
  core-service/
  frontend/

.github/workflows/
  auth-service.yml
  core-service.yml
  frontend.yml
----------------------------------------------------------------
🧠 What This Project Demonstrates

✔ Microservices Architecture
✔ Kubernetes Production Practices
✔ GitOps Workflow
✔ CI/CD Automation
✔ Multi-Environment Deployment
✔ Resilience Patterns
✔ Infrastructure as Code
✔ Secure Containerization
✔ Cloud-Native Design
----------------------------------------------------------------
🧠 What This Project Demonstrates

✔ Microservices Architecture
✔ Kubernetes Production Practices
✔ GitOps Workflow
✔ CI/CD Automation
✔ Multi-Environment Deployment
✔ Resilience Patterns
✔ Infrastructure as Code
✔ Secure Containerization
✔ Cloud-Native Design
----------------------------------------------------------------
👨‍💻 Author

Saeed Nabil Saeed El-Gebaly
Cloud & DevOps Engineer
AWS | Azure | Kubernetes | GitOps