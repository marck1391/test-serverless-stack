import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { deleteAsset } from '../services/assetService';
import { successResponse, errorResponse } from '../utils/response';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const assetId = event.pathParameters?.id;
    if (!assetId) {
      throw new Error('Asset ID is required');
    }
    const result = await deleteAsset(parseInt(assetId, 10));
    return successResponse(result);
  } catch (err: any) {
    return errorResponse(err.message, err.statusCode || 400);
  }
};
