import Scrollbars from "react-custom-scrollbars-2";
import s from './order-feed.module.scss';
import { IngredientData, Order, OrderDetailsProps } from '../../utils/types';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { calculateTotalPrice, transformIngredients } from '../../utils/helpers';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { WebSocket_URL, wsActions } from "../../utils/constans";

interface OrderFeedProps {
    orders: Order[];
    isProfileOrder: boolean;
    ingredientDataMap: Map<string, IngredientData>;
}

export const OrderFeed: React.FC<OrderFeedProps> = ({ orders, ingredientDataMap, isProfileOrder }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const accessToken = useAppSelector(state => state.auth.accessToken);
    
    const handleOrderClick = (order: Order) => {
        const transformedIngredients = transformIngredients(order, ingredientDataMap);
        const totalPrice = calculateTotalPrice(transformedIngredients);
    
        const orderDetails: OrderDetailsProps = {
            orderNumber: order.number,
            orderName: order.name,
            ingredients: transformedIngredients,
            totalPrice: totalPrice,
            orderDate: order.createdAt,
        };
    
        const path = isProfileOrder
            ? `/profile/orders/${order.number}`
            : `/feed/${order.number}`;
    
        navigate(path, {
            state: { fromModal: true, orderDetails, backgroundLocation: location },
        });
    };



    useEffect(() => {
        const url = isProfileOrder
            ? `${WebSocket_URL}/orders?token=${accessToken?.replace('Bearer ', '')}`
            : `${WebSocket_URL}/orders/all`;
    
        if (isProfileOrder && !accessToken) {
            console.error("No access token found for profile order feed.");
            return;
        }
    
        dispatch(wsActions.connect(url));
    
        return () => {
            dispatch(wsActions.disconnect());
        };
    }, [dispatch, isProfileOrder, accessToken]);

    return (
        <Scrollbars
            className={isProfileOrder ? s.scroll : s.feed_scroll}
            renderThumbVertical={(props) => <div className={s.thumb} {...props} />}
        >
            <ul className={isProfileOrder ? s.orderList : s.feed_orderList}>
                {orders
                    .slice()
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((order) => {
                        const transformedIngredients = transformIngredients(order, ingredientDataMap);

                        const totalPrice = calculateTotalPrice(transformedIngredients);

                        return (
                            <li
                                className={isProfileOrder ? s.order : s.feed_order}
                                key={order._id}
                                onClick={() => handleOrderClick(order)}
                            >
                                <div className={s.order_number}>
                                    <p className="text text_type_digits-default">#{order.number}</p>
                                    <FormattedDate
                                        date={new Date(order.createdAt)}
                                        className="text text_type_main-default text_color_inactive"
                                    />
                                </div>
                                <p className={`text text_type_main-medium ${s.order_name}`}>
                                    {order.name}
                                </p>
                                {isProfileOrder ?
                                    <p className={`text text_type_main-default ${s.order_status}`}>
                                        {order.status === 'done' ? 'Выполнен' : 'Готовится'}
                                    </p>
                                    : ""
                                }
                                <div className={s.order_composition}>
                                    <div className={s.ingredients}>
                                        {order.ingredients.slice(0, 5).map((ingredientId, index) => {
                                            const ingredientData = ingredientDataMap.get(ingredientId);
                                            if (!ingredientData) return null;

                                            return (
                                                <div
                                                    key={index}
                                                    className={`${s.ingredient_image} ${s[`z-index-${index}`]}`}
                                                >
                                                    <div className={s.image_with_background}>
                                                        <img src={ingredientData.image} alt={ingredientData.name} />
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {order.ingredients.length > 5 && (
                                            <div className={`${s.ingredient_image} ${s.extra_ingredients}`}>
                                                <div className={s.image_with_background}>
                                                    {(() => {
                                                        const lastIngredientId = order.ingredients[5];
                                                        const lastIngredientData = ingredientDataMap.get(lastIngredientId);
                                                        return lastIngredientData ? (
                                                            <>
                                                                <img
                                                                    src={lastIngredientData.image}
                                                                    alt={lastIngredientData.name}
                                                                    className={s.last_ingredient_image}
                                                                />
                                                                <span className={s.extra_count}>
                                                                    +{order.ingredients.length - 5}
                                                                </span>
                                                            </>
                                                        ) : null;
                                                    })()}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <span className={`text text_type_digits-default ${s.totalPrice}`}>
                                        {totalPrice}
                                        <CurrencyIcon type="primary" />
                                    </span>
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </Scrollbars>
    );
};