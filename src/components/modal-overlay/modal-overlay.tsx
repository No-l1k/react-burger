import React from 'react';
import s from './modal-overlay.module.scss';

interface ModalOverlayProps {
	onClick: () => void;
	children: React.ReactNode;
}

export const ModalOverlay: React.FC<ModalOverlayProps> = ({
	onClick,
	children,
}) => {
	return (
		<div className={s.overlay} onClick={onClick}>
			{children}
		</div>
	);
};
