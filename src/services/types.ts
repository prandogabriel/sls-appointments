export type CreateAppointmentInput = {
  userId: string;
  doctorId: string;
  date: string;
  reminderTimeBefore: number;
};

export type AppointmentIdsInput = {
  userId: string;
  appointmentId: string;
};
