import React, { Component } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faFacebookSquare, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import getFirebase from '../firebase'
import FirebaseContext from '../components/FirebaseContext'
import SignIn from '../containers/SignIn'
import { Provider } from 'mobx-react'
import store from '../store/'

library.add(fab, faFacebookSquare, faInstagram, faTwitter, faWhatsapp)

class Layout extends Component {
  state = {
    firebase: null,
    authenticated: false,
  }

  componentDidMount() {
    const app = import('firebase/app')
    const auth = import('firebase/auth')
    const database = import('firebase/database')

    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0])
      this.setState({ firebase })

      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          this.setState({ authenticated: false })
        } else {
          this.setState({ authenticated: true })
        }
      })
    })
  }

  render = () => {
    const { firebase, authenticated } = this.state

    if (!firebase) return null

    return (
      <Provider store={store}>
        <FirebaseContext.Provider value={firebase}>
          {authenticated ? this.props.children : <SignIn />}
        </FirebaseContext.Provider>
      </Provider>
    )
  }
}

export default Layout
