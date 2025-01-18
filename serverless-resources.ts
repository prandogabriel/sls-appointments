import type { AWS } from "@serverless/typescript";

export const serverlessResources: AWS["resources"] = {
  Resources: {
    AppointmentsTable: {
      Type: "AWS::DynamoDB::Table",
      Properties: {
        TableName: "appointments-${opt:stage, 'sandbox'}",
        AttributeDefinitions: [
          {
            AttributeName: "PK", // Partition Key
            AttributeType: "S"
          },
          {
            AttributeName: "SK", // Sort Key
            AttributeType: "S"
          }
        ],
        KeySchema: [
          {
            AttributeName: "PK",
            KeyType: "HASH"
          },
          {
            AttributeName: "SK",
            KeyType: "RANGE"
          }
        ],
        BillingMode: "PAY_PER_REQUEST",
        TimeToLiveSpecification: {
          Enabled: true,
          AttributeName: "TTL"
        }
      }
    }
  }
};
