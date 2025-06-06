import { DEFAULT_PAGE_SIZE } from '../constants';
import { dbConn } from './dbClient';

export async function addPayment(params: {
  contractId: number;
  paymentDate: string;
  amountPaid: number;
  paymentMethod: 'transfer' | 'cash' | 'card';
}) {
  return dbConn.query('CALL add_payment(?, ?, ?, ?)', [
    params.contractId,
    params.paymentDate,
    params.amountPaid,
    params.paymentMethod,
  ]);
}

export async function listPayments(params: {
  contractId: number;
  page?: number;
  pageSize?: number;
}) {
  const offset = ((params.page || 1) - 1) * (params.pageSize || DEFAULT_PAGE_SIZE)
  return dbConn.query('CALL list_payments(?, ?, ?)', [
    params.contractId,
    offset,
    params.pageSize || DEFAULT_PAGE_SIZE,
  ]);
}
