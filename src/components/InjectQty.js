import React, { Component } from 'react'
import { inject } from "mobx-react"

const InjectQty = inject(`store`)(
  (props) => (
      <QtyClass {...props} />
  )
)

class QtyClass extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numasd: 2,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.store.updateNum(this.props.qty)
        console.log("test: ", this.props)
      }

    render() {

        return (
            <button onClick={this.handleClick}>
                Click me
            </button>
        )
    }
}

export default InjectQty