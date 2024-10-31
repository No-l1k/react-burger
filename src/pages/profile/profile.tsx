import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './profile.module.scss';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { OrderFeed } from '../../components/order-feed/order-feed';

import {
	getUserDataRequest,
	logoutRequest,
	updateUserDataRequest,
} from '../../services/auth-slice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { IngredientDataMap } from '../../utils/types';

interface ProfileProps {
	ingredientDataMap: IngredientDataMap;
	isProfileOrder: boolean; 
}

export const Profile: React.FC<ProfileProps> = ({ ingredientDataMap, isProfileOrder }) => {

	const location = useLocation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const orders = useAppSelector((state) => state.orderHistory.orders);

	const handleLogout = () => {
		dispatch(logoutRequest()).then((result) => {
			if (logoutRequest.fulfilled.match(result)) {
				navigate('/login');
			}
		});
	};

	return (
		<div className={s.container}>
			<div className={`text text_type_main-medium ${s.nav}`}>
				<NavLink
					to='/profile'
					className={
						location.pathname === '/profile' ? `${s.link} ${s.active}` : s.link
					}>
					Профиль
				</NavLink>
				<NavLink
					to='/profile/orders'
					className={
						location.pathname === '/profile/orders'
							? `${s.link} ${s.active}`
							: s.link
					}>
					История заказов
				</NavLink>
				<span className={s.exit} onClick={handleLogout}>
					Выход
				</span>
			</div>
			<div>
				{location.pathname === '/profile' ? <ProfileInfo /> : <OrderFeed orders={orders} ingredientDataMap={ingredientDataMap} isProfileOrder={isProfileOrder}/>}

			</div>
		</div>
	);
};

const ProfileInfo = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.auth);
	const initialUser = useAppSelector((state) => state.auth.initialUser);

	const [name, setName] = useState(user?.name || '');
	const [email, setEmail] = useState(user?.email || '');
	const [password, setPassword] = useState(user?.name || '');

	const [isEdited, setIsEdited] = useState(false);

	useEffect(() => {
		if (!user) {
			dispatch(getUserDataRequest());
		}
	}, [dispatch, user]);

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
		}
	}, [user]);

	const handleChange = (
		setter: React.Dispatch<React.SetStateAction<string>>,
		value: string
	) => {
		setter(value);
		setIsEdited(true);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		dispatch(updateUserDataRequest({ name, email }));
		setIsEdited(false);
	};

	const handleCancel = () => {
		setName(initialUser?.name || '');
		setEmail(initialUser?.email || '');
		setIsEdited(false);
	};

	const handleIconClick = (field: string) => {
		switch (field) {
			case 'name':
				setName('');
				break;
			case 'email':
				setEmail('');
				break;
			case 'password':
				setPassword('');
				break;
			default:
				break;
		}
		setIsEdited(true);
	};

	return (
		<form className={s.info_container} onSubmit={handleSubmit}>
			<Input
				type={'text'}
				placeholder={'Имя'}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					handleChange(setName, e.target.value)
				}
				value={name}
				icon={name ? 'CloseIcon' : 'EditIcon'}
				name={'name'}
				size={'default'}
				onIconClick={() => handleIconClick('name')}
			/>
			<Input
				type={'email'}
				placeholder={'E-mail'}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					handleChange(setEmail, e.target.value)
				}
				value={email}
				icon={email ? 'CloseIcon' : 'EditIcon'}
				name={'email'}
				size={'default'}
				onIconClick={() => handleIconClick('email')}
			/>
			<Input
				type={'password'}
				placeholder={'Пароль'}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					handleChange(setPassword, e.target.value)
				}
				value={password}
				icon={password ? 'CloseIcon' : 'EditIcon'}
				name={'password'}
				errorText={'Ошибка'}
				size={'default'}
				onIconClick={() => handleIconClick('password')}
			/>
			{isEdited && (
				<div className={s.buttons}>
					<span
						className={`text text_type_main-default text_color_inactive ${s.link}`}
						onClick={handleCancel}>
						Отмена
					</span>
					<Button htmlType='submit' type='primary' size='medium'>
						Сохранить
					</Button>
				</div>
			)}
		</form>
	);
};
