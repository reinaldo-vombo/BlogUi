import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout"
import HeroBanner from "../components/HeroBanner"
import Blogs from "../components/Blogs"
import ViewBlgos from "../components/ViewBlgos"
import Testimonial from "../components/Testimonial"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <HeroBanner />
      <ViewBlgos />
      <Blogs />
      <Testimonial />
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
