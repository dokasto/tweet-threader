'use strict';

import React from 'react';
import { render } from 'react-dom';

class Form extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <form className="form">
      	<textarea></textarea>
      	<span className="counter"></span>
      </form>
    )
  }
}

export default Form;
