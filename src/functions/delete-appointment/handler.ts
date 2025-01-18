import { buildHandler } from "@libs/middleware";
import { noContent } from "@libs/response";
import { DeleteAppointmentEvent, deleteAppointmentSchema } from "@libs/schemas";
import { AppointmentRepositoryImpl } from "@repositories/appointments-repository";
import { AppointmentService } from "@services/appointments-service";

const appointmentsService = new AppointmentService(
  new AppointmentRepositoryImpl()
);

const handler = async (event: DeleteAppointmentEvent) => {
  await appointmentsService.deleteAppointment({
    appointmentId: event.pathParameters.appointmentId,
    userId: event.pathParameters.userId
  });

  return noContent();
};

export const main = buildHandler({ handler, schema: deleteAppointmentSchema });
