# MRF DigiTrack 🚛
## 📝 Introduction

In rural Dakshina Kannada, Material Recovery Facilities (MRFs) play a key role in dry waste management—sorting materials and directing them to appropriate destinations like recycling units or cement factories. However, the current workflow is mostly manual, lacking any digital system to record operations, track outputs, or generate reports.

This project addresses the need for a simple, offline-capable digital system to streamline MRF operations, enabling better data tracking, transparency, and decision-making for all stakeholders involved.

---

## 🎯 Problem Statement

Most rural MRFs operate with:
- Manual weighing and sorting processes
- Paper-based and inconsistent data records
- No reliable system to track incoming waste, sorted outputs, or material sales
- Limited ability to report performance or revenue to authorities

As a result, stakeholders such as Gram Panchayats and Self-Help Groups (SHGs) face difficulty in operational oversight, financial tracking, and reporting.

---

## 🧭 Project Objective

To design and implement a lightweight, user-friendly digital solution that enables:
- Recording of waste inflow and material outflow
- Tracking sorted materials by type and quantity
- Documenting sales and generating revenue reports
- Secure data access and offline functionality

---

## 🌍 Project Context

This project focuses on four rural MRFs in Dakshina Kannada:
- **Tenkayedapadavu** (10 TPD Capacity)
- **Ujire**
- **Narikombu**
- **Kedambadi** (7 TPD Capacity)

These MRFs operate under a **zero-cost waste supply model** with operational support from **Sanjeevini Okattu** and local **Gram Panchayats**, primarily involving women-led SHGs.

---

## ⚠️ Key Constraints

1. **Digital Literacy Gaps** – Varied levels of familiarity with digital tools among MRF workers.
2. **Internet Unreliability** – Limited connectivity in rural areas.
3. **Device Limitations** – Few available devices at MRFs for data entry.
4. **Data Security** – Need for controlled access to operational data.
5. **Verification Issues** – Inaccuracies in manual weighing and classification.

---

## 📌 Core Features (Planned)

- 📲 **Mobile-Friendly Interface** with multilingual support (e.g., Kannada)
- 🔌 **Offline-First Architecture** using local storage and periodic sync
- 🧮 **Record Keeping** for waste inflow, sorting, and sales
- 📈 **Report Generation** (daily, weekly, monthly summaries)
- 🔐 **Role-Based Access Control** for operators, supervisors, and stakeholders

---

## 🏗️ Groundwork and Approach

- 🕵️‍♀️ Observed existing workflows and pain points at MRFs
- 📊 Identified essential data metrics for transparency
- 👥 Mapped key stakeholders and their reporting needs
- 📋 Designed lightweight digital forms and logs (MVP in Excel / Mobile)
- 🔄 Created a feedback loop with SHG operators for iterative testing

---

A comprehensive digital tracking system for Material Recovery Facilities (MRFs) in rural Karnataka.

## 🌟 Features

- 📊 Real-time waste tracking and management
- 👥 Role-based access control (MRF Operator, Manager, Panchayat)
- 📱 Mobile-friendly responsive design
- 📈 Interactive dashboards and reports
- 🔒 Secure authentication and data protection
- 📶 Offline-first capabilities (coming soon)

## 🏗️ Tech Stack

### Frontend
- React + Vite + TypeScript
- Tailwind CSS
- React Router
- Recharts
- Axios

### Backend
- FastAPI (Python)
- MongoDB (Motor)
- JWT Authentication
- Pydantic

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- MongoDB (local or Atlas)

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 📁 Project Structure

```
mrf-digitrack/
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Route components
│   │   ├── services/     # API services
│   │   ├── context/      # React context
│   │   ├── utils/        # Helper functions
│   │   └── types/        # TypeScript types
│   └── public/           # Static assets
│
└── backend/              # FastAPI backend
    ├── app/
    │   ├── routers/     # API routes
    │   ├── models/      # Database models
    │   ├── schemas/     # Pydantic schemas
    │   ├── services/    # Business logic
    │   └── db/          # Database configuration
    └── tests/           # Backend tests
```

## 🔐 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=MRF DigiTrack
```

### Backend (.env)
```env
MONGODB_URL=mongodb://localhost:27017
MONGODB_DB_NAME=MRF_DigiTrack
SECRET_KEY=4SF22CS220
ENVIRONMENT=development
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

```

## 📝 License

MIT License - see LICENSE file for details

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support, please contact [srishtir560@gmail.com] # MRF-DigiTrack
