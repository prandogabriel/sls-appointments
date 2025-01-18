import { parser } from "@aws-lambda-powertools/parser/middleware";
import middy, { MiddlewareObj } from "@middy/core";
import {
  APIGatewayProxyResult,
  Handler,
  APIGatewayProxyEvent
} from "aws-lambda";
import { z } from "zod";
import { ZodSchema } from "zod/lib/types";

import { CustomException } from "./exceptions";
import { logger } from "./logger";

export type buildHandlerInput<T> = {
  handler: T;
  schema?: ZodSchema;
};

interface HandlerBuilder<T> {
  handler: T;
  schema?: z.ZodSchema;
  middlewares?: MiddlewareObj<any, any>[];
}

export function buildHandler<T = Handler>({
  handler,
  schema = z.any(),
  middlewares = []
}: HandlerBuilder<T>) {
  const baseHandler = middy(handler);

  middlewares.forEach((middleware) => baseHandler.use(middleware));

  return baseHandler.use(errorHandling()).use(parser({ schema }));
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
