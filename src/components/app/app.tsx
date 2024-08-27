import s from './app.module.scss';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';

export const App = () => {
	return (
		<div className={s.app}>
			<AppHeader />
			<main className={s.main}>
				<BurgerIngredients />
				<BurgerConstructor />
			</main>
		</div>
	);
};
