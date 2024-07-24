import FloatingBadge from "@/components/floating-badge"
import { Hero } from "@/components/hero"
import PageWrapper from "@/components/wrapper/page-wrapper"

const Home = (): JSX.Element => {
  return (
    <PageWrapper>
      <Hero />
      <FloatingBadge />
    </PageWrapper>
  )
}

export default Home
