import { buildHandler } from "@libs/middleware";
import { created } from "@libs/response";
import { CreateAppointmentEvent, createAppointmentSchema } from "@libs/schemas";
import { AppointmentRepositoryImpl } from "@repositories/appointments-repository";
import { AppointmentService } from "@services/appointments-service";
import httpJsonBodyParser from "@middy/http-json-body-parser";

const appointmentsService = new AppointmentService(
  new AppointmentRepositoryImpl()
);

const handler = async (event: CreateAppointmentEvent) => {
  const appointment = await appointmentsService.createAppointment({
    date: event.body.date,
    doctorId: event.body.doctorId,
    userId: event.pathParameters.userId,
    reminderMinutesBefore: event.body.reminderMinutesBefore
  });

  return created(appointment);
};

export const main = buildHandler({
  handler,
  schema: createAppointmentSchema,
  middlewares: [httpJsonBodyParser()]
});
