import React from 'react';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { ingredientsData } from '../../utils/data';
import s from './burger-constructor.module.scss';

interface Ingredient {
	_id: string;
	name: string;
	type: 'bun' | 'sauce' | 'main';
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile?: string;
	image_large?: string;
	__v?: number;
}

export const BurgerConstructor = () => {
	const ingredients: Ingredient[] = ingredientsData as Ingredient[];

	const topTypeIngredient = ingredients[0];
	const bottomTypeIngredient = ingredients[ingredients.length - 1];
	return (
		<div className={s.burger_constructor}>
			<Scrollbars
				style={{ width: 590, height: 656 }}
				renderThumbVertical={({ style, ...props }) => (
					<div {...props} style={{ ...style, backgroundColor: '#8585AD' }} />
				)}>
				<div className={s.constructor_content}>
					{topTypeIngredient && (
						<ConstructorElement
							extraClass={s.constructor_extra_element}
							type='top'
							isLocked={true}
							text={`${topTypeIngredient.name}`}
							price={topTypeIngredient.price}
							thumbnail={topTypeIngredient.image}
						/>
					)}
					{ingredients.slice(1, -1).map((ingredient) => (
						<div key={ingredient._id} className={s.drug_element}>
							<DragIcon type='primary' />
							<ConstructorElement
								text={`${ingredient.name}`}
								price={ingredient.price}
								thumbnail={ingredient.image}
							/>
						</div>
					))}
					{bottomTypeIngredient && (
						<ConstructorElement
							extraClass={s.constructor_extra_element}
							type='bottom'
							isLocked={true}
							text={`${bottomTypeIngredient.name}`}
							price={bottomTypeIngredient.price}
							thumbnail={bottomTypeIngredient.image}
						/>
					)}
				</div>
			</Scrollbars>
			<div className={s.order_button_container}>
				<span className='text text_type_digits-medium'>
					610
					<CurrencyIcon type='primary' />
				</span>
				<Button
					htmlType='button'
					type='primary'
					size='large'
					extraClass={s.order_button}>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};
