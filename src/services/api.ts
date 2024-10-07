import { checkResponse } from '../utils/helpers';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const registerUser = async (
	email: string,
	password: string,
	name: string
) => {
	const response = await fetch(`${BASE_URL}/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password, name }),
	});

	const data = await checkResponse(response);

	localStorage.setItem('accessToken', data.accessToken);
	localStorage.setItem('refreshToken', data.refreshToken);

	return data;
};

export const resetPassword = async (email: string) => {
	const response = await fetch(`${BASE_URL}/password-reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email }),
	});

	return checkResponse(response);
};

export const resetPasswordWithToken = async (
	password: string,
	token: string
) => {
	const response = await fetch(`${BASE_URL}/password-reset/reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ password, token }),
	});

	if (!response.ok) {
		throw new Error('Failed to reset password');
	}

	return checkResponse(response);
};

export const loginUser = async (email: string, password: string) => {
	const response = await fetch(`${BASE_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});

	return checkResponse(response);
};

export const refreshToken = async () => {
	const response = await fetch(`${BASE_URL}/auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
	});

	return checkResponse(response);
};

export const fetchWithRefresh = async (
	url: string,
	options: RequestInit
): Promise<any> => {
	try {
		const res = await fetch(url, options);
		return await checkResponse(res);
	} catch (err: any) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			localStorage.setItem('accessToken', refreshData.accessToken);
			localStorage.setItem('refreshToken', refreshData.refreshToken);

			options.headers = {
				...options.headers,
				authorization: refreshData.accessToken,
			};
			const res = await fetch(url, options);
			return await checkResponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};

export const getUserData = async (token: string) => {
	return await fetchWithRefresh(`${BASE_URL}/auth/user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			authorization: token,
		},
	});
};

export const updateUserData = async (
	token: string,
	userData: { name: string; email: string }
) => {
	return await fetchWithRefresh(`${BASE_URL}/auth/user`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			authorization: token,
		},
		body: JSON.stringify(userData),
	});
};

export const logoutUser = async () => {
	const response = await fetch(`${BASE_URL}/auth/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
	});

	return checkResponse(response);
};
