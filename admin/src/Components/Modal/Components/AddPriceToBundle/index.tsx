import { useContext } from 'react';
import { Form } from 'react-final-form';
import { CURRENCIES } from 'Components/Form/Components/CurrencySelect/constants';
import { VATS } from 'Components/Form/Components/VatSelect/constants';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import {
	CurrencySelect,
	Input,
	InputNumber,
	InputSelect,
	Validators,
	VatSelect,
} from 'Components/Form';
import { getVatValue } from 'vinisto_shared/src/price';
import {
	VinistoHelperDllEnumsPriceLevel,
	VinistoHelperDllEnumsVatRate,
} from 'vinisto_api_client/src/api-types/product-api/';
import { Button } from 'react-bootstrap';
import { LocalizationContext } from 'Services/LocalizationService';
import PriceLevelSelect from 'Components/Form/Components/PriceLevelSelect';
import { IntegrationContext } from 'Services/IntergationService';
import DeleteBundleAlert from 'Components/DeleteBundleAlert';

interface AddPriceFormValues {
	price: number;
	priceIncludingVAT: number;
	currency: string;
	vat: VinistoHelperDllEnumsVatRate;
	platformId: string;
	priceLevel: VinistoHelperDllEnumsPriceLevel;
}

const getPriceWithoutVAT = (price: number, vat: VinistoHelperDllEnumsVatRate) =>
	price / (1 + getVatValue(vat) / 100);

const AddPriceToBundleModal = () => {
	const { integrations } = useContext(IntegrationContext);
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const refetchBundleDetail = modalContext.data?.refetchBundleDetail;
	const refetchBundlePrices = modalContext.data?.refetchBundlePrices;
	const bundle = modalContext.data?.bundle;

	const currentStandardBundlePrice = bundle?.bundlePrices?.basePrice;

	const isVinistoPlus = modalContext.data?.isVinistoPlus ?? false;

	const handleOnAddPriceToBundle =
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		({ priceIncludingVAT, ...formValues }: AddPriceFormValues) => {
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				...formValues,
			};

			apiServiceInstance
				.post(`product-api/bundles/${bundle?.id}/prices`, requestData, true)
				.then(() => {
					notificationsContext.handleShowSuccessNotification(
						'admin.addPriceToBundle.success'
					);
					refetchBundleDetail();
					refetchBundlePrices?.();
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.addPriceToBundle.error'
					);
				});
		};

	const initialPrice = currentStandardBundlePrice?.value ?? 0;
	const initialPriceIncludingVAT =
		currentStandardBundlePrice?.valueWithVat ?? 0;
	const initialCurrency =
		currentStandardBundlePrice?.currency ?? CURRENCIES[0].value;
	const initialVat = currentStandardBundlePrice?.vat ?? VATS[0].value;

	const initialLevel =
		currentStandardBundlePrice?.level ?? VinistoHelperDllEnumsPriceLevel.Level1;

	return (
		<Form<AddPriceFormValues>
			submitCallback={handleOnAddPriceToBundle}
			initialValues={{
				price: initialPrice,
				priceIncludingVAT: initialPriceIncludingVAT,
				currency: initialCurrency,
				vat: initialVat,
				platformId: '0',
				priceLevel: initialLevel,
			}}
			onSubmit={handleOnAddPriceToBundle}
			mutators={{
				setValue: ([field, value], state, { changeValue }) => {
					changeValue(state, field, () => value);
				},
			}}
			render={({ form, handleSubmit, values }) => (
				<form onSubmit={handleSubmit}>
					<CurrencySelect
						name="currency"
						identifier="currency"
						label="admin.modal.form.currency"
						validate={[Validators.required]}
					/>
					<VatSelect
						name="vat"
						identifier="vat"
						label="admin.modal.form.vat"
						onChange={(value) =>
							form.mutators.setValue(
								'price',
								getPriceWithoutVAT(
									values.priceIncludingVAT,
									value as VinistoHelperDllEnumsVatRate
								)
							)
						}
						validate={[Validators.required]}
					/>
					<InputSelect
						name="platformId"
						identifier="platformId"
						label="admin.bundleDetail.platform.label"
						options={integrations?.map((platform) => ({
							label: `${platform.integrationName}`,
							value: `${platform.integrationId}`,
						}))}
						validate={[Validators.required]}
					/>
					<PriceLevelSelect
						name="priceLevel"
						identifier="priceLevel"
						label="admin.modal.form.priceType"
						include={{
							B2c: [VinistoHelperDllEnumsPriceLevel.Level1],
						}}
						validate={[Validators.required]}
						initialValue={
							isVinistoPlus && VinistoHelperDllEnumsPriceLevel.VinistoPlus
						}
					/>
					<InputNumber
						name="priceIncludingVAT"
						identifier="priceIncludingVAT"
						label="admin.modal.form.priceIncludingVAT"
						onChange={(value) =>
							form.mutators.setValue(
								'price',
								parseFloat(getPriceWithoutVAT(value, values.vat).toFixed(2))
							)
						}
						validate={[Validators.required]}
					/>
					<Input
						type="number"
						name="price"
						identifier="price"
						label="orderDetail.totalOrderPrice"
						disabled
					/>
					<DeleteBundleAlert
						bundleId={bundle?.id ?? ''}
						translations={{
							checking: `${t({ id: 'admin.deleteBundle.checking' })}`,
							deleting: `${t({ id: 'admin.addPrice.affectedSets.editing' })}`,
							set: `${t({ id: 'admin.deleteBundle.set' })}`,
						}}
					/>
					<Button type="submit">
						{t({ id: 'admin.modal.addPriceToBundle' })}
					</Button>
				</form>
			)}
		/>
	);
};

export default AddPriceToBundleModal;
