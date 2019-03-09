import React, { Component } from 'react'
import ClothInput from './ClothInput'
import { observer, inject } from "mobx-react"

const ClothList = inject(`store`)(
  observer(({ store }) => (
      <ClothNumber num={store.num} />
  ))
)

class ListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const value = this.props.value
        return (
            <li>
                {value}
            </li>
        )
    }
}

class ClothNumber extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numasd: 2,
        }
    }

    render() {
        let numbers = this.props.numbers;
        if (!numbers) {
            numbers = [1, 2, 3]
        }
        const listItems = numbers.map((number) =>
            <ListItem key={number.toString()}
                value={number} />
        );

        let myList = []
        const num = this.props.num

        for (let i = 0; i < num; i++) {
            let name = 'name'+i
            // myList.push(<ClothInput {...props} />)
        }

        return (
            <ul>
                {myList}
            </ul>
        )
    }
}

export default ClothList