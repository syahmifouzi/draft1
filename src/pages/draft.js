import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const DraftPage = () => (
  <Layout>
    <SEO title="Draft" />
    <h1>Hi from the second page</h1>
    <p>Welcome to draft</p>
    
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default DraftPage
