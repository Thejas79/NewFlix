CREATE DATABASE IF NOT EXISTS newflix_db;
USE newflix_db;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    subscription_plan VARCHAR(50),
    subscription_status VARCHAR(20) DEFAULT 'INACTIVE',
    subscription_end_date DATETIME
);

CREATE TABLE IF NOT EXISTS user_content (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    content_id VARCHAR(50) NOT NULL,
    content_type VARCHAR(20) NOT NULL,
    title VARCHAR(255),
    poster_path VARCHAR(255),
    is_liked BOOLEAN DEFAULT FALSE,
    is_in_watchlist BOOLEAN DEFAULT FALSE,
    updated_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_content (user_id, content_id, content_type)
);
