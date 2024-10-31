import React from 'react';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from "./new-order.module.scss"
import { Loader } from '../loader/loader';

interface OrderDetailsProps {
	orderNumber: number | null;
	error: string | null;
	loading: boolean;
}

export const NewOrder: React.FC<OrderDetailsProps> = ({
	orderNumber,
	error,
	loading,
}) => {
	if (loading) {
		return <Loader />;
	}
	return (
		<div className={s.order_details}>
			{error ? (
				<p className={`text text_type_digits-large ${s.order_id}`}>
					Ошибка: {error}
				</p>
			) : (
				<>
					<p className={`text text_type_digits-large ${s.order_id}`}>
						{orderNumber}
					</p>
					<p className={`text text_type_main-medium ${s.identifier}`}>
						идентификатор заказа
					</p>
					<div className={s.icon}>
						<CheckMarkIcon type='primary' />
					</div>
					<div className={s.order_info}>
						<p className='text text_type_main-default'>
							Ваш заказ начали готовить
						</p>
						<p className='text text_type_main-default text_color_inactive'>
							Дождитесь готовности на орбитальной станции
						</p>
					</div>
				</>
			)}
		</div>
	);
};
