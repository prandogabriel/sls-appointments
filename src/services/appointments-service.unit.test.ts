import { describe, it, expect, vi, beforeEach } from "vitest";
import { AppointmentRepository } from "@repositories/appointments-repository";
import { NotFoundException } from "@libs/exceptions";
import { Appointment } from "@entities/appointment";
import { daysAgo, daysAhead } from "@libs/date";
import { AppointmentService } from "./appointments-service";
import { CreateAppointmentInput } from "./types";

vi.mock("node:crypto", () => ({
  randomUUID: vi.fn(() => "mocked-uuid")
}));

describe("AppointmentService", () => {
  let appointmentService: AppointmentService;
  let appointmentRepository: AppointmentRepository;

  beforeEach(() => {
    appointmentRepository = {
      save: vi.fn(),
      delete: vi.fn(),
      getByUser: vi.fn(),
      getByUserAndId: vi.fn()
    } as unknown as AppointmentRepository;

    appointmentService = new AppointmentService(appointmentRepository);
  });

  it("should create an appointment", async () => {
    const input: CreateAppointmentInput = {
      userId: "user-123",
      doctorId: "doctor-123",
      date: daysAhead(new Date(), 1).toISOString(),
      reminderMinutesBefore: 60
    };

    const expectedAppointment: Appointment = {
      ...input,
      id: "mocked-uuid",
      createdAt: expect.any(String),
      status: "PENDING"
    };

    vi.spyOn(appointmentRepository, "save").mockResolvedValueOnce(
      expectedAppointment
    );

    const result = await appointmentService.createAppointment(input);

    expect(appointmentRepository.save).toHaveBeenCalledWith(
      expectedAppointment
    );
    expect(result).toEqual(expectedAppointment);
  });

  it("should throw BadRequestException when date to create new appointment is in the past", async () => {
    const input: CreateAppointmentInput = {
      userId: "user-123",
      doctorId: "doctor-123",
      date: "2020-01-01T10:00:00Z",
      reminderMinutesBefore: 60
    };

    await expect(appointmentService.createAppointment(input)).rejects.toThrow();
  });

  it("should throw NotFoundException when deleting a non-existent appointment", async () => {
    vi.spyOn(appointmentRepository, "getByUserAndId").mockResolvedValueOnce(
      null
    );

    await expect(
      appointmentService.deleteAppointment({
        userId: "user-123",
        appointmentId: "appointment-123"
      })
    ).rejects.toThrow(NotFoundException);
  });

  it("should delete an appointment", async () => {
    const mockAppointment: Appointment = {
      id: "appointment-123",
      reminderMinutesBefore: 60,
      userId: "user-123",
      doctorId: "doctor-123",
      date: "2025-01-01T10:00:00Z",
      createdAt: "2025-01-01T09:00:00Z",
      status: "PENDING"
    };

    vi.spyOn(appointmentRepository, "getByUserAndId").mockResolvedValueOnce(
      mockAppointment
    );
    vi.spyOn(appointmentRepository, "delete").mockResolvedValueOnce(undefined);

    await appointmentService.deleteAppointment({
      userId: "user-123",
      appointmentId: "appointment-123"
    });

    expect(appointmentRepository.getByUserAndId).toHaveBeenCalledWith(
      "user-123",
      "appointment-123"
    );
    expect(appointmentRepository.delete).toHaveBeenCalledWith(
      "user-123",
      "appointment-123"
    );
  });

  it("should throw BadRequestException when deleting a non-pending appointment", async () => {
    const mockAppointment: Appointment = {
      id: "appointment-123",
      reminderMinutesBefore: 60,
      userId: "user-123",
      doctorId: "doctor-123",
      date: "2025-01-01T10:00:00Z",
      createdAt: "2025-01-01T09:00:00Z",
      status: "DONE"
    };

    vi.spyOn(appointmentRepository, "getByUserAndId").mockResolvedValueOnce(
      mockAppointment
    );

    await expect(
      appointmentService.deleteAppointment({
        userId: "user-123",
        appointmentId: "appointment-123"
      })
    ).rejects.toThrow();
  });

  it("should throw BadRequestException when updating an appointment in the past", async () => {
    const mockAppointment: Appointment = {
      id: "appointment-123",
      reminderMinutesBefore: 60,
      userId: "user-123",
      doctorId: "doctor-123",
      date: daysAhead(new Date(), 1).toISOString(),
      createdAt: "2025-01-01T09:00:00Z",
      status: "PENDING"
    };

    vi.spyOn(appointmentRepository, "getByUserAndId").mockResolvedValueOnce(
      mockAppointment
    );

    await expect(
      appointmentService.updateUserAppointment(
        { userId: "user-123", appointmentId: "appointment-123" },
        { date: daysAgo(new Date(), 1).toISOString() }
      )
    ).rejects.toThrow();
  });

  it("should throw NotFoundException when updating a non-existent appointment", async () => {
    vi.spyOn(appointmentRepository, "getByUserAndId").mockResolvedValueOnce(
      null
    );

    await expect(
      appointmentService.updateUserAppointment(
        { userId: "user-123", appointmentId: "appointment-123" },
        { status: "DONE" }
      )
    ).rejects.toThrow(NotFoundException);
  });

  it("should update an appointment", async () => {
    const mockAppointment: Appointment = {
      id: "appointment-123",
      userId: "user-123",
      doctorId: "doctor-123",
      date: "2025-01-01T10:00:00Z",
      reminderMinutesBefore: 60,
      createdAt: "2025-01-01T09:00:00Z",
      status: "PENDING"
    };

    const updates: Partial<Appointment> = { status: "DONE" };

    vi.spyOn(appointmentRepository, "getByUserAndId").mockResolvedValueOnce(
      mockAppointment
    );
    vi.spyOn(appointmentRepository, "save").mockResolvedValueOnce({
      ...mockAppointment,
      ...updates
    });

    const result = await appointmentService.updateUserAppointment(
      { userId: "user-123", appointmentId: "appointment-123" },
      updates
    );

    expect(appointmentRepository.getByUserAndId).toHaveBeenCalledWith(
      "user-123",
      "appointment-123"
    );
    expect(appointmentRepository.save).toHaveBeenCalledWith({
      ...mockAppointment,
      ...updates
    });
    expect(result).toEqual({ ...mockAppointment, ...updates });
  });

  it("should get user appointments", async () => {
    const mockAppointments: Appointment[] = [
      {
        id: "appointment-1",
        status: "PENDING",
        reminderMinutesBefore: 60,
        date: "2025-01",
        createdAt: "2025-01",
        updatedAt: "2025-01",
        userId: "user-123",
        doctorId: "doctor-1"
      }
    ];

    vi.spyOn(appointmentRepository, "getByUser").mockResolvedValueOnce(
      mockAppointments
    );

    const result = await appointmentService.getUserAppointments("user-123");

    expect(appointmentRepository.getByUser).toHaveBeenCalledWith("user-123");
    expect(result).toEqual(mockAppointments);
  });

  it("should get user appointment by id", async () => {
    const mockAppointment: Appointment = {
      id: "appointment-1",
      status: "PENDING",
      reminderMinutesBefore: 60,
      date: "2025-01",
      createdAt: "2025-01",
      updatedAt: "2025-01",
      userId: "user-123",
      doctorId: "doctor-1"
    };

    vi.spyOn(appointmentRepository, "getByUserAndId").mockResolvedValueOnce(
      mockAppointment
    );

    const result = await appointmentService.getUserAppointmentInfo({
      userId: "user-123",
      appointmentId: "appointment-1"
    });

    expect(appointmentRepository.getByUserAndId).toHaveBeenCalledWith(
      "user-123",
      "appointment-1"
    );
    expect(result).toEqual(mockAppointment);
  });

  it("should throw NotFoundException when getting a non-existent appointment", async () => {
    vi.spyOn(appointmentRepository, "getByUserAndId").mockResolvedValueOnce(
      null
    );

    await expect(
      appointmentService.getUserAppointmentInfo({
        userId: "user-123",
        appointmentId: "appointment-1"
      })
    ).rejects.toThrow(NotFoundException);
  });
});
