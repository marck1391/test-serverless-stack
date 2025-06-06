import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { updateClient } from '../services/clientService';
import { successResponse, errorResponse } from '../utils/response';
import { validateUpdateClient } from '../schema/updateClientSchema';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const clientId = event.pathParameters?.id;
    if (!clientId) {
      throw new Error('Client ID is required');
    }
    const data = JSON.parse(event.body || '{}');
    validateUpdateClient(data);

    const result = await updateClient(clientId, data);
    return successResponse(result);
  } catch (err: any) {
    return errorResponse(err.message, err.statusCode || 400);
  }
};
