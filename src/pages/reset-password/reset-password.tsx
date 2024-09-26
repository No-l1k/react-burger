import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './reset-password.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ResetPassword = () => {
	const [password, setPassword] = useState('');
	const [code, setCode] = useState('');

	const navigate = useNavigate();

	const handleLoginRedirect = () => {
		navigate('/login');
	};

	return (
		<div className={s.container}>
			<p className='text text_type_main-medium'>Восстановление пароля</p>
			<PasswordInput
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				name={'password'}
				placeholder='Введите новый пароль'
			/>
			<Input
				type={'text'}
				placeholder={'Введите код из письма'}
				onChange={(e) => setCode(e.target.value)}
				value={code}
				name={'code'}
				error={false}
				errorText={'Ошибка'}
				size={'default'}
			/>
			<Button htmlType='button' type='primary' size='medium'>
				Сохранить
			</Button>
			<p
				className={`text text_type_main-default text_color_inactive ${s.reg_text}`}>
				Вспомнили пароль?
				<span className={s.link} onClick={handleLoginRedirect}>
					{' '}
					Войти
				</span>
			</p>
		</div>
	);
};
