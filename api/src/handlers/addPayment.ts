import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { addPayment } from '../services/paymentService';
import { successResponse, errorResponse } from '../utils/response';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const data = JSON.parse(event.body || '{}');
    const result = await addPayment(data);
    return successResponse(result, 201);
  } catch (err: any) {
    return errorResponse(err.message, err.statusCode || 400);
  }
};
