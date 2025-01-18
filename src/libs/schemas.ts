import { APIGatewayProxyEventSchema } from "@aws-lambda-powertools/parser/schemas";
import { z } from "zod";

export const createAppointmentSchema = APIGatewayProxyEventSchema.extend({
  body: z.object({
    doctorId: z.string(),
    date: z.string().datetime(),
    reminderMinutesBefore: z.number().int().positive()
  }),
  pathParameters: z.object({
    userId: z.string()
  })
});

export type CreateAppointmentEvent = z.infer<typeof createAppointmentSchema>;

export const getAppointmentsSchema = APIGatewayProxyEventSchema.extend({
  pathParameters: z.object({
    userId: z.string()
  })
});

export type GetAppointmentsEvent = z.infer<typeof getAppointmentsSchema>;

export const deleteAppointmentSchema = APIGatewayProxyEventSchema.extend({
  pathParameters: z.object({
    userId: z.string(),
    appointmentId: z.string()
  })
});

export type DeleteAppointmentEvent = z.infer<typeof deleteAppointmentSchema>;

export const updateAppointmentSchema = APIGatewayProxyEventSchema.extend({
  body: z.object({
    status: z.enum(["PENDING", "DONE", "CANCELLED"]).optional(),
    date: z.string().datetime().optional(),
    reminderMinutesBefore: z.number().int().positive().optional()
  }),
  pathParameters: z.object({
    userId: z.string(),
    appointmentId: z.string()
  })
});

export type UpdateAppointmentEvent = z.infer<typeof updateAppointmentSchema>;

export const getAppointmentSchema = APIGatewayProxyEventSchema.extend({
  pathParameters: z.object({
    userId: z.string(),
    appointmentId: z.string()
  })
});

export type GetAppointmentEvent = z.infer<typeof getAppointmentSchema>;
