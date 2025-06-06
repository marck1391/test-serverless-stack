CREATE PROCEDURE create_asset (
    IN in_description VARCHAR(255),
    IN in_type ENUM('vehicle', 'machinery', 'furniture'),
    IN in_condition TEXT,
    IN in_approximate_value DECIMAL(10, 2),
    IN in_unique_code VARCHAR(100)
)
BEGIN
    DECLARE existing_asset_id INT;

    -- Check if the unique code already exists
    SELECT id INTO existing_asset_id
    FROM assets
    WHERE unique_code = in_unique_code AND is_deleted = 0
    LIMIT 1;

    IF existing_asset_id IS NOT NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'AssetWithUniqueCodeAlreadyExists';
    END IF;

    -- Insert asset
    INSERT INTO assets (
        description,
        type,
        `condition`,
        approximate_value,
        unique_code,
        available,
        is_deleted,
        created_at
    ) VALUES (
        in_description,
        in_type,
        in_condition,
        in_approximate_value,
        in_unique_code,
        TRUE,
        0,
        NOW()
    );
END;
