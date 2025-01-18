import { buildHandler } from "@libs/middleware";
import { ok } from "@libs/response";
import { UpdateAppointmentEvent, updateAppointmentSchema } from "@libs/schemas";
import { AppointmentRepositoryImpl } from "@repositories/appointments-repository";
import { AppointmentService } from "@services/appointments-service";
import httpJsonBodyParser from "@middy/http-json-body-parser";

const appointmentsService = new AppointmentService(
  new AppointmentRepositoryImpl()
);

const handler = async (event: UpdateAppointmentEvent) => {
  const appointment = await appointmentsService.updateUserAppointment(
    {
      appointmentId: event.pathParameters.appointmentId,
      userId: event.pathParameters.userId
    },
    {
      date: event.body.date,
      doctorId: event.body.doctorId,
      reminderMinutesBefore: event.body.reminderMinutesBefore
    }
  );

  return ok(appointment);
};

export const main = buildHandler({
  handler,
  schema: updateAppointmentSchema,
  middlewares: [httpJsonBodyParser()]
});
