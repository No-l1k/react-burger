import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './register.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { registerRequest } from '../../services/auth-slice';

export const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { loading } = useAppSelector((state) => state.auth);

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		await dispatch(registerRequest({ email, password, name }));
	};

	useEffect(() => {
		if (loading === 'succeeded') {
			navigate('/login');
		}
	}, [loading, navigate]);

	const handleLoginRedirect = () => {
		navigate('/login');
	};

	return (
		<form className={s.container} onSubmit={handleRegister}>
			<p className='text text_type_main-medium'>Регистрация</p>
			<Input
				type={'text'}
				placeholder={'Имя'}
				onChange={(e) => setName(e.target.value)}
				value={name}
				name={'name'}
				error={false}
				errorText={'Ошибка'}
				size={'default'}
			/>
			<Input
				type={'email'}
				placeholder={'E-mail'}
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				name={'email'}
				error={false}
				errorText={'Ошибка'}
				size={'default'}
			/>
			<PasswordInput
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				name={'password'}
				extraClass='mb-2'
			/>
			<Button htmlType='submit' type='primary' size='medium'>
				Зарегистрироваться
			</Button>
			<p
				className={`text text_type_main-default text_color_inactive ${s.reg_text}`}>
				Уже зарегистрированы?
				<span className={s.link} onClick={handleLoginRedirect}>
					{' '}
					Войти
				</span>
			</p>
		</form>
	);
};
