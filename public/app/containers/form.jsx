'use strict';

import React, { PropTypes } from 'react';
import { render } from 'react-dom';

class Form extends React.Component {

  constructor() {
    super();
    this.state = { charCount: 140 };
  }

  _handleCount = (e) => {
    const charsLength = e.target.value.length;
    if (charsLength < 141) {
      this.setState({ charCount: 140 - charsLength });
    }
  }

  _removeForm = (e) => {
    e.preventDefault();
    this.props.fn(this.props.id);
  }

  render() {
    return (
      <form className="form" id={`tweet-form-${this.props.id}`}>
      	<textarea onKeyUp={this._handleCount} maxLength="140"></textarea>
      	<span className="counter">{this.state.charCount}</span>
        <a className="remove" onClick={this._removeForm}>remove</a>
      </form>
    )
  }
}

Form.PropTypes = {
  id: PropTypes.number.isRequired,
  fn: PropTypes.func.isRequired
};

export default Form;
