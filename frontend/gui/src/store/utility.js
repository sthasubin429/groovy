export const updateObject = (oldObject, updatedProperties) => {
	return { ...oldObject, ...updatedProperties };
};

export const BASE_URL = 'http://127.0.0.1:8000';

export const PUT = 'put';
export const POST = 'post';
export const DELETE = 'delete';
export const TOKEN = localStorage.getItem('token');
