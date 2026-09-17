import { useContext } from 'react';
import cx from 'classnames';
import {
	VinistoAuthDllModelsApiBillingInfoBillingInfo,
	VinistoAuthDllModelsApiBillingInfoUserBillingInfoCreateParameters,
	VinistoAuthDllModelsApiBillingInfoUserBillingInfoEditParameters,
} from 'vinisto_api_client/src/api-types/user-api/';
import { CREATE_USER_BILLING_INFO } from 'Components/Modal/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import { MdAdd } from 'react-icons/md';
import { CButton } from '@coreui/react';
import { UseMutationResult } from '@tanstack/react-query';
import Detail from 'Components/Detail';

import './styles.css';

import styles from '../AddressList/styles.module.css';
import BillingInfoListItem from '../BillingInfoListItem';

interface BillingInfoListProps {
	billingAddresses: VinistoAuthDllModelsApiBillingInfoBillingInfo[];
	createUserBillingAddressMutation: UseMutationResult<
		void,
		unknown,
		VinistoAuthDllModelsApiBillingInfoUserBillingInfoCreateParameters,
		unknown
	>;
	deleteUserBillingAddressMutation: UseMutationResult<
		void,
		unknown,
		string,
		unknown
	>;
	updateUserBillingAddressMutation: UseMutationResult<
		void,
		unknown,
		{
			billingInfoId: string;
			request: VinistoAuthDllModelsApiBillingInfoUserBillingInfoEditParameters;
		},
		unknown
	>;
}

const BillingInfoList = ({
	billingAddresses,
	createUserBillingAddressMutation,
	deleteUserBillingAddressMutation,
	updateUserBillingAddressMutation,
}: BillingInfoListProps) => {
	const modalContext = useContext(ModalContext);
	const t = useContext(LocalizationContext).useFormatMessage();

	const handleOnCreateAddress = () => {
		modalContext.handleOpenModal(CREATE_USER_BILLING_INFO, {
			createUserBillingAddressMutation,
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
				value={`${t({ id: 'admin.userDetail.billingInfo.label' })}`}
			/>
			<Detail.Columns className="gap-3">
				{billingAddresses.length > 0 &&
					billingAddresses.map((billingAddress, key) => {
						return (
							<div
								className={styles.addressWrap}
								key={`userBillingAddress-${key}`}
							>
								<BillingInfoListItem
									billingAddress={billingAddress}
									deleteUserBillingAddressMutation={
										deleteUserBillingAddressMutation
									}
									updateUserBillingAddressMutation={
										updateUserBillingAddressMutation
									}
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
							{t({ id: 'admin.btn.createUserBillingInfo' })}
						</CButton>
					</div>
				</div>
			</Detail.Columns>
		</Detail.Container>
	);
};

export default BillingInfoList;
