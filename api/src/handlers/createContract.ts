import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createContract } from '../services/contractService';
import { successResponse, errorResponse } from '../utils/response';
import { validateContractSchema } from '../schema/contractSchema';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const data = JSON.parse(event.body || '{}');
    validateContractSchema(data);
    const result = await createContract(data);
    return successResponse(result, 201);
  } catch (err: any) {
    return errorResponse(err.message, err.statusCode || 400);
  }
};
