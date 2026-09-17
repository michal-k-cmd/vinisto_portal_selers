import {
	Form,
	Input,
	InputAutocomplete,
	InputNumber,
	InputTextArea,
	InputTimePicker,
	LanguageSelect,
	RichTextEditor,
	Validators,
} from 'Components/Form';
import { ModalContext } from 'Components/Modal/context';
import useLocalizedValue, { useLocalizedValues } from 'Hooks/useLocalizedValue';
import { JANUARY_FIRST_2038_IN_SECONDS } from 'Pages/BundleDetail/constants';
import { apiServiceInstance } from 'Services/ApiService';
import { VinistoProductDllModelsApiBundleBundleReturn } from 'vinisto_api_client/src/api-types/product-api/';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import BundleService from 'Services/Bundle';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import cx from 'classnames';
import { filter, get, includes, map } from 'Helpers/lodash';
import sanitizeHtml from 'sanitize-html';
import {
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { Button } from 'react-bootstrap';
import sortSuppliersByNameWeb from 'Helpers/sortSuppliersByNameWeb';
import { CFormLabel } from '@coreui/react';
import parseCsvToArray from 'Helpers/parse-csv-to-array';

import styles from './styles.module.css';

const EditBundleModal = () => {
	const { data, handleCloseModal } = useContext(ModalContext);
	const { vinistoUser } = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	const localizeArray = useLocalizedValues();

	const refetchBundleDetail = data?.refetchBundleDetail;
	const bundle = data?.bundle;

	const [autocompleteSuppliers, setAutocompleteSuppliers] = useState<
		Record<string, any>[]
	>([]);

	const getValueByLanguage = useLocalizedValue();

	const getTomorrowDate = useCallback(() => {
		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1);
		return tomorrow;
	}, []);

	const handleOnEditBundle = (formValues: Record<string, any>) => {
		apiServiceInstance
			.put<VinistoProductDllModelsApiBundleBundleReturn>(
				`product-api/bundles/${bundle?.id}/EditBundle`,
				{
					userLoginHash: vinistoUser.loginHash,
					language: formValues.language,
					name: sanitizeHtml(formValues.name, { allowedTags: [] }).trim(),
					description: formValues.description,
					metaDescription: formValues.metaDescription,
					shortDescription: formValues.shortDescription,
					text: formValues.text ?? '',
					url: formValues.url?.trim() ? formValues.url.trim() : null,
					supplier: formValues?.supplier?.[0]?.value,
					scoringAdmin: formValues?.scoringAdmin ?? 1,
					keywords: parseCsvToArray(formValues.keywords),
					piecesPerPackage: formValues?.piecesPerPackage,
					packagesOnPallet: formValues?.packagesOnPallet,
				}
			)
			.then(async () => {
				if (formValues.limit) {
					await BundleService.setOrderLimitation({
						bundleId: bundle?.id,
						limit: formValues.limit,
						from: formValues.validFrom,
						to: formValues.validTo,
						userLoginHash: vinistoUser.loginHash,
					});
				} else {
					return Promise.resolve();
				}
			})
			.then(() => {
				handleShowSuccessNotification('admin.editBundle.success');
				refetchBundleDetail();
				handleCloseModal();
			})
			.catch(() => {
				handleShowErrorNotification('admin.editBundle.error');
			});
	};

	const handleRemoveOrderLimitation = () => {
		BundleService.removeOrderLimitation({
			bundleId: bundle.id,
			userLoginHash: vinistoUser.loginHash,
		})
			.then(() => {
				handleShowSuccessNotification('admin.editBundle.success');
				refetchBundleDetail();
				handleCloseModal();
			})
			.catch(() => {
				handleShowErrorNotification('admin.editBundle.error');
			});
	};

	useEffect(() => {
		apiServiceInstance
			.getCollection(
				'supplier-api/suppliers',
				[
					{
						key: 'userLoginHash',
						value: vinistoUser.loginHash,
					},
					{ key: 'limit', value: 1 },
					{ key: 'offset', value: 0 },
				],
				true
			)
			.then((payload) => {
				apiServiceInstance
					.getCollection(
						'supplier-api/suppliers',
						[
							{
								key: 'userLoginHash',
								value: vinistoUser.loginHash,
							},
							{ key: 'limit', value: get(payload, 'count', 0) },
							{ key: 'offset', value: 0 },
						],
						true
					)
					.then((pay) => {
						let preparedCategories = map(
							get(pay, 'suppliers', []).sort(sortSuppliersByNameWeb),
							(supplier) => {
								return {
									value: get(supplier, 'id'),
									label: get(supplier, 'nameWeb', ''),
								};
							}
						);
						preparedCategories = filter(
							preparedCategories,
							(preparedCategory) => {
								const productCategoryIds: string[] = data?.suppliers ?? [];
								return !includes(
									productCategoryIds,
									get(preparedCategory, 'value')
								);
							}
						);
						setAutocompleteSuppliers(preparedCategories);
					});
			})
			.catch(() => {
				handleShowErrorNotification(
					'admin.modal.createBundle.supplier.autocomplete.error'
				);
				setAutocompleteSuppliers([]);
			});
	}, [vinistoUser.loginHash, data?.suppliers, handleShowErrorNotification]);

	return (
		<Form
			submitCallback={handleOnEditBundle}
			submitText={
				bundle.flags.isSet
					? 'admin.btn.editBundleSetDetails'
					: 'admin.modal.form.editBundle'
			}
			initializationValues={{
				language: localizationContext.activeLanguageKey,
				text: getValueByLanguage(bundle.text ?? []),
				name: getValueByLanguage(bundle.name ?? []),
				url: getValueByLanguage(bundle.url ?? []),
				description: getValueByLanguage(bundle.description ?? []),
				metaDescription: getValueByLanguage(bundle.metaDescription ?? []),
				shortDescription: getValueByLanguage(bundle.shortDescription ?? []),
				keywords: localizeArray(bundle.keywords ?? []).join(', '),
				scoringAdmin: bundle.scoringAdmin ?? 1,
				piecesPerPackage: bundle.piecesPerPackage ?? '',
				packagesOnPallet: bundle.packagesOnPallet ?? '',
				...(bundle.supplier?.id
					? {
							supplier: [
								{
									label: bundle.supplier.nameWeb ?? [],
									value: bundle.supplier.id ?? '',
								},
							],
					  }
					: ''),
				...(bundle.orderLimitation
					? {
							limit: bundle.orderLimitation?.limit,
							validFrom: bundle.orderLimitation?.validFrom.toDate(),
							validTo:
								bundle.orderLimitation?.validTo &&
								(Number(bundle.orderLimitation.validTo) ===
								JANUARY_FIRST_2038_IN_SECONDS
									? null
									: bundle.orderLimitation.validTo.toDate()),
					  }
					: {}),
			}}
			customValidationFunction={({ limit, validFrom, validTo }) => {
				const limitFields = {
					limit,
					validFrom,
					validTo,
				};

				if (
					(limitFields['limit'] && limitFields['validFrom']) ||
					(limitFields['limit'] === undefined &&
						limitFields['validFrom'] === undefined)
				)
					return {};

				const errors: Record<PropertyKey, ReactNode> = {};
				const errorMessage = t({
					id: 'admin.modal.form.orderLimitationLimit.validation.allOrNothing',
				});

				if (!limitFields['limit']) errors['limit'] = errorMessage;
				if (!limitFields['validFrom']) errors['validFrom'] = errorMessage;

				return errors;
			}}
		>
			<LanguageSelect
				name="language"
				identifier="language"
				disabled={true}
				validate={Validators.required}
			/>

			<Input
				name="name"
				identifier="name"
				label="admin.modal.form.name"
				placeholder="admin.modal.form.name"
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

			{!bundle.flags.isSet && (
				<InputAutocomplete
					options={autocompleteSuppliers}
					label="admin.modal.form.supplier"
					placeholder="admin.modal.form.findSupplier"
					labelKey={'label'}
					name="supplier"
					identifier="supplier"
					validate={Validators.required}
				/>
			)}
			<fieldset>
				<h3 className={styles.fieldset_header}>
					{t({ id: 'admin.bundleDetail.orderMaxCountInOrder.label' })}
				</h3>
				<div className={styles.row_wrapper}>
					<InputNumber
						name="limit"
						identifier="limit"
						label="admin.modal.form.orderLimitationLimit.label"
						min={1}
						max={200}
						className={styles.max_width_quarter}
					/>
					<InputTimePicker
						name="validFrom"
						identifier="validFrom"
						label="admin.modal.form.orderLimitationLimitValidFrom.label"
						className={styles.max_width_quarter}
						minDate={new Date()}
					/>
					<InputTimePicker
						name="validTo"
						identifier="validTo"
						label="admin.modal.form.orderLimitationLimitValidTo.label"
						className={styles.max_width_quarter}
						minDate={getTomorrowDate()}
					/>
					<div className={cx(styles.max_width_quarter, styles.align_button)}>
						<Button
							type="button"
							onClick={handleRemoveOrderLimitation}
							disabled={!bundle?.orderLimitation}
						>
							{t({ id: 'admin.modal.form.removeLimit.label' })}
						</Button>
					</div>
				</div>
			</fieldset>
			<InputNumber
				name="scoringAdmin"
				identifier="scoringAdmin"
				label="admin.modal.form.scoringAdmin.label"
				min={1}
				max={50}
				validate={Validators.required}
			/>

			<fieldset>
				<div className={styles.row_wrapper}>
					<InputNumber
						name="piecesPerPackage"
						identifier="piecesPerPackage"
						label="admin.modal.form.piecesPerPackage.label"
						min={0}
						max={2000}
						className={styles.max_width_quarter}
					/>
					<InputNumber
						name="packagesOnPallet"
						identifier="packagesOnPallet"
						label="admin.modal.form.packagesOnPallet.label"
						min={0}
						max={2000}
						className={styles.max_width_quarter}
					/>
				</div>
			</fieldset>
		</Form>
	);
};

export default EditBundleModal;
