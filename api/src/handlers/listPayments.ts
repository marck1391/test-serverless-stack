import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { listPayments } from '../services/paymentService';
import { successResponse, errorResponse } from '../utils/response';
import { validateListPaymentsFilters } from '../schema/listPaymentsFiltersSchema';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const queryParams = event.queryStringParameters || {};
    validateListPaymentsFilters(queryParams);

    const result = await listPayments({
      contractId: parseInt(queryParams.contractId!, 10),
      page: queryParams.page ? parseInt(queryParams.page, 10) : undefined,
      pageSize: queryParams.pageSize ? parseInt(queryParams.pageSize, 10) : undefined,
    });
    return successResponse(result);
  } catch (err: any) {
    return errorResponse(err.message, err.statusCode || 400);
  }
};
