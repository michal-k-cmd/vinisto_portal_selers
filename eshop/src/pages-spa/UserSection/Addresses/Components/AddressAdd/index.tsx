import { lazy, Suspense, useContext } from 'react';
import { ADDRESS_DELIVERY_MODAL_TYPE } from 'Components/Modal/Components/AddressDelivery/constants';
import { ADDRESS_INVOICE_MODAL_TYPE } from 'Components/Modal/Components/AddressInvoice/constants';
import {
	ADDRESS_DELIVERY_MODAL,
	ADDRESS_INVOICE_MODAL,
} from 'Components/Modal/constants';
import { ModalContext } from 'Components/Modal/context';
import { LocalizationContext } from 'Services/LocalizationService';
import Loader from 'Components/View/Loader';
const PlusIcon = lazy(() => import('Components/Icons/PlusIcon'));
import cx from 'classnames';

import { IAddressAddProps } from './interfaces';
import { DELIVERY_ELEMENT_TYPE, INVOICE_ELEMENT_TYPE } from './constants';
import styles from './styles.module.css';

const AddressAdd = ({
	elementType,
	handleOnCreate,
	className,
}: IAddressAddProps) => {
	const modalContext = useContext(ModalContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnAddAddress = (
		event:
			| React.MouseEvent<HTMLButtonElement>
			| React.KeyboardEvent<HTMLButtonElement>
	) => {
		event.preventDefault();

		if (elementType === INVOICE_ELEMENT_TYPE) {
			modalContext.handleOpenModal(ADDRESS_INVOICE_MODAL, {
				modalType: ADDRESS_INVOICE_MODAL_TYPE.NEW,
				onCreateCallback: handleOnCreate,
			});
		} else if (elementType === DELIVERY_ELEMENT_TYPE) {
			modalContext.handleOpenModal(ADDRESS_DELIVERY_MODAL, {
				modalType: ADDRESS_DELIVERY_MODAL_TYPE.NEW,
				onCreateCallback: handleOnCreate,
			});
		}
	};

	return (
		<button
			className={cx(styles.addAddress, className)}
			onClick={handleOnAddAddress}
			onKeyDown={handleOnAddAddress}
			tabIndex={0}
		>
			<div className={styles.addAddressButton}>
				<Suspense fallback={<Loader blank />}>
					<div className={styles.addAddressIconWrap}>
						<PlusIcon className={styles.addAddressIcon} />
					</div>
				</Suspense>
				<span className={styles.addAddressText}>
					{elementType === INVOICE_ELEMENT_TYPE &&
						t({ id: 'address.addInvoiceType.label' })}
					{elementType === DELIVERY_ELEMENT_TYPE &&
						t({ id: 'address.addDeliveryType.label' })}
				</span>
			</div>
		</button>
	);
};

export default AddressAdd;
