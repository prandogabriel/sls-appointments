import { docClient } from "@libs/dynamodb";
import {
  GetCommand,
  PutCommand,
  DeleteCommand,
  QueryCommand
} from "@aws-sdk/lib-dynamodb";
import { Appointment } from "../entities/appointment";

const TABLE_NAME = "appointments";

export interface AppointmentRepository {
  delete(userId: string, appointmentId: string): Promise<boolean>;
  getByUserAndId(
    userId: string,
    appointmentId: string
  ): Promise<Appointment | null>;
  getByUser(userId: string): Promise<Appointment[]>;
  save(appointment: Appointment): Promise<Appointment>;
}

export class AppointmentRepositoryImpl implements AppointmentRepository {
  private getSK(appointmentId: string): string {
    return `APPOINTMENT#${appointmentId}`;
  }
  private getPK(userId: string): string {
    return `USER#${userId}`;
  }

  async delete(userId: string, appointmentId: string): Promise<boolean> {
    await docClient.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: {
          PK: this.getPK(userId),
          SK: this.getSK(appointmentId)
        }
      })
    );

    return true;
  }

  async getByUserAndId(
    userId: string,
    appointmentId: string
  ): Promise<Appointment | null> {
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: {
          PK: this.getPK(userId),
          SK: this.getSK(appointmentId)
        }
      })
    );

    return result.Item as Appointment | null;
  }

  async getByUser(userId: string): Promise<Appointment[]> {
    const result = await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: "PK = :pk AND begins_with(SK, :skPrefix)",
        ExpressionAttributeValues: {
          ":pk": this.getPK(userId),
          ":skPrefix": "APPOINTMENT#"
        }
      })
    );

    return result.Items as Appointment[];
  }

  async save(appointment: Appointment): Promise<Appointment> {
    const putItemCommand = new PutCommand({
      Item: {
        PK: this.getPK(appointment.userId),
        SK: this.getSK(appointment.id),
        ...appointment
      },
      TableName: TABLE_NAME
    });

    await docClient.send(putItemCommand);

    return appointment;
  }
}
