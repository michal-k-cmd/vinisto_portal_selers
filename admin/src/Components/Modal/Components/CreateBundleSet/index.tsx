import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-final-form';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import {
	Input,
	InputMultiselect,
	InputNumber,
	InputTextArea,
	LanguageSelect,
	RichTextEditor,
	Validators,
} from 'Components/Form';
import { CFormLabel } from '@coreui/react';
import parseCsvToArray from 'Helpers/parse-csv-to-array';
import { Button } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query';
import { IntegrationContext } from 'Services/IntergationService';

import BundleService from '@/product-service/bundle';
import { VinistoHelperDllEnumsLanguage } from '@/api-types/user-api';
import { VinistoHelperDllEnumsCountryCode } from '@/api-types/product-api';

interface Platform {
	value: string;
	label: string;
}

interface CreateBundleSetFormValues {
	language: VinistoHelperDllEnumsLanguage;
	name: string;
	metaDescription: string;
	shortDescription: string;
	keywords: string;
	text: string;
	description: string;
	url: string;
	scoringAdmin: number;
	availableOnPlatforms: Platform[];
}

const CreateBundleSetModal = () => {
	const modalContext = useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const notificationsContext = useContext(NotificationsContext);
	const { integrations } = useContext(IntegrationContext);
	const navigate = useNavigate();

	const t = localizationContext.useFormatMessage();

	const createBundleSetMutation = useMutation(BundleService.createBundleSet, {
		onSuccess: (payload) => {
			modalContext.handleCloseModal();
			notificationsContext.handleShowSuccessNotification(
				'admin.createBundle.success'
			);
			if (payload?.bundle?.id) {
				navigate(`/bundle-detail/${payload?.bundle?.id}`);
			} else {
				modalContext.data?.resetBundleList?.();
			}
			return payload;
		},
		onError: () => {
			notificationsContext.handleShowErrorNotification(
				'admin.createBundle.error'
			);
		},
	});

	const handleOnCreateBundleSet = (
		formValues: Partial<CreateBundleSetFormValues> = {}
	) => {
		const requestData = {
			userLoginHash: authenticationContext.vinistoUser.loginHash,
			isSet: true,
			language: formValues.language ?? VinistoHelperDllEnumsLanguage.CZECH,
			name: formValues.name ?? '',
			description: formValues.description ?? '',
			metaDescription: formValues.metaDescription ?? '',
			shortDescription: formValues.shortDescription ?? '',
			text: formValues.text ?? '',
			url: formValues.url?.trim() ?? null,
			scoringAdmin: formValues.scoringAdmin ?? 1,
			keywords: parseCsvToArray(formValues.keywords ?? ''),
			// TODO: get countryCode
			countryOfSale: VinistoHelperDllEnumsCountryCode.CZ,
			availableOnPlatforms: (formValues.availableOnPlatforms ?? []).map(
				(platform: Platform) => Number(platform.value)
			),
		};

		createBundleSetMutation.mutateAsync(requestData);
	};

	return (
		<div>
			<Form<CreateBundleSetFormValues>
				onSubmit={handleOnCreateBundleSet}
				submitText={'admin.modal.form.createBundle'}
				initialValues={{
					language: localizationContext.activeLanguageKey,
					scoringAdmin: 1,
				}}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<LanguageSelect
							name="language"
							identifier="language"
							disabled={true}
							validate={Validators.required}
						/>

						<Input
							name="name"
							identifier="name"
							label="admin.modal.form.naming"
							placeholder="admin.modal.form.naming"
							validate={Validators.required}
						/>

						<InputTextArea
							name="metaDescription"
							identifier="metaDescription"
							label="admin.modal.form.metaDescription"
							placeholder="admin.modal.form.metaDescription"
							rows={2}
						/>

						<InputTextArea
							name="shortDescription"
							identifier="shortDescription"
							label="admin.modal.form.shortDescription"
							placeholder="admin.modal.form.shortDescription"
							rows={2}
						/>

						<CFormLabel htmlFor="keywords">
							{t({ id: 'admin.modal.form.keywords.prompt' })}
						</CFormLabel>

						<InputTextArea
							name="keywords"
							identifier="keywords"
							label="admin.modal.form.keywords"
						/>

						<InputTextArea
							name="text"
							identifier="text"
							label="admin.modal.form.text"
							placeholder="admin.modal.form.text"
						/>

						<RichTextEditor
							name="description"
							identifier="description"
							label="admin.modal.form.description"
							validate={Validators.required}
						/>

						<Input
							type="text"
							name="url"
							identifier="url"
							label="admin.modal.form.url"
							placeholder="admin.modal.form.url"
						/>

						<InputMultiselect
							name="availableOnPlatforms"
							identifier="availableOnPlatforms"
							label="admin.modal.form.availableOnPlatforms.label"
							options={
								integrations?.map((platform) => ({
									value: `${platform.integrationId}`,
									label: `${platform.integrationName}`,
								})) ?? []
							}
							validate={Validators.required}
						/>

						<InputNumber
							name="scoringAdmin"
							identifier="scoringAdmin"
							label="admin.modal.form.scoringAdmin.label"
							min={1}
							max={50}
							validate={Validators.required}
						/>

						<div className="d-flex align-items-center justify-content-between">
							<Button type="submit">
								{t({ id: 'admin.bundleList.createBundleSet' })}
							</Button>
						</div>
					</form>
				)}
			/>
		</div>
	);
};
export default CreateBundleSetModal;
