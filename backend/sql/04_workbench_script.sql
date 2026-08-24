-- ============================================================
-- 5.d Script file to run in MySQL Workbench
-- Open MySQL Workbench -> File > Open SQL Script -> select this file
-- Then click the "Execute" (lightning bolt) icon to run it.
-- ============================================================

DROP DATABASE IF EXISTS wardrobe_manager;
CREATE DATABASE wardrobe_manager;
USE wardrobe_manager;

CREATE TABLE clothing_items (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(100)  NOT NULL,
    category      VARCHAR(50)   NOT NULL,
    color         VARCHAR(50),
    season        VARCHAR(20)   DEFAULT 'All Season',
    times_worn    INT           DEFAULT 0,
    is_favorite   BOOLEAN       DEFAULT FALSE,
    created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

DELIMITER $$

-- A stored procedure, written the way you'd build/test it in Workbench's
-- script editor before running it against the server.
CREATE PROCEDURE AddClothingItem(
    IN p_name VARCHAR(100),
    IN p_category VARCHAR(50),
    IN p_color VARCHAR(50),
    IN p_season VARCHAR(20)
)
BEGIN
    INSERT INTO clothing_items (name, category, color, season)
    VALUES (p_name, p_category, p_color, p_season);
END $$

DELIMITER ;

CALL AddClothingItem('Grey Hoodie', 'Outerwear', 'Grey', 'Winter');

SELECT * FROM clothing_items;
