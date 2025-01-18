import { logger } from "@libs/logger";
import { createHandler } from "@libs/middleware";
import { ok } from "@libs/response";
import { DeleteAppointmentEvent, deleteAppointmentSchema } from "@libs/schemas";

const handler = async (event: DeleteAppointmentEvent) => {
  logger.info("pathParameters", event.pathParameters);

  return ok({
    message: `Hello!!`
  });
};

export const main = createHandler({ handler, schema: deleteAppointmentSchema });
