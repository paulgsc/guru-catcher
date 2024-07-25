import type { StepperCardContent } from "@/types/components/stepper"

import StepperCard from "../stepper-card"
import CTA from "./cta"
import Preview from "./preview"

const Step2 = (): JSX.Element => {
  const cardContent: StepperCardContent = {
    cta: <CTA />,
    preview: <Preview />,
  }
  return <StepperCard cardContent={cardContent} />
}

export default Step2
