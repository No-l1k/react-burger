import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { calculateTotalPrice, transformIngredients } from '../../utils/helpers';
import { OrderDetailsProps } from '../../utils/types';
import s from './order.module.scss';
import OrderDetails from '../../components/order-details/order-details';
import { useEffect, useState } from 'react';
import { fetchOrderByNumber } from '../../services/order-slice';
import { Loader } from '../../components/loader/loader';

interface OrderProps {
    ingredientDataMap: Map<string, { price: number; image: string; name: string }>;
}

const Order: React.FC<OrderProps> = ({ ingredientDataMap }) => {
    const { number } = useParams<{ number: string }>();
    const dispatch = useAppDispatch();

    const order = useAppSelector((state) => {
        const foundOrder = state.orderFeed.orders.find((o) => o.number === Number(number)) ||
                           state.orderHistory.orders.find((o) => o.number === Number(number));
        return foundOrder || state.order.currentOrder;
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!order && number) {
                dispatch(fetchOrderByNumber(number))
                    .unwrap() 
                    .catch((err) => {
                        setError('Не удалось загрузить заказ.');
                    })
                    .finally(() => {
                        setIsLoading(false); 
                    });
            } else {
                setIsLoading(false);
            }
        }, 3000); 

        return () => clearTimeout(timeoutId);
    }, [dispatch, number, order]);

    useEffect(() => {
        if (order) {
            setIsLoading(false);
        }
    }, [order]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <p>{error}</p>; 
    }

    if (!order) {
        return <p>Заказ не найден</p>;
    }

    if ('createdAt' in order && 'name' in order && 'number' in order) {
        const transformedIngredients = transformIngredients(order, ingredientDataMap);
        const totalPrice = calculateTotalPrice(transformedIngredients);

        const orderDetails: OrderDetailsProps = {
            orderNumber: order.number,
            orderName: order.name,
            ingredients: transformedIngredients,
            totalPrice: totalPrice,
            orderDate: order.createdAt,
        };

        return (
            <div className={s.container}>
                <OrderDetails {...orderDetails} />
            </div>
        );
    }

    return <p>Некорректные данные о заказе.</p>;
};

export default Order;