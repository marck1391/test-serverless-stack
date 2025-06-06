CREATE PROCEDURE list_payments (
    IN in_contract_id INT,
    IN in_offset INT,
    IN in_limit INT
)
BEGIN
    SELECT id AS payment_id,
           payment_date,
           amount_paid,
           payment_method,
           total_installments,
           installments_paid
    FROM payments
    WHERE contract_id = in_contract_id
    ORDER BY payment_date DESC
    LIMIT in_limit OFFSET in_offset;
END;
