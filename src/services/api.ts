export const API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res: Response): Promise<any> => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
export const registerUser = async (
	email: string,
	password: string,
	name: string
) => {
	const response = await fetch(`${API_URL}/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password, name }),
	});

	const data = await response.json();

	localStorage.setItem('accessToken', data.accessToken);
	localStorage.setItem('refreshToken', data.refreshToken);

	return data;
};

export const resetPassword = async (email: string) => {
	const response = await fetch(`${API_URL}/password-reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email }),
	});

	return response.json();
};

export const resetPasswordWithToken = async (
	password: string,
	token: string
) => {
	const response = await fetch(`${API_URL}/password-reset/reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ password, token }),
	});

	if (!response.ok) {
		throw new Error('Failed to reset password');
	}

	return response.json();
};

export const loginUser = async (email: string, password: string) => {
	const response = await fetch(`${API_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});

	return checkResponse(response);
};

export const refreshToken = async () => {
	const response = await fetch(`${API_URL}/auth/token`, {
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
	return await fetchWithRefresh(`${API_URL}/auth/user`, {
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
	return await fetchWithRefresh(`${API_URL}/auth/user`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			authorization: token,
		},
		body: JSON.stringify(userData),
	});
};

export const logoutUser = async () => {
	const response = await fetch(`${API_URL}/auth/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
	});

	return checkResponse(response);
};
