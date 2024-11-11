import React from 'react';
import s from './ingredient-details.module.scss';
import { useAppSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const ingredient = useAppSelector((state) =>
		state.ingredients.ingredients.find((item) => item._id === id)
	);

	if (!ingredient) {
		return <p>Ингредиента нету в наличии</p>;
	}

	return (
		<div className={s.container} data-testid="ingredient-details">
			<p className='text text_type_main-large'>Детали ингредиента</p>
			<img src={ingredient.image_large} alt={ingredient.name} data-testid="ingredient-details-image"/>
			<p className='text text_type_main-medium' data-testid="ingredient-details-name">{ingredient.name}</p>
			<div className={s.ingredient_details}>
				<div>
					<p className='text text_type_main-small text_color_inactive'>
						Калории, ккал
					</p>
					<p className='text text_type_digits-default text_color_inactive' data-testid="ingredient-details-calories">
						{ingredient.calories}
					</p>
				</div>
				<div>
					<p className='text text_type_main-small text_color_inactive'>
						Белки, г
					</p>
					<p className='text text_type_digits-default text_color_inactive' data-testid="ingredient-details-proteins">
						{ingredient.proteins}
					</p>
				</div>
				<div>
					<p className='text text_type_main-small text_color_inactive'>
						Жиры, г
					</p>
					<p className='text text_type_digits-default text_color_inactive' data-testid="ingredient-details-fat">
						{ingredient.fat}
					</p>
				</div>
				<div>
					<p className='text text_type_main-small text_color_inactive'>
						Углеводы, г
					</p>
					<p className='text text_type_digits-default text_color_inactive' data-testid="ingredient-details-carbohydrates">
						{ingredient.carbohydrates}
					</p>
				</div>
			</div>
		</div>
	);
};
