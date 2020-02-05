// module
import React, { Component } from "react";
import PropTypes from "prop-types";
// component
import FormItem from "./FormItem";

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        props.form_items.map(form_item => {
            this.state[form_item.name] = "";
        });
        this.initialState = { ...this.state };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        const input_name = evt.target.getAttribute("name");
        let nextState = {};
        nextState[input_name] = evt.target.value;
        this.setState(nextState);
    }

    resetInputs() {
        this.setState({ ...this.initialState });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.callback({ ...this.state });
        this.resetInputs();
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <div className="form-item-list">
                    {this.props.form_items.map((form_item, i) => (
                        <FormItem
                            key={i}
                            input={form_item}
                            value={this.state[form_item.name]}
                            callback={this.handleChange}
                        />
                    ))}
                </div>
                <div className="submit-button-wrapper">
                    <button className="btn submit-button" type="submit">
                        Valider
                    </button>
                </div>
            </form>
        );
    }
}

Form.propTypes = {
    form_items: PropTypes.arrayOf(PropTypes.object).isRequired,
    callback: PropTypes.func.isRequired
};

export default Form;