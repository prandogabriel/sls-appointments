import type { AWS } from '@serverless/typescript';

export const serverlessResources: AWS["resources"] = {
  Resources: {
    appointmentsTable: {
      Type: 'AWS::DynamoDB::Table',
      Properties: {
        TableName: 'appointments',
        AttributeDefinitions: [
          {
            AttributeName: 'PK', // Partition Key
            AttributeType: 'S',
          },
          {
            AttributeName: 'SK', // Sort Key
            AttributeType: 'S',
          },
        ],
        KeySchema: [
          {
            AttributeName: 'PK',
            KeyType: 'HASH',
          },
          {
            AttributeName: 'SK',
            KeyType: 'RANGE',
          },
        ],
        BillingMode: 'PAY_PER_REQUEST',
        TimeToLiveSpecification: {
          Enabled: true,
          AttributeName: 'TTL',
        },
      },
    },
  },
};
