
export const addForm = () => {
	return {
		type: 'ADD_FORM',
		id: new Date().getTime(),
		status: 'active'
	};
}

export const removeForm = (id) => {
	return {
		type: 'REMOVE_FORM',
		id,
	};
}

export const postTweets = (tweets) => {
	return {
		type: 'POST_TWEETS'
	};
} 

export const updateContent = (id, text) => {
	return {
		type: 'UPDATE_CONTENT',
		id,
		text
	}
}