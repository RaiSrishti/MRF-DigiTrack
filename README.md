# MRF DigiTrack 🚛

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
JWT_SECRET=your-secret-key
ENVIRONMENT=development
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

For support, please contact [Your Contact Information] # MRF-DigiTrack
