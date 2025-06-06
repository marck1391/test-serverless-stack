import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { updateAsset } from '../services/assetService';
import { successResponse, errorResponse } from '../utils/response';
import { validateAssetUpdateSchema } from '../schema/assetSchema';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const assetId = event.pathParameters?.id;
    if (!assetId) {
      throw new Error('Asset ID is required');
    }
    const data = JSON.parse(event.body || '{}');
    validateAssetUpdateSchema(data);
    const result = await updateAsset({ assetId: parseInt(assetId, 10), ...data });
    return successResponse(result);
  } catch (err: any) {
    return errorResponse(err.message, err.statusCode || 400);
  }
};
