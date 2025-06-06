CREATE PROCEDURE cancel_contract (
    IN in_contract_id INT
)
BEGIN
    DECLARE end_date DATE;
    DECLARE asset_id INT;
    DECLARE client_email VARCHAR(255);

    -- Retrieve contract details
    SELECT end_date, asset_id, client_id INTO end_date, asset_id, client_email
    FROM contracts
    JOIN clients ON contracts.client_id = clients.id
    WHERE contracts.id = in_contract_id;

    IF end_date < CURDATE() THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'CannotCancelExpiredContract';
    END IF;

    -- Update contract status to cancelled
    UPDATE contracts
    SET is_active = FALSE,
        updated_at = NOW()
    WHERE id = in_contract_id;

    -- Update asset availability
    UPDATE assets
    SET available = TRUE
    WHERE id = asset_id;

    -- Send email notification to client
    CALL send_email(client_email, 'Contract Cancelled', 'Your contract has been successfully cancelled.');
END;
