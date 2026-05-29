# 💬 Chatify

A full-stack real-time chat application built with React, Node.js, Socket.IO, and Stream Video — featuring instant messaging, video & voice calls, image sharing, and a beautiful responsive UI.

![Chatify Preview](./frontend/public/logo1.png)

---

## ✨ Features

- 🔐 **Authentication** — Secure JWT-based login & signup with cookie sessions
- 💬 **Real-time Messaging** — Instant messages powered by Socket.IO
- 🖼️ **Image Sharing** — Send photos via Cloudinary cloud storage
- 📹 **Video Calls** — One-on-one video calls using Stream Video SDK
- 📞 **Voice Calls** — Crystal-clear audio calls with incoming ring tone
- 🗑️ **Delete Messages** — Delete individual messages or entire conversations
- 🟢 **Online Status** — See who's online in real time
- 🌙 **Dark / Light Mode** — Persisted theme preference
- 🔔 **Sound Effects** — Typing sounds, notification sounds, ringtones
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- 🛡️ **Rate Limiting** — Arcjet-powered API protection

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| React 19 | UI framework |
| Zustand | Global state management |
| Tailwind CSS + DaisyUI | Styling |
| Socket.IO Client | Real-time communication |
| Stream Video React SDK | Video & voice calls |
| Axios | HTTP requests |
| React Router v7 | Client-side routing |
| Lucide React | Icons |
| React Hot Toast | Notifications |

### Backend
| Tech | Purpose |
|------|---------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database |
| Socket.IO | WebSocket server |
| JWT + Cookies | Authentication |
| Cloudinary | Image storage |
| Stream Node SDK | Video call tokens |
| Resend | Email service |
| Arcjet | Rate limiting & bot protection |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Stream account ([getstream.io](https://getstream.io))
- Resend account (for emails)

### 1. Clone the repository

```bash
git clone https://github.com/wassimhamdi2/chatify.git
cd chatify
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=3000
NODE_ENV=development

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=onboarding@resend.dev
EMAIL_FROM_NAME=Chatify

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

Start the backend:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Update `src/lib/axios.js` with your backend URL if needed:

```js
baseURL: "http://localhost:3000/api"
```

Start the frontend:

```bash
npm run dev
```

### 4. Open the app

```
http://localhost:5173
```

---

## 📁 Project Structure

```
chatify/
├── backend/
│   └── src/
│       ├── controllers/     # Route handlers
│       ├── models/          # Mongoose schemas
│       ├── routers/         # Express routes
│       ├── middleware/       # Auth, rate limiting
│       ├── lib/             # DB, socket, cloudinary, stream
│       └── server.js        # Entry point
│
└── frontend/
    └── src/
        ├── pages/           # LoginPage, SignUpPage, ChatPage, CallPage
        ├── components/      # UI components
        ├── store/           # Zustand stores
        ├── hooks/           # Custom React hooks
        └── lib/             # Axios, Stream config
```

---

## 📸 Screenshots

| Login | Chat | Video Call |
|-------|------|------------|
| ![Login](./frontend/public/login.png) | ![Chat](./frontend/public/logo2.png) | ![Call](./frontend/public/logo3.png) |

---

## 🔌 API Endpoints

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/check` | Verify session |
| PUT | `/api/auth/update-profile` | Update profile picture |

### Messages
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/messages/contacts` | Get all users |
| GET | `/api/messages/chats` | Get chat partners |
| GET | `/api/messages/:id` | Get messages with a user |
| POST | `/api/messages/send/:id` | Send a message |
| DELETE | `/api/messages/message/:id` | Delete a message |
| DELETE | `/api/messages/conversation/:id` | Delete a conversation |

### Stream
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/stream/token` | Get Stream video token |

---

## 🌐 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `CLIENT_URL` | Frontend URL for CORS |
| `CLOUDINARY_*` | Cloudinary credentials |
| `STREAM_API_KEY` | Stream public API key |
| `STREAM_API_SECRET` | Stream secret key |
| `RESEND_API_KEY` | Resend email API key |
| `ARCJET_KEY` | Arcjet rate limiting key |

---

## 👨‍💻 Author

**Wassim HAMDI**

- GitHub: [@wassimhamdi2](https://github.com/wassimhamdi2)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
