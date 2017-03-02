import { connect } from 'react-redux';
import { addForm, removeForm, updateContent, postTweets } from '../actions/form_actions';
import Tweet from './tweet.jsx';
import axios from 'axios';
const co = require('co');

const Buffer = require('buffer/').Buffer;

/**
 * Post tweet
 * @param  {string} status  
 * @param  {integer} inReply  
 * @return {Promise}          
 */
const postTweet = (status, inReply) => {
  return axios.post('/status/update', { status, inReply });
};


const mapStateToProps = (state) => {
  return { forms: state.forms };
};


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
        let hasError = false;

        while (forms.length > 0 && !hasError) {

          response = yield postTweet(forms[0].text, inReply);

          if (!response.data.hasError) {

            inReply = response.data.tweetId;

            dispatch(removeForm(forms[0].id));

            forms.splice(0, 1);

          } else {

            hasError = true;

          }

        }

      }).catch(function() {
        console.log('error here');
      });

    },
    person: twitterUser
  }
};

const TweetPage = connect(mapStateToProps, mapDispatchToProps)(Tweet);

export default TweetPage;
