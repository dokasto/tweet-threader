import { connect } from 'react-redux';
import { addForm, removeForm, updateContent, postTweets } from '../actions/form_actions';
import Tweet from './tweet.jsx';
const Buffer = require('buffer/').Buffer;

const mapStateToProps = (state) => {
  return { forms: state.forms };
}

const mapDispatchToProps = (dispatch, ownProps) => {

  let string = ownProps.location.query.data;
  let buffer = new Buffer(string, 'base64');
  let twitterUser = JSON.parse(decodeURI(buffer.toString()));

  return {
    onAddForm: (e) => {
      e.preventDefault();
      dispatch(addForm());
    },
    onRemove: (id) => {
      dispatch(removeForm(id))
    },
    onChange: (id, text) => {
      dispatch(updateContent(id, text));
    },
    postTweets: (tweets) => {
      // resolve one by one
    },
    person: twitterUser
  }
}

const TweetPage = connect(mapStateToProps, mapDispatchToProps)(Tweet);

export default TweetPage;
