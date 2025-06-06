import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ZodError } from 'zod';
import { validateClientSchema } from '../schema/clientSchema';
import { checkIfUserExists, createClient } from '../services/clientService';
import { dbConn, initializeConnection } from '../services/dbClient';
import { errorResponse, successResponse } from '../utils/response';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  await initializeConnection()
  try {
    const data = JSON.parse(event.body || '{}');
    validateClientSchema(data);

    try {
      await checkIfUserExists(data.email, data.rfc);
    } catch (err: any) {
      if (['RFCAlreadyExists', 'EmailAlreadyExists'].includes(err.message)) {
        return errorResponse(err.message, 400);
      }
      throw err;
    }

    // let cognitoSub: string | undefined;
    // try {
    //   cognitoSub = await signUpUserInCognito(data.email, data.password, data.name);
    // } catch (err: any) {
    //   return errorResponse(err.code, 400);
    // }

    const clientId = await createClient(dbConn, {
      name: data.name,
      rfc: data.rfc,
      email: data.email,
      cognitoSub: Date.now().toString(),
      phone: data.phone,
      address: data.address
    });

    return successResponse({ message: 'ClientCreatedSuccessfully', clientId })
  } catch (err: any) {
    // console.error('Error creating client:', err);
    if (err instanceof ZodError) {
      return errorResponse(err.errors.map((e) => e.message)[0], 400)
    }
    return errorResponse(err.message, err.statusCode || 500);
  }
};
