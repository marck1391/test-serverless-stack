import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createAsset } from '../services/assetService';
import { successResponse, errorResponse } from '../utils/response';
import { validateAssetSchema } from '../schema/assetSchema';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const data = JSON.parse(event.body || '{}');
    validateAssetSchema(data);
    const result = await createAsset(data);
    return successResponse(result, 201);
  } catch (err: any) {
    return errorResponse(err.message, err.statusCode || 400);
  }
};
