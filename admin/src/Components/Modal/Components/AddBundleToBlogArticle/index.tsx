import { FC, useCallback, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-final-form';
import { CForm } from '@coreui/react';
import { LocalizationContext } from 'Services/LocalizationService';
import BundleService from 'Services/Bundle';
import { BlogArticleDetailAction } from 'Pages/BlogArticleDetail/constants';
import useAutocompleteBundles from 'Hooks/useAutocompleteBundles';
import BundleOption from 'Components/Form/Components/AutocompleteBundle/BundleOption';
import AutocompleteBundle from 'Components/Form/Components/AutocompleteBundle';
import { ModalContext } from 'Components/Modal/context';
import { Input, Validators } from 'Components/Form';
import { AutocompleteBundleOption } from 'Components/Form/Components/AutocompleteBundle/interfaces';
import { NotificationsContext } from 'Services/NotificationService';

import {
	AddBundleToBlogArticleFormValues,
	AddBundleToBlogArticleModalData,
} from './interfaces';

const AddBundleToBlogArticleModal: FC = () => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	const { bundles, dispatch } =
		modalContext.data as AddBundleToBlogArticleModalData;

	const t = useFormatMessage();

	const { autocompleteOptions, handleOnSearch } = useAutocompleteBundles({
		alreadyUsedBundleIds: bundles?.map((bundle) => bundle.bundleId) ?? [],
	});

	const handleOnSubmit = useCallback(
		async (formValues: AddBundleToBlogArticleFormValues) => {
			if (
				!Array.isArray(formValues.bundleName) ||
				formValues.bundleName.length === 0
			)
				return;
			try {
				const bundleId = formValues.bundleName[0].value;
				if (bundles?.some((bundle) => bundle.bundleId === bundleId)) return;

				const bundleDetail = await BundleService.getBundleById(bundleId);
				if (!bundleDetail) throw new Error();

				dispatch([
					BlogArticleDetailAction.addBundle,
					{
						bundle: {
							bundleId,
							order: formValues.order,
						},
						bundleDetail,
					},
				]);

				handleShowSuccessNotification(
					'admin.modal.cms.article.products.add.success'
				);
				modalContext.handleCloseModal();
			} catch {
				handleShowErrorNotification(
					'admin.modal.cms.article.products.add.error'
				);
			}
		},
		[
			bundles,
			dispatch,
			modalContext,
			handleShowSuccessNotification,
			handleShowErrorNotification,
		]
	);

	const renderOption = useCallback((option: AutocompleteBundleOption) => {
		return (
			<BundleOption
				bundle={option?.bundle}
				label={option?.label}
			/>
		);
	}, []);

	return (
		<Form<AddBundleToBlogArticleFormValues>
			onSubmit={handleOnSubmit}
			render={({ handleSubmit, submitting }) => (
				<CForm onSubmit={handleSubmit}>
					<AutocompleteBundle
						label="admin.modal.cms.article.products.autocomplete.label"
						placeholder="admin.modal.cms.article.products.autocomplete.placeholder"
						labelKey="label"
						name="bundleName"
						identifier="bundleName"
						onSearchCallback={handleOnSearch}
						options={autocompleteOptions}
						validate={Validators.required}
						renderOption={renderOption}
					/>
					<Input
						name="order"
						type="number"
						identifier="order"
						label="admin.modal.cms.article.products.order.label"
						validate={Validators.required}
					/>
					<Button
						type="submit"
						disabled={submitting}
					>
						{t({ id: 'admin.modal.cms.article.products.add.submit' })}
					</Button>
				</CForm>
			)}
		/>
	);
};

export default AddBundleToBlogArticleModal;
