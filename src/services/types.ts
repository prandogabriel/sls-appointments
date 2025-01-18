export type CreateAppointmentInput = {
  userId: string;
  doctorId: string;
  date: string;
  reminderMinutesBefore: number;
};

export type AppointmentIdsInput = {
  userId: string;
  appointmentId: string;
};
