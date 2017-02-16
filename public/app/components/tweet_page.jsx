
import { connect } from 'react-redux';
import { addForm, removeForm, updateContent, postTweets } from '../actions/form_actions';
import Tweet from './tweet.jsx';

const mapStateToProps = (state) => {
	return { forms: state.forms };
}

const mapDispatchToProps = (dispatch) => {
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
		postTweets: () => { dispatch(postTweets) }
	}
}

const TweetPage = connect(mapStateToProps, mapDispatchToProps)(Tweet);

export default TweetPage;