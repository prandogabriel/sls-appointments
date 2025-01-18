/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import {
  CreateTableCommand,
  DeleteTableCommand
} from "@aws-sdk/client-dynamodb";
import { Appointment } from "@entities/appointment";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../client";

export const createTableMock = async (tableName: string) => {
  await docClient.send(
    new CreateTableCommand({
      TableName: tableName,
      KeySchema: [
        { AttributeName: "PK", KeyType: "HASH" },
        { AttributeName: "SK", KeyType: "RANGE" }
      ],
      AttributeDefinitions: [
        { AttributeName: "PK", AttributeType: "S" },
        { AttributeName: "SK", AttributeType: "S" }
      ],
      BillingMode: "PAY_PER_REQUEST"
    })
  );
};

export const testUser = "test-user";

export const appointmentsMock: Appointment[] = [
  {
    id: "appointment-1",
    userId: testUser,
    doctorId: "doctor-1",
    date: "2025-01-01T10:00:00Z",
    reminderMinutesBefore: 60,
    status: "PENDING",
    createdAt: "2025-01-01T09:00:00Z"
  },
  {
    id: "appointment-2",
    userId: testUser,
    doctorId: "doctor-2",
    date: "2025-01-02T10:00:00Z",
    reminderMinutesBefore: 30,
    status: "PENDING",
    createdAt: "2025-01-02T09:00:00Z"
  }
];

export const saveAppointmentsMock = async (
  appointments: Appointment[],
  tableName: string
) => {
  for (const appointment of appointments) {
    await docClient.send(
      new PutCommand({
        Item: {
          PK: `USER#${appointment.userId}`,
          SK: `APPOINTMENT#${appointment.id}`,
          ...appointment
        },
        TableName: tableName
      })
    );
  }
};

export const dropTableMock = async (tableName: string) => {
  await docClient.send(new DeleteTableCommand({ TableName: tableName }));
};
