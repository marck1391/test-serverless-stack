import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { deleteClient } from '../services/clientService';
import { successResponse, errorResponse } from '../utils/response';
import { initializeConnection } from '../services/dbClient';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  await initializeConnection()
  try {
    const clientId = event.pathParameters?.id;
    if (!clientId) {
      throw new Error('Client ID is required');
    }
    const result = await deleteClient(clientId);
    return successResponse(result);
  } catch (err: any) {
    return errorResponse(err.message, err.statusCode || 400);
  }
};
