'use strict';

import React from 'react';
import { render } from 'react-dom';

class Wrapper extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="wrapper">
      	{ this.props.children }
      </div>
    )
  }
}

export default Wrapper;
