-- ============================================================
-- 5.b Queries to create a table, insert data, and update data
-- ============================================================

USE wardrobe_manager;

-- CREATE a table
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

-- INSERT sample wardrobe data
INSERT INTO clothing_items (name, category, color, season, times_worn, is_favorite) VALUES
('Blue Denim Jacket', 'Outerwear', 'Blue',  'Winter', 12, TRUE),
('White Cotton Shirt', 'Top',      'White', 'Summer',  8, FALSE),
('Black Chino Pants',  'Bottom',   'Black', 'All Season', 20, TRUE),
('Running Shoes',      'Shoes',    'Grey',  'All Season', 30, FALSE),
('Wool Sweater',       'Outerwear','Maroon','Winter',   5, FALSE);

-- UPDATE data: e.g. mark an item as favorite after wearing it a lot
UPDATE clothing_items
SET is_favorite = TRUE
WHERE times_worn > 15;

-- UPDATE data: increment wear count when an item is worn again
UPDATE clothing_items
SET times_worn = times_worn + 1
WHERE id = 1;

-- Verify
SELECT * FROM clothing_items;
