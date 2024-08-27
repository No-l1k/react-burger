import s from './app.module.scss';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { useEffect, useState } from 'react';
import { fetchIngredients } from '../../store/ingredients-api';
import { IngredientType } from '../../utils/types';

export const App = () => {
	const [ingredients, setIngredients] = useState<IngredientType[]>([]);

	useEffect(() => {
		const getIngredients = async () => {
			try {
				const data = await fetchIngredients();
				setIngredients(data);
			} catch (error) {
				console.error('Ошибка при загрузке ингредиентов:', error);
				throw error;
			}
		};

		getIngredients();
	}, []);

	return (
		<div className={s.app}>
			<AppHeader />
			<main className={s.main}>
				<BurgerIngredients ingredients={ingredients} />
				<BurgerConstructor ingredients={ingredients} />
			</main>
		</div>
	);
};
