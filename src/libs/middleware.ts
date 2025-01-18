import { parser } from "@aws-lambda-powertools/parser/middleware";
import middy from "@middy/core";
import {
  APIGatewayProxyResult,
  Handler,
  APIGatewayProxyEvent
} from "aws-lambda";
import { z } from "zod";
import { ZodSchema } from "zod/lib/types";
import httpJsonBodyParser from "@middy/http-json-body-parser";

import { CustomException } from "./exceptions";
import { logger } from "./logger";

export type CreateHandlerInput<T> = {
  handler: T;
  schema?: ZodSchema;
};

export function createHandler<T = Handler>({
  handler,
  schema = z.any()
}: CreateHandlerInput<T>) {
  return middy(handler)
    .use(httpJsonBodyParser())
    .use(errorHandling())
    .use(parser({ schema }));
}

export function errorHandling(): middy.MiddlewareObj<
  Parameters<Handler>[0],
  APIGatewayProxyResult
> {
  const onError: middy.MiddlewareFn<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
  > = async (request) => {
    if (request.error instanceof CustomException) {
      logger.error(request.error.message, {
        error: request.error
      });

      return {
        statusCode: request.error.code,
        body: JSON.stringify({
          message: request.error.message
        })
      };
    }

    logger.error(request.error?.message ?? "Error message N/A", {
      error: request.error
    });

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error"
      })
    };
  };

  return {
    onError
  };
}
