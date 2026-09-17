import { useCallback, useContext } from 'react';
import { CCard, CCardBody, CCardTitle, CCol, CRow } from '@coreui/react';
import { CellContext } from '@tanstack/react-table';
import { dayjsInstance as dayjs } from 'Services/Date';
import { confirmAlert } from 'react-confirm-alert';
import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { ModalType } from 'Components/Modal/constants';
import { BundleDetailAction } from 'Pages/BundleDetail/constants';
import { Device } from 'Services/DeviceService/constants';
import { ModalContext } from 'Components/Modal/context';
import { BundleDetailContext } from 'Pages/BundleDetail/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { IntegrationContext } from 'Services/IntegrationService';
import AdminTable from 'Components/AdminTable';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import useGetBundlePrices from 'Hooks/Queries/useGetBundlePrices';

import { getDiscountState } from './helpers';
import { STATE, stateLabel } from './constants';

import './styles.css';

import './styles.css';
import {
	VinistoCommonDllModelsApiPricesPriceDiscountSupplier,
	VinistoCommonDllModelsApiPricesPriceDiscountVinisto,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsPriceDiscountType,
	VinistoHelperDllEnumsPriceLevel,
	VinistoProductDllModelsApiBundleBundle,
	VinistoProductDllModelsApiBundleBundleReturn,
} from '@/api-types/product-api';
import convertDateToDayjs from '@/utils/convert-date-to-dayjs';
import api from '@/api';

const Discounts = () => {
	const { loginHash: userLoginHash } =
		useContext(AuthenticationContext).vinistoUser ?? {};
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);
	const modalContext = useContext(ModalContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const { getIntegrationById } = useContext(IntegrationContext);

	const {
		activeCurrency: { currency },
	} = localizationContext;
	const { bundle, dispatch } = useContext(BundleDetailContext);

	const pricesQuery = useGetBundlePrices({
		bundleId: bundle?.id,
		userLoginHash,
		currency,
	});

	const filteredDiscounts = pricesQuery.data?.discountPrices?.filter(
		(discount) => {
			// TO CONSIDER: Should this table list any Vinisto discounts?
			// It probably DOES at the moment...
			if (
				'type' in discount &&
				discount.level === VinistoHelperDllEnumsPriceLevel.VinistoPlus
			) {
				return (
					discount.type ===
					VinistoHelperDllEnumsPriceDiscountType.SupplierDiscount
				);
			}
			if (
				'type' in discount &&
				discount.type !== VinistoHelperDllEnumsPriceDiscountType.VolumeDiscount
			)
				return true;
			return false;
		}
	);

	const handleOpenAddDiscountModal = useCallback(
		(
				isB2B = false,
				discountValidFrom = 0,
				discountValidTo = 0,
				discountedPrice = 0
			) =>
			() => {
				modalContext.handleOpenModal(
					isB2B ? ModalType.CREATE_B2B_DISCOUNT : ModalType.CREATE_B2C_DISCOUNT,
					{
						bundle,
						dispatch,
						discountValidFrom,
						discountValidTo,
						discountedPrice,
						isB2B,
						refetchPrices: pricesQuery.refetch,
					}
				);
			},
		[bundle, dispatch, modalContext, pricesQuery.refetch]
	);

	const handleOpenVinistoPlusModal = useCallback(() => {
		modalContext.handleOpenModal(ModalType.CREATE_VINISTO_PLUS_PRICE, {
			bundle,
			refetchBundleDetail: (bundle: VinistoProductDllModelsApiBundleBundle) =>
				dispatch([BundleDetailAction.setBundleData, bundle]),
		});
	}, [bundle, dispatch, modalContext]);

	const handleOnRemoveDiscountBundlePrice = useCallback(
		(
				discountPrice:
					| VinistoCommonDllModelsApiPricesPriceDiscountSupplier
					| VinistoCommonDllModelsApiPricesPriceDiscountVinisto
			) =>
			() => {
				if (bundle === null) return;
				const bundleId = bundle.id;
				const userLoginHash = authenticationContext?.vinistoUser?.loginHash;

				confirmAlert({
					title: `${t({
						id: 'admin.confirm.deleteDiscountBundlePrice.title',
					})}`,
					message: `${t({
						id: 'admin.confirm.deleteDiscountBundlePrice.message',
					})}`,
					buttons: [
						{
							label: `${t({
								id: 'admin.confirm.deleteDiscountBundlePrice.yes',
							})}`,
							onClick: () => {
								if (!userLoginHash) return;

								api
									.delete<VinistoProductDllModelsApiBundleBundleReturn>(
										`product-api/bundles/${bundleId}/DeleteDiscountPrice`,
										{
											UserLoginHash: userLoginHash,
											Currency:
												discountPrice.currency ??
												VinistoHelperDllEnumsCurrency.CZK,
											DiscountId: discountPrice.priceId ?? '',
											PriceLevel: discountPrice.level,
											platformId: discountPrice.platformId,
										}
									)
									.then((res) => res.bundle)
									.then(async (bundle) => {
										// Deleting VinistoPlus discount implies that the base
										//  VinistoPlus price will also be deleted
										const bundlePromise =
											discountPrice.level ===
											VinistoHelperDllEnumsPriceLevel.VinistoPlus
												? api
														.delete<VinistoProductDllModelsApiBundleBundleReturn>(
															`product-api/bundles/${bundleId}/prices`,
															{
																Currency:
																	discountPrice.currency ??
																	VinistoHelperDllEnumsCurrency.CZK,
																PriceLevel:
																	VinistoHelperDllEnumsPriceLevel.VinistoPlus,
																UserLoginHash: userLoginHash,
															}
														)
														.then((res) => res.bundle)
												: Promise.resolve(bundle);

										bundlePromise.then(async (res) => {
											if (res)
												dispatch([BundleDetailAction.setBundleData, res]);
											pricesQuery.refetch();
											notificationsContext.handleShowSuccessNotification(
												'admin.deleteDiscountBundlePrice.success'
											);
										});
									})
									.catch(() => {
										notificationsContext.handleShowErrorNotification(
											'admin.deleteDiscountBundlePrice.error'
										);
									});
							},
						},
						{
							label: `${t({
								id: 'admin.confirm.deleteDiscountBundlePrice.no',
							})}`,
							onClick: () => null,
						},
					],
				});
			},
		[
			bundle,
			authenticationContext?.vinistoUser?.loginHash,
			t,
			pricesQuery,
			notificationsContext,
		]
	);

	const cellActionButtons = (table: CellContext<PageListTableRow, unknown>) => {
		const discountValidFrom = table.row.original.validFrom;
		const discountValidTo = table.row.original.validTo;
		const discountedPrice = table.row.original.valueWithVat;
		const state = getDiscountState(table.row.original);

		const discountPriceLevel = table.row.original.level;

		if (state === STATE.EXPIRED) {
			return null;
		}
		return (
			<div className="d-flex gap-3">
				{state !== STATE.ONGOING &&
					discountPriceLevel != VinistoHelperDllEnumsPriceLevel.VinistoPlus && (
						<button
							onClick={handleOpenAddDiscountModal(
								false,
								discountValidFrom,
								discountValidTo,
								discountedPrice
							)}
							className="btn btn-primary"
						>
							{t({ id: 'bundleDetail.discounts.btn.edit' })}
						</button>
					)}
				<button
					className="btn btn-cancel"
					onClick={handleOnRemoveDiscountBundlePrice(table.row.original as any)}
				>
					{t({ id: 'bundleDetail.discounts.btn.remove' })}
				</button>
			</div>
		);
	};

	const tableSchema: TableSchema = [
		{
			header: `${t({ id: 'bundleDetail.discounts.table.type.label' })}`,
			cell: ({ row }) => {
				if (!('level' in row.original)) return '';
				if (row.original.level === VinistoHelperDllEnumsPriceLevel.VinistoPlus)
					return (
						<>
							{t({ id: row.original.level })}
							<img
								src="/assets/images/vinisto-plus-logo.svg"
								alt={`${t({ id: 'VinistoPlus' })}`}
								width="36"
								className="ms-2"
							/>
						</>
					);
				// Is expected to match for B2C and B2B
				if (row.original.platformId <= 1)
					return t({
						id: `${
							getIntegrationById(row.original.platformId)?.integrationName
						}.${row.original.level}`,
					});
				return `${
					getIntegrationById(row.original.platformId)?.integrationName
				} ${t({ id: 'price' })} ${(row.original.level ?? '').toLowerCase()}`;
			},

			enableColumnFilter: false,
			enableSorting: false,
			// todo: remove this if we won't use filters in this column
			// meta: {
			// 	filterType: AdminTableFilterType.DROPDOWN,
			// 	filterOptions: Object.entries(VinistoHelperDllEnumsPriceLevel),
			// },
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'bundleDetail.discounts.table.priceWithVat.label' })}`,
			accessorKey: 'valueWithVat',
			accessorFn: (row) =>
				getLocalizedPrice({
					price: row.valueWithVat,
					currency: row.currency,
					decimalPlaces: 2,
				}),
			enableColumnFilter: false,
			enableSorting: false, // present in design, but nonsense as there is either none or exactly one discount displayed
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'bundleDetail.discounts.table.validFrom.label' })}`,
			accessorFn: (row) =>
				row.validFrom
					? dayjs.unix(row.validFrom).format(`${t({ id: 'dateFormat' })}`)
					: '',
			cell: ({ row }) =>
				row.original.validFrom ? (
					<span
						title={dayjs
							.unix(row.original.validFrom)
							.format('D. M. YYYY HH:mm')}
					>
						{dayjs
							.unix(row.original.validFrom)
							.format(`${t({ id: 'dateFormat' })}`)}
					</span>
				) : (
					''
				),
			enableColumnFilter: false,
			enableSorting: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			header: `${t({ id: 'bundleDetail.discounts.table.validTo.label' })}`,
			accessorFn: (row) =>
				row.validTo === null
					? t({ id: 'admin.neverEndingDiscount' })
					: dayjs.unix(row.validTo).format(`${t({ id: 'dateFormat' })}`),
			cell: ({ row }) =>
				row.original.validTo ? (
					<span
						title={dayjs.unix(row.original.validTo).format('D. M. YYYY HH:mm')}
					>
						{dayjs
							.unix(row.original.validTo)
							.format(`${t({ id: 'dateFormat' })}`)}
					</span>
				) : (
					t({ id: 'admin.neverEndingDiscount' })
				),
			enableColumnFilter: false,
			enableSorting: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		// {
		//   header: `${t({ id: 'bundleDetail.discounts.table.pcsSold.label' })}`,
		//   accessorKey: 'pcsSold',
		//   enableColumnFilter: false,
		//   enableSorting: false,
		//   devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		// },
		{
			header: `${t({ id: 'bundleDetail.discounts.table.state.label' })}`,
			accessorFn: (row) => t({ id: stateLabel[getDiscountState(row)] }),
			enableColumnFilter: false,
			enableSorting: false,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
		{
			id: 'action',
			header: '',
			cell: cellActionButtons,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
		},
	];

	const isPriceExpired = (
		price:
			| VinistoCommonDllModelsApiPricesPriceDiscountSupplier
			| VinistoCommonDllModelsApiPricesPriceDiscountVinisto
	) => {
		if (!price) return true;
		// @ts-expect-error This is wrongly typed on BE - these properties exists
		if (price.validFrom === null && price.validTo === null) return false;

		// @ts-expect-error This is wrongly typed on BE - these properties exists
		const validTo = convertDateToDayjs(price.validTo);
		const isExpired = dayjs().isAfter(validTo);

		return isExpired;
	};

	const hasNotExpiredVinistoPlusSupplierDiscount = Boolean(
		bundle?.priceDiscounts?.find(
			(price) =>
				price.level === VinistoHelperDllEnumsPriceLevel.VinistoPlus &&
				'type' in price &&
				price.type ===
					VinistoHelperDllEnumsPriceDiscountType.SupplierDiscount &&
				!isPriceExpired(price)
		)
	);

	const hasVinistoPlusPriceButNoSupplierDiscount = Boolean(
		bundle?.prices.find(
			(price) => price.level === VinistoHelperDllEnumsPriceLevel.VinistoPlus
		) && !hasNotExpiredVinistoPlusSupplierDiscount
	);

	return (
		<CRow>
			<CCol xs={12}>
				<CCard className="mb-4">
					<CCardBody>
						<div className="bundle-container">
							<div className="heading-row mb-4">
								<CCardTitle>
									{t({ id: 'bundleDetail.discounts.overview' })}
								</CCardTitle>
								<button
									onClick={handleOpenAddDiscountModal(false)}
									className="btn btn-ok btn-add-discount"
								>
									+{' '}
									{t(
										{
											id: 'bundleDetail.discounts.btn.addPriceLevelDiscount',
										},
										{
											priceLevel: 'B2C',
										}
									)}
								</button>
								{hasVinistoPlusPriceButNoSupplierDiscount && (
									<button
										onClick={handleOpenVinistoPlusModal}
										className="btn btn-ok btn-add-discount"
									>
										+{' '}
										{t(
											{
												id: 'bundleDetail.discounts.btn.addPriceLevelDiscount',
											},
											{
												priceLevel: 'vinisto PLUS+',
											}
										)}
									</button>
								)}
							</div>
							<CRow>
								<AdminTable
									columns={tableSchema}
									// @ts-expect-error wrong type
									data={filteredDiscounts ?? []}
									errorMessage="bundleDetail.discounts.loadingFailed"
								/>
							</CRow>
						</div>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default Discounts;
