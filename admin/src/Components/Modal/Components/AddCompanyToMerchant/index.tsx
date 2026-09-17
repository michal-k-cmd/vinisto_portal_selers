import { useCallback, useContext } from 'react';
import { Form } from 'react-final-form';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { Button } from 'react-bootstrap';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import AutocompleteB2bCustomer, {
	useAutocompleteCompanies,
} from 'Components/AutocompleteB2bCustomer';

import api from '@/api';
import {
	VinistoHelperDllEnumsUserCompanyCompanyUserRights,
	VinistoHelperDllEnumsUserUserState,
} from '@/api-types/user-api';

interface AddMerchantToCompanyFormvalues {
	companyId: string;
	// right: VinistoHelperDllEnumsUserCompanyCompanyUserRights;
}

const AddCompanyToMerchant = () => {
	const queryClient = useQueryClient();
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const { data, handleCloseModal } = useContext(ModalContext);
	const { merchantId, assignedCompanies, refetchCustomers } = data ?? {};

	const userQueryKey = ['user', merchantId];

	const assignCompanyToMerchantMutation = useMutation({
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
			handleShowSuccessNotification('admin.b2bCustomer.assign.success');
			queryClient.invalidateQueries(userQueryKey);
			refetchCustomers?.();
			handleCloseModal();
		},
		onError: () => {
			handleShowErrorNotification('admin.b2bCustomer.assign.error');
		},
	});

	const handleOnAssignCompany = (formValues: AddMerchantToCompanyFormvalues) =>
		assignCompanyToMerchantMutation.mutate({
			companyId: formValues.companyId,
			merchantId: merchantId,
			// right: formValues.right,
			right: VinistoHelperDllEnumsUserCompanyCompanyUserRights.Merchant,
			userLoginHash,
		});

	const { setSearch, companiesQuery, isCompaniesQueryEnabled } =
		useAutocompleteCompanies({
			userLoginHash,
			SearchByUserState: VinistoHelperDllEnumsUserUserState.Active,
		});

	const handleB2bCustomerInputChange = useCallback(
		(query: string) => {
			setSearch(query);
		},
		[setSearch]
	);

	return (
		<Form<AddMerchantToCompanyFormvalues>
			onSubmit={handleOnAssignCompany}
			render={({ handleSubmit, form }) => {
				return (
					<form onSubmit={handleSubmit}>
						<div className="mb-2">
							<AutocompleteB2bCustomer
								onChange={(companies = []) =>
									form.change('companyId', companies[0]?.value)
								}
								onInputChange={handleB2bCustomerInputChange}
								data={companiesQuery.data ?? []}
								isLoading={isCompaniesQueryEnabled && companiesQuery.isLoading}
								filterBy={(option) => !assignedCompanies.includes(option.value)}
							/>
						</div>
						{/*<InputRadio
              label="admin.b2bCustomer.right.label"
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
							{t({ id: 'admin.b2bCustomer.assign.label' })}
						</Button>
					</form>
				);
			}}
		></Form>
	);
};

export default AddCompanyToMerchant;
