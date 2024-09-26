import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import s from './login.module.scss';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleRegisterRedirect = () => {
		navigate('/register');
	};

	const handleForgotPasswordRedirect = () => {
		navigate('/forgot-password');
	};

	return (
		<div className={s.container}>
			<p className='text text_type_main-medium'>Вход</p>
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
			<Button htmlType='button' type='primary' size='medium'>
				Войти
			</Button>
			<div className={s.nav_container}>
				<p className='text text_type_main-default text_color_inactive'>
					Вы — новый пользователь?
					<span className={s.link} onClick={handleRegisterRedirect}>
						{' '}
						Зарегистрироваться
					</span>
				</p>
				<p className='text text_type_main-default text_color_inactive'>
					Забыли пароль?
					<span className={s.link} onClick={handleForgotPasswordRedirect}>
						{' '}
						Восстановить пароль
					</span>
				</p>
			</div>
		</div>
	);
};
