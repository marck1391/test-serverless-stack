import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { successResponse, errorResponse } from '../utils/response';
import { initializeConnection } from '../services/dbClient';
import { listClients } from '../services/clientService';
import { validateListClientsFilters } from '../schema/listClientsFiltersSchema';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  await initializeConnection();
  try {
    const filters = event.queryStringParameters || {};
    validateListClientsFilters(filters);

    const rows: any = await listClients({
      name: filters.name || undefined,
      rfc: filters.rfc || undefined,
      startDate: filters.startDate || undefined,
      endDate: filters.endDate || undefined,
      page: filters.page ? parseInt(filters.page) : undefined,
      pageSize: filters.pageSize ? parseInt(filters.pageSize) : undefined,
    });

    const result = rows && rows.length > 0 ? rows : { message: 'No clients found' };

    return successResponse(result);
  } catch (err: any) {
    return errorResponse(err.message, err.statusCode || 400);
  }
};
