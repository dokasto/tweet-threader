export const warning = message => ({
	type: 'warning',
	message,
});

export const error = message => ({
	type: 'error',
	message,
});

export const success = message => ({
	type: 'success',
	message,
});

export const ongoing = message => ({
	type: 'ongoing',
	message,
});
