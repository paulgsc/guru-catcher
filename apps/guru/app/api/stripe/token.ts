import { NextResponse } from "next/server"

import { KnownError } from "@/lib/error/known-error"

export async function POST(req: Request): Promise<NextResponse> {
  try {
    if (someerror) throw new KnownError(parsedReqBody.error.message)

    const chromeTabs: Tab = parsedReqBody.data satisfies BrowserTab

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    if (error instanceof KnownError)
      return NextResponse.json(
        { message: error.message, ok: false },
        { status: 500 }
      )
    return NextResponse.json(
      { message: "Something went wrong! That's all we know!", ok: false },
      { status: 500 }
    )
  }
}
