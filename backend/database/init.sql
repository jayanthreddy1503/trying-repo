-- ============================================================
-- 5.e Database directory + init.sql, integrated into the API.
-- This file lives in its own /database directory inside the
-- project, and is executed automatically by backend/db.js the
-- first time the server starts, so the API always has a schema
-- to talk to.
-- ============================================================

CREATE DATABASE IF NOT EXISTS wardrobe_manager;

USE wardrobe_manager;

CREATE TABLE IF NOT EXISTS clothing_items (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(100)  NOT NULL,
    category      VARCHAR(50)   NOT NULL,
    color         VARCHAR(50),
    season        VARCHAR(20)   DEFAULT 'All Season',
    times_worn    INT           DEFAULT 0,
    is_favorite   BOOLEAN       DEFAULT FALSE,
    created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);
