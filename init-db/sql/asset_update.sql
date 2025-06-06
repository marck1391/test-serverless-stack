CREATE PROCEDURE update_asset (
    IN in_id INT,
    IN in_description VARCHAR(255),
    IN in_type ENUM('vehicle', 'machinery', 'furniture'),
    IN in_condition TEXT,
    IN in_approximate_value DECIMAL(10, 2),
    IN in_unique_code VARCHAR(100)
)
BEGIN
    DECLARE existing_asset_id INT;

    -- Check if the asset exists
    SELECT id INTO existing_asset_id
    FROM assets
    WHERE id = in_id AND is_deleted = 0
    LIMIT 1;

    IF existing_asset_id IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'AssetNotFound';
    END IF;

    -- Update asset
    UPDATE assets
    SET description = COALESCE(in_description, description),
        type = COALESCE(in_type, type),
        `condition` = COALESCE(in_condition, `condition`),
        approximate_value = COALESCE(in_approximate_value, approximate_value),
        unique_code = COALESCE(in_unique_code, unique_code),
        updated_at = NOW()
    WHERE id = in_id;
END;
