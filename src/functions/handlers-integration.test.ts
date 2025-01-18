import { beforeAll, afterAll, describe, it, expect } from "vitest";
import {
  appointmentsMock,
  createTableMock,
  saveAppointmentsMock,
  dropTableMock,
  testUser
} from "@libs/dynamodb/mocks/mocks";
import {
  buildGetAPIGwEventMock,
  buildCreateAppointmentAPIGwEventMock
} from "@functions/mocks/mock-event";
import { main as getAppointmentsHandler } from "./get-user-appointments/handler";
import { main as getAppointmentInfoHandler } from "./get-user-appointment-info/handler";
import { main as createAppointmentHandler } from "./create-appointment/handler";
import { main as deleteAppointmentHandler } from "./delete-appointment/handler";

describe("Appointments Handlers Integration Test", () => {
  const tableName = "appointments";

  beforeAll(async () => {
    await createTableMock(tableName);
    await saveAppointmentsMock(appointmentsMock, tableName);
  });

  afterAll(async () => {
    await dropTableMock(tableName);
  });

  describe("getAppointmentsHandler", () => {
    it("should return appointments for a user", async () => {
      const event = buildGetAPIGwEventMock({
        pathParameters: { userId: testUser }
      });

      const response = await getAppointmentsHandler(event, {} as any);

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body).toEqual(appointmentsMock);
    });

    it("should return a empty array if user does not have appointments", async () => {
      const event = buildGetAPIGwEventMock({
        pathParameters: { userId: "user-without-appointments" }
      });

      const response = await getAppointmentsHandler(event, {} as any);

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body).toEqual([]);
    });
  });

  describe("getAppointmentInfoHandler", () => {
    it("should return a appointment for a user", async () => {
      const { id: appointmentId, userId } = appointmentsMock[0];
      const event = buildGetAPIGwEventMock({
        pathParameters: { userId, appointmentId }
      });

      const response = await getAppointmentInfoHandler(event, {} as any);

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body).toEqual(appointmentsMock[0]);
    });

    it("should return a empty array if user does not have appointments", async () => {
      const event = buildGetAPIGwEventMock({
        pathParameters: {
          userId: "user-without-appointments",
          appointmentId: "non-existing-id"
        }
      });

      const response = await getAppointmentInfoHandler(event, {} as any);

      expect(response.statusCode).toBe(404);
    });
  });

  describe("createAppointmentHandler", () => {
    it("should create a new appointment", async () => {
      const event = buildCreateAppointmentAPIGwEventMock();

      const response = await createAppointmentHandler(event, {} as any);

      const newAppointment = JSON.parse(response.body);

      expect(response.statusCode).toBe(201);
      expect(newAppointment.id).toBeDefined();

      const getEvent = buildGetAPIGwEventMock({
        pathParameters: {
          userId: newAppointment.userId,
          appointmentId: newAppointment.id
        }
      });

      const getResponse = await getAppointmentInfoHandler(getEvent, {} as any);

      const appointment = JSON.parse(getResponse.body);

      expect(appointment).toEqual(newAppointment);
    });
  });

  describe("deleteAppointmentHandler", () => {
    it("should delete a appointment", async () => {
      const event = buildCreateAppointmentAPIGwEventMock();

      const response = await createAppointmentHandler(event, {} as any);

      const newAppointment = JSON.parse(response.body);

      expect(response.statusCode).toBe(201);
      expect(newAppointment.id).toBeDefined();

      const getEvent = buildGetAPIGwEventMock({
        pathParameters: {
          userId: newAppointment.userId,
          appointmentId: newAppointment.id
        }
      });

      const getResponse = await getAppointmentInfoHandler(getEvent, {} as any);

      const appointment = JSON.parse(getResponse.body);

      expect(appointment).toEqual(newAppointment);

      const deleteEvent = buildGetAPIGwEventMock({
        pathParameters: {
          userId: newAppointment.userId,
          appointmentId: newAppointment.id
        }
      });

      const deleteResponse = await deleteAppointmentHandler(
        deleteEvent,
        {} as any
      );

      expect(deleteResponse.statusCode).toBe(204);

      const getDeletedResponse = await getAppointmentInfoHandler(
        getEvent,
        {} as any
      );

      expect(getDeletedResponse.statusCode).toBe(404);
    });

    it("should return 404 when appointment does not exists", async () => {
      const event = buildGetAPIGwEventMock({
        pathParameters: {
          userId: "user-without-appointments",
          appointmentId: "non-existing-id"
        }
      });

      const response = await deleteAppointmentHandler(event, {} as any);

      expect(response.statusCode).toBe(404);
    });
  });
});
