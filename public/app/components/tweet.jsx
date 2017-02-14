'use strict';

import React from 'react';
import ReactDOM, { render } from 'react-dom';
import Form from '../containers/form.jsx';

let formSet = new Set();

class Tweet extends React.Component {

  constructor() {
    super();
    formSet.add(new Date().getTime());
    this.state = { forms: formSet };
  }

  _incrementForms = (e) => {
    e.preventDefault();
    formSet.add(new Date().getTime());
    this.setState({ forms: formSet });
  }

  _decrementForms = (formId) => {
    formSet.delete(formId);
    this.setState({forms: formSet});
  }

  _handlePostClick = (e) => {
    e.preventDefault();
    let posts = [];
    Array.from(formSet).forEach((id) => {
      posts.push({
        formId: id,
        value: document.querySelector(`#tf-${id}`).value
      });
    });
    console.log(posts);
    // send all posts to server
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
            <button className="button" onClick={this._handlePostClick} type="submit">Post</button>
          </div>
          <div className="tweet-forms">
            <div>
              {
                Array.from(this.state.forms).map((id) => <Form key={id} id={id} fn={this._decrementForms} /> )
              }
            </div>
            <div className="form-control">
              <button onClick={this._incrementForms} className="button">+ Thread</button>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Tweet;
