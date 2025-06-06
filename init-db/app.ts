import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createTables } from './createTables';
import { createProcedures } from './createProcedures';
import { pool } from './connection';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const tableErrors = await createTables();
    const spErrors = await createProcedures();

    if (tableErrors.length > 0 || spErrors.length > 0) {
        console.error('Errors occurred during initialization:');
        
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happeneds',
                tableErrors,
                spErrors,
            }),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'yeah tables and procedures created',
        }),
    };
};
