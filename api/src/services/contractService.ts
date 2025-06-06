import { DEFAULT_PAGE_SIZE } from '../constants'
import { dbConn } from './dbClient'

export async function createContract(params: {
  clientId: number
  assetId: number
  startDate: string
  endDate: string
  monthlyRent: number
  warrantyAmount: number
  totalPayments: number
}) {
  return dbConn.query('CALL create_contract(?, ?, ?, ?, ?, ?, ?)', [
    params.clientId,
    params.assetId,
    params.startDate,
    params.endDate,
    params.monthlyRent,
    params.warrantyAmount,
    params.totalPayments
  ])
}

export async function updateContract(params: { contractId: number; newEndDate?: string; newMonthlyRent?: number }) {
  return dbConn.query('CALL update_contract(?, ?, ?)', [
    params.contractId,
    params.newEndDate || null,
    params.newMonthlyRent || null
  ])
}

export async function cancelContract(contractId: number) {
  return dbConn.query('CALL cancel_contract(?)', [contractId])
}

export async function listContracts(params: {
  clientId?: number
  status?: string
  startDate?: string
  endDate?: string
  page?: number
  pageSize?: number
}) {
  const offset = ((params.page || 1) - 1) * (params.pageSize || DEFAULT_PAGE_SIZE)
  return dbConn.query('CALL list_contracts(?, ?, ?, ?, ?, ?)', [
    params.clientId || null,
    params.status || null,
    params.startDate || null,
    params.endDate || null,
    offset,
    params.pageSize || DEFAULT_PAGE_SIZE
  ])
}
