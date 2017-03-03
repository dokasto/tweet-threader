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

  let string = document.querySelector('#root').getAttribute('data-user');

  if (string === 'undefined') {
    console.log(process.env.HOST_NAME);
    window.location = process.env.HOST_NAME + '/';
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
    postTweets: function(forms) {

      co(function*() {
        let inReply = null;
        let response = null;
        let hasError = false;
        let emptyFields = forms.filter((form) => form.text.length <= 0);

        if (emptyFields.length > 0) {

          alert('some fields are empty');

        } else {

          while (forms.length > 0 && !hasError) {

            response = yield postTweet(forms[0].text, inReply);

            if (!response.data.hasError) {

              inReply = response.data.tweetId;

              dispatch(removeForm(forms[0].id));

              forms.splice(0, 1);

            } else {

              hasError = true;

              alert(response.data.error[0].message);

            }

          }
        }

      }).catch(function() {
        console.log('error here');
      });

    }
  }
};

const TweetPage = connect(mapStateToProps, mapDispatchToProps)(Tweet);

export default TweetPage;
