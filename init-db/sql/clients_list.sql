CREATE PROCEDURE list_clients (
    IN in_name VARCHAR(100),
    IN in_rfc VARCHAR(20),
    IN in_start_date DATE,
    IN in_end_date DATE,
    IN in_offset INT,
    IN in_limit INT
)
BEGIN
    SELECT id, name, rfc, email, phone, address, created_at
    FROM clients
    WHERE is_deleted = 0
      AND (in_name IS NULL OR name LIKE CONCAT('%', in_name, '%'))
      AND (in_rfc IS NULL OR rfc = in_rfc)
      AND (in_start_date IS NULL OR created_at >= in_start_date)
      AND (in_end_date IS NULL OR created_at <= in_end_date)
    LIMIT in_limit OFFSET in_offset;
END
