CREATE PROCEDURE delete_client (
    IN in_id INT
)
BEGIN
    DECLARE active_contracts INT;

    -- Check for active contracts
    SELECT COUNT(*) INTO active_contracts
    FROM contracts
    WHERE client_id = in_id AND is_active = 1;

    IF active_contracts > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'ActiveContractsExist';
    END IF;

    -- Perform soft delete
    UPDATE clients
    SET is_deleted = 1,
        deleted_at = NOW()
    WHERE id = in_id AND is_deleted = 0;

    IF ROW_COUNT() = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Client not found or already deleted.';
    END IF;
END
