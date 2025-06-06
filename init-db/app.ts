import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import initDb from './initDb';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const errors = await initDb();

    if (errors.length) {
        console.error('Errors occurred during initialization:');
        
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Database initialization failed',
                errors,
            }),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Database initialized successfully',
        }),
    };
};
