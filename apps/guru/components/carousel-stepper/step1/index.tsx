import type { StepperCardContent } from "@/types/components/stepper"

import StepperCard from "../stepper-card"
import CTA from "./cta"
import Preview from "./preview"

const Step1 = (): JSX.Element => {
  const cardContent: StepperCardContent = {
    cta: <CTA />,
    preview: <Preview />,
  } satisfies StepperCardContent
  return <StepperCard cardContent={cardContent} />
}

export default Step1
