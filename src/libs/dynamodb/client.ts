import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const defaultLocalStackConfig: DynamoDBClientConfig = {
  region: "us-east-1",
  endpoint: "http://localhost:4566"
};

const client = new DynamoDBClient(
  process.env.ENVIRONMENT === "test"
    ? defaultLocalStackConfig
    : {
        region:
          process.env.ENVIRONMENT === "production" ? "us-east-1" : "us-west-1"
      }
);

export const docClient = DynamoDBDocumentClient.from(client);
