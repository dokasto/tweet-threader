export const addForm = (content = '') => ({
	type: 'ADD_FORM',
	id: new Date().getTime(),
	status: 'active',
	text: content,
});

export const removeForm = id => ({
	type: 'REMOVE_FORM',
	id,
});

export const postTweets = () => ({
	type: 'POST_TWEETS',
});

export const updateContent = (id, text) => ({
	type: 'UPDATE_CONTENT',
	id,
	text,
});
