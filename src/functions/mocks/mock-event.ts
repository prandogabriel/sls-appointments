import { daysAhead } from "@libs/date";
import { APIGatewayProxyEvent } from "aws-lambda";

export type BuildEventMockInput = {
  body?: any;
  pathParameters?: any;
  queryStringParameters?: any;
};
export const buildGetAPIGwEventMock = (input: BuildEventMockInput) => {
  return {
    resource: "any",
    path: "any",
    httpMethod: "GET",
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

export const buildCreateAppointmentAPIGwEventMock = () => {
  return {
    resource: "/users/{userId}/appointments",
    path: "/users/test-user/appointments",
    httpMethod: "POST",
    headers: {
      Host: "localhost:3000",
      "User-Agent": "curl/8.5.0",
      Accept: "*/*",
      "Content-Type": "application/json",
      "Content-Length": "92"
    },
    multiValueHeaders: {
      Host: ["localhost:3000"],
      "User-Agent": ["curl/8.5.0"],
      Accept: ["*/*"],
      "Content-Type": ["application/json"],
      "Content-Length": ["92"]
    },
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    pathParameters: { userId: "test-user" },
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
      requestId: "c942e5b2-562b-4ca4-8ef5-7a0cde3dfc89",
      requestTime: "18/Jan/2025:12:36:45 -0300",
      requestTimeEpoch: 1737214605943,
      resourceId: "offlineContext_resourceId",
      resourcePath: "/dev/users/{userId}/appointments",
      domainName: "offlineContext_domainName",
      domainPrefix: "offlineContext_domainPrefix",
      extendedRequestId: "d69123fa-7188-4d14-8008-babe5ea5c04c",
      httpMethod: "POST",
      path: "/users/test-user/appointments",
      operationName: undefined
    },
    body: JSON.stringify({
      doctorId: "doctor-123",
      date: daysAhead(new Date(), 1).toISOString(),
      reminderMinutesBefore: 60
    }),
    isBase64Encoded: false
  };
};
