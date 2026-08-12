<a name="-top"></a>

  <h1>GameHub: Cosmic Edition</h1>
  
  <p align="center">
    <b>Experience the next generation of browser gaming. High-performance, low-latency, and stunning cosmic aesthetics.</b>
  </p>

  <p align="center">
    <img src="https://img.shields.io/github/stars/kaifansariw/GameHub?style=for-the-badge&color=7c3aed&labelColor=050508" alt="Stars">
    <img src="https://img.shields.io/github/forks/kaifansariw/GameHub?style=for-the-badge&color=ec4899&labelColor=050508" alt="Forks">
    <img src="https://img.shields.io/github/license/kaifansariw/GameHub?style=for-the-badge&color=7c3aed&labelColor=050508" alt="License">
    <img src="https://img.shields.io/github/issues/kaifansariw/GameHub?style=for-the-badge&color=ec4899&labelColor=050508" alt="Issues">
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/PWA-Ready-7c3aed?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA">
    <img src="https://img.shields.io/badge/Google_OAuth-Enabled-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google OAuth">
    <img src="https://img.shields.io/badge/JWT-Auth-ec4899?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT">
  </p>

  <p align="center">
    <a href="[https://gamehub-cosmic.vercel.app](https://game-hub-jade-three.vercel.app)">
      <img src="https://img.shields.io/badge/Live%20Demo-Deploy%20Sync-7c3aed?style=for-the-badge&logo=rocket&logoColor=white" alt="Live Demo">
    </a>
  </p>

  <p align="center">
    <a href="#-about-gamehub">About</a> •
    <a href="DOCS.md">Technical Docs</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-api-reference">API</a> •
    <a href="#🌟-contributing">Contribute</a> •
    <a href="https://github.com/kaifansariw/GameHub/issues">Request Feature</a>
  </p>
</div>

---

<p align="center">
  <img src="frontend/public/homepage.png" width="900" alt="GameHub Cosmic Edition Screenshot" style="border-radius: 20px; border: 2px solid #7c3aed33;">
  <br>
  <i>The Cosmic Neon Library Interface</i>
</p>

---

### Protocol Guidelines
> [!IMPORTANT]
> *   **Star the Repo**: Your contribution only counts if you've starred the repository. ⭐
> *   **Documentation**: Proper docs are required for every new feature. Share them via mail.
> *   **Meaningful Issues**: Only high-impact issues will be considered.
> *   **Leaderboard Priority**: Priority is given to contributors with lower ranks.

---

## Table of Contents
- [💡 About GameHub](#-about-gamehub)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [🔑 Environment Variables](#-environment-variables)
- [📡 API Reference](#-api-reference)
- [🎮 Adding New Games](#-adding-new-games)
- [🌟 Contributing](#-contributing)
- [✨ Contributors](#-contributors)
- [📄 License](#-license)

---

## 💡 About GameHub
**GameHub** is an elite, open-source collection of classic and modern browser games. Re-imagined with a **Cosmic Blue Neon** aesthetic, it combines the nostalgia of retro gaming with the performance of industry-standard web tech.

Originally a Vanilla JS project, GameHub has been upgraded to a **React + Django REST Framework** hybrid architecture supporting massive scalability, premium animations, a global leaderboard system, full JWT authentication, Google OAuth 2.0, PWA installability, and a password reset flow.

---

## ✨ Features

<div align="left">

| Feature | Description |
| :--- | :--- |
| 🚀 **Modern Engine** | Built with **React 19** + Vite 7 for sub-millisecond responsiveness. |
| 🎨 **Cosmic UI** | High-end Glassmorphism and Neon design system with Framer Motion animations. |
| 🕹️ **50+ Titles** | Instant play library including retro classics and modern games. |
| 🏆 **Leaderboards** | Global competition powered by a Django REST backend. |
| � **Full Auth** | JWT login/register + **Google OAuth 2.0** (`id_token` flow). |
| 🔑 **Password Reset** | Secure email-based forgot/reset password flow. |
| 📱 **PWA Ready** | Installable as a native app on any device. Dismiss-once prompt. |
| 🛠️ **Modular Code** | Clean architecture designed for easy open-source contribution. |

</div>

---

## 🛠️ Tech Stack

| Tier | Technology | Notes |
| :--- | :--- | :--- |
| **Frontend** | React 19, Framer Motion | SPA with file-based routing |
| **Styling** | Tailwind CSS 4, Lucide Icons | Cosmic Neon design tokens |
| **Backend** | Django 4+ REST Framework | JWT via `djangorestframework-simplejwt` |
| **Auth** | JWT + Google OAuth 2.0 | `google-auth` library for `id_token` verification |
| **State** | Zustand | Persistent auth store |
| **Build** | Vite 7 (Ultra-fast HMR) | PWA via `vite-plugin-pwa` |
| **API Docs** | drf-spectacular | OpenAPI 3.0 + Swagger UI at `/api/schema/swagger-ui/` |

---

## 📁 Project Structure
```text
GameHub/
├── frontend/                   # React Application (Vite)
│   ├── src/
│   │   ├── api/                # Axios instance + JWT interceptor
│   │   ├── components/
│   │   │   ├── GoogleAuth/     # GoogleAuthButton (id_token flow)
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   ├── SEO/
│   │   │   └── PWAInstallPrompt.jsx  # Smart one-time install banner
│   │   ├── pages/              # Login, Register, Profile, Games…
│   │   ├── data/               # games.js registry
│   │   └── store/              # Zustand auth store
│   ├── public/                 # Static assets & game files
│   ├── .env                    # VITE_GOOGLE_CLIENT_ID
│   └── vite.config.js          # PWA + proxy + COOP headers
│
├── backend/                    # Django REST API
│   ├── accounts/
│   │   ├── views.py            # All API endpoints incl. Google OAuth
│   │   ├── models.py           # Profile, GameScore, UserMessage
│   │   └── urls.py             # API route definitions
│   ├── gamehub_project/
│   │   └── settings.py         # CORS, JWT, Google Client ID, COOP
│   ├── .env                    # GOOGLE_CLIENT_ID + SECRET_KEY
│   └── requirements.txt
│
├── DOCS.md                     # Technical Deep-Dive
└── README.md                   # This file
```

---

## 🚀 Quick Start

### 1️⃣ Clone the Repo
```bash
git clone https://github.com/kaifansariw/GameHub.git
cd GameHub
```

### 2️⃣ Initialize Frontend
```bash
cd frontend
npm install
# Create your .env (copy values from .env.example if present)
npm run dev
# Runs on http://localhost:5173
```

### 3️⃣ Initialize Backend
```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
# Runs on http://localhost:8000
```

---

## 🔑 Environment Variables

### `frontend/.env`
```env
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
```

### `backend/.env`
```env
SECRET_KEY=your_django_secret_key
DEBUG=True
GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

> [!TIP]
> Get your Google OAuth credentials from [console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials).
> Add `http://localhost:5173` and `http://localhost:8000` as an **Authorized JavaScript Origin**.

---

## 🌍 Live Deployment

### Frontend (Vercel)
https://game-hub-jade-three.vercel.app

### Backend API (Render)
https://gamehub-kd7m.onrender.com

## 📡 API Reference

> Full interactive docs at **`http://localhost:8000/api/schema/swagger-ui/`**

| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/auth/login/` | ❌ | Login with username/email + password |
| `POST` | `/api/auth/register/` | ❌ | Create a new account |
| `POST` | `/api/auth/google/` | ❌ | Login/register via Google `id_token` |
| `POST` | `/api/auth/token/refresh/` | ❌ | Refresh JWT access token |
| `POST` | `/api/auth/password-reset/` | ❌ | Send reset email |
| `POST` | `/api/auth/password-reset-confirm/` | ❌ | Confirm password reset |
| `GET` | `/api/profile/` | ✅ | Get authenticated user profile |
| `GET` | `/api/leaderboard/` | ❌ | Global ranked leaderboard |
| `POST` | `/api/add-visit/` | ✅ | Record a game page visit |
| `POST` | `/api/add-play/` | ✅ | Record a game play |
| `POST` | `/api/save-score/` | ✅ | Save/update a game high score |
| `POST` | `/api/send-feedback/` | ❌ | Submit feedback |

---

## 🎮 Adding New Games
Registering a new title in the Cosmic Library:

1. **Upload Assets**: Place files in `frontend/public/games/<game-id>/`
2. **Register Metadata**: Edit `frontend/src/data/games.js`:
```javascript
{
    id: "quantum-racer",
    title: "Quantum Racer",
    description: "Multi-dimensional racing experience.",
    image: "/assets/thumbs/quantum.png",
    file: "/games/quantum/index.html",
    category: "racing"
}
```

---

## 🌟 Contributing
We ❤️ our contributors! Whether it's a bug fix or UI polish:

1. **Fork** → **Branch** (`git checkout -b feat/CoolFeature`) → **Commit** → **Push** → **PR**.

> [!NOTE]
> Every new feature should include a brief description in `DOCS.md` and follow the existing code style.

---

## ✨ Contributors
The heroes behind the Cosmic Engine:

<a href="https://github.com/kaifansariw/GameHub/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kaifansariw/GameHub&max=100&columns=10" />
</a>

---

## 📄 License
This project is licensed under the **MIT License**.

---

<div align="center">
  <p>Maintained by <b>Kaif Ansari</b> & the Open Source Community</p>
</div>

---
<div align="center">
<a href="#-top">Back to Top ↑</a>
</div>
