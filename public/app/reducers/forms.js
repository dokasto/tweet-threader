
const form = (state = {}, action) => {
	switch(action.type) {
		case 'ADD_FORM':
			return {
				id: action.id,
				status: action.status
			}
	}
}

const forms = (state = [], action) => {
	switch(action.type) {
		case 'ADD_FORM':
			return [
				...state,
				form(undefined, action)
			];

		case 'REMOVE_FORM':
			return state.filter(f => f.id !== action.id );

		case 'UPDATE_CONTENT':
			//


		default:
			return state;
	}

};

export default forms;