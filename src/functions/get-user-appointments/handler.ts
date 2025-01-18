import { logger } from "@libs/logger";
import { createHandler } from "@libs/middleware";
import { ok } from "@libs/response";
import { getAppointmentsSchema, GetAppointmentsEvent } from "@libs/schemas";

const handler = async (event: GetAppointmentsEvent) => {
  logger.info("body", event.pathParameters);
  return ok({
    message: `Hello!!`
  });
};

export const main = createHandler({ handler, schema: getAppointmentsSchema });
