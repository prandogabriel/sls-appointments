
import { parser } from '@aws-lambda-powertools/parser/middleware';
import middy from '@middy/core';
import { Handler } from 'aws-lambda';
import { z } from 'zod';
import { ZodSchema } from 'zod/lib/types';

export type CreateHandlerInput<T> = {
  handler: T;
  schema?: ZodSchema;
}

export function createHandler<T = Handler>({ handler, schema = z.any() }: CreateHandlerInput<T>) {
  return middy(handler).use(
    parser({ schema })
  );
}