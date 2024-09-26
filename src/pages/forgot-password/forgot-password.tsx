import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './forgot-password.module.scss';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { resetPasswordRequest } from '../../services/auth-slice';

export const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { resetPasswordStatus } = useAppSelector((state) => state.auth);

	const handleResetPassword = async () => {
		await dispatch(resetPasswordRequest(email));
	};

	useEffect(() => {
		if (resetPasswordStatus === 'success') {
			navigate('/reset-password');
		}
	}, [resetPasswordStatus, navigate]);

	const handleLoginRedirect = () => {
		navigate('/login');
	};

	return (
		<div className={s.container}>
			<p className='text text_type_main-medium'>Восстановление пароля</p>
			<EmailInput
				placeholder={'Укажите E-mail'}
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				name={'email'}
				size={'default'}
			/>
			<Button
				htmlType='button'
				type='primary'
				size='medium'
				onClick={handleResetPassword}>
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
		</div>
	);
};
