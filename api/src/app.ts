import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { handler as createClientHandler } from './handlers/createClient';
import { handler as deleteClientHandler } from './handlers/deleteClient';
import { handler as listClientsHandler } from './handlers/listClients';
import { handler as loginClientHandler } from './handlers/loginClient';
import { handler as updateClientHandler } from './handlers/updateClient';
import { handler as verifyCodeHandler } from './handlers/verifyCode';
import { handler as createAssetHandler } from './handlers/createAsset';
import { handler as listAssetsHandler } from './handlers/listAssets';
import { handler as updateAssetHandler } from './handlers/updateAsset';
import { handler as deleteAssetHandler } from './handlers/deleteAsset';
import { handler as createContractHandler } from './handlers/createContract';
import { handler as updateContractHandler } from './handlers/updateContract';
import { handler as cancelContractHandler } from './handlers/cancelContract';
import { handler as listContractsHandler } from './handlers/listContracts';
import { handler as addPaymentHandler } from './handlers/addPayment';
import { handler as listPaymentsHandler } from './handlers/listPayments';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const resource = event.resource
  const method = event.httpMethod

//   console.log(`Received request for resource: ${resource}, method: ${method}`);

  if (resource === "/clients" && method === "POST") {
    return createClientHandler(event)
  }

  if (resource === "/login" && method === "POST") {
    return loginClientHandler(event)
  }

  if (resource === "/clients" && method === "GET") {
    return listClientsHandler(event)
  }

  if (resource === "/verify-code" && method === "POST") {
    return verifyCodeHandler(event);
  }

  if (resource === "/clients/{id}" && method === "PUT") {
    return updateClientHandler(event)
  }

  if (resource === "/clients/{id}" && method === "DELETE") {
    return deleteClientHandler(event)
  }

  if (resource === "/assets" && method === "POST") {
    return createAssetHandler(event);
  }

  if (resource === "/assets" && method === "GET") {
    return listAssetsHandler(event);
  }

  if (resource === "/assets/{id}" && method === "PUT") {
    return updateAssetHandler(event);
  }

  if (resource === "/assets/{id}" && method === "DELETE") {
    return deleteAssetHandler(event);
  }

  if (resource === "/contracts" && method === "POST") {
    return createContractHandler(event);
  }

  if (resource === "/contracts" && method === "GET") {
    return listContractsHandler(event);
  }

  if (resource === "/contracts/{id}" && method === "PUT") {
    return updateContractHandler(event);
  }

  if (resource === "/contracts/{id}" && method === "DELETE") {
    return cancelContractHandler(event);
  }

  if (resource === "/payments" && method === "POST") {
    return addPaymentHandler(event);
  }

  if (resource === "/payments" && method === "GET") {
    return listPaymentsHandler(event);
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ message: "Resource not found" }),
  }
}
