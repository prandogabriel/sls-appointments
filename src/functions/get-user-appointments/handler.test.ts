import { beforeAll, afterAll, describe, it, expect } from "vitest";
import {
  appointmentsMock,
  createTableMock,
  saveAppointmentsMock,
  dropTableMock,
  testUser
} from "@libs/dynamodb/mocks/mocks";
import { buildAPIGwEventMock } from "@functions/mocks/mock-event";
import { main as getAppointmentsHandler } from "./handler";

describe("Get Appointments Handler Integration Test", () => {
  const tableName = "appointments";

  beforeAll(async () => {
    await createTableMock(tableName);
    await saveAppointmentsMock(appointmentsMock, tableName);
  });

  afterAll(async () => {
    await dropTableMock(tableName);
  });

  it("should return appointments for a user", async () => {
    const event = buildAPIGwEventMock({ pathParameters: { userId: testUser } });

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
