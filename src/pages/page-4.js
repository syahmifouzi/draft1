import React, { Component } from "react"
import Image from "../components/image"
import { Link } from "gatsby"
import { withFirebase } from '../components/FirebaseContext'
import pageStyles from "../components/pageFour.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// How to update object inside setState
// https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react

// Custom attribute form
// https://stackoverflow.com/questions/20377837/how-to-access-custom-attributes-from-event-object-in-react

// Warning: controlled to uncontrolled components
// https://stackoverflow.com/questions/51406927/reactjs-warning-a-component-is-changing-an-uncontrolled-input-of-type-text-to

// Font awesome
// https://github.com/FortAwesome/react-fontawesome
// https://fontawesome.com/icons?d=gallery&q=insta&m=free



class PageFour extends Component {

  constructor(props) {
    super(props);

    let today = new Date()
    //date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let day = today.getDate()
    let month = today.getMonth() + 1
    let year = today.getFullYear()

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
        size: '',
        price: 0
      },
      email: '',
      popLink: '2085',
      invoiceNum: '190219-710-00',
      date: {
        day: day,
        month: month,
        year: year
      }
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

    const { name, phone, baju, email, popLink, invoiceNum, address, date } = this.state;
    const { firebase } = this.props

    firebase.firestore().collection('receipts').add({
      name,
      phone,
      baju,
      email,
      popLink,
      invoiceNum,
      address,
      date
    }).then((docRef) => {
      this.setState({
        name: '',
        phone: '',
        baju: {},
        email: '',
        popLink: '',
        invoiceNum: '',
        address: {},
        date: {}
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
    const { name, phone, baju, email, popLink, invoiceNum, address, date } = this.state;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month1 =  monthNames[date.month - 1]

    return (
      <div>
        <header>
			<address >
        <p className={pageStyles.head}>Phantom Clothing</p>
        <p className={pageStyles.icon}><FontAwesomeIcon icon={['fab', 'instagram']} /> insta.com</p>
        <p className={pageStyles.icon}><FontAwesomeIcon icon={['fab', 'facebook-square']} /> facebook.com</p>
        <p className={pageStyles.icon}><FontAwesomeIcon icon={['fab', 'twitter']} /> twitter.com</p>
        <p className={pageStyles.icon}><FontAwesomeIcon icon={['fab', 'whatsapp']} /> 012-3456789</p>
        <p><br /><br /><br /></p>
        <div className={pageStyles.invoice}><p>Invoice #SF2019-65314</p></div>
        <div className={pageStyles.paid}><p>PAID</p></div>
			</address>
      <div className={pageStyles.logo}>
      <Image img="logo" />
      </div>
		</header>
		<article>
			<address >
        <p className={pageStyles.invBold}>Invoiced To</p>
        <div className={pageStyles.address}>
          <p>Syahmi<br />No.19 Jalan Bukit Kerayong<br />26/26 Taman Bukit Saga<br />40400 Shah Alam<br />Selangor Malaysia</p>
        </div>
				
			</address>
			<div className={pageStyles.meta}>
      <p className={pageStyles.invBold}>Paid To</p>
        <div className={pageStyles.address}>
          <p>Phantom Clothing<br /><br />Co No: 881282-M<br /><br />SST No.: B10-1808-32000146<br /><br />CIMB: 8006906131 - Phantom Banking</p>
          <p><br /></p>
        </div>
			</div>
      <div className={pageStyles.clear}></div>
      <div className={pageStyles.metaTwo}>
        <p className={pageStyles.invBold}>Invoice Date</p>
        <div className={pageStyles.address}>
          <input type="text" name="invoiceNum" value={invoiceNum} onChange={this.onChange} />
          RM <input className={pageStyles.price} type="text" name="price" value={baju.price} onChange={this.onChange2} />
          <p>{date.day} {month1} {date.year}</p>
        </div>
			</div>
      <div className={pageStyles.meta}>
      <p className={pageStyles.invBold}>Payment Method</p>
        <div className={pageStyles.address}>
          <p>Bank Transfer</p>
        </div>
			</div>
			<table className={pageStyles.inventory}>
				<thead>
					<tr>
						<th><span>Item</span></th>
						<th><span>Colour</span></th>
						<th><span>Size</span></th>
						<th><span>Quantity</span></th>
						<th><span>Price/Unit</span></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><span>Baju Awla</span></td>
						<td><span>Merah</span></td>
						<td><span>L</span></td>
						<td><span>1</span></td>
						<td><span>RM </span><span>60.00</span></td>
					</tr>
				</tbody>
			</table>
			<table className={pageStyles.balance}>
      <tbody>
				<tr>
					<th><span>Total</span></th>
					<td><span>RM </span><span>60.00</span></td>
				</tr>
				<tr>
					<th><span>Amount Paid</span></th>
					<td><span>RM </span><span>60.00</span></td>
				</tr>
				<tr>
					<th><span>Balance Due</span></th>
					<td><span>RM </span><span>0.00</span></td>
				</tr>
        </tbody>
			</table>
		</article>
      </div>
    );
  }
}

export default withFirebase(PageFour)
