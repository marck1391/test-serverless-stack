import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { successResponse, errorResponse } from '../utils/response'
import { verifyCode } from '../services/authService'
import { validateEmail } from '../schema/emailClientSchema'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const data = JSON.parse(event.body || '{}')
    validateEmail(data)
    const result = await verifyCode(data)
    return successResponse(result)
  } catch (err: any) {
    return errorResponse(err.message, err.statusCode || 400)
  }
}
