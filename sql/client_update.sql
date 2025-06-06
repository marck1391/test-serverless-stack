CREATE PROCEDURE update_client (
    IN in_id INT,
    IN in_name VARCHAR(100),
    IN in_rfc VARCHAR(20),
    IN in_email VARCHAR(100),
    IN in_phone VARCHAR(15),
    IN in_address VARCHAR(255)
)
BEGIN
    DECLARE rows_affected INT;

    UPDATE clients
    SET name = COALESCE(in_name, name),
        rfc = COALESCE(in_rfc, rfc),
        email = COALESCE(in_email, email),
        phone = COALESCE(in_phone, phone),
        address = COALESCE(in_address, address)
    WHERE (id = in_id OR rfc = in_rfc OR email = in_email);

    SET rows_affected = ROW_COUNT();

    IF rows_affected > 0 THEN
        SELECT 'UpdateSuccessful' AS message;
    ELSE
        SELECT 'NoChangesMade' AS message;
    END IF;
END
