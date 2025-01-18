import { createHandler } from "@libs/middleware";
import { ok } from "@libs/response";
import { UpdateAppointmentEvent, updateAppointmentSchema } from "@libs/schemas";
import { AppointmentRepositoryImpl } from "@repositories/appointments-repository";
import { AppointmentService } from "@services/appointments-service";

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
      reminderTimeBefore: event.body.reminderTimeBefore
    }
  );

  return ok(appointment);
};

export const main = createHandler({ handler, schema: updateAppointmentSchema });
