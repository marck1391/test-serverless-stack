CREATE PROCEDURE update_contract (
    IN in_contract_id INT,
    IN in_new_end_date DATE,
    IN in_new_monthly_rent DECIMAL(10, 2)
)
BEGIN
    DECLARE is_active BOOLEAN;
    DECLARE end_date DATE;

    -- Retrieve current contract details
    SELECT is_active, end_date INTO is_active, end_date
    FROM contracts
    WHERE id = in_contract_id;

    IF is_active = FALSE THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'CannotUpdateCancelledContract';
    END IF;

    IF end_date < CURDATE() THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'CannotUpdateExpiredContract';
    END IF;

    -- Update contract fields
    UPDATE contracts
    SET end_date = COALESCE(in_new_end_date, end_date),
        monthly_rent = COALESCE(in_new_monthly_rent, monthly_rent),
        updated_at = NOW()
    WHERE id = in_contract_id;
END;
