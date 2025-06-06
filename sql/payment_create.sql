CREATE PROCEDURE add_payment (
    IN in_contract_id INT,
    IN in_payment_date DATE,
    IN in_amount_paid DECIMAL(10, 2),
    IN in_payment_method ENUM('transfer', 'cash', 'card')
)
BEGIN
    DECLARE total_installments INT;
    DECLARE installments_paid INT;
    DECLARE total_payments DECIMAL(10, 2);
    DECLARE client_email VARCHAR(255);

    -- Retrieve contract details
    SELECT total_payments, payments_made, clients.email INTO total_payments, installments_paid, client_email
    FROM contracts
    JOIN clients ON contracts.client_id = clients.id
    WHERE contracts.id = in_contract_id;

    SET installments_paid = installments_paid + 1;

    -- Insert payment record
    INSERT INTO payments (
        contract_id, payment_date, amount_paid, payment_method, total_installments, installments_paid, created_at
    ) VALUES (
        in_contract_id, in_payment_date, in_amount_paid, in_payment_method, total_installments, installments_paid, NOW()
    );

    -- Update contract payments
    UPDATE contracts
    SET payments_made = installments_paid
    WHERE id = in_contract_id;

    -- Check if contract is fully paid
    IF installments_paid >= total_payments THEN
        SELECT TRUE AS is_fully_paid, total_payments AS total_payments, installments_paid AS payments_made;
    ELSE
        SELECT FALSE AS is_fully_paid, total_payments AS total_payments, installments_paid AS payments_made;
    END IF;
END;
