import { Modal } from 'Components/Modal';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';

import { CRUD_MODE } from '../constants';

import './styles.css';

interface CreateOrUpdateDiscountCouponModalProps {
	handleClose: () => void;
	isOpen: boolean;
	mode: keyof typeof CRUD_MODE;
	discountCouponId?: string;
	children: React.ReactNode;
}

const CreateOrUpdateDiscountCouponModal = ({
	handleClose,
	isOpen,
	mode,
	children,
}: CreateOrUpdateDiscountCouponModalProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<Modal
			handleClose={handleClose}
			show={isOpen}
			title={
				mode === CRUD_MODE.CREATE
					? t({ id: 'discountCoupons.create.title' })
					: t({ id: 'discountCoupons.update.title' })
			}
			dialogClassName="modal-dialog--discount-coupon"
			onEscapeKeyDown={handleClose}
		>
			{children}
		</Modal>
	);
};

export default CreateOrUpdateDiscountCouponModal;
