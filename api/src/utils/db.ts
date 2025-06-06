import { APIGatewayProxyEvent } from 'aws-lambda';

export const createApiGatewayEvent = (overrides: Partial<APIGatewayProxyEvent> = {}): APIGatewayProxyEvent => {
  return {
    body: overrides.body || '{}',
    headers: overrides.headers || {},
    multiValueHeaders: overrides.multiValueHeaders || {},
    httpMethod: overrides.httpMethod || 'GET',
    isBase64Encoded: overrides.isBase64Encoded || false,
    path: overrides.path || '',
    queryStringParameters: overrides.queryStringParameters || null,
    multiValueQueryStringParameters: overrides.multiValueQueryStringParameters || null,
    pathParameters: overrides.pathParameters || null,
    stageVariables: overrides.stageVariables || null,
    resource: overrides.resource || '',
    requestContext: overrides.requestContext || ({} as any)
  }
}
