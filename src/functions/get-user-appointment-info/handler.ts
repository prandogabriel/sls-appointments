import { buildHandler } from "@libs/middleware";
import { ok } from "@libs/response";
import { getAppointmentSchema, GetAppointmentEvent } from "@libs/schemas";
import { AppointmentRepositoryImpl } from "@repositories/appointments-repository";
import { AppointmentService } from "@services/appointments-service";

const appointmentsService = new AppointmentService(
  new AppointmentRepositoryImpl()
);

const handler = async (event: GetAppointmentEvent) => {
  const appointment = await appointmentsService.getUserAppointmentInfo({
    appointmentId: event.pathParameters.appointmentId,
    userId: event.pathParameters.userId
  });

  return ok(appointment);
};

export const main = buildHandler({ handler, schema: getAppointmentSchema });
