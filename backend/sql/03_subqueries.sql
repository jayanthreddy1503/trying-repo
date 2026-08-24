-- ============================================================
-- 5.c Subqueries in the MySQL command line client
-- ============================================================

USE wardrobe_manager;

-- 1. Find items worn more than the average number of times (subquery in WHERE)
SELECT name, category, times_worn
FROM clothing_items
WHERE times_worn > (SELECT AVG(times_worn) FROM clothing_items);

-- 2. Find the most-worn item using a subquery
SELECT name, times_worn
FROM clothing_items
WHERE times_worn = (SELECT MAX(times_worn) FROM clothing_items);

-- 3. Categories that contain at least one favorite item (subquery with IN)
SELECT DISTINCT category
FROM clothing_items
WHERE category IN (
    SELECT category FROM clothing_items WHERE is_favorite = TRUE
);

-- 4. Subquery in FROM clause: average wear count per category, then filter
SELECT category, avg_wear
FROM (
    SELECT category, AVG(times_worn) AS avg_wear
    FROM clothing_items
    GROUP BY category
) AS category_stats
WHERE avg_wear > 5;
