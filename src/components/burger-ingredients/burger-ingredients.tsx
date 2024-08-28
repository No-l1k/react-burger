import {
	Counter,
	CurrencyIcon,
	Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import s from './burger-ingredients.module.scss';
import { Scrollbars } from 'react-custom-scrollbars-2';
import {
	IngredientGroup,
	IngredientsData,
	IngredientType,
} from '../../utils/types';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { useModal } from '../../hooks/use-modal';

export const BurgerIngredients: React.FC<IngredientsData> = ({
	ingredients,
}) => {
	const [current, setCurrent] = React.useState('one');
	const [selectedIngredient, setSelectedIngredient] =
		useState<IngredientType | null>(null);
	const { isModalOpen, openModal, closeModal } = useModal();

	const groupedIngredients: IngredientGroup = {
		bun: ingredients.filter((item) => item.type === 'bun'),
		sauce: ingredients.filter((item) => item.type === 'sauce'),
		main: ingredients.filter((item) => item.type === 'main'),
	};

	const openIngredientDetails = (ingredient: IngredientType) => {
		setSelectedIngredient(ingredient);
		openModal();
	};

	return (
		<section>
			<p className='text text_type_main-large'>Соберите бургер</p>
			<div className={s.menu_nav}>
				<Tab value='one' active={current === 'one'} onClick={setCurrent}>
					Булки
				</Tab>
				<Tab value='two' active={current === 'two'} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab value='three' active={current === 'three'} onClick={setCurrent}>
					Начинки
				</Tab>
			</div>
			<div className={s.main_ingredients}>
				<Scrollbars
					className={s.scroll}
					renderThumbVertical={({ ...props }) => (
						<div {...props} className={s.thumb} />
					)}>
					<div className={s.ingredients_section}>
						<p className='text text_type_main-medium'>Булки</p>
						<ul className={s.ingredients_list}>
							{groupedIngredients.bun.map((ingredient) => (
								<li
									key={ingredient._id}
									className={s.ingredient_card}
									onClick={() => openIngredientDetails(ingredient)}>
									<Counter count={1} size='default' extraClass='m-1' />
									<img
										src={ingredient.image}
										alt={ingredient.name}
										className={s.ingredient_image}
									/>
									<p className={`text text_type_digits-default ${s.price}`}>
										{ingredient.price} <CurrencyIcon type='primary' />
									</p>
									<p className={`${s.name} text text_type_main-default`}>
										{ingredient.name}
									</p>
								</li>
							))}
						</ul>
					</div>
					<div className={s.ingredients_section}>
						<p className='text text_type_main-medium'>Соусы</p>
						<ul className={s.ingredients_list}>
							{groupedIngredients.sauce.map((ingredient) => (
								<li
									key={ingredient._id}
									className={s.ingredient_card}
									onClick={() => openIngredientDetails(ingredient)}>
									<img
										src={ingredient.image}
										alt={ingredient.name}
										className={s.ingredient_image}
									/>
									<p className='text text_type_digits-default'>
										{ingredient.price} <CurrencyIcon type='primary' />
									</p>
									<p className='text text_type_main-default'>
										{ingredient.name}
									</p>
								</li>
							))}
						</ul>
					</div>
					<div className={s.ingredients_section}>
						<p className='text text_type_main-medium'>Начинки</p>
						<ul className={s.ingredients_list}>
							{groupedIngredients.main.map((ingredient) => (
								<li
									key={ingredient._id}
									className={s.ingredient_card}
									onClick={() => openIngredientDetails(ingredient)}>
									<img
										src={ingredient.image}
										alt={ingredient.name}
										className={s.ingredient_image}
									/>
									<p className='text text_type_digits-default'>
										{ingredient.price} <CurrencyIcon type='primary' />
									</p>
									<p className='text text_type_main-default'>
										{ingredient.name}
									</p>
								</li>
							))}
						</ul>
					</div>
				</Scrollbars>
			</div>
			{isModalOpen && selectedIngredient && (
				<Modal title='Детали ингредиента' onClose={closeModal}>
					<IngredientDetails ingredient={selectedIngredient} />
				</Modal>
			)}
		</section>
	);
};
