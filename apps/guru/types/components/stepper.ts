import type { ReactNode } from "react"

type StepperContentTab = "cta" | "preview"

export type StepperCardContent = Record<StepperContentTab, ReactNode>
