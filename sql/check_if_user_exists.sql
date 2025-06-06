CREATE PROCEDURE checkIfUserExists (
    IN in_email VARCHAR(100),
    IN in_rfc VARCHAR(20)
)
BEGIN
    DECLARE existing_client_id INT;

    SELECT id, 'RFCAlreadyExists' AS error_message
    INTO existing_client_id, error_message
    FROM clients
    WHERE rfc = in_rfc AND is_deleted = 0
    UNION ALL
    SELECT id, 'EmailAlreadyExists' AS error_message
    FROM clients
    WHERE email = in_email AND is_deleted = 0
    LIMIT 1;

    IF existing_client_id IS NOT NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = error_message;
    END IF;
END
