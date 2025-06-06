import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { listAssets } from '../services/assetService';
import { successResponse, errorResponse } from '../utils/response';
import { validateListAssetsFilters } from '../schema/listAssetsFiltersSchema';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const queryParams = event.queryStringParameters || {};
    validateListAssetsFilters(queryParams);

    const result = await listAssets({
      type: queryParams.type as 'vehicle' | 'machinery' | 'furniture',
      keyword: queryParams.keyword,
      startDate: queryParams.startDate,
      endDate: queryParams.endDate,
      page: queryParams.page ? parseInt(queryParams.page, 10) : undefined,
      pageSize: queryParams.pageSize ? parseInt(queryParams.pageSize, 10) : undefined,
      available: queryParams.available === 'true',
    });

    return successResponse(result);
  } catch (err: any) {
    return errorResponse(err.message, err.statusCode || 400);
  }
};
