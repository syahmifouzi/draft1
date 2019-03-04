import React, { Component } from "react"
import { withFirebase } from '../components/FirebaseContext'
import Layout from "../components/layout"
import SEO from "../components/seo"
import {Pie} from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

// charjs how-tos
// https://medium.com/@vickdayaram/using-chart-js-with-react-324b7fac8ee6


class ThirdPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
        testStore: 0,
    };
  }

  componentDidMount(){
    const { firebase } = this.props
    var doc = firebase.firestore().collection('baju').doc('Awla1');

    var observer = doc.onSnapshot(docSnapshot => {
      console.log(`Received doc snapshot: ${docSnapshot}`);
      this.setState({
        testStore: docSnapshot.data().leftTotal
      })
      // ...
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
  }

  componentWillUnmount(){
    const { firebase } = this.props
    var unsub = firebase.firestore().collection('baju').doc('Awla1').onSnapshot(() => {
    });
    unsub();
  }

  render() {
    const { testStore } = this.state
    let dummy = 50 - testStore
    let data= {
        datasets: [{
            backgroundColor: ['rgb(100, 99, 132)', 'rgb(250, 99, 110)'],
            data: [testStore, dummy]
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Unsold',
            'Sold',
        ]
    }
    
    return (
      <Layout>
        <SEO title="Page two" />
        <h1>Inventory</h1>
        <p>Shirts status</p>
        <Pie
	         data={data}
	         width={100}
	         height={50}
             />
      </Layout>
    );
  }
}

export default withFirebase(ThirdPage)
