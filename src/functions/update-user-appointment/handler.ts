import { logger } from "@libs/logger";
import { createHandler } from "@libs/middleware";
import { ok } from "@libs/response";
import { UpdateAppointmentEvent, updateAppointmentSchema } from "@libs/schemas";

const handler = async (event: UpdateAppointmentEvent) => {
  logger.info("body", event.body);
  return ok({
    message: `Hello!!`
  });
};

export const main = createHandler({ handler, schema: updateAppointmentSchema });
