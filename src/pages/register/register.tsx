import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './register.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleLoginRedirect = () => {
		navigate('/login');
	};

	return (
		<div className={s.container}>
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
			<Button htmlType='button' type='primary' size='medium'>
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
		</div>
	);
};
