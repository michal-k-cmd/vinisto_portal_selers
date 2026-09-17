import { Link } from 'react-router-dom';
import DeleteIcon from 'Components/Icons/Delete';
import { confirmAlert } from 'react-confirm-alert';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import {
	useMutation,
	useQueryClient,
	UseQueryResult,
} from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { mapB2bCustomerToString } from 'Pages/UserDetail/helpers';

import { VinistoAuthDllModelsApiUserCompany } from '@/api-types/user-api';
import api from '@/api';

const CompanyList = ({
	companies,
	merchantId,
	b2bCustomersQuery,
}: {
	companies: string[] | null | undefined;
	merchantId: string;
	b2bCustomersQuery: UseQueryResult<
		VinistoAuthDllModelsApiUserCompany[],
		unknown
	>;
}) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const queryClient = useQueryClient();
	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);

	const userQueryKey = ['user', merchantId];

	const unAssignCompanyMutation = useMutation({
		mutationFn: (params: { companyId: string }) =>
			api.patch(
				`user-api/companies/${params.companyId}/remove-merchant`,
				undefined,
				{
					merchantId,
					userLoginHash,
				}
			),
		onSuccess: () => {
			handleShowSuccessNotification('admin.b2bCustomer.unAssign.success');
			queryClient.invalidateQueries(userQueryKey);
			b2bCustomersQuery.refetch();
		},
		onError: () => {
			handleShowErrorNotification('admin.b2bCustomer.unAssign.error');
		},
	});

	const handleUnAssignCompany = (company: VinistoAuthDllModelsApiUserCompany) =>
		confirmAlert({
			title: `${t({
				id: 'admin.b2bCustomer.unAssign.label',
			})}`,
			message: `${t(
				{
					id: 'admin.b2bCustomer.unAssign.message',
				},
				{
					merchant: `${company.billingAddress?.name}`,
				}
			)}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.yes',
					})}`,
					onClick: () =>
						unAssignCompanyMutation.mutate({ companyId: company.id }),
				},
				{
					label: `${t({
						id: 'admin.no',
					})}`,
					onClick: () => null,
				},
			],
		});

	const companiesDetails =
		companies
			?.map((company) =>
				b2bCustomersQuery.data?.find(
					(companyDetail) => companyDetail.id === company
				)
			)
			.filter((detail) => detail != undefined) ?? [];

	return (
		<ul className="bundle-detail__list mt-1 mb-2">
			{companiesDetails.map((company) => (
				<li
					key={company.id}
					className="d-flex gap-1 align-items-center"
				>
					<Link to={`/b2b-customer-detail/${company.id}`}>
						{mapB2bCustomerToString(company)}
					</Link>
					<button
						className="btn py-0 px-1"
						onClick={() => handleUnAssignCompany(company)}
					>
						<DeleteIcon />
					</button>
				</li>
			))}
		</ul>
	);
};

export default CompanyList;
