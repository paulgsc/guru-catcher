"use client"

import { useState } from "react"

const StripeConnectButton = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null)

  const handleConnect = async () => {
    const result = await generateStripeConnectUrl({
      client_id: process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID!,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/stripe-callback`,
      scope: "read_write",
    })

    if ("url" in result) {
      window.location.href = result.url
    } else {
      setError(result.error || "An error occurred")
    }
  }

  return (
    <div>
      <button onClick={handleConnect}>Connect with Stripe</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}

export default StripeConnectButton
