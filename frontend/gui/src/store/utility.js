export const updateObject = (oldObject, updatedProperties) => {
	return { ...oldObject, ...updatedProperties };
};

export const BASE_URL = 'http://127.0.0.1:8000';
