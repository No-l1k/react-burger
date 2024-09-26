import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './profile.module.scss';
import { ChangeEvent, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { OrderHistory } from '../order-history/order-history';

export const Profile = () => {
	const location = useLocation();

	return (
		<div className={s.container}>
			<div className={`text text_type_main-medium ${s.nav}`}>
				<NavLink to='/profile'>Профиль</NavLink>
				<NavLink to='/profile/order-history'>История заказов</NavLink>
				<div>Выход</div>
			</div>
			<div>
				{location.pathname === '/profile' ? <ProfileInfo /> : <OrderHistory />}
			</div>
		</div>
	);
};

const ProfileInfo = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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
	};

	return (
		<div className={s.info_container}>
			<Input
				type={'text'}
				placeholder={'Имя'}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
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
					setEmail(e.target.value)
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
					setPassword(e.target.value)
				}
				value={password}
				icon={password ? 'CloseIcon' : 'EditIcon'}
				name={'password'}
				errorText={'Ошибка'}
				size={'default'}
				onIconClick={() => handleIconClick('password')}
			/>
			<div className={s.buttons}>
				<p
					className={`text text_type_main-default text_color_inactive ${s.link}`}>
					Отмена
				</p>
				<Button htmlType='button' type='primary' size='medium'>
					Сохранить
				</Button>
			</div>
		</div>
	);
};
