import { useContext } from 'react';
import cx from 'classnames';
import { CREATE_USER_ADDRESS } from 'Components/Modal/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	VinistoAuthDllModelsApiAddressAddress,
	VinistoAuthDllModelsApiAddressUserAddressCreateParameters,
	VinistoAuthDllModelsApiAddressUserAddressEditParameters,
} from 'vinisto_api_client/src/api-types/user-api/';
import { MdAdd } from 'react-icons/md';
import { ModalContext } from 'Components/Modal/context';
import { UseMutationResult } from '@tanstack/react-query';
import Detail from 'Components/Detail';
import { CButton } from '@coreui/react';

import AddressListItem from '../AddressListItem';

import './styles.css';

import styles from './styles.module.css';

interface AddressListProps {
	userAddresses: VinistoAuthDllModelsApiAddressAddress[];
	createUserAddressMutation: UseMutationResult<
		void,
		unknown,
		VinistoAuthDllModelsApiAddressUserAddressCreateParameters,
		unknown
	>;
	deleteUserAddressMutation: UseMutationResult<void, unknown, string, unknown>;
	updateUserAddressMutation: UseMutationResult<
		void,
		unknown,
		{
			addressId: string;
			request: VinistoAuthDllModelsApiAddressUserAddressEditParameters;
		},
		unknown
	>;
}

const AddressList = ({
	userAddresses,
	createUserAddressMutation,
	deleteUserAddressMutation,
	updateUserAddressMutation,
}: AddressListProps) => {
	const modalContext = useContext(ModalContext);
	const t = useContext(LocalizationContext).useFormatMessage();

	const handleOnCreateAddress = () => {
		modalContext.handleOpenModal(CREATE_USER_ADDRESS, {
			createUserAddressMutation,
		});
	};

	return (
		<Detail.Container
			style={{
				overflowX: 'auto',
				width: '100%',
				display: 'flex',
			}}
		>
			<Detail.Heading
				value={`${t({ id: 'admin.userDetail.addresses.label' })}`}
			/>
			<Detail.Columns className="gap-3">
				{userAddresses.length > 0 &&
					userAddresses.map((userAddress, key) => {
						return (
							<div
								className={styles.addressWrap}
								key={`useraddress-${key}`}
							>
								<AddressListItem
									userAddress={userAddress}
									deleteUserAddressMutation={deleteUserAddressMutation}
									updateUserAddressMutation={updateUserAddressMutation}
								/>
							</div>
						);
					})}
				<div className={styles.addressWrap}>
					<div className={styles.actionWrap}>
						<CButton
							color="primary"
							onClick={handleOnCreateAddress}
							className={cx(
								'px-3 m-4 admin-action-button',
								styles.actionButton
							)}
							type="button"
						>
							<MdAdd className="action-button-icon" />
							{t({ id: 'admin.btn.createUserAddress' })}
						</CButton>
					</div>
				</div>
			</Detail.Columns>
		</Detail.Container>
	);
};

export default AddressList;
