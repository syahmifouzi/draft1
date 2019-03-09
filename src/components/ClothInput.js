import React, { Component } from 'react'
import pageStyles from "./inputCom.module.css"

class ClothInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }

        this.onFieldChange = this.onFieldChange.bind(this);
    }

    onFieldChange(event) {
        // for a regular input field, read field name and value from the event
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        const fieldKey = this.props.keyy

        this.props.onChange(fieldKey, fieldName, fieldValue);
    }

    render() {
        // console.log("values S: ",this.props.valueS)
        return (
            <li>
                <table className={pageStyles.table}>
                    <thead>
                        <tr>
                            <th><span>Item Code</span></th>
                            <th><span>Item</span></th>
                            <th><span>Colour</span></th>
                            <th><span>Size</span></th>
                            <th><span>Quantity</span></th>
                            <th><span>Price/Unit</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={pageStyles.box}><span><input type="text" name="code" value={this.props.baju[this.props.keyy].code} onChange={this.onFieldChange} placeholder="Code Baju" /></span></td>
                            <td className={pageStyles.box}><span><input type="text" name="name" value={this.props.baju[this.props.keyy].name} onChange={this.onFieldChange} placeholder="Nama Baju" /></span></td>
                            <td className={pageStyles.box}><span><input type="text" name="colour" value={this.props.baju[this.props.keyy].colour} onChange={this.onFieldChange} placeholder="Colour Baju" /></span></td>
                            <td className={pageStyles.box}><span><input type="text" name="size" value={this.props.baju[this.props.keyy].size} onChange={this.onFieldChange} placeholder="Size Baju" /></span></td>
                            <td className={pageStyles.box}><span><input type="text" name="quantity" value={this.props.baju[this.props.keyy].quantity} onChange={this.onFieldChange} placeholder="Quantity" /></span></td>
                            <td className={pageStyles.box}><span>RM </span><span><input type="text" name="ppu" value={this.props.baju[this.props.keyy].ppu} onChange={this.onFieldChange} placeholder="Price" /></span></td>
                        </tr>
                    </tbody>
                </table>
            </li>
        )
    }
}

export default ClothInput