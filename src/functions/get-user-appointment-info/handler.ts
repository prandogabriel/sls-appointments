import { logger } from "@libs/logger";
import { createHandler } from "@libs/middleware";
import { ok } from "@libs/response";
import { getAppointmentSchema, GetAppointmentEvent } from "@libs/schemas";

const handler = async (event: GetAppointmentEvent) => {
  logger.info("body", event.pathParameters);
  return ok({
    message: `Hello!!`
  });
};

export const main = createHandler({ handler, schema: getAppointmentSchema });
