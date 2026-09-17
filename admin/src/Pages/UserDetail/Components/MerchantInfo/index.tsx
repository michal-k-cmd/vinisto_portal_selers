import Detail from 'Components/Detail';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import EditIcon from 'Components/Icons/Edit';
import { ModalContext } from 'Components/Modal/context';
import {
	ADD_COMPANY_TO_MERCHANT,
	EDIT_MERCHANT,
} from 'Components/Modal/constants';
import { dayjsInstance as dayjs } from 'vinisto_shared';
import { ActionTypes } from 'Constants/actionTypes';
import { Button } from 'react-bootstrap';
import useGetCompanies from 'Hooks/Queries/useGetCompanies';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import CompanyList from '../CompanyList';

import { VinistoAuthDllModelsApiUserMerchant } from '@/api-types/user-api';

interface MerchantInfoProps {
	merchant: VinistoAuthDllModelsApiUserMerchant;
}

const MerchantInfo = ({ merchant }: MerchantInfoProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const modalContext = useContext(ModalContext);

	const dateFormat = `${t({ id: 'admin.dateFormat' })}`;

	const b2bCustomersQuery = useGetCompanies({
		userLoginHash,
		params: {
			SearchCompaniesByMerchantId: merchant.id,
		},
	});

	const handleAddCompany = () => {
		const modalData = {
			merchantId: merchant.id,
			assignedCompanies: merchant.companies,
			refetchCustomers: b2bCustomersQuery.refetch,
		};
		modalContext.handleOpenModal(ADD_COMPANY_TO_MERCHANT, modalData);
	};

	return (
		<Detail.Container>
			<div>
				<Detail.Heading className="d-flex gap-2 align-items-center">
					{t({ id: 'admin.merchant.businessInfo.title' })}
					<EditIcon
						onClick={() =>
							modalContext.handleOpenModal(EDIT_MERCHANT, {
								merchant,
								mode: ActionTypes.EDIT,
							})
						}
						className="bundle-detail__btn"
					/>
				</Detail.Heading>
			</div>
			<Detail.Columns>
				<Detail.InfoWithLabel
					label="Provize"
					value={`${merchant.feePercentage} %`}
				/>
				<Detail.InfoWithLabel
					label="Datum nástupu"
					value={
						merchant?.startDate
							? dayjs.unix(merchant.startDate).format(dateFormat)
							: null
					}
				/>
			</Detail.Columns>
			<Detail.Heading>
				{t({ id: 'admin.merchant.permissions.title' })}
			</Detail.Heading>
			<ul>
				{merchant.merchantRights?.map((permission) => (
					<li key={permission}>
						<strong>
							{t({ id: `admin.merchant.permissions.${permission}.label` })}
						</strong>
						<br />
						<small>
							{t({ id: `admin.merchant.permissions.${permission}.legend` })}
						</small>
					</li>
				))}
			</ul>

			<Detail.Heading>
				{t({ id: 'admin.merchant.internalNote.label' })}
			</Detail.Heading>
			<Detail.InfoWithLabel
				value={merchant.internalNote ?? '-'}
				className="mb-3"
			/>

			<Detail.Heading>B2B zákazníci</Detail.Heading>
			<CompanyList
				merchantId={merchant.id}
				companies={merchant.companies}
				b2bCustomersQuery={b2bCustomersQuery}
			/>
			<Button
				size="sm"
				onClick={handleAddCompany}
			>
				{t({ id: 'admin.b2bCustomer.assign.label' })}
			</Button>
		</Detail.Container>
	);
};

export default MerchantInfo;
