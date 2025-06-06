CREATE PROCEDURE create_contract (
    IN in_client_id INT,
    IN in_asset_id INT,
    IN in_start_date DATE,
    IN in_end_date DATE,
    IN in_monthly_rent DECIMAL(10, 2),
    IN in_warranty_amount DECIMAL(10, 2),
    IN in_total_payments INT
)
BEGIN
    DECLARE asset_available BOOLEAN;
    DECLARE client_exists INT;

    -- Check if the asset exists and is available
    SELECT available INTO asset_available
    FROM assets
    WHERE id = in_asset_id AND is_deleted = 0;

    IF asset_available IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'AssetDoesNotExist';
    END IF;

    IF asset_available = FALSE THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'AssetNotAvailable';
    END IF;

    -- Check if the client exists
    SELECT COUNT(*) INTO client_exists
    FROM clients
    WHERE id = in_client_id AND is_deleted = 0;

    IF client_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'ClientDoesNotExist';
    END IF;

    -- Validate dates
    IF in_end_date < in_start_date THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'EndDateBeforeStartDate';
    END IF;

    -- Insert contract
    INSERT INTO contracts (
        client_id,
        asset_id,
        start_date,
        end_date,
        monthly_rent,
        warranty_amount,
        total_payments,
        payments_made,
        is_active,
        created_at
    ) VALUES (
        in_client_id,
        in_asset_id,
        in_start_date,
        in_end_date,
        in_monthly_rent,
        in_warranty_amount,
        in_total_payments,
        0,
        TRUE,
        NOW()
    );

    -- Update asset availability
    UPDATE assets
    SET available = FALSE
    WHERE id = in_asset_id;
END;
