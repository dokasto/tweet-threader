import { connect } from 'react-redux';
import { addForm, removeForm, updateContent, postTweets } from '../actions/form_actions';
import { success, error, warning, ongoing } from '../actions/notifications';

import Tweet from './tweet.jsx';
import axios from 'axios';
import co from 'co';

axios.defaults.withCredentials = true;

/**
 * Post tweet
 * @param  {string} status  
 * @param  {integer} inReply  
 * @return {Promise}          
 */
const postTweet = (status, inReply) => axios.post('/status/update', { status, inReply });

/**
 * Get a cookie by name
 * @param  {string} name
 * @return {string}    
 */
const getCookie = name => {
	const data = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
	return data ? data.pop() : null;
};

const mapStateToProps = state => ({
	forms: state.forms,
	notifications: state.notifications
});

const mapDispatchToProps = (dispatch, ownProps) => {
	const cookieString = getCookie('_userdata');

	const person = cookieString ? JSON.parse(cookieString) : {};

	let hasShared = false;

	return {
		person,
		onAddForm: e => {
			e.preventDefault();
			dispatch(addForm());
		},
		onRemove: id => {
			dispatch(removeForm(id));
		},
		onChange: (id, text) => {
			dispatch(updateContent(id, text));
		},
		postTweets: forms => {
			co(function* asyncCo() {
				let inReply = null;
				let response = null;
				let hasError = false;
				const emptyFields = forms.filter(form => form.text.length <= 0);

				if (emptyFields.length > 0) {
					dispatch(warning('some fields are empty'));
				} else {
					dispatch(ongoing('Posting...'));

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
						if (!hasShared) {
							dispatch(success('Tweets posted successfully. Help us spread the word :)'));

							const message = 'Hey, I created threads easily using http://tweet-threader.herokuapp.com/. Try it :)';

							// add extra form
							dispatch(addForm(message));

							hasShared = true;
						} else {
							hasShared = false;

							dispatch(success('Thank you :) '));

							dispatch(addForm());
						}
					}
				}
			}).catch(e => {
				dispatch(error(e.message));
			});
		}
	};
};

const TweetPage = connect(mapStateToProps, mapDispatchToProps)(Tweet);

export default TweetPage;
