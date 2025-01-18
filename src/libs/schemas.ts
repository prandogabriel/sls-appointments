import { APIGatewayProxyEventV2Schema } from "@aws-lambda-powertools/parser/schemas";
import { z } from "zod";

export const createAppointmentSchema = APIGatewayProxyEventV2Schema.extend({
  body: z.object({
    doctorId: z.string(),
    date: z.string().datetime(),
    reminderTimeBefore: z.number().int().positive()
  }),
  pathParameters: z.object({
    userId: z.string()
  })
});

export type CreateAppointmentEvent = z.infer<typeof createAppointmentSchema>;

export const getAppointmentsSchema = APIGatewayProxyEventV2Schema.extend({
  pathParameters: z.object({
    userId: z.string()
  })
});

export type GetAppointmentsEvent = z.infer<typeof getAppointmentsSchema>;

export const deleteAppointmentSchema = APIGatewayProxyEventV2Schema.extend({
  pathParameters: z.object({
    userId: z.string(),
    appointmentId: z.string()
  })
});

export type DeleteAppointmentEvent = z.infer<typeof deleteAppointmentSchema>;

export const updateAppointmentSchema = APIGatewayProxyEventV2Schema.extend({
  body: z.object({
    doctorId: z.string(),
    date: z.string().datetime(),
    reminderTimeBefore: z.number().int().positive()
  }),
  pathParameters: z.object({
    userId: z.string(),
    appointmentId: z.string()
  })
});

export type UpdateAppointmentEvent = z.infer<typeof updateAppointmentSchema>;

export const getAppointmentSchema = APIGatewayProxyEventV2Schema.extend({
  pathParameters: z.object({
    userId: z.string(),
    appointmentId: z.string()
  })
});

export type GetAppointmentEvent = z.infer<typeof getAppointmentSchema>;
