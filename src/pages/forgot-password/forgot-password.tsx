import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './forgot-password.module.scss';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { resetPasswordRequest } from '../../services/password-reset-slice';

export const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { status: resetPasswordStatus } = useAppSelector(
		(state) => state.passwordReset
	);

	const handleResetPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		await dispatch(resetPasswordRequest(email));
	};

	useEffect(() => {
		if (resetPasswordStatus === 'succeeded') {
			localStorage.setItem('resetPasswordAllowed', 'true');
			navigate('/reset-password');
		}
	}, [resetPasswordStatus, navigate]);

	const handleLoginRedirect = () => {
		navigate('/login');
	};

	return (
		<form className={s.container} onSubmit={handleResetPassword}>
			<p className='text text_type_main-medium'>Восстановление пароля</p>
			<EmailInput
				placeholder={'Укажите E-mail'}
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				name={'email'}
				size={'default'}
			/>
			<Button htmlType='submit' type='primary' size='medium'>
				Восстановить
			</Button>
			<p
				className={`text text_type_main-default text_color_inactive ${s.reg_text}`}>
				Вспомнили пароль?
				<span className={s.link} onClick={handleLoginRedirect}>
					{' '}
					Войти
				</span>
			</p>
		</form>
	);
};
