CREATE PROCEDURE create_client (
    IN in_name VARCHAR(100),
    IN in_rfc VARCHAR(20),
    IN in_email VARCHAR(100),
    IN in_cognito_sub VARCHAR(255),
    IN in_phone VARCHAR(15),
    IN in_address VARCHAR(255)
)
BEGIN
import { z } from 'zod';
    -- Validate that name is not empty
    IF LENGTH(TRIM(in_name)) = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Name cannot be empty';
    END IF;

    -- Validate that RFC is not empty
    IF LENGTH(TRIM(in_rfc)) = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'RFC cannot be empty';
    END IF;

    -- Validate that email is not empty
    IF LENGTH(TRIM(in_email)) = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Email cannot be empty';
    END IF;

    -- Validate that cognito_sub is not empty
    IF in_cognito_sub IS NULL OR LENGTH(TRIM(in_cognito_sub)) = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'CognitoSub cannot be empty';
    END IF;

    -- Insert client
    INSERT INTO clients (
        name,
        rfc,
        email,
        cognito_sub,
        phone,
        address,
        is_deleted,
        created_at
    ) VALUES (
        in_name,
        in_rfc,
        in_email,
        in_cognito_sub,
        in_phone,
        in_address,
        0,
        NOW()
    );

    SET @CLIENT_ID = LAST_INSERT_ID();
END
