import { Appointment } from "@entities/appointment";
import { NotFoundException } from "@libs/exceptions";
import { logger } from "@libs/logger";
import { AppointmentRepository } from "@repositories/appointments-repository";
import { randomUUID } from "node:crypto";
import { AppointmentIdsInput, CreateAppointmentInput } from "./types";

export class AppointmentService {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async createAppointment(input: CreateAppointmentInput): Promise<Appointment> {
    const appointment: Appointment = {
      ...input,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      status: "PENDING"
    };

    return this.appointmentRepository.save(appointment);
  }

  async deleteAppointment({
    appointmentId,
    userId
  }: AppointmentIdsInput): Promise<void> {
    const appointment = await this.getAppointByUserOrFail({
      userId,
      appointmentId
    });

    logger.info(
      `Deleting appointment ${appointment.id} for user ${userId} with doctor ${appointment.doctorId}`
    );

    await this.appointmentRepository.delete(userId, appointmentId);
  }

  async getUserAppointmentInfo({
    appointmentId,
    userId
  }: AppointmentIdsInput): Promise<Appointment | null> {
    return this.getAppointByUserOrFail({ userId, appointmentId });
  }

  async getUserAppointments(userId: string): Promise<Appointment[]> {
    return this.appointmentRepository.getByUser(userId);
  }

  async updateUserAppointment(
    { appointmentId, userId }: AppointmentIdsInput,
    updates: Partial<Appointment>
  ): Promise<Appointment> {
    const appointment = await this.getAppointByUserOrFail({
      userId,
      appointmentId
    });

    return this.appointmentRepository.save({
      ...appointment,
      ...this.removeUndefinedFields(updates)
    });
  }

  private removeUndefinedFields<T>(obj: T): T {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as T);
  }

  private async getAppointByUserOrFail({
    appointmentId,
    userId
  }: AppointmentIdsInput): Promise<Appointment> {
    const appointment = await this.appointmentRepository.getByUserAndId(
      userId,
      appointmentId
    );

    if (!appointment) {
      throw new NotFoundException(
        `Appointment ${appointmentId} for user ${userId} not found`
      );
    }
    return appointment;
  }
}
