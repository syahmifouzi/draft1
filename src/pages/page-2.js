import React, { Component } from "react"
import { Link } from "gatsby"
import { withFirebase } from '../components/FirebaseContext'
import Layout from "../components/layout"
import SEO from "../components/seo"
import ClothList from "../components/ClothList"
import InjectQty from "../components/InjectQty"
import InputCom from "../components/InputCom"
import ClothTable from "../components/ClothTable"
import pageStyles from "../components/inputCom.module.css"
import pageStyles2 from "../components/pageTwo.module.css"


// How to update object inside setState
// https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react

// Custom attribute form
// https://stackoverflow.com/questions/20377837/how-to-access-custom-attributes-from-event-object-in-react

// Warning: controlled to uncontrolled components
// https://stackoverflow.com/questions/51406927/reactjs-warning-a-component-is-changing-an-uncontrolled-input-of-type-text-to

// Parent and child onChange relationship
// https://stackoverflow.com/questions/40795906/onchange-event-for-react-child-component-to-update-state

// Array POP()
// https://love2dev.com/blog/javascript-remove-from-array/

class SecondPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: '',
      addressStreet: '',
      addressCity: '',
      addressPostcode: '',
      addressState: '',
      addressCountry: '',
      baju: [
        {
          name: '',
          code: '',
          colour: '',
          size: '',
          quantity: 0,
          ppu: 0,
        }
      ],
      email: '',
      popLink: '',
      receiptRef: '',
      qty: 1,
      lastQty: 1,
    };

    // this.onChange3 = this.onChange3.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.store.updateNum(this.state.qty)
  }

  onChange = (n, v) => {
    const state = this.state
    if (n == "qty" && parseInt(v) < state.lastQty && parseInt(v) > 1) {
      for (let i = state.lastQty - parseInt(v); i > 0; i-- ) {
        state.baju.pop();
      }
      state.lastQty = parseInt(v)
    } else if (n == "qty" && parseInt(v) > state.lastQty) {
      // console.log("parseInt(v) ", parseInt(v))
      // console.log("state.qty ", state.lastQty)
      let bObj = {
        name: '',
        code: '',
        colour: '',
        size: '',
        quantity: 0,
        ppu: 0,
      }
      for (let i = parseInt(v) - state.lastQty; i > 0; i-- ) {
        state.baju.push(bObj)
      }
      state.lastQty = parseInt(v)
    }
    state[n] = v;
    this.setState(state);
  }

  onChange2 = (k, n, v) => {
    const state = this.state
    let oBaju = state.baju[k]
    //   {this.props.question.answers.map((answer, i) => {     
    //     console.log("Entered");                 
    //     // Return the element. Also pass key     
    //     return (<Answer key={i} answer={answer} />) 
    //  })}
    oBaju[n] = v
    state.baju[k] = oBaju;
    // console.log("state: ", state.baju)
    this.setState(state);
  }

  // onChange3 = (e) => {
  //   const state = this.state
  //   state[e.target.name] = e.target.value;
  //   this.setState(state);
  // }

  // onChange4(field, value) {
  //     // parent class change handler is always called with field name and value
  //     this.setState({[field]: value});
  // }

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
        address: {},
        qty: 1
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
    const { name, phone, baju, email, popLink, receiptRef, addressStreet, addressCity, addressPostcode, addressState, addressCountry, qty } = this.state;
  
    return (
      <div className={pageStyles2.layoutTwo}>
        <div className={pageStyles.bg}>
        <SEO title="Page two" />
        <InputCom name="qty" value={qty} onChange={this.onChange} />
        {/* <input type="number" name="qty" value={qty} onChange={this.onChange3} placeholder="Qty" /> */}
        {/* <InjectQty qty={qty} /> */}
        <form onSubmit={this.onSubmit}>
            <InputCom name="name" value={name} onChange={this.onChange} />
            <InputCom name="phone" value={phone} onChange={this.onChange} />
            <InputCom name="email" value={email} onChange={this.onChange} />
            <InputCom name="popLink" value={popLink} onChange={this.onChange} />
            <InputCom name="receiptRef" value={receiptRef} onChange={this.onChange} />
            <ClothTable
              qty={qty}
              onChange={this.onChange2}
              // valueN={bajuName || ''} contoh || ''
              baju={baju}
             />
          <div>
            <label >Address:</label>
            <input type="text" name="addressStreet" value={addressStreet} onChange={this.onChange} placeholder="Street Line" />
            <input type="text" name="addressCity" value={addressCity} onChange={this.onChange} placeholder="City" />
            <input type="text" name="addressState" value={addressState} onChange={this.onChange} placeholder="State" />
            <input type="text" name="addressPostcode" value={addressPostcode} onChange={this.onChange} placeholder="Postal Code" />
            <input type="text" name="addressCountry" value={addressCountry} onChange={this.onChange} placeholder="Country" />
          </div>
          <button type="submit">Submit</button>
        </form>
        <Link to="/">Go back to the homepage</Link>
        </div>
      </div>
    );
  }
}

export default withFirebase(SecondPage)
