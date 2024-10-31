import { useLocation, useNavigate } from 'react-router-dom';
import s from './app-header.module.scss';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
	Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const isConstructorActive = location.pathname === '/';
	const isProfileActive = location.pathname === '/profile';

	const handleConstructorRedirect = () => {
		navigate('/');
	};

	const handleProfileRedirect = () => {
		navigate('/profile');
	};

	const handleFeedRedirect = () => {
		navigate('/feed');
	};

	return (
		<header className={s.head}>
			<nav className={s.nav}>
				<div className={s.nav_list}>
					<span className={s.nav_list_item}>
						<button
							className={`${s.button} text text_type_main-default`}
							onClick={handleConstructorRedirect}>
							<BurgerIcon
								type={isConstructorActive ? 'primary' : 'secondary'}
							/>
							<span className={isConstructorActive ? s.active : ''}>
								Конструктор
							</span>
						</button>
					</span>
					<span className={s.nav_list_item}>
						<button className='text text_type_main-default' onClick={handleFeedRedirect}>
							<ListIcon type='secondary' />
							Лента заказов
						</button>
					</span>
				</div>
				<div className={s.logo}>
					<Logo />
				</div>
				<span className={s.nav_list_item}>
					<button
						className={`${s.button} text text_type_main-default`}
						onClick={handleProfileRedirect}>
						<ProfileIcon type={isProfileActive ? 'primary' : 'secondary'} />
						<span className={isProfileActive ? s.active : ''}>
							Личный кабинет
						</span>
					</button>
				</span>
			</nav>
		</header>
	);
};
