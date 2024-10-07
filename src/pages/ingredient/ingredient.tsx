import s from './ingredient.module.scss';
import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';

export const Ingredient = () => {
	return (
		<div className={s.container}>
			<IngredientDetails />
		</div>
	);
};
