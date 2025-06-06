import { CognitoIdentityServiceProvider } from 'aws-sdk'
import { dbConn } from './dbClient'
import { DEFAULT_PAGE_SIZE } from '../constants'

const cognito = new CognitoIdentityServiceProvider()

export async function updateClient(
  id: string,
  params: {
    name: string
    rfc: string
    email: string
  }
) {
  const [rows] = await dbConn.query('CALL update_client(?, ?, ?, ?)', [id, params.name, params.rfc, params.email])
  return rows
}

export async function deleteClient(id: string) {
  const [rows] = await dbConn.query('CALL delete_client(?)', [id])
  return rows
}

export async function checkIfUserExists(email: string, rfc: string): Promise<void> {
  await dbConn.query('CALL checkIfUserExists(?, ?)', [email, rfc])
}

type CreateClientError = {
  code: string
  field: string
}

export async function createClient(conn:any, data: {
  name: string,
  rfc: string,
  email: string,
  cognitoSub: string,
  phone?: string,
  address?: string,
}):Promise<number> {
  try {
    await conn.query('CALL create_client(?, ?, ?, ?, ?, ?);', [
      data.name,
      data.rfc,
      data.email,
      data.cognitoSub,
      data.phone,
      data.address
    ])
  } catch (error: any) {
    const duplicateFieldRegex = /Duplicate entry '.*' for key '(.*?)'/
    const match = duplicateFieldRegex.exec(error.message)
    if (error.code === 'ER_DUP_ENTRY' && match) {
      error.message = `Duplicate key ${match[1]}`
    }
    throw error
  }

  try {
    const [[{client_id}]]: any = await conn.query('SELECT @CLIENT_ID AS client_id;')
    return client_id
  } catch (err) {
    throw new Error('Error retrieving client_id after insert')
  }
}

export async function listClients(filters: {
  name?: string
  rfc?: string
  startDate?: string
  endDate?: string
  page?: number
  pageSize?: number
}) {
  const offset = ((filters.page || 1) - 1) * (filters.pageSize || DEFAULT_PAGE_SIZE)

  const [rows]: any = await dbConn.query('CALL list_clients(?, ?, ?, ?, ?, ?)', [
    filters.name || null,
    filters.rfc || null,
    filters.startDate || null,
    filters.endDate || null,
    offset,
    filters.pageSize || DEFAULT_PAGE_SIZE
  ])

  return rows[0]
}
