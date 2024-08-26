import {
	Counter,
	CurrencyIcon,
	Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-ingredients.module.scss';
import React from 'react';
import { ingredientsData } from '../../utils/data';
import { Scrollbars } from 'react-custom-scrollbars-2';

interface Ingredient {
	_id: string;
	name: string;
	type: 'bun' | 'sauce' | 'main';
	price: number;
	image: string;
}

interface IngredientGroup {
	bun: Ingredient[];
	sauce: Ingredient[];
	main: Ingredient[];
}

export const BurgerIngredients = () => {
	const [current, setCurrent] = React.useState('one');

	const rawIngredients: any[] = ingredientsData;
	const ingredients: Ingredient[] = rawIngredients.map((ingredient) => ({
		...ingredient,
		type: ingredient.type as 'bun' | 'sauce' | 'main',
	}));

	const groupedIngredients: IngredientGroup = {
		bun: ingredients.filter((item) => item.type === 'bun'),
		sauce: ingredients.filter((item) => item.type === 'sauce'),
		main: ingredients.filter((item) => item.type === 'main'),
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
					style={{ width: 590, height: 700 }}
					renderThumbVertical={({ style, ...props }) => (
						<div {...props} style={{ ...style, backgroundColor: '#8585AD' }} />
					)}>
					<div className={s.ingredients_section}>
						<p className='text text_type_main-medium'>Булки</p>
						<ul className={s.ingredients_list}>
							{groupedIngredients.bun.map((ingredient) => (
								<li key={ingredient._id} className={s.ingredient_card}>
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
								<li key={ingredient._id} className={s.ingredient_card}>
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
								<li key={ingredient._id} className={s.ingredient_card}>
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
		</section>
	);
};
