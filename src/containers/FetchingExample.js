import React, { Component } from 'react'
import { withFirebase } from '../components/FirebaseContext'

class FetchingExample extends Component {
  state = {
    test: null,
    testStore: null,
  }
  componentDidMount() {
    const { firebase } = this.props
    firebase
      .database()
      .ref('/test')
      .once('value')
      .then(snapshot => {
        this.setState({
          test: snapshot.val(),
        })
      })
    firebase
      .firestore()
      .collection('host')
      .doc('bilik1')
      .get()
      .then(snapshot => {
        this.setState({
          testStore: 'OK',
        })
        console.log("Cached document data:", snapshot.data());
      })
  }
  render() {
    const { test } = this.state
    const { testStore } = this.state

    if (!test) {
      return null
    }

    return (
      <div>
        <h4>string test data : {test}</h4>
        <h4>string test data : {testStore}</h4>
      </div>
    )
  }
}

export default withFirebase(FetchingExample)
