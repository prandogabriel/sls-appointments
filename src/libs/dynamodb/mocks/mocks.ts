import { CreateTableCommand, DeleteTableCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { docClient } from "../client";
import { Appointment } from "@entities/appointment";


export const createTableMock = async (tableName: string) => {
  await docClient.send(
    new CreateTableCommand({
      TableName: tableName,
      KeySchema: [
        { AttributeName: 'PK', KeyType: 'HASH' },
        { AttributeName: 'SK', KeyType: 'RANGE' },
      ],
      AttributeDefinitions: [
        { AttributeName: 'PK', AttributeType: 'S' },
        { AttributeName: 'SK', AttributeType: 'S' },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    })
  );
}

export const appointmentsMock: Appointment[] = [
  {
    id: 'appointment-1',
    userId: 'user-123',
    doctorId: 'doctor-1',
    date: '2025-01-01T10:00:00Z',
    reminderMinutesBefore: 60,
    status: 'PENDING',
    createdAt: '2025-01-01T09:00:00Z',
  },
  {
    id: 'appointment-2',
    userId: 'user-123',
    doctorId: 'doctor-2',
    date: '2025-01-02T10:00:00Z',
    reminderMinutesBefore: 30,
    status: 'PENDING',
    createdAt: '2025-01-02T09:00:00Z',
  },
];

export const saveAppointmentsMock = async (appointments: Appointment[], tableName: string) => {
  for (const appointment of appointments) {
    await docClient.send(
      new PutItemCommand({
        TableName: tableName,
        Item: {
          PK: { S: `USER#${appointment.userId}` },
          SK: { S: `APPOINTMENT#${appointment.id}` },
          ...Object.fromEntries(
            Object.entries(appointment).map(([key, value]) => [
              key,
              { S: String(value) },
            ])
          ),
        },
      })
    );
  }
}

export const dropTableMock = async (tableName: string) => {
  await docClient.send(new DeleteTableCommand({ TableName: tableName }));
}