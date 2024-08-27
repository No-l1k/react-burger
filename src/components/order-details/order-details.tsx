import React from 'react';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './order-details.module.scss';

export const OrderDetails: React.FC = () => {
	return (
		<div className={s.order_details}>
			<p className={`text text_type_digits-large ${s.order_id}`}>034536</p>
			<p className={`text text_type_main-medium ${s.identifier}`}>
				идентификатор заказа
			</p>
			<div className={s.icon}>
				<CheckMarkIcon type='primary' />
			</div>
			<div className={s.order_info}>
				<p className='text text_type_main-default'>Ваш заказ начали готовить</p>
				<p className='text text_type_main-default text_color_inactive'>
					Дождитесь готовности на орбитальной станции
				</p>
			</div>
		</div>
	);
};
