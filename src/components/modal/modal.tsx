import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import s from './modal.module.scss';

interface ModalProps {
	title?: string;
	onClose: () => void;
	children: React.ReactNode;
	isOrderNumberTitle?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ title, onClose, children}) => {
	useEffect(() => {
		const handleEscClose = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};
		document.addEventListener('keydown', handleEscClose);
		return () => {
			document.removeEventListener('keydown', handleEscClose);
		};
	}, [onClose]);

	return ReactDOM.createPortal(
		<ModalOverlay onClick={onClose}>
			<div className={s.modal_content} onClick={(e) => e.stopPropagation()}>
				<div className={s.modal_header}>
					{title && (
						<h2
							className={'text text_type_main-large'}
						>
							{title}
						</h2>
					)}
					<span className={s.button_container}>
						<CloseIcon type='primary' onClick={onClose} />
					</span>
				</div>
				{children}
			</div>
		</ModalOverlay>,
		document.getElementById('root-modal') as HTMLElement
	);
};
