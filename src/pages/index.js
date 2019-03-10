import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import FetchingExample from '../containers/FetchingExample'
import SignOut from '../containers/SignOut'

// get started with gatsby-firebase
// muhajir is the owner of FetchingExample.js
// https://github.com/muhajirframe/gatsby-starter-firebase
// https://medium.com/@UnicornAgency/jamstack-pwa-lets-build-a-polling-app-with-gatsby-js-firebase-and-styled-components-pt-2-9044534ea6bc
// https://www.djamware.com/post/5bc50ea680aca7466989441d/reactjs-firebase-tutorial-building-firestore-crud-web-application
// https://github.com/firebase/firebaseui-web-react
// https://github.com/the-road-to-react-with-firebase/react-firebase-authentication/tree/34d1887ecee83af0b3d2a51f4a7c78a55e2dabba

// Nodejs on ubuntu
// https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/
// https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/


const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Link to="/draft/">Go to draft page</Link>
    <h1>Hi people</h1>
    <p>Welcome to our website.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
    <Link to="/page-3/">Go to page 3</Link>
    <Link to="/page-4/">Go to page 4</Link>
    <FetchingExample />
    <SignOut />
  </Layout>
)

export default IndexPage
