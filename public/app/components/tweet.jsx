import React, { PropTypes } from 'react';
import Form from '../containers/form.jsx';

const Tweet = ({ onAddForm, onRemove, onChange, postTweets, forms }) => {

  const _onClick = (e) => {
    e.preventDefault();
    postTweets(forms);
  };

  return (<div className="tweet-page">
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
                <button className="button" onClick={_onClick} type="submit">Post</button>
              </div>
              <div className="tweet-forms">
                <div className={ forms.length <= 1 ? 'hide-remove-btn' : ''}>
                  { forms.map((each) => <Form 
                                          key={each.id} 
                                          id={each.id} 
                                          status={each.status}
                                          text={each.text}
                                          onChange={onChange} 
                                          onRemove={onRemove} /> ) 
                  }
                </div>
                <div className="form-control">
                  <button onClick={onAddForm} className="button">+ Thread</button>
                </div>
              </div>
            </section>
          </div>)
}

Tweet.propTypes = {
  postTweets: PropTypes.func.isRequired,
  onAddForm: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  forms: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default Tweet;
