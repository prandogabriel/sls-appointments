import type { AWS } from "@serverless/typescript";
import * as functions from "@functions/index";
import { serverlessResources } from "./serverless-resources";

const serverlessConfiguration: AWS = {
  service: "sls-appointments",
  frameworkVersion: "3",
  useDotenv: true,
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs20.x",
    apiGateway: {
      minimumCompressionSize: 256,
      shouldStartNameWithService: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000"
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "dynamodb:PutItem",
              "dynamodb:GetItem",
              "dynamodb:DeleteItem",
              "dynamodb:Scan",
              "dynamodb:Query"
            ],
            Resource: {
              "Fn::GetAtt": ["AppointmentsTable", "Arn"]
            }
          }
        ]
      }
    }
  },
  // import the function via paths
  functions,
  package: { individually: true, excludeDevDependencies: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["@aws-sdk/*"],
      target: "node20",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10
    }
  },
  resources: serverlessResources
};

module.exports = serverlessConfiguration;
