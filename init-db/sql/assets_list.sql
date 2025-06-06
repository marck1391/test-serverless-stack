CREATE PROCEDURE list_assets (
    IN in_type ENUM('vehicle', 'machinery', 'furniture'),
    IN in_keyword VARCHAR(255),
    IN in_start_date DATE,
    IN in_end_date DATE,
    IN in_offset INT,
    IN in_limit INT,
    IN in_available BOOLEAN
)
BEGIN
    SELECT id, description, type, `condition`, approximate_value, unique_code, available,
           created_at
    FROM assets
    WHERE (type = in_type OR in_type IS NULL)
      AND (description LIKE CONCAT('%', in_keyword, '%') OR in_keyword IS NULL)
      AND (created_at BETWEEN in_start_date AND in_end_date OR in_start_date IS NULL OR in_end_date IS NULL)
      AND (available = in_available OR in_available IS NULL)
    LIMIT in_limit OFFSET in_offset;
END;
