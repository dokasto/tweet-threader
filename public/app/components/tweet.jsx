'use strict';

import React from 'react';
import { render } from 'react-dom';
import Form from '../containers/form.jsx';

class Tweet extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="tweet-page">
      	<section className="container">
          <div className="header">
            <h2 className="logo">Tweet-threader</h2>
            <aside>
              <picture>
                <img src="https://pbs.twimg.com/profile_images/824632173223354368/lI8LjsBs_bigger.jpg" />
              </picture>
              <div>
                <span className="fullname">Udo Nkwocha</span>
                <label className="username">@thisisudo</label>
              </div>
              <div className="clear"></div>
            </aside>
            <div className="clear"></div>
          </div>
          <div className="progress">
            <button className="button" type="submit">Post</button>
          </div>
          <div className="tweet-forms">
            <Form />
          </div>
        </section>
      </div>
    )
  }
}

export default Tweet;
