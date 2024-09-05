import s from './app.module.scss';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const App = () => {
	return (
		<div className={s.app}>
			<AppHeader />
			<DndProvider backend={HTML5Backend}>
				<main className={s.main}>
					<BurgerIngredients />
					<BurgerConstructor />
				</main>
			</DndProvider>
		</div>
	);
};
