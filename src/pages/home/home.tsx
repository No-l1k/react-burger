import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import s from './home.module.scss';

export const Home = () => {
	return (
		<main className={s.main}>
			<BurgerIngredients />
			<BurgerConstructor />
		</main>
	);
};
