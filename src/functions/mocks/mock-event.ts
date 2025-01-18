import { APIGatewayProxyEvent } from "aws-lambda";

export type BuildEventMockInput = {
  body?: any;
  pathParameters?: any;
  queryStringParameters?: any;
  httpMethod?: string;
};
export const buildAPIGwEventMock = (input: BuildEventMockInput) => {
  return {
    resource: "any",
    path: "any",
    httpMethod: input.httpMethod ?? "GET",
    headers: {
      Host: "localhost:3000",
      "User-Agent": "curl/8.5.0",
      Accept: "*/*"
    },
    multiValueHeaders: {
      Host: ["localhost:3000"],
      "User-Agent": ["curl/8.5.0"],
      Accept: ["*/*"]
    },
    queryStringParameters: input.queryStringParameters ?? {},
    multiValueQueryStringParameters: null,
    pathParameters: input.pathParameters ?? {},
    stageVariables: null,
    requestContext: {
      accountId: "offlineContext_accountId",
      apiId: "offlineContext_apiId",
      stage: "dev",
      protocol: "HTTP/1.1",
      identity: {
        accessKey: null,
        accountId: "offlineContext_accountId",
        apiKey: "offlineContext_apiKey",
        apiKeyId: "offlineContext_apiKeyId",
        caller: "offlineContext_caller",
        cognitoAuthenticationProvider:
          "offlineContext_cognitoAuthenticationProvider",
        cognitoAuthenticationType: "offlineContext_cognitoAuthenticationType",
        cognitoIdentityId: "offlineContext_cognitoIdentityId",
        cognitoIdentityPoolId: "offlineContext_cognitoIdentityPoolId",
        principalOrgId: null,
        sourceIp: "127.0.0.1",
        user: "offlineContext_user",
        userAgent: "curl/8.5.0",
        userArn: "offlineContext_userArn"
      },
      requestId: "ef7361c1-bc59-4c7d-9e6e-4d88f2dededb",
      requestTime: "18/Jan/2025:11:41:27 -0300",
      requestTimeEpoch: 1737211287045,
      resourceId: "offlineContext_resourceId",
      resourcePath: "/devany",
      domainName: "offlineContext_domainName",
      domainPrefix: "offlineContext_domainPrefix",
      extendedRequestId: "63daedde-53be-4f04-8cd2-8c30d5b2baf5",
      httpMethod: "GET",
      path: "/users/test-user/appointments",
      operationName: undefined
    },
    body: input.body ? input.body : null,
    isBase64Encoded: false
  } as any as APIGatewayProxyEvent;
};
