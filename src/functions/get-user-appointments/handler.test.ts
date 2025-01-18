import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { main as getAppointmentsHandler } from './handler';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { appointmentsMock, createTableMock, saveAppointmentsMock, dropTableMock } from '@libs/dynamodb/mocks/mocks';
import createEvent from 'aws-event-mocks';

describe('Get Appointments Handler Integration Test', () => {
  const tableName = 'appointments';

  beforeAll(async () => {
    await createTableMock(tableName);
    await saveAppointmentsMock(appointmentsMock, tableName);
  });

  afterAll(async () => {
    await dropTableMock(tableName);
  });

  it('should return appointments for a user', async () => {
    const event:APIGatewayProxyEventV2 = createEvent({
      template: 'aws:apiGateway',
      merge: {
        pathParameters: {
          userId: 'user-123',
        },
      }
    });

    const response = await getAppointmentsHandler(event, {} as any);

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body).toEqual(appointmentsMock);
  });
});


