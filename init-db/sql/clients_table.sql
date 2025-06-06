CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    rfc VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    address VARCHAR(255),
    is_deleted BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,
    cognito_sub VARCHAR(255) UNIQUE NOT NULL,
    UNIQUE (email),
    UNIQUE (rfc),
    CHECK (name <> ''),
    CHECK (rfc <> ''),
    CHECK (email <> '')
);