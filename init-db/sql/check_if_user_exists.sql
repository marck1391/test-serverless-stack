CREATE PROCEDURE checkIfUserExists (
    IN in_email VARCHAR(100),
    IN in_rfc VARCHAR(20)
)
BEGIN
    DECLARE existing_client_id INT;

    SELECT id INTO existing_client_id
    FROM clients
    WHERE email = in_email AND is_deleted = 0;

    IF existing_client_id IS NOT NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'EmailAlreadyExists';
    END IF;

    SELECT id INTO existing_client_id
    FROM clients
    WHERE rfc = in_rfc AND is_deleted = 0;

    IF existing_client_id IS NOT NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'EmailAlreadyExists';
    END IF;
END
