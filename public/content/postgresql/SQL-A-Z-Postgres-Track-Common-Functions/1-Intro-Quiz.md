```sql
-- 1
SELECT title, painted
FROM painting
WHERE painted > 1800 OR painted IS NULL;

-- 2
SELECT painting.title, artist.first_name, artist.last_name
FROM painting
JOIN artist
ON artist.id = painting.artist_id
WHERE artist.nationality IN ('Dutch', 'Flemish');

-- 3
SELECT COUNT(*) as number_of_paintings
FROM painting
WHERE painted >= 1888;

-- 4
SELECT artist.first_name, artist.last_name, COUNT(*) as number_of_paintings
FROM painting
JOIN artist
ON artist.id = painting.artist_id
GROUP BY artist.first_name, artist.last_name;

-- 5
SELECT artist.first_name, artist.last_name, MIN(painting.rating) as min_rating, AVG(painting.rating) as avg_rating, MAX(painting.rating) as max_rating
FROM painting
JOIN artist
ON artist.id = painting.artist_id
GROUP BY artist.first_name, artist.last_name
HAVING COUNT(painting.artist_id) > 2;
```