import React from 'react';
import s from './orders-status.module.scss';

interface OrderStatus {
    _id: string;
    status: string;
    number: number;
}

interface OrdersSummaryProps {
    doneOrders: OrderStatus[];
    pendingOrders: OrderStatus[];
    totalOrders: number;
    totalToday: number;
}

const OrdersSummary: React.FC<OrdersSummaryProps> = ({
    doneOrders,
    pendingOrders,
    totalOrders,
    totalToday,
}) => {
    return (
        <div className={s.container}>
            <div className={s.orders_status_container}>
                <div className={s.orders_status}>
                    <h2 className={`text text_type_main-medium`}>Готовы:</h2>
                    {doneOrders.slice(0, 5).map(order => (
                        <div key={order._id} className={s.order_item}>
                            <p className="text text_type_digits-default">{order.number}</p>
                        </div>
                    ))}
                </div>
                <div className={s.orders_status}>
                    <h2 className={`text text_type_main-medium`}>В работе:</h2>
                    {pendingOrders.slice(0, 5).map(order => (
                        <div key={order._id} className={s.order_item}>
                            <p className="text text_type_digits-default">{order.number}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={s.orders_summary}>
                <div>
                    <h3 className={`text text_type_main-medium`}>Выполнено за все время:</h3>
                    <p className={`text text_type_digits-large ${s.large_digits}`}>{totalOrders}</p>
                </div>
                <div>
                    <h3 className={`text text_type_main-medium`}>Выполнено за сегодня:</h3>
                    <p className={`text text_type_digits-large ${s.large_digits}`}>{totalToday}</p>
                </div>
            </div>
        </div>
    );
};

export default OrdersSummary;