import { z } from "zod"

import { usStateSchema } from "@/types/utils"

export const stripeOAuthParamsSchema = z.object({
  client_id: z.string(),
  response_type: z.enum(["code", "token"]).default("code"),
  scope: z.string().default("read_only"),
  redirect_uri: z.string().url().optional(),
  state: usStateSchema.optional(),
  stripe_user: z
    .object({
      email: z.string().email().optional(),
      url: z.string().url().optional(),
      business_name: z.string().optional(),
      business_type: z.string().optional(),
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      dob_day: z.number().int().min(1).max(31).optional(),
      dob_month: z.number().int().min(1).max(12).optional(),
      dob_year: z.number().int().optional(),
      street_address: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zip: z.string().optional(),
      country: z.string().length(2).optional(),
      phone_number: z.string().optional(),
      ssn_last_4: z.string().length(4).optional(),
    })
    .optional(),
})

export type StripeGetAuthorizeTokenRequest = z.infer<
  typeof stripeOAuthParamsSchema
>

export const stripeOAuthResponseSchemaSuccess = z.object({
  code: z.string().min(1, "Authorization code cannot be empty"),
  scope: z.enum(["read_write", "read_only"]),
  state: z.string().min(1, "State cannot be empty"),
})

export const stripeOAuthErrorResponseSchema = z.object({
  error: z.string().min(1, "Error code cannot be empty"),
  error_description: z.string().min(1, "Error description cannot be empty"),
  state: z.string().min(1, "State cannot be empty"),
})

export const stripeOAuthResponseSchema = z.union([
  stripeOAuthResponseSchemaSuccess,
  stripeOAuthErrorResponseSchema,
])

export type StripeGetAuthorizeTokenResponse = z.infer<
  typeof stripeOAuthResponseSchema
>
