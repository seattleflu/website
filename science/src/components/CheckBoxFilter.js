import React from "react";

export default class CheckBoxFilter extends React.Component {
    state = {
        value: this.props.value,
    }

    render() {
        return (
            <input id={`map-filter-${this.props.value}`}
                type="checkbox"
                name={`age-category-${this.props.value}`}
                value={this.props.value}
                defaultChecked="true" />
        )
    }
}
