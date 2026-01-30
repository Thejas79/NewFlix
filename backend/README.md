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
