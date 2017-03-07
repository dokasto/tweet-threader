const notifications = (state = {}, action) => {

  switch (action.type) {
    case 'success':
      return action;
    case 'error':
      return action;
    case 'warning':
      return action;
    default:
      return state;
  }

};

export default notifications;
