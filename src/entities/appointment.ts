export interface Appointment {
  id: string;
  userId: string;
  doctorId: string;
  date: string;
  reminderMinutesBefore: number;
  status: "PENDING" | "DONE" | "CANCELLED";
  createdAt: string;
  updatedAt?: string;
}
