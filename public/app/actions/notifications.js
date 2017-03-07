export const warning = (message) => {
  return {
    type: 'warning',
    message,
  };
};


export const error = (message) => {
  return {
    type: 'error',
    message,
  };
};


export const success = (message) => {
  return {
    type: 'success',
    message,
  };
};
