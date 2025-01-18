import { APIGatewayProxyResultV2 } from "aws-lambda/trigger/api-gateway-proxy";

const buildResponse = (
  statusCode: number,
  body?: unknown
): APIGatewayProxyResultV2 => {
  const response: { statusCode: number; body?: string } = {
    statusCode
  };

  if (body) {
    response.body = JSON.stringify(body);
  }

  return response;
};

export const ok = (body: unknown): APIGatewayProxyResultV2 => {
  return buildResponse(200, body);
};

export const created = (body: unknown): APIGatewayProxyResultV2 => {
  return buildResponse(201, body);
};

export const noContent = (): APIGatewayProxyResultV2 => {
  return buildResponse(204, null);
};

export const notFound = (body: unknown): APIGatewayProxyResultV2 => {
  return buildResponse(404, body);
};

export const badRequest = (body: unknown): APIGatewayProxyResultV2 => {
  return buildResponse(400, body);
};
