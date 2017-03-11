const defaultState = {
  id: new Date().getTime(),
  status: 'pending', // posted | failed
  text: ''
};

const form = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_FORM':
      return {
        id: action.id,
        status: action.status,
        text: action.text
      }
    case 'UPDATE_CONTENT':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        text: action.text
      });
  }
}

const forms = (state = [defaultState], action) => {
  switch (action.type) {
    case 'ADD_FORM':
      return [
        ...state,
        form(undefined, action)
      ];

    case 'REMOVE_FORM':
      return state.filter(f => f.id !== action.id);

    case 'UPDATE_CONTENT':
      return state.map(f => form(f, action));

    default:
      return state;
  }

};

export default forms;
