import {
	Counter,
	CurrencyIcon,
	Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useRef } from 'react';
import s from './burger-ingredients.module.scss';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IngredientGroup, IngredientType } from '../../utils/types';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { useModal } from '../../hooks/use-modal';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchIngredients,
	activeHighlight,
	removeHighlight,
	clearCurrentIngredient,
	setCurrentIngredient,
} from '../../services/ingredients-slice';
import { AppDispatch, RootState } from '../../services/store';
import { useDrag } from 'react-dnd';

export const BurgerIngredients = ({}) => {
	const [current, setCurrent] = React.useState('one');
	const { isModalOpen, openModal, closeModal } = useModal();

	const dispatch = useDispatch<AppDispatch>();

	const { ingredients } = useSelector((state: RootState) => state.ingredients);
	const selectedIngredient = useSelector(
		(state: RootState) => state.ingredients.currentIngredient
	);

	const menuRef = useRef<HTMLDivElement>(null);
	const bunsRef = useRef<HTMLDivElement>(null);
	const saucesRef = useRef<HTMLDivElement>(null);
	const mainsRef = useRef<HTMLDivElement>(null);

	const groupedIngredients: IngredientGroup = {
		bun: ingredients.filter((item) => item.type === 'bun'),
		sauce: ingredients.filter((item) => item.type === 'sauce'),
		main: ingredients.filter((item) => item.type === 'main'),
	};

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	const openIngredientDetails = (ingredient: IngredientType) => {
		dispatch(setCurrentIngredient(ingredient));
		openModal();
	};

	const closeIngredientDetails = () => {
		dispatch(clearCurrentIngredient());
		closeModal();
	};

	const handleScroll = () => {
		const menuBottom = menuRef.current?.getBoundingClientRect().bottom || 0;
		const bunsTop = bunsRef.current?.getBoundingClientRect().top || 0;
		const saucesTop = saucesRef.current?.getBoundingClientRect().top || 0;
		const mainsTop = mainsRef.current?.getBoundingClientRect().top || 0;

		const offsets = [
			{ type: 'one', value: Math.abs(menuBottom - bunsTop) },
			{ type: 'two', value: Math.abs(menuBottom - saucesTop) },
			{ type: 'three', value: Math.abs(menuBottom - mainsTop) },
		];

		const closestSection = offsets.reduce((prev, curr) =>
			prev.value < curr.value ? prev : curr
		);
		setCurrent(closestSection.type);
	};

	return (
		<section>
			<p className='text text_type_main-large'>Соберите бургер</p>
			<div className={s.menu_nav} ref={menuRef}>
				{' '}
				{/*Реф на меню,потому что не получилось прокинуть реф в ScrollBars */}
				<Tab value='one' active={current === 'one'} onClick={setCurrent}>
					Булки
				</Tab>
				<Tab value='two' active={current === 'two'} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab value='three' active={current === 'three'} onClick={setCurrent}>
					Начинки
				</Tab>
			</div>
			<div className={s.main_ingredients}>
				<Scrollbars
					className={s.scroll}
					onScroll={handleScroll}
					renderThumbVertical={({ ...props }) => (
						<div {...props} className={s.thumb} />
					)}>
					<div className={s.ingredients_section} ref={bunsRef}>
						<p className='text text_type_main-medium'>Булки</p>
						<ul className={s.ingredients_list}>
							{groupedIngredients.bun.map((ingredient) => (
								<DraggableCard
									key={ingredient._id}
									ingredient={ingredient}
									onClick={openIngredientDetails}
								/>
							))}
						</ul>
					</div>
					<div className={s.ingredients_section} ref={saucesRef}>
						<p className='text text_type_main-medium'>Соусы</p>
						<ul className={s.ingredients_list}>
							{groupedIngredients.sauce.map((ingredient) => (
								<DraggableCard
									key={ingredient._id}
									ingredient={ingredient}
									onClick={openIngredientDetails}
								/>
							))}
						</ul>
					</div>
					<div className={s.ingredients_section} ref={mainsRef}>
						<p className='text text_type_main-medium'>Начинки</p>
						<ul className={s.ingredients_list}>
							{groupedIngredients.main.map((ingredient) => (
								<DraggableCard
									key={ingredient._id}
									ingredient={ingredient}
									onClick={openIngredientDetails}
								/>
							))}
						</ul>
					</div>
				</Scrollbars>
			</div>
			{isModalOpen && selectedIngredient && (
				<Modal title='Детали ингредиента' onClose={closeIngredientDetails}>
					<IngredientDetails ingredient={selectedIngredient} />
				</Modal>
			)}
		</section>
	);
};

interface DraggableCardProps {
	ingredient: IngredientType;
	onClick: (ingredient: IngredientType) => void;
}

const DraggableCard: React.FC<DraggableCardProps> = ({
	ingredient,
	onClick,
}) => {
	const dispatch = useDispatch();
	const prevIsDraggingRef = useRef(false);
	const [, dragRef] = useDrag({
		type: 'new-ingredient',
		item: { ingredient },
		collect: (monitor) => {
			const isDragging = monitor.isDragging();
			if (isDragging !== prevIsDraggingRef.current) {
				if (isDragging) {
					dispatch(activeHighlight());
				} else {
					dispatch(removeHighlight());
				}
				prevIsDraggingRef.current = isDragging;
			}
			return { isDragging };
		},
	});

	const ingredientsInConstructor = useSelector((state: RootState) =>
		state.burgerConstructor.ingredients.filter(
			(item) => item._id === ingredient._id
		)
	);

	const count = ingredientsInConstructor.reduce(
		(total, item) => total + item.quantity,
		0
	);

	return (
		<li
			ref={dragRef}
			className={s.ingredient_card}
			onClick={() => onClick(ingredient)}>
			{count > 0 && <Counter count={count} size='default' extraClass='m-1' />}
			<img
				src={ingredient.image}
				alt={ingredient.name}
				className={s.ingredient_image}
			/>
			<p className={`text text_type_digits-default ${s.price}`}>
				{ingredient.price} <CurrencyIcon type='primary' />
			</p>
			<p className={`${s.name} text text_type_main-default`}>
				{ingredient.name}
			</p>
		</li>
	);
};
