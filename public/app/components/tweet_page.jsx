import { connect } from 'react-redux';
import { addForm, removeForm, updateContent, postTweets } from '../actions/form_actions';
import Tweet from './tweet.jsx';
import axios from 'axios';
const co = require('co');

const Buffer = require('buffer/').Buffer;

/**
 * Post a form
 * @param  {object} formData  
 * @param  {number} inReply
 * @return {promise}     
 */
const postTweet = (formData, inReply = null) => {
  return axios.post('/status/update', {
    formData,
    inReply
  });
};

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
    postTweets: function(forms) {

      co(function*() {
        let inReply = null;
        let response = null;
        let error = false;

        while (forms.length > 0 && !error) {

          response = yield postTweet(forms[0], inReply);

          console.log(response.data);

          if (!response.data.error) {

            inReply = response.data.tweetId;

            dispatch(removeForm(forms[0].id));

            forms.splice(0, 1);

          } else {

            error = true;

          }

        }

      }).catch(function() {
        console.log('error here');
      });

    },
    person: twitterUser
  }
}

const TweetPage = connect(mapStateToProps, mapDispatchToProps)(Tweet);

export default TweetPage;
