import { STRIPE_AUTHORIZE_ACCOUNT_URL } from "@/stripe.endpoints.constants.mjs"

export async function generateStripeConnectUrl(
  params: z.infer<typeof stripeConnectParamsSchema>
) {
  try {
    const validParams = stripeConnectParamsSchema.parse(params)
    const stripeConnectUrl = new URL(STRIPE_AUTHORIZE_ACCOUNT_URL)
    Object.entries(validParams).forEach(([key, value]) => {
      if (value) {
        stripeConnectUrl.searchParams.append(key, value)
      }
    })
    return { url: stripeConnectUrl.toString() }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Invalid parameters", details: error.errors }
    }
    return { error: "An unexpected error occurred" }
  }
}
