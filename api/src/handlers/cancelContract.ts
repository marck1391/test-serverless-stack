import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { cancelContract } from '../services/contractService';
import { successResponse, errorResponse } from '../utils/response';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const contractId = event.pathParameters?.id;
    if (!contractId) {
      throw new Error('Contract ID is required');
    }
    const result = await cancelContract(parseInt(contractId, 10));
    return successResponse(result);
  } catch (err: any) {
    return errorResponse(err.message, err.statusCode || 400);
  }
};
