import React, { Component } from "react"
import { Link } from "gatsby"
import { withFirebase } from '../components/FirebaseContext'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Counter from "../components/statelessMobx"

// How to update object inside setState
// https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react

// Custom attribute form
// https://stackoverflow.com/questions/20377837/how-to-access-custom-attributes-from-event-object-in-react

// Warning: controlled to uncontrolled components
// https://stackoverflow.com/questions/51406927/reactjs-warning-a-component-is-changing-an-uncontrolled-input-of-type-text-to

class SecondPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: '',
      address: {
        street: '',
        city: '',
        postcode: '',
        state: '',
        country: ''
      },
      baju: {
        name: '',
        code: '',
        colour: '',
        size: ''
      },
      email: '',
      popLink: '',
      receiptRef: ''
    };

    // this.onChange3 = this.onChange3.bind(this);
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onChange2 = (e) => {
    const state = this.state
    state.baju[e.target.name] = e.target.value;
    this.setState(state);
  }

  onChange3 = (e) => {
    const state = this.state
    state.address[e.target.name] = e.target.value;
    this.setState(state);
  }

  // onChange3 = (e) => {
  //   const state = this.state
  //   let target = state[e.target.name]
  //   // console.log("target:", target)
  //   let baju = Object.assign({}, target);    //creating copy of object
  //   // console.log("bajus:", bajus)
  //   // console.log("name:", e.target.getAttribute('data-name'))
  //   // console.log("name2nd:", e.target.attributes.getNamedItem('data-name').value)
  //   // console.log("value:", e.target.value)
  //   // console.log("E.TARGET ", e.target)
  //   baju[e.target.getAttribute('data-name')] = e.target.value;                        //updating value
  //   // console.log("baju ", baju)
  //   this.setState({baju});
  //   // console.log("state ", this.state)
  // }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, phone, baju, email, popLink, receiptRef, address } = this.state;
    const { firebase } = this.props

    let today = new Date()
    //date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let day = today.getDate()
    let month = today.getMonth() + 1
    let year = today.getFullYear()

    let date = {
      day: day,
      month: month,
      year: year
    }

    firebase.firestore().collection('receipts').add({
      date,
      name,
      phone,
      baju,
      email,
      popLink,
      receiptRef,
      address
    }).then((docRef) => {
      this.setState({
        name: '',
        phone: '',
        baju: {},
        email: '',
        popLink: '',
        receiptRef: '',
        address: {}
      });
      console.log("Done upload");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });

    let cityRef = firebase.firestore().collection('baju').doc('Awla1');

    let transaction = firebase.firestore().runTransaction(t => {
      return t.get(cityRef)
        .then(doc => {
          // Add one person to the city population
          let newPopulation = doc.data().leftTotal - 1;
          t.update(cityRef, {leftTotal: newPopulation});
        });
    }).then(result => {
      console.log('Transaction success!');
    }).catch(err => {
      console.log('Transaction failure:', err);
    });
  }

  render() {
    const { name, phone, baju, email, popLink, receiptRef, address } = this.state;
    return (
      <Layout>
        <SEO title="Page two" />
        <h1>Hi from the second page</h1>
        <Counter />
        <p>Welcome to page 2</p>
        <form onSubmit={this.onSubmit}>
          <div>
            <label >Name:</label>
            <input type="text" name="name" value={name} onChange={this.onChange} placeholder="Name" />
          </div>
          <div>
            <label >Phone:</label>
            <input type="text" name="phone" value={phone} onChange={this.onChange} placeholder="Phone" />
          </div>
          <div>
            <label >Email:</label>
            <input type="text" name="email" value={email} onChange={this.onChange} placeholder="Email" />
          </div>
          <div>
            <label >POP Link:</label>
            <input type="text" name="popLink" value={popLink} onChange={this.onChange} placeholder="POP Link" />
          </div>
          <div>
            <label >Receipt Reference:</label>
            <input type="text" name="receiptRef" value={receiptRef} onChange={this.onChange} placeholder="Receipt Reference" />
          </div>
          <div>
            <label >Baju:</label>
            <input type="text" name="name" value={baju.name || ''} onChange={this.onChange2} placeholder="Nama Baju" />
            <input type="text" name="code" value={baju.code || ''} onChange={this.onChange2} placeholder="Code Baju" />
            <input type="text" name="colour" value={baju.colour || ''} onChange={this.onChange2} placeholder="Colour Baju" />
            <input type="text" name="size" value={baju.size || ''} onChange={this.onChange2} placeholder="Size Baju" />
          </div>
          <div>
            <label >Address:</label>
            <input type="text" name="street" value={address.street || ''} onChange={this.onChange3} placeholder="Street Line" />
            <input type="text" name="city" value={address.city || ''} onChange={this.onChange3} placeholder="City" />
            <input type="text" name="state" value={address.state || ''} onChange={this.onChange3} placeholder="State" />
            <input type="text" name="postcode" value={address.postcode || ''} onChange={this.onChange3} placeholder="Postal Code" />
            <input type="text" name="country" value={address.country || ''} onChange={this.onChange3} placeholder="Country" />
          </div>
          <button type="submit">Submit</button>
        </form>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    );
  }
}

export default withFirebase(SecondPage)
