import { useCallback, useContext } from 'react';
import { CCard, CCardBody, CCardTitle, CCol, CRow } from '@coreui/react';
import { round } from 'lodash-es';
import { BASE_VAT_PERCENTAGE_VALUE } from 'Components/Modal/CreateDiscount/constants';
import useIdenticalBundles from 'Hooks/Queries/useIdenticalBundles';
import SingleEditFormContextProvider from 'Components/SingleEditForm/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { BundleDetailAction } from 'Pages/BundleDetail/constants';
import { BundleDetailContext } from 'Pages/BundleDetail/context';
import { ModalContext } from 'Components/Modal/context';
import { ModalType } from 'Components/Modal/constants';
import { dayjsInstance as dayjs } from 'vinisto_shared';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import useGetBundlePrices from 'Hooks/Queries/useGetBundlePrices';
import { B2B_NUMERIC_CODE } from 'Services/IntegrationService/constants';

import { getDiscountState } from '../Discounts/helpers';
import { stateLabel } from '../Discounts/constants';

import { PriceFormFields } from './PriceForm/interfaces';
import LowestPrice from './LowestPrice';
import PriceForm from './PriceForm';

import { priceAdapter } from '@/index';
import {
	VinistoCommonDllModelsApiPricesPriceDiscountSupplier,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsPriceDiscountType,
	VinistoHelperDllEnumsPriceLevel,
	VinistoProductDllModelsApiBundleBundle,
	VinistoProductDllModelsApiBundleBundleReturn,
} from '@/api-types/product-api';
import api from '@/api';

const Sell = () => {
	const localizationContext = useContext(LocalizationContext);
	const {
		activeCurrency: { currency },
	} = localizationContext;
	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);
	const { loginHash: userLoginHash } = authenticationContext.vinistoUser ?? {};
	const modalContext = useContext(ModalContext);
	const { bundle, dispatch } = useContext(BundleDetailContext);

	const t = localizationContext.useFormatMessage();

	const pricesQuery = useGetBundlePrices({
		bundleId: bundle?.id,
		userLoginHash,
		currency,
	});

	const b2cPriceLevel1 = pricesQuery.data?.prices?.find(
		(price) =>
			price.platformId === 0 &&
			price.level === VinistoHelperDllEnumsPriceLevel.Level1
	);

	const domainB2cPriceLevel1 = b2cPriceLevel1
		? priceAdapter.fromApi(b2cPriceLevel1)
		: null;

	const b2bPriceLevel1 = pricesQuery.data?.prices?.find(
		(price) =>
			price.platformId === 1 &&
			price.level === VinistoHelperDllEnumsPriceLevel.Level1
	);

	const domainB2bPriceLevel1 = b2bPriceLevel1
		? priceAdapter.fromApi(b2bPriceLevel1)
		: null;

	const vinistoPlusSupplierDiscount:
		| VinistoCommonDllModelsApiPricesPriceDiscountSupplier
		| undefined = pricesQuery.data?.discountPrices?.find(
		(discount) =>
			discount.level === VinistoHelperDllEnumsPriceLevel.VinistoPlus &&
			'type' in discount &&
			discount.type === VinistoHelperDllEnumsPriceDiscountType.SupplierDiscount
	);

	const identicalBundlesQuery = useIdenticalBundles(bundle?.id ?? '');

	const editPrice = useCallback(
		(formValues: PriceFormFields) => {
			const requestData = {
				userLoginHash,
				currency: domainB2cPriceLevel1?.currency,
				vat: domainB2cPriceLevel1?.vat,
				price: round(
					formValues.price *
						(1 /
							(1 +
								(domainB2cPriceLevel1?.vatValue ?? BASE_VAT_PERCENTAGE_VALUE) /
									100)),
					2
				),
				priceLevel: formValues.priceLevel,
				platformId: formValues.platformId,
			};
			return api
				.post<VinistoProductDllModelsApiBundleBundleReturn>(
					`product-api/bundles/${bundle?.id}/prices`,
					undefined,
					requestData
				)
				.then((res) => {
					handleShowSuccessNotification(
						'bundleDetail.sell.addPriceToBundle.success'
					);
					if (res.bundle)
						dispatch([BundleDetailAction.setBundleData, res.bundle]);

					pricesQuery.refetch();
				})
				.catch(() => {
					handleShowErrorNotification(
						'bundleDetail.sell.addPriceToBundle.error'
					);
				});
		},
		[
			userLoginHash,
			domainB2cPriceLevel1?.currency,
			domainB2cPriceLevel1?.vat,
			domainB2cPriceLevel1?.vatValue,
			bundle?.id,
			handleShowSuccessNotification,
			dispatch,
			pricesQuery,
			handleShowErrorNotification,
		]
	);

	return (
		<CRow>
			<CCol xs={12}>
				<CCard className="mb-4">
					<CCardBody>
						<div className="bundle-container">
							<div className="prices-wrapper">
								<div className="price-container">
									<CCardTitle className="pb-2">
										{t(
											{ id: 'bundleDetail.sell.title' },
											{
												priceLevel: 'B2C',
											}
										)}
									</CCardTitle>
									<SingleEditFormContextProvider>
										<PriceForm
											initialValue={domainB2cPriceLevel1?.valueWithVat}
											labelValue={domainB2cPriceLevel1?.value}
											onSubmit={editPrice}
											priceLevel={domainB2cPriceLevel1?.priceType}
											basePrice={domainB2cPriceLevel1?.valueWithVat}
											platformId={domainB2cPriceLevel1?.platformId}
										/>
									</SingleEditFormContextProvider>
									<LowestPrice
										bundle={bundle}
										identicalBundles={identicalBundlesQuery.data ?? []}
									/>
								</div>
								<div className="price-container">
									<CCardTitle className="pb-2">
										{t(
											{ id: 'bundleDetail.sell.title' },
											{
												priceLevel: 'B2B',
											}
										)}
									</CCardTitle>
									<SingleEditFormContextProvider>
										<PriceForm
											initialValue={domainB2bPriceLevel1?.valueWithVat}
											labelValue={domainB2bPriceLevel1?.value ?? 0}
											onSubmit={editPrice}
											priceLevel={
												domainB2bPriceLevel1?.priceType ??
												VinistoHelperDllEnumsPriceLevel.Level1
											}
											// Beware: this is intentionally B2C price
											basePrice={domainB2cPriceLevel1?.valueWithVat}
											platformId={
												domainB2bPriceLevel1?.platformId ?? B2B_NUMERIC_CODE
											}
										/>
									</SingleEditFormContextProvider>
								</div>
								<div className="price-container">
									{vinistoPlusSupplierDiscount ? (
										<>
											<CCardTitle className="pb-2 d-flex align-items-center gap-1">
												<img
													src="/assets/images/vinisto-plus-logo.svg"
													alt={`${t({ id: 'VinistoPlus' })}`}
													height={24}
												/>
												{t(
													{ id: 'bundleDetail.sell.title' },
													{
														priceLevel: 'vinisto PLUS+',
													}
												)}
											</CCardTitle>
											<div className="mb-2">
												{t(
													{
														id: 'bundleDetail.sell.priceWithVat.vinistoPlusPrice',
													},
													{
														priceWithVat: getLocalizedPrice({
															price:
																vinistoPlusSupplierDiscount.valueWithVat ?? 0,
															currency:
																vinistoPlusSupplierDiscount.currency ??
																VinistoHelperDllEnumsCurrency.CZK,
															decimalPlaces: 2,
														}),
														priceWithoutVat:
															vinistoPlusSupplierDiscount.value ? (
																<em className="ms-1">
																	{t(
																		{
																			id: 'bundleDetail.sell.priceWithVat.label.priceWithoutVat',
																		},
																		{
																			value: getLocalizedPrice({
																				price:
																					vinistoPlusSupplierDiscount.value,
																				currency:
																					vinistoPlusSupplierDiscount.currency ??
																					VinistoHelperDllEnumsCurrency.CZK,
																				displayCurrency: false,
																				decimalPlaces: 2,
																			}),
																		}
																	)}
																</em>
															) : (
																''
															),
														priceLevel: 'vinisto PLUS+',
													}
												)}
											</div>
											<div className="lh-lg">
												{t({
													id: stateLabel[
														// @ts-expect-error The signature is general,
														// but it would't help to extend as BE types are incomplete here
														`${getDiscountState(vinistoPlusSupplierDiscount)}`
													],
												})}
											</div>
											<div
												className="lh-lg"
												style={{ fontSize: '0.875rem' }}
											>
												<span
													title={dayjs
														// @ts-expect-error BE supplies incomplete types
														.unix(vinistoPlusSupplierDiscount.validFrom)
														.format('D. M. YYYY HH:mm')}
												>
													{t({ id: 'from' })}{' '}
													{dayjs
														// @ts-expect-error BE supplies incomplete types
														.unix(vinistoPlusSupplierDiscount.validFrom)
														.format('D. M. YYYY')}{' '}
												</span>
												<span
													title={dayjs
														// @ts-expect-error BE supplies incomplete types
														.unix(vinistoPlusSupplierDiscount.validTo)
														.format('D. M. YYYY HH:mm')}
												>
													{t({ id: 'to' })}{' '}
													{dayjs
														// @ts-expect-error BE supplies incomplete types
														.unix(vinistoPlusSupplierDiscount.validTo)
														.format('D. M. YYYY')}
												</span>
											</div>
										</>
									) : bundle?.isSet ? null : (
										<button
											className="btn btn-ok"
											onClick={() =>
												modalContext.handleOpenModal(
													ModalType.CREATE_VINISTO_PLUS_PRICE,
													{
														bundle,
														refetchBundleDetail: (
															bundle: VinistoProductDllModelsApiBundleBundle
														) => {
															pricesQuery.refetch();
															dispatch([
																BundleDetailAction.setBundleData,
																bundle,
															]);
														},
													}
												)
											}
										>
											{t({ id: 'bundleDetail.sell.addToVinistoPlus' })}
										</button>
									)}
								</div>
							</div>
						</div>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default Sell;
