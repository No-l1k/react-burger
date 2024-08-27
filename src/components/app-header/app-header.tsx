import s from './app-header.module.scss';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
	Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader = () => {
	return (
		<header className={s.head}>
			<nav className={s.nav}>
				<div className={s.nav_list}>
					<span className={s.nav_list_item}>
						<button className='text text_type_main-default'>
							{' '}
							<BurgerIcon type='secondary' />
							Конструктор
						</button>
					</span>
					<span className={s.nav_list_item}>
						<button className='text text_type_main-default'>
							{' '}
							<ListIcon type='secondary' />
							Лента заказов
						</button>
					</span>
				</div>
				<div className={s.logo}>
					<Logo />
				</div>
				<span className={s.nav_list_item}>
					<button>
						{' '}
						<ProfileIcon type='secondary' />
						Личный кабинет
					</button>
				</span>
			</nav>
		</header>
	);
};
