# 🚌 Route Visualization System

A modern web application for real-time **bus route visualization, ETA prediction, and driver location tracking**, built with **Next.js, TypeScript, and Tailwind CSS**.

---

## 🚀 Features

### 🗺️ Route Visualization
- Interactive map displaying:
  - Full bus route
  - Real-time bus location
  - Upcoming stops
- Smooth map updates
- Clear and recognizable icons for:
  - 🚌 Bus
  - 📍 Stops
  - 📌 Current location

---

### ⏱️ ETA Prediction
- Real-time Estimated Time of Arrival (ETA)
- Dynamic recalculation based on:
  - Current GPS position
  - Remaining route distance
  - Average speed
- Smooth animated ETA transitions

---

### 👨‍✈️ Driver Info
Drivers can set:
- Driver name
- Assigned bus route

Enables:
- Route traceability
- Operational clarity
- Real-time association between driver and vehicle

---

### 📍 Location Tracking
- Drivers transmit GPS coordinates to backend
- Backend processes and stores updates
- Frontend automatically updates:
  - Bus marker position
  - ETA values
  - Next stop highlight

---

# 🏗️ Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Maps:** Mapbox / Google Maps / Leaflet
- **Icons:** lucide-react / heroicons
- **Animations:** Framer Motion / CSS transitions

---

# 📂 Project Structure
├── public/
├── src/
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md

#▶️ How to Run the Project (Next.js)
1️⃣ Prerequisites

Make sure you have installed:

Node.js 18+

npm (comes with Node) or yarn

Check your version:
node -v

2️⃣ Install Dependencies

From the project root:

npm install

or

yarn install
3️⃣ Run Development Server
npm run dev

or

yarn dev

The app will run at:

http://localhost:3000
4️⃣ Build for Production
npm run build
5️⃣ Start Production Server
npm start
