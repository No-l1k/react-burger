import React from 'react';
import { PuffLoader } from 'react-spinners';
import s from './loader.module.scss';

export const Loader: React.FC = () => {
	return (
		<div className={s.loader}>
			<PuffLoader color='#8585ad' size={60} />
		</div>
	);
};
