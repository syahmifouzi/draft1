import React, { Component } from 'react'
import pageStyles from "./inputCom.module.css"

// export default ({ children }) => (
//   <div style={{ margin: `0 auto`, maxWidth: 650, padding: `0 1rem` }}>
//     {children}
//   </div>
// )

class InputCom extends Component {
    constructor(props) {
        super(props);

        this.onFieldChange = this.onFieldChange.bind(this);
    }

    onFieldChange(event) {
        // for a regular input field, read field name and value from the event
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.props.onChange(fieldName, fieldValue);
    }

    render() {

        return (
            <div> 
                <p className={pageStyles.label}>{this.props.name}</p>
                <div className={pageStyles.field}>
                    <span>
                    <input type="text" name={this.props.name} value={this.props.value} onChange={this.onFieldChange} placeholder={this.props.name} />
                    </span>
                </div>
            </div>
        )
    }
}

export default InputCom