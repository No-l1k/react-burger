export const API_URL = 'https://norma.nomoreparties.space';

export const fetchIngredients = async () => {
	try {
		const response = await fetch(`${API_URL}/api/ingredients`);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		return data.data;
	} catch (error) {
		console.error('Ошибка при загрузке ингредиентов:', error);
		throw error;
	}
};
