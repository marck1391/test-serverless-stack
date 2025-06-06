import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { updateContract } from '../services/contractService';
import { successResponse, errorResponse } from '../utils/response';
import { validateContractUpdateSchema } from '../schema/contractSchema';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const data = JSON.parse(event.body || '{}');
    validateContractUpdateSchema(data);
    const result = await updateContract({ contractId: parseInt(event.pathParameters?.id || '-1', 10), ...data });
    return successResponse(result);
  } catch (err: any) {
    return errorResponse(err.message, err.statusCode || 400);
  }
};
