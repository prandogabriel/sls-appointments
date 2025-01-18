import { createHandler } from "@libs/middleware";
import { ok } from "@libs/response";
import { CreateAppointmentEvent, createAppointmentSchema } from "@libs/schemas";
import { AppointmentRepositoryImpl } from "@repositories/appointments-repository";
import { AppointmentService } from "@services/appointments-service";

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

  return ok(appointment);
};

export const main = createHandler({ handler, schema: createAppointmentSchema });
