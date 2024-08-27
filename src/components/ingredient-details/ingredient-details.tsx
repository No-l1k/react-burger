import React from 'react';
import s from './ingredient-details.module.scss';
import { IngredientType } from '../../utils/types';

interface IngredientDetailsProps {
	ingredient: IngredientType;
}

export const IngredientDetails: React.FC<IngredientDetailsProps> = ({
	ingredient,
}) => {
	return (
		<div className={s.container}>
			<img src={ingredient.image_large} alt={ingredient.name} />
			<p className='text text_type_main-medium'>{ingredient.name}</p>
			<div className={s.ingredient_details}>
				<div>
					<p className='text text_type_main-small text_color_inactive'>
						Калории, ккал
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{ingredient.calories}
					</p>
				</div>
				<div>
					<p className='text text_type_main-small text_color_inactive'>
						Белки, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{ingredient.proteins}
					</p>
				</div>
				<div>
					<p className='text text_type_main-small text_color_inactive'>
						Жиры, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{ingredient.fat}
					</p>
				</div>
				<div>
					<p className='text text_type_main-small text_color_inactive'>
						Углеводы, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{ingredient.carbohydrates}
					</p>
				</div>
			</div>
		</div>
	);
};
