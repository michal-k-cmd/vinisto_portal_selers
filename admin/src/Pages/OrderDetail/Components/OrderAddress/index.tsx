import { useContext } from 'react';
import cx from 'classnames';
import { FaFileInvoice } from 'react-icons/fa';
import useFormatMessage from 'Hooks/useFormatMessage';
import { MdOutlineEdit } from 'react-icons/md';
import { ModalContext } from 'Components/Modal/context';
import { DeviceServiceContext } from 'Services/DeviceService';
import { OrderAddressModalData } from 'Components/Forms/interfaces';
import { ORDER_ADDRESS } from 'Components/Modal/constants';
import {
	BANK_ACCOUNT_CODE_SEPRATOR,
	BANK_ACCOUNT_PREFIX_SEPRATOR,
} from 'Components/Form/Components/BankAccount/constants';

import type { OrderAddressProps } from './interfaces';
import { OrderAddressType } from './constants';

const OrderAddress = ({
	shippingAddress,
	billingAddress,
	icon,
	isStateCreated = false,
	type,
	orderId,
	handleEditAddressesInOrder,
}: OrderAddressProps) => {
	const t = useFormatMessage();
	const { isMobile } = useContext(DeviceServiceContext);

	const renderedAddress =
		type === OrderAddressType.SHIPPING ? shippingAddress : billingAddress;
	const {
		accountNumber,
		bankCode,
		city,
		countryCode,
		dic,
		email,
		houseNumber,
		ico,
		landRegistryNumber,
		name,
		phone,
		street,
		surname,
		title,
		zip,
	} = renderedAddress;

	const modalContext = useContext(ModalContext);

	const accountNumberWithBankCode =
		accountNumber &&
		accountNumber?.replaceAll(' ', '') !==
			`${BANK_ACCOUNT_PREFIX_SEPRATOR}${BANK_ACCOUNT_CODE_SEPRATOR}`
			? `${accountNumber} ${BANK_ACCOUNT_CODE_SEPRATOR} ${bankCode}`
			: null;

	const Icon = icon;

	const handleClickEdit = () => {
		const modalData: OrderAddressModalData = {
			orderId,
			orderAddressType: type,
			shippingAddress: shippingAddress ?? '',
			billingAddress: billingAddress ?? '',
			handleEditAddressesInOrder: handleEditAddressesInOrder,
		};
		modalContext.handleOpenModal(ORDER_ADDRESS, modalData);
	};

	return (
		<div className={cx('admin-item-list__container', { 'm-0': isMobile })}>
			<div className={`admin-item ${isMobile ? 'w-100' : ''}`}>
				<div className="admin-item__top-panel">
					<div className="admin-item__icon">
						{Icon ? Icon : <FaFileInvoice />}
					</div>
					<span className="admin-item__title">
						{title ?? t({ id: 'admin.supplierDetail.title.noValue' })}
					</span>
					<div>
						{isStateCreated && (
							<MdOutlineEdit
								className="admin-item__icon admin-item__icon--btn"
								role="button"
								onClick={handleClickEdit}
							/>
						)}
					</div>
				</div>
				<dl className="admin-item__specs">
					<dt>{t({ id: 'admin.userDetail.firstname.label' })} </dt>
					<dd>{name}</dd>
					<dt>{t({ id: 'admin.userDetail.surname.label' })} </dt>
					<dd>{surname}</dd>
					<dt>{t({ id: 'admin.userDetail.city.label' })} </dt>
					<dd>{city}</dd>
					<dt>{t({ id: 'admin.userDetail.street.label' })} </dt>
					<dd>
						{`${street ? street : ''}${
							landRegistryNumber ? ` ${landRegistryNumber}` : ''
						}${houseNumber ? `/${houseNumber}` : ''}`}
					</dd>
					<dt>{t({ id: 'admin.userDetail.zip.label' })} </dt>
					<dd>{zip}</dd>
					<dt>{t({ id: 'admin.userDetail.countryCode.label' })} </dt>
					<dd>{countryCode}</dd>
					<dt>{t({ id: 'admin.userDetail.phone.label' })} </dt>
					<dd>{phone}</dd>
					<dt>{t({ id: 'admin.userDetail.email.label' })} </dt>
					<dd>{email || '-'}</dd>

					{ico && (
						<>
							<dt>{t({ id: 'admin.userDetail.ico.label' })} </dt>
							<dd>{ico || '-'}</dd>
						</>
					)}
					{dic && (
						<>
							<dt>{t({ id: 'admin.userDetail.dic.label' })} </dt>
							<dd>{dic || '-'}</dd>
						</>
					)}
					{accountNumberWithBankCode !== null && (
						<>
							<dt>{t({ id: 'admin.userDetail.accountNumber.label' })} </dt>
							<dd>{accountNumberWithBankCode || '-'}</dd>
						</>
					)}
				</dl>
			</div>
		</div>
	);
};

export default OrderAddress;
