import s from './app.module.scss';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';

export const App = () => {
	return (
		<div className={s.app}>
			<AppHeader />
			<div className={s.main}>
				<BurgerIngredients />
				<BurgerConstructor />
			</div>
		</div>
	);
};
