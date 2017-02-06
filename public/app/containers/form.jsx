'use strict';

import React from 'react';
import { render } from 'react-dom';

class Form extends React.Component {

  constructor() {
    super();
    this.state = { charCount: 140 };
    this._handleCount = this._handleCount.bind(this);
  }

  _handleCount(e) {
    let charsLength = e.target.value.length;
    console.log(charsLength);
    if (charsLength < 141) {
      this.setState({ charCount: 140 - charsLength });
    }
  }

  render() {
    return (
      <form className="form">
      	<textarea onKeyUp={this._handleCount} maxLength="140"></textarea>
      	<span className="counter">{this.state.charCount}</span>
      </form>
    )
  }
}

export default Form;
