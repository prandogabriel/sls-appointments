import { logger } from "@libs/logger";
import { createHandler } from "@libs/middleware";
import { ok } from "@libs/response";
import { getAppointmentsSchema, GetAppointmentsEvent } from "@libs/schemas";
import { AppointmentRepositoryImpl } from "@repositories/appointments-repository";
import { AppointmentService } from "@services/appointments-service";

const appointmentsService = new AppointmentService(
  new AppointmentRepositoryImpl()
);

const handler = async (event: GetAppointmentsEvent) => {
  logger.info(`Getting appointments for user `, event.pathParameters);
  const appointments = await appointmentsService.getUserAppointments(
    event.pathParameters.userId
  );

  return ok(appointments);
};

export const main = createHandler({ handler, schema: getAppointmentsSchema });
