import { useContext, useRef } from 'react';
import { CCol, CContainer, CForm, CRow } from '@coreui/react';
import { Form } from 'react-final-form';
import { Banner } from 'Services/Banner/interfaces';
import { BannerListTableRow } from 'Pages/BannerList/interfaces';
import {
	IPageListState,
	IPageListStateReducerAction,
} from 'Hooks/useAdminTable/interfaces';
import { PageListAction } from 'Hooks/useAdminTable/constants';
import BannerService from 'Services/Banner';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { InputTimePicker, SubmitButton } from 'Components/Form';

import { DEFAULT_LANGUAGE } from './constants';
import { BannerFormValues } from './interfaces';

/**
 * @category Component Edit Banner Validity Modal
 */
const EditBannerValidityModal = () => {
	const modalContext = useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);

	const form = useRef<HTMLFormElement>(null);
	const banner: Banner = modalContext.data?.banner;

	const { selectedIds, state, dispatch } = modalContext.data as {
		selectedIds: string[];
		state: IPageListState<BannerListTableRow>;
		dispatch: (value: IPageListStateReducerAction<BannerListTableRow>) => void;
	};

	const handleOnSubmit = (formValues: BannerFormValues) => {
		const editPromises = selectedIds.map((id) => {
			const banner = state.data.find((item) => item.id === id);
			if (!banner) return;

			const updatedBannerData = {
				...banner,
				validFrom: formValues.validFrom,
				validTo: formValues.validTo,
				image: undefined as never,
			};

			return BannerService.update(
				banner,
				updatedBannerData,
				DEFAULT_LANGUAGE,
				authenticationContext.vinistoUser.loginHash,
				notificationsContext
			);
		});

		Promise.all(editPromises)
			.then(() => {
				notificationsContext.handleShowSuccessNotification(
					'admin.bannerList.batchEditValiditySuccess'
				);

				dispatch({ type: PageListAction.setShouldReload, value: true });

				modalContext.handleCloseModal();
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.bannerList.batchEditValidityError'
				);
			});
	};

	return (
		<Form<BannerFormValues>
			onSubmit={handleOnSubmit}
			initialValues={{
				validFrom: banner?.validFrom,
				validTo: banner?.validTo,
			}}
			render={({ handleSubmit, pristine, valid, submitting }) => {
				return (
					<CContainer>
						<CForm
							onSubmit={handleSubmit}
							ref={form}
						>
							<CRow>
								<CCol>
									<InputTimePicker
										name="validFrom"
										identifier="validFrom"
										label="admin.modal.banner.validFrom.label"
									/>
								</CCol>
								<CCol>
									<InputTimePicker
										name="validTo"
										identifier="validTo"
										label="admin.modal.banner.validTo.label"
									/>
								</CCol>
							</CRow>
							<div className="mt-3">
								<SubmitButton
									valid={valid}
									pristine={pristine}
									submitting={submitting}
									submitText={'admin.modal.banner.edit.label'}
								/>
							</div>
						</CForm>
					</CContainer>
				);
			}}
		/>
	);
};

export default EditBannerValidityModal;
