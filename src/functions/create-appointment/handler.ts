import { logger } from "@libs/logger";
import { createHandler } from "@libs/middleware";
import { ok } from "@libs/response";
import { CreateAppointmentEvent, createAppointmentSchema } from "@libs/schemas";

const handler = async (event: CreateAppointmentEvent) => {
  logger.info("body", event.body);

  return ok({
    message: `Hello!!`
  });
};

export const main = createHandler({ handler, schema: createAppointmentSchema });
