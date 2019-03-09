import React, { Component } from 'react'
import ClothInput from './ClothInput'

class ClothTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        // console.log("values S: ",this.props.valueS)

        let myList = []
        let num = this.props.qty
        if (num < 1) {
            num = 1
        }

        for (let i = 0; i < num; i++) {
            // let name = 'name'+i
            myList.push(<ClothInput key={i} keyy={i} {...this.props} />)
        }

        return (
            <ul>
                {myList}
            </ul>
        )
    }
}

export default ClothTable