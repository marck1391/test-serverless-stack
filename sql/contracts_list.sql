CREATE PROCEDURE list_contracts (
    IN in_client_id INT,
    IN in_status ENUM('active', 'expired', 'cancelled'),
    IN in_start_date DATE,
    IN in_end_date DATE,
    IN in_offset INT,
    IN in_limit INT
)
BEGIN
    SELECT c.id AS contract_id,
           cl.name AS client_name,
           a.description AS asset_description,
           c.start_date,
           c.end_date,
           CASE 
               WHEN c.is_active = TRUE AND c.end_date >= CURDATE() THEN 'active'
               WHEN c.is_active = TRUE AND c.end_date < CURDATE() THEN 'expired'
               ELSE 'cancelled'
           END AS status
    FROM contracts c
    JOIN clients cl ON c.client_id = cl.id
    JOIN assets a ON c.asset_id = a.id
    WHERE (c.client_id = in_client_id OR in_client_id IS NULL)
      AND (c.start_date BETWEEN in_start_date AND in_end_date OR in_start_date IS NULL OR in_end_date IS NULL)
    LIMIT in_limit OFFSET in_offset;
END;
