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

  _removeForm = () => {
    this.props.onRemove(this.props.id);
  }

  _onChange = (e) => {
    let text = e.target.value;
    this.props.onChange(this.props.id, text);
  }

  render() {
    return (
      <form className="form" id={this.props.id}>
      	<textarea 
          onChange={this._onChange} 
          id={`tf-${this.props.id}`} 
          onKeyUp={this._handleCount}
          maxLength="140">{this.props.text}</textarea>
      	<span className="counter">{this.state.charCount}</span>
        <a className="remove" onClick={this._removeForm}>remove</a>
      </form>
    )
  }
}

Form.PropTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  text: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Form;
