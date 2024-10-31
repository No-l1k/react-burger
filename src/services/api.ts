import { checkResponse } from '../utils/helpers';
import { AuthResponse, LogoutResponse, UserResponse } from '../utils/types';
import { BASE_URL } from '../utils/constans';

export const registerUser = async (
	email: string,
	password: string,
	name: string
): Promise<AuthResponse> => {
	const response = await fetch(`${BASE_URL}/api/auth/register`, {
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
	const response = await fetch(`${BASE_URL}/api/password-reset`, {
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
	const response = await fetch(`${BASE_URL}/api/password-reset/reset`, {
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

export const loginUser = async (
	email: string,
	password: string
): Promise<AuthResponse> => {
	const response = await fetch(`${BASE_URL}/api/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});

	return checkResponse(response);
};

export const refreshToken = async () => {
	const response = await fetch(`${BASE_URL}/api/auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
	});

	return checkResponse(response);
};

export const fetchWithRefresh = async <T>(
	url: string,
	options: RequestInit
): Promise<T> => {
	try {
		const res = await fetch(url, options);

		const response = await checkResponse(res);
		return response;

	} catch (err: unknown) {
		if (err instanceof Error && err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			localStorage.setItem('accessToken', refreshData.accessToken);
			localStorage.setItem('refreshToken', refreshData.refreshToken);

			options.headers = {
				...options.headers,
				authorization: `Bearer ${refreshData.accessToken}`, 
			};

			const res = await fetch(url, options);
			return await checkResponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};


export const getUserData = async (token: string): Promise<UserResponse> => {
	return await fetchWithRefresh(`${BASE_URL}/api/auth/user`, {
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
): Promise<UserResponse> => {
	return await fetchWithRefresh(`${BASE_URL}/api/auth/user`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			authorization: token,
		},
		body: JSON.stringify(userData),
	});
};

export const logoutUser = async (): Promise<LogoutResponse> => {
	const response = await fetch(`${BASE_URL}/api/auth/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
	});

	return checkResponse(response);
};
