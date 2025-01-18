import { beforeAll, afterAll, describe, it, expect } from "vitest";
import {
  appointmentsMock,
  createTableMock,
  saveAppointmentsMock,
  dropTableMock,
  testUser
} from "@libs/dynamodb/mocks/mocks";
import { buildAPIGwEventMock } from "@functions/mocks/mock-event";
import { main as getAppointmentsHandler } from "./get-user-appointments/handler";
import { main as getAppointmentInfoHandler } from "./get-user-appointment-info/handler";
import { main as createAppointmentHandler } from "./create-appointment/handler";

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
      const event = buildAPIGwEventMock({
        pathParameters: { userId: testUser }
      });

      const response = await getAppointmentsHandler(event, {} as any);

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body).toEqual(appointmentsMock);
    });

    it("should return a empty array if user does not have appointments", async () => {
      const event = buildAPIGwEventMock({
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
      const event = buildAPIGwEventMock({
        pathParameters: { userId, appointmentId }
      });

      const response = await getAppointmentInfoHandler(event, {} as any);

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body).toEqual(appointmentsMock[0]);
    });

    it("should return a empty array if user does not have appointments", async () => {
      const event = buildAPIGwEventMock({
        pathParameters: {
          userId: "user-without-appointments",
          appointmentId: "non-existing-id"
        }
      });

      const response = await getAppointmentInfoHandler(event, {} as any);

      expect(response.statusCode).toBe(404);
    });
  });

  // Add more tests here
});
