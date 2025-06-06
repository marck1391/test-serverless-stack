CREATE PROCEDURE delete_asset (
    IN in_id INT
)
BEGIN
    DECLARE is_rented BOOLEAN;

    -- Check if the asset is currently rented
    SELECT COUNT(*) INTO is_rented
    FROM contracts
    WHERE asset_id = in_id AND is_active = 1;

    IF is_rented > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'AssetIsCurrentlyRented';
    END IF;

    -- Soft delete the asset
    UPDATE assets
    SET is_deleted = 1,
        updated_at = NOW()
    WHERE id = in_id;
END;
