-- ============================================================
-- 5.a Create a Database and a table inside it (MySQL CLI)
-- Run this file from the MySQL command line client:
--   mysql -u root -p < 01_create_database.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS wardrobe_manager;

USE wardrobe_manager;

CREATE TABLE IF NOT EXISTS clothing_items (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(100)  NOT NULL,
    category      VARCHAR(50)   NOT NULL,   -- e.g. Top, Bottom, Shoes, Outerwear
    color         VARCHAR(50),
    season        VARCHAR(20)   DEFAULT 'All Season', -- Summer, Winter, Monsoon, All Season
    times_worn    INT           DEFAULT 0,
    is_favorite   BOOLEAN       DEFAULT FALSE,
    created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS outfits (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    outfit_name   VARCHAR(100) NOT NULL,
    occasion      VARCHAR(50),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
