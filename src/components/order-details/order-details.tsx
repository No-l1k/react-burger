import React from 'react';
import s from './order-details.module.scss';
import Scrollbars from "react-custom-scrollbars-2";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetailsProps } from '../../utils/types';


const OrderDetails: React.FC<OrderDetailsProps> = ({ orderNumber, orderName, ingredients, totalPrice, orderDate }) => {

	return (
		<div className={s.orderDetails}>
			<h2 className={`text text_type_digits-default ${s.order_number}`}>#{orderNumber}</h2>
			<p className='text text_type_main-medium'>{orderName}</p>
			<h3 className='text text_type_main-medium'>Состав:</h3>

			<Scrollbars className={s.scroll} renderThumbVertical={(props) => <div className={s.thumb} {...props} />}			>
				<ul className={s.ingredientList}>
					{ingredients.map(({ ingredient, quantity }, index) => (
						<li key={`${ingredient._id}-${index}`} className={s.ingredientItem}>
							<div className={s.imageWrapper}>
								<img src={ingredient.image} alt={ingredient.name} className={s.ingredientImage} />
							</div>
							<p className={`text text_type_main-default ${s.ingredientName}`}>{ingredient.name}</p>
							<p className='text text_type_digits-default'>
								{quantity} x {ingredient.price} <CurrencyIcon type='primary' />
							</p>
						</li>
					))}
				</ul>
			</Scrollbars>

			<div className={s.footer}>
				<FormattedDate date={new Date(orderDate)} className='text text_type_main-default text_color_inactive' />
				<p className='text text_type_digits-default'>
					{totalPrice} <CurrencyIcon type='primary' />
				</p>
			</div>
		</div>
	);
};

export default OrderDetails;
