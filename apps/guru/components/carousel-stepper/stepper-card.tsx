import type { FC } from "react"

import type { StepperCardContent } from "@/types/components/stepper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type StepperCardProps = {
  cardContent: StepperCardContent
}

const StepperCard: FC<StepperCardProps> = ({
  cardContent: { cta, preview },
}): JSX.Element => {
  return (
    <Tabs defaultValue="cta" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="cta">CTA</TabsTrigger>
        <TabsTrigger value="preview">Preview Results</TabsTrigger>
      </TabsList>
      <TabsContent value="cta">{cta}</TabsContent>
      <TabsContent value="preview">{preview}</TabsContent>
    </Tabs>
  )
}

export default StepperCard
