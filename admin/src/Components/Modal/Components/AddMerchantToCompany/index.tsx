import { useContext } from 'react';
import { Form } from 'react-final-form';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { Button } from 'react-bootstrap';
import useGetMerchants from 'Hooks/Queries/useGetMerchants';
import { InputSelect } from 'Components/Form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';

import api from '@/api';
import {
	VinistoAuthDllModelsApiUserCompanyUser,
	VinistoHelperDllEnumsUserCompanyCompanyUserRights,
} from '@/api-types/user-api';

interface AddMerchantToCompanyFormvalues {
	merchantId: string;
	// right: VinistoHelperDllEnumsUserCompanyCompanyUserRights;
}

const AddMerchantToCompany = () => {
	const queryClient = useQueryClient();
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const { data, handleCloseModal } = useContext(ModalContext);
	const { companyId, assignedMerchants } = data ?? {};

	const userQueryKey = ['user', companyId];

	const assignedMerchantsIds = (
		assignedMerchants as VinistoAuthDllModelsApiUserCompanyUser[]
	).map((merchant) => merchant.userId);

	const merchantsQuery = useGetMerchants({ userLoginHash });

	const merchantOptions = merchantsQuery.data
		?.filter((merchant) => !assignedMerchantsIds.includes(merchant.id))
		.map((merchant) => {
			const merchantUserName = `${merchant.firstName} ${merchant.surname}`;

			return {
				label: merchantUserName,
				value: merchant.id,
			};
		});

	const assignMerchantToCompanyMutation = useMutation({
		mutationFn: (params: {
			companyId: string;
			merchantId: string;
			right: VinistoHelperDllEnumsUserCompanyCompanyUserRights;
			userLoginHash: string;
		}) => {
			const { companyId, merchantId, right, userLoginHash } = params;
			return api.patch(
				`user-api/companies/${companyId}/add-merchant`,
				undefined,
				{
					merchantId,
					right,
					userLoginHash,
				}
			);
		},
		onSuccess: () => {
			handleShowSuccessNotification('admin.merchant.assign.success');
			queryClient.invalidateQueries(userQueryKey);
			handleCloseModal();
		},
		onError: () => {
			handleShowErrorNotification('admin.merchant.assign.error');
		},
	});

	const handleOnAssignMerchant = (formValues: AddMerchantToCompanyFormvalues) =>
		assignMerchantToCompanyMutation.mutate({
			companyId,
			merchantId: formValues.merchantId,
			// right: formValues.right,
			right: VinistoHelperDllEnumsUserCompanyCompanyUserRights.Merchant,
			userLoginHash,
		});

	return (
		<Form<AddMerchantToCompanyFormvalues>
			onSubmit={handleOnAssignMerchant}
			render={({ handleSubmit }) => {
				return (
					<form onSubmit={handleSubmit}>
						<InputSelect
							label="admin.merchant.merchantId.label"
							name="merchantId"
							identifier="merchantId"
							options={merchantOptions}
						/>
						{/*<InputRadio
							label="admin.merchant.right.label"
							className="mb-3"
							name="right"
							options={Object.values(
								VinistoHelperDllEnumsUserCompanyCompanyUserRights
							).map((value) => ({
								value,
								label: value,
							}))}
							renderLabel={({ option, index }) => (
								<label
									htmlFor={`right-${index}`}
									className="ms-1 me-2"
								>
									{option.label}
								</label>
							)}
						/>*/}

						<Button type="submit">
							{t({ id: 'admin.merchant.assign.label' })}
						</Button>
					</form>
				);
			}}
		></Form>
	);
};

export default AddMerchantToCompany;
