import s from './app.module.scss';
import { AppHeader } from '../app-header/app-header';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Routes, Route } from 'react-router-dom';

import { Login } from '../../pages/login/login';
import { Register } from '../../pages/register/register';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { ResetPassword } from '../../pages/reset-password/reset-password';
import { Profile } from '../../pages/profile/profile';
import { Ingredient } from '../../pages/ingredient/ingredient';
import { Home } from '../../pages/home/home';
import { OrderHistory } from '../../pages/order-history/order-history';

export const App = () => {
	return (
		<div className={s.app}>
			<AppHeader />
			<DndProvider backend={HTML5Backend}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />
					<Route path='/reset-password' element={<ResetPassword />} />
					<Route path='/profile' element={<Profile />}>
						<Route path='order-history' element={<OrderHistory />} />
					</Route>
					<Route path='/ingredients/:id' element={<Ingredient />} />
				</Routes>
			</DndProvider>
		</div>
	);
};
