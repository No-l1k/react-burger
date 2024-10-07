import { useParams } from 'react-router-dom';
import s from './ingredient.module.scss';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useEffect } from 'react';
import {
	fetchIngredients,
	setCurrentIngredient,
} from '../../services/ingredients-slice';

export const Ingredient = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const ingredients = useAppSelector((state) => state.ingredients.ingredients);
	const ingredient = ingredients.find((item) => item._id === id);

	useEffect(() => {
		if (ingredients.length === 0) {
			dispatch(fetchIngredients());
		} else {
			if (ingredient) {
				dispatch(setCurrentIngredient(ingredient));
			}
		}
	}, [dispatch, ingredients, ingredient]);

	if (!ingredient) {
		return (
			<p className={`text text_type_main-large ${s.error}`}>
				Ингредиента нету в наличии
			</p>
		);
	}

	return (
		<div className={s.container}>
			<p className='text text_type_main-large'>Детали ингредиента</p>
			<img
				src={ingredient.image_large}
				alt={ingredient.name}
				className={s.image}
			/>
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
