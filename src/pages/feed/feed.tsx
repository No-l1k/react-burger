import { useSelector } from 'react-redux';
import { OrderFeed } from '../../components/order-feed/order-feed';
import OrdersSummary from '../../components/orders-status/orders-status';
import { IngredientDataMap, Order } from '../../utils/types';
import s from './feed.module.scss';
import { RootState } from '../../services/store';

interface FeedProps {
	orders: Order[];
	ingredientDataMap: IngredientDataMap;
	isProfileOrder: boolean;
}

const Feed: React.FC<FeedProps> = ({
	orders,
	ingredientDataMap,
	isProfileOrder,
}) => {
	const doneOrders = orders.filter((order) => order.status === 'done');
	const pendingOrders = orders.filter((order) => order.status === 'pending');

	const totalOrders = useSelector((state: RootState) => state.orderFeed.total);
	const totalToday = useSelector(
		(state: RootState) => state.orderFeed.totalToday
	);

	return (
		<div className={s.container}>
			<div>
				<p className='text text_type_main-large'>Лента заказов</p>
				<div className={s.feed_main}>
					<OrderFeed
						orders={orders}
						ingredientDataMap={ingredientDataMap}
						isProfileOrder={isProfileOrder}
					/>
					<OrdersSummary
						doneOrders={doneOrders}
						pendingOrders={pendingOrders}
						totalOrders={totalOrders}
						totalToday={totalToday}
					/>
				</div>
			</div>
		</div>
	);
};

export default Feed;
