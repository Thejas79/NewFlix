# NewFlix - Netflix Clone 🎬

A beautiful Netflix clone built with React and powered by TMDB API. Features real movies and TV shows with language filtering.

![NewFlix](https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg)

## 🚀 Features

- ✅ Landing page with login/signup
- ✅ Real movies & TV shows from TMDB API
- ✅ Filter by language (English, Hindi, Kannada, Tamil, Telugu)
- ✅ Beautiful hover animations
- ✅ Watch modal with movie details
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Premium Netflix-like dark theme

## 📋 Prerequisites

Before running this project, make sure you have:

1. **Node.js** installed (version 18 or higher)
   - Download from: https://nodejs.org/
   - To check if installed, run: `node --version`

2. **npm** (comes with Node.js)
   - To check if installed, run: `npm --version`

## 🛠️ Installation & Setup

### Step 1: Download/Clone the project

If you received this as a zip file, extract it to a folder.

### Step 2: Open Terminal/Command Prompt

- **Windows**: Press `Win + R`, type `cmd`, press Enter
- **Mac**: Press `Cmd + Space`, type `Terminal`, press Enter

### Step 3: Navigate to the project folder

```bash
cd path/to/newflix
```

For example:
```bash
cd "D:\HTML && CSS\portifolio\newflix"
```

### Step 4: Install dependencies

```bash
npm install
```

This will download all required packages. Wait for it to complete (may take 1-2 minutes).

### Step 5: Start the development server

```bash
npm run dev
```

If that doesn't work, try:
```bash
node node_modules/vite/bin/vite.js
```

### Step 6: Open in browser

Once you see a message like:
```
VITE ready in 1000ms
  ➜ Local: http://localhost:5173/
```

Open your browser and go to: **http://localhost:5173/**

## 🎮 How to Use

1. **Landing Page**: You'll see the welcome page with trending movies
2. **Sign In**: Click "Sign In" or "Get Started"
3. **Create Account**: Enter any username and password (min 4 characters)
4. **Browse**: Explore movies and TV shows
5. **Filter**: Use language dropdown to filter content
6. **Watch**: Click any movie/show to see details

## 📁 Project Structure

```
newflix/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Landing & Home pages
│   ├── services/       # TMDB API service
│   ├── App.jsx         # Main app with routing
│   └── main.jsx        # Entry point
├── index.html          # HTML template
├── package.json        # Dependencies
└── README.md           # This file
```

## 🔑 API Key

This project uses TMDB API. The API key is already included in the code.
If you want to use your own key:
1. Go to https://www.themoviedb.org/
2. Create an account and get an API key
3. Replace the key in `src/services/tmdb.js`

## 🛑 Stopping the Server

Press `Ctrl + C` in the terminal to stop the server.

## ❓ Troubleshooting

### "npm is not recognized"
- Install Node.js from https://nodejs.org/

### "Port 5173 is already in use"
- Close other terminals running the server, or
- Use a different port: `npm run dev -- --port 3000`

### Movies not loading
- Check your internet connection
- The TMDB API might be temporarily down

## 📱 Responsive

The app works on:
- 💻 Desktop
- 📱 Mobile
- 📟 Tablet

## 🙏 Credits

- **TMDB** - Movie database API
- **React** - UI framework
- **Vite** - Build tool

---

Made with ❤️ by NewFlix Team
