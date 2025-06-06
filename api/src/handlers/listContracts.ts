import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { listContracts } from '../services/contractService';
import { successResponse, errorResponse } from '../utils/response';
import { validateListContractsFilters } from '../schema/listContractsFiltersSchema';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const queryParams = event.queryStringParameters || {};
    validateListContractsFilters(queryParams);

    const result = await listContracts({
      clientId: queryParams.clientId ? parseInt(queryParams.clientId, 10) : undefined,
      status: queryParams.status,
      startDate: queryParams.startDate,
      endDate: queryParams.endDate,
      page: queryParams.page ? parseInt(queryParams.page, 10) : undefined,
      pageSize: queryParams.pageSize ? parseInt(queryParams.pageSize, 10) : undefined,
    });

    return successResponse(result);
  } catch (err: any) {
    return errorResponse(err.message, err.statusCode || 400);
  }
};
