# NewFlix - Netflix Clone 🎬

A beautiful Netflix clone built with React and powered by TMDB API. Features real movies and TV shows with language filtering.



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
  ➜ Local: localhost
```

Open your browser and go to: **localhost**

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
------------------FOR BACKEND-----------------

# NewFlix Backend - Spring Boot Application

## Prerequisites
- Java 17 or higher
- Maven 3.6+
- MySQL Server (8.0 or higher)

## Database Setup

1. **Install MySQL** (if not already installed)
   - Download from: https://dev.mysql.com/downloads/mysql/

2. **Create Database**
   ```bash
   mysql -u root -p
   CREATE DATABASE newflix_db;
   exit;
   ```

3. **Configure Database Connection**
   - Edit `src/main/resources/application.properties`
   - Update MySQL username and password if different from defaults:
     ```properties
     spring.datasource.username=root
     spring.datasource.password=your_password
     ```

## Running the Application

### Option 1: Using Maven
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Option 2: Using Maven Wrapper (if available)
```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

### Option 3: Using IDE
- Import the backend folder as a Maven project
- Run `NewFlixBackendApplication.java`

## API Endpoints

Base URL: `http://localhost:8080/api/auth`

### 1. Sign Up
- **POST** `/api/auth/signup`
- Body:
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### 2. Sign In
- **POST** `/api/auth/signin`
- Body:
  ```json
  {
    "username": "john_doe",
    "password": "password123"
  }
  ```

### 3. Test Endpoint
- **GET** `/api/auth/test`
- Returns: "Backend is running!"

## Database Schema

The application automatically creates the following table:

### users
| Column     | Type         | Constraints           |
|------------|--------------|----------------------|
| id         | BIGINT       | PRIMARY KEY, AUTO_INCREMENT |
| username   | VARCHAR(50)  | NOT NULL, UNIQUE     |
| email      | VARCHAR(255) | NOT NULL, UNIQUE     |
| password   | VARCHAR(255) | NOT NULL (BCrypt encrypted) |
| created_at | DATETIME     | NOT NULL             |
| updated_at | DATETIME     |                      |

## Security Features
- Password encryption using BCrypt
- CORS enabled for React frontend (localhost:5173, localhost:5174)
- Input validation on all fields
- Unique constraints on username and email

## Troubleshooting

### Port Already in Use
If port 8080 is already in use, change it in `application.properties`:
```properties
server.port=8081
```

### MySQL Connection Error
- Ensure MySQL is running: `mysql -u root -p`
- Verify credentials in `application.properties`
- Check if database exists: `SHOW DATABASES;`

### Build Issues
- Verify Java version: `java -version` (should be 17+)
- Verify Maven version: `mvn -version`
- Clean and rebuild: `mvn clean install -U`

## Development Notes
- Auto-reload is enabled via Spring Boot DevTools
- SQL queries are logged in console (set `spring.jpa.show-sql=false` to disable)
- Database schema updates automatically on application restart


Made with ❤️ by NewFlix Team
