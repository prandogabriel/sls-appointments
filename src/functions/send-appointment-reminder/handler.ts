import { logger } from "@libs/logger";
import { createHandler } from "@libs/middleware";
import { ok } from "@libs/response";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";

const handler: APIGatewayProxyHandlerV2 = async (event) => {
  logger.info("body", { event });
  return ok({
    message: `Hello!!`
  });
};

export const main = createHandler({ handler });
