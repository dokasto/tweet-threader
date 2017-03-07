import { connect } from 'react-redux';
import { addForm, removeForm, updateContent, postTweets } from '../actions/form_actions';
import { success, error, warning } from '../actions/notifications';
import Tweet from './tweet.jsx';
import axios from 'axios';
import co from 'co';

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
  return {
    forms: state.forms,
    notifications: state.notifications
  };
};


const mapDispatchToProps = (dispatch, ownProps) => {

  let string = document.querySelector('#root').getAttribute('data-user');

  if (string === 'undefined') {
    window.location = window.location.protocol + '//' + window.location.hostname;
  }

  let buffer = new Buffer(string, 'base64');
  let person = JSON.parse(decodeURI(buffer.toString())); // twitter user

  return {
    person,
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
    postTweets: (forms) => {

      co(function*() {

        let inReply = null;
        let response = null;
        let hasError = false;
        let emptyFields = forms.filter((form) => form.text.length <= 0);

        if (emptyFields.length > 0) {

          dispatch(warning('some fields are empty'));

        } else {

          while (forms.length > 0 && !hasError) {

            response = yield postTweet(forms[0].text, inReply);

            if (!response.data.hasError) {

              inReply = response.data.tweetId;

              dispatch(removeForm(forms[0].id));

              forms.splice(0, 1);

            } else {

              hasError = true;

              dispatch(error(response.data.error[0].message));

            }

          }

          // show success if all messages were sent completely
          if (inReply !== null && !hasError) {

            dispatch(success('Tweets posted successfully'));

          }

        }

      }).catch((e) => {

        dispatch(error(e.message));

      });

    }
  }
};

const TweetPage = connect(mapStateToProps, mapDispatchToProps)(Tweet);

export default TweetPage;
