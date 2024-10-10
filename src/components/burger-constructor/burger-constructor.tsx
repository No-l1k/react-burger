import { useMemo, useCallback, useRef } from 'react';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Scrollbars } from 'react-custom-scrollbars-2';
import s from './burger-constructor.module.scss';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { useModal } from '../../hooks/use-modal';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
	addIngredient,
	removeIngredient,
	setBun,
	moveIngredient,
} from '../../services/constructor-slice';
import { IngredientType } from '../../utils/types';
import { useDrop, useDrag } from 'react-dnd';
import { orderRequest } from '../../services/order-slice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor = () => {
	const { isModalOpen, openModal, closeModal } = useModal();
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
	const navigate = useNavigate();

	const isHighlighted = useAppSelector(
		(state) => state.ingredients.isHighlighted
	);

	const { bun, ingredients } = useAppSelector(
		(state) => state.burgerConstructor
	);
	const { orderNumber, error, loading } = useAppSelector(
		(state) => state.order
	);

	const [, dropRef] = useDrop({
		accept: 'new-ingredient',
		drop: (item: { ingredient: IngredientType }) => {
			const ingredient = item.ingredient;

			if (ingredient.type === 'bun') {
				dispatch(setBun(ingredient));
			} else {
				dispatch(addIngredient(ingredient));
			}
		},
	});

	const moveCard = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			dispatch(moveIngredient({ dragIndex, hoverIndex }));
		},
		[dispatch]
	);

	const handleOrderClick = () => {
		if (!isAuthenticated) {
			navigate('/login');
			return;
		}

		if (bun) {
			const ingredientIds = [
				bun._id,
				...ingredients.map((ingredient) => ingredient._id),
			];
			dispatch(orderRequest(ingredientIds));
			openModal();
		}
	};

	const totalPrice = useMemo(() => {
		const bunPrice = bun ? bun.price * 2 : 0;
		const ingredientsPrice = ingredients.reduce(
			(sum, ingredient) => sum + ingredient.price,
			0
		);
		return bunPrice + ingredientsPrice;
	}, [bun, ingredients]);

	return (
		<div className={s.burger_constructor}>
			<div
				className={`${s.drop_container} ${
					isHighlighted ? s.drop_container_highlight : ''
				}`}
				ref={dropRef}>
				{!bun ? (
					<p className={`text text_type_main-large ${s.bun_container_top}`}>
						Пожалуйста, для создания бургера перетащите в конструктор булку
					</p>
				) : (
					<ConstructorElement
						extraClass={s.constructor_extra_element}
						type='top'
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				)}
				<Scrollbars
					className={s.scroll}
					renderThumbVertical={({ ...props }) => (
						<div {...props} className={s.thumb} />
					)}>
					<div className={s.constructor_content}>
						{ingredients.map((ingredient, index) => (
							<DraggableIngredient
								key={ingredient.id}
								index={index}
								ingredient={ingredient}
								moveCard={moveCard}
								handleClose={() => dispatch(removeIngredient(ingredient.id))}
							/>
						))}
					</div>
				</Scrollbars>
				{!bun ? (
					<p className={`${s.bun_container_bottom}`}></p>
				) : (
					<ConstructorElement
						extraClass={s.constructor_extra_element}
						type='bottom'
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				)}
			</div>
			<div className={s.order_button_container}>
				<span className='text text_type_digits-medium'>
					{totalPrice}
					<CurrencyIcon type='primary' />
				</span>
				{bun ? (
					<Button
						htmlType='button'
						type='primary'
						size='large'
						extraClass={s.order_button}
						onClick={handleOrderClick}>
						Оформить заказ
					</Button>
				) : (
					''
				)}
			</div>
			{isModalOpen && (
				<Modal onClose={closeModal}>
					<OrderDetails
						orderNumber={orderNumber}
						error={error}
						loading={loading}
					/>
				</Modal>
			)}
		</div>
	);
};

interface DraggableIngredientProps {
	ingredient: IngredientType & { id: string };
	index: number;
	moveCard: (dragIndex: number, hoverIndex: number) => void;
	handleClose: () => void;
}

const DraggableIngredient: React.FC<DraggableIngredientProps> = ({
	ingredient,
	index,
	moveCard,
	handleClose,
}) => {
	const ref = useRef<HTMLDivElement>(null);

	const [, drop] = useDrop({
		accept: 'reorder-ingredient',
		hover(item: { index: number }) {
			if (!ref.current) return;
			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) return;

			moveCard(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: 'reorder-ingredient',
		item: { index, ingredient },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	drag(drop(ref));

	return (
		<div ref={ref} className={s.drug_element}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={`${ingredient.name}`}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={handleClose}
				extraClass={`${isDragging ? s.dragging : ''}`}
			/>
		</div>
	);
};
