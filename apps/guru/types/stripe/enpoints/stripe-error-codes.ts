import { z } from "zod"

export const errorCodes = z.enum([
  "invalid_request",
  "invalid_grant",
  "unsupported_grant_type",
  "invalid_scope",
  "unsupported_response_type",
])

export type StripeErrorCodes = z.infer<typeof errorCodes>
