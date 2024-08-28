import React from 'react';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Scrollbars } from 'react-custom-scrollbars-2';
import s from './burger-constructor.module.scss';
import { IngredientsData } from '../../utils/types';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { useModal } from '../../hooks/use-modal';

export const BurgerConstructor: React.FC<IngredientsData> = ({
	ingredients,
}) => {
	const { isModalOpen, openModal, closeModal } = useModal();

	const topTypeIngredient = ingredients[0];
	const bottomTypeIngredient = ingredients[0];

	return (
		<div className={s.burger_constructor}>
			{topTypeIngredient && (
				<ConstructorElement
					extraClass={s.constructor_extra_element}
					type='top'
					isLocked={true}
					text={`${topTypeIngredient.name} (верх)`}
					price={topTypeIngredient.price}
					thumbnail={topTypeIngredient.image}
				/>
			)}
			<Scrollbars
				className={s.scroll}
				renderThumbVertical={({ ...props }) => (
					<div {...props} className={s.thumb} />
				)}>
				<div className={s.constructor_content}>
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
				</div>
			</Scrollbars>
			{bottomTypeIngredient && (
				<ConstructorElement
					extraClass={s.constructor_extra_element}
					type='bottom'
					isLocked={true}
					text={`${bottomTypeIngredient.name} (низ)`}
					price={bottomTypeIngredient.price}
					thumbnail={bottomTypeIngredient.image}
				/>
			)}
			<div className={s.order_button_container}>
				<span className='text text_type_digits-medium'>
					610
					<CurrencyIcon type='primary' />
				</span>
				<Button
					htmlType='button'
					type='primary'
					size='large'
					extraClass={s.order_button}
					onClick={openModal}>
					Оформить заказ
				</Button>
			</div>
			{isModalOpen && (
				<Modal onClose={closeModal}>
					<OrderDetails />
				</Modal>
			)}
		</div>
	);
};
