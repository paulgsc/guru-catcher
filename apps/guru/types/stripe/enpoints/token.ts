import { z } from "zod"

import { errorCodes } from "./stripe-error-codes"

const authCodeRequestSchema = z.object({
  grant_type: z.literal("authorization_code"),
  code: z.string().min(1, "Code cannot be empty"),
  scope: z.string().optional(),
})

const refreshTokenRequestSchema = z.object({
  grant_type: z.literal("refresh_token"),
  refresh_token: z.string().min(1, "Refresh token cannot be empty"),
  scope: z.string().optional(),
})

export const stripeOAuthRequestSchema = z.union([
  authCodeRequestSchema,
  refreshTokenRequestSchema,
])

export type StripePOSTTokenRequest = z.infer<typeof stripeOAuthRequestSchema>

const successResponseSchema = z.object({
  scope: z.string().min(1, "Scope cannot be empty"),
  stripe_user_id: z.string().min(1, "Stripe user ID cannot be empty"),
  livemode: z.boolean(),
  token_type: z.literal("bearer"),
  access_token: z.string().min(1, "Access token cannot be empty").optional(),
  stripe_publishable_key: z
    .string()
    .min(1, "Stripe publishable key cannot be empty")
    .optional(),
  refresh_token: z.string().min(1, "Refresh token cannot be empty").optional(),
})

const errorResponseSchema = z.object({
  error: errorCodes,
  error_description: z.string().min(1, "Error description cannot be empty"),
  state: z.string().min(1, "State cannot be empty").optional(),
})

export const stripePostTokenResponseSchema = z.union([
  successResponseSchema,
  errorResponseSchema,
])

export type StipePostTokenResponse = z.infer<
  typeof stripePostTokenResponseSchema
>
