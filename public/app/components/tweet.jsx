import React, { PropTypes } from 'react';
import Form from '../containers/form.jsx';

const Tweet = ({ onAddForm, onRemove, onChange, postTweets, forms, person }) => {

  const _onClick = (e) => {
    e.preventDefault();
    postTweets(forms);
  };

  return (
    <div className="tweet-page">
      <section className="container">
        <header>
          <aside>
            <picture className="left">
              <img src={person.photos[0].value} />
            </picture>
            <div className="right">
              <span className="fullname">{person.displayName}</span>
              <label className="username">@{person.username}</label>
            </div>
          </aside>
          <button className="button" disabled={forms.length < 1} onClick={_onClick} type="submit">Post</button>
        </header>
        <div className="notifications">
          <span className="error">error</span>
          <span className="success">success</span>
          <span className="warning">warning</span>
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
    </div>
  )
}

Tweet.propTypes = {
  postTweets: PropTypes.func.isRequired,
  onAddForm: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  forms: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  person: PropTypes.object.isRequired
};

export default Tweet;
