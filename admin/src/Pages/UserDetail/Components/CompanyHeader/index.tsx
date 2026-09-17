import Detail from 'Components/Detail';
import StatusBadge from 'Components/StatusBadge';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { dayjsInstance as dayjs } from 'Services/Date';
import EditIcon from 'Components/Icons/Edit';
import { confirmAlert } from 'react-confirm-alert';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { useQueryClient } from '@tanstack/react-query';

import CredibilityWarning from '../CredibilityWarning';

import CompanyAvatarContainer from './CompanyAvatarContainer';

import {
	VinistoAuthDllModelsApiUserCompany,
	VinistoHelperDllEnumsUserUserState,
} from '@/api-types/user-api';
import api from '@/api';

const CompanyHeader = ({
	company,
}: {
	company: VinistoAuthDllModelsApiUserCompany;
}) => {
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	const queryClient = useQueryClient();
	const userQueryKey = ['user', company.id];

	const handleToggleActiveState = () => {
		const isActive =
			company.state === VinistoHelperDllEnumsUserUserState.Active;

		confirmAlert({
			title: `${t({
				id: isActive
					? 'admin.b2bCustomer.deactivate.title'
					: 'admin.b2bCustomer.activate.title',
			})}`,
			message: `${t({
				id: isActive
					? 'admin.b2bCustomer.deactivate.message'
					: 'admin.b2bCustomer.activate.message',
			})}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.confirm.logOut.yes',
					})}`,
					onClick: () =>
						api
							.patch(
								`user-api/companies/${company.id}/${
									isActive ? 'deactivate' : 'activate'
								}`,
								undefined,
								{ userLoginHash }
							)
							.then(() => {
								handleShowSuccessNotification(
									isActive
										? 'admin.b2bCustomer.deactivate.success'
										: 'admin.b2bCustomer.activate.success'
								);
								queryClient.invalidateQueries(userQueryKey);
							})
							.catch(() => {
								handleShowErrorNotification(
									isActive
										? 'admin.b2bCustomer.deactivate.error'
										: 'admin.b2bCustomer.activate.error'
								);
							}),
				},
				{
					label: `${t({
						id: 'admin.confirm.logOut.no',
					})}`,
					onClick: () => null,
				},
			],
		});
	};

	const ico = company.ico || company.billingAddress?.ico;
	const dic = company.validationData?.dic || company.billingAddress?.dic;

	return (
		<Detail.Container>
			<div className="d-flex justify-content-between align-items-center gap-3">
				{'billingAddress' in company && company.billingAddress && (
					<div>
						<div className="d-flex align-items-center gap-3 mb-2">
							<CompanyAvatarContainer b2bCustomer={company} />
							<h1 className="fs-3 mb-0">{company.billingAddress.company}</h1>
						</div>

						<h2 className="fs-6 fw-light">{`${t({
							id: 'admin.b2bCustomer.ico.label',
						})} ${ico} ${
							dic ? `| ${t({ id: 'admin.b2bCustomer.dic.label' })} ${dic}` : ''
						} | ${t({
							id: 'admin.b2bCustomer.customerSince.label',
						})}: ${dayjs
							.unix(company.createdAt ?? 0)
							.format(`${t({ id: 'admin.dateFormat' })}`)}`}</h2>
					</div>
				)}

				{company.state && (
					<div className="d-flex align-items-center gap-1">
						<StatusBadge status={company.state}>
							{t({ id: `admin.b2bCustomer.state.${company.state}` })}
						</StatusBadge>
						<button
							className={'btn p-2 d-flex align-items-center'}
							onClick={handleToggleActiveState}
						>
							<EditIcon />
						</button>
					</div>
				)}
			</div>
			<CredibilityWarning b2bCustomer={company} />
		</Detail.Container>
	);
};

export default CompanyHeader;
