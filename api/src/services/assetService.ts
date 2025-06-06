import { DEFAULT_PAGE_SIZE } from '../constants'
import { dbConn } from './dbClient'

export async function createAsset(params: {
  description: string
  type: 'vehicle' | 'machinery' | 'real_estate'
  condition: string
  approximateValue: number
  code: string
}) {
  return dbConn.query('CALL create_asset(?, ?, ?, ?, ?, ?)', [
    params.code,
    params.description,
    params.type,
    params.condition,
    params.approximateValue
  ])
}

export async function listAssets(params: {
  type?: 'vehicle' | 'machinery' | 'furniture'
  keyword?: string
  startDate?: string
  endDate?: string
  page?: number
  pageSize?: number
  available?: boolean
}) {
  const offset = ((params.page || 1) - 1) * (params.pageSize || DEFAULT_PAGE_SIZE)
  return dbConn.query('CALL list_assets(?, ?, ?, ?, ?, ?, ?)', [
    params.type || null,
    params.keyword || null,
    params.startDate || null,
    params.endDate || null,
    offset,
    params.pageSize || DEFAULT_PAGE_SIZE,
    params.available || null
  ])
}

export async function updateAsset(params: {
  assetId: number
  description?: string
  type?: 'vehicle' | 'machinery' | 'furniture'
  condition?: string
  approximateValue?: number
  code?: string
}) {
  return dbConn.query('CALL update_asset(?, ?, ?, ?, ?, ?)', [
    params.assetId,
    params.description || null,
    params.type || null,
    params.condition || null,
    params.approximateValue || null,
    params.code || null
  ])
}

export async function deleteAsset(assetId: number) {
  return dbConn.query('CALL delete_asset(?)', [assetId])
}
