CREATE TABLE assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    type ENUM('vehicle', 'machinery', 'real_estate') NOT NULL,
    `condition` TEXT NOT NULL,
    approximate_value DECIMAL(10, 2) NOT NULL,
    code VARCHAR(100) NOT NULL UNIQUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    available BOOLEAN DEFAULT TRUE
);
