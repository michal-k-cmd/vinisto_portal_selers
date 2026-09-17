import { useContext, useMemo } from 'react';
import cx from 'classnames';
import Detail from 'Components/Detail';
import { LocalizationContext } from 'Services/LocalizationService';
import DetailSubheading from 'Components/Detail/Subheading';
import InfoBox from 'Components/InfoBox';
import { HashLink } from 'react-router-hash-link';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { QueryParamConfig, useQueryParam, withDefault } from 'use-query-params';
import { useQuery } from '@tanstack/react-query';

import styles from './styles.module.css';
import DashboardDiscounts from './discounts';
import DashboardStockingRequests from './stocking-requests';
import DashBoardSales from './DashBoardSales';
import { BusinessType, BusinessTypeType } from './constants';
import Provision from './Provision';

import api from '@/api';
import {
	type SupplierApi,
	VinistoHelperDllEnumsCountryCode,
} from '@/api-types/supplier-api';

const DashBoardPage = () => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const { vinistoUser, activeSupplierId } = useContext(AuthenticationContext);

	const supplierData = vinistoUser?.suppliers?.find(
		(supplier) => supplier.id === activeSupplierId
	);
	const isShipping = supplierData?.isShipping ?? false;

	const BusinessTypeParam: QueryParamConfig<
		BusinessTypeType,
		BusinessTypeType
	> = {
		encode: (value: BusinessTypeType) => value,
		decode: (value: string | (string | null)[] | null | undefined) => {
			if (typeof value === 'string') {
				return value as BusinessTypeType;
			}
			return BusinessType.B2C;
		},
	};

	const originCountry =
		vinistoUser?.suppliers.find((s) => s.id === activeSupplierId)
			?.countryCode ?? VinistoHelperDllEnumsCountryCode.CZ;

	const { data: feeValues } = useQuery({
		queryKey: [
			'fee-rules',
			'supplier',
			activeSupplierId,
			'fee-rules',
			originCountry,
			VinistoHelperDllEnumsCountryCode.CZ,
		],
		queryFn: async () => {
			const response = await api.get<
				SupplierApi.AdminFeeRulesSupplierFeeValuesList.ResponseBody,
				SupplierApi.AdminFeeRulesSupplierFeeValuesList.RequestQuery
			>(
				`supplier-api/admin/fee-rules/supplier/${activeSupplierId}/fee-values`,
				{
					UserLoginHash: vinistoUser?.loginHash ?? '',
					OriginCountry: originCountry,
					DestinationCountry: VinistoHelperDllEnumsCountryCode.CZ,
				}
			);

			return response;
		},
	});

	const [bussinessType, setBussinessType] = useQueryParam<BusinessTypeType>(
		'bussinessType',
		withDefault(BusinessTypeParam, BusinessType.B2C)
	);

	const feeValuesLogistic = useMemo(() => {
		const defaultFeeLogisticValue = isShipping
			? (feeValues?.defaultLogisticFeeSupplierTransport ?? 0) / 100
			: (feeValues?.defaultLogisticFeeVinistoTransport ?? 0) / 100;

		const defaultValuesRow = (
			<Provision
				label={t({ id: 'commissions.defaultValue' })}
				percentProvisionB2C={defaultFeeLogisticValue}
				percentProvisionB2B={defaultFeeLogisticValue}
				prefix={`${t({
					id: 'dashboard.provision.from',
					defaultMessage: 'od',
				})}`}
			/>
		);

		if (
			!feeValues?.feeValues ||
			!feeValues?.feeValues?.supplierLogisticFeeValues ||
			!feeValues?.feeValues?.supplierLogisticFeeValues?.length
		) {
			return (
				<div>
					<div>
						<span className={styles.noValues}>
							{t({ id: 'dashboard.provisions.logistics.no-values' })}
						</span>
					</div>
					{defaultValuesRow}
				</div>
			);
		}

		const rows = feeValues?.feeValues?.supplierLogisticFeeValues?.map(
			(feeValue) => {
				const valueB2c = isShipping
					? (feeValue.minVinistoTransportPercentage ?? 0) / 100
					: (feeValue.minSupplierTransportPercentage ?? 0) / 100;

				const valueB2b = isShipping
					? (feeValue.minVinistoTransportPercentageB2b ?? 0) / 100
					: (feeValue.minSupplierTransportPercentageB2b ?? 0) / 100;

				return (
					<Provision
						key={feeValue.allowedValue}
						label={feeValue.allowedValue}
						percentProvisionB2C={valueB2c}
						percentProvisionB2B={valueB2b}
						prefix={`${t({
							id: 'dashboard.provision.from',
							defaultMessage: 'od',
						})}`}
					/>
				);
			}
		);
		return [...rows, defaultValuesRow];
	}, [feeValues, t, isShipping]);

	const feeValuesSales = useMemo(() => {
		const defaultValuesRow = (
			<Provision
				label={t({ id: 'commissions.defaultValue' })}
				percentProvisionB2C={(feeValues?.defaultSaleFeeValue ?? 0) / 100}
				percentProvisionB2B={(feeValues?.defaultSaleFeeValueB2b ?? 0) / 100}
				prefix={`${t({
					id: 'dashboard.provision.from',
					defaultMessage: 'od',
				})}`}
			/>
		);

		if (
			!feeValues?.feeValues ||
			!feeValues?.feeValues?.supplierSaleFeeValues ||
			!feeValues?.feeValues?.supplierSaleFeeValues?.length
		) {
			return (
				<div>
					<div>
						<span className={styles.noValues}>
							{t({ id: 'dashboard.provisions.sales.no-values' })}
						</span>
					</div>
					{defaultValuesRow}
				</div>
			);
		}

		const rows = feeValues?.feeValues?.supplierSaleFeeValues?.map(
			(feeValue) => {
				const valueB2c = (feeValue.minB2cPercentage ?? 0) / 100;

				const valueB2b = (feeValue.minB2bPercentage ?? 0) / 100;

				return (
					<Provision
						key={feeValue.allowedValue}
						label={feeValue.allowedValue}
						percentProvisionB2C={valueB2c}
						percentProvisionB2B={valueB2b}
						prefix={`${t({
							id: 'dashboard.provision.from',
							defaultMessage: 'od',
						})}`}
					/>
				);
			}
		);
		return [...rows, defaultValuesRow];
	}, [feeValues, t, isShipping]);

	return (
		<div className={styles.grid}>
			<Detail.Container className={styles.cardA}>
				<Detail.Heading
					value={
						<>
							{t({ id: 'dashboard.provisions' })}{' '}
							<InfoBox
								content={t(
									{ id: 'dashboard.provisions.info' },
									{
										link: (
											<HashLink to="/settings#shipping-method">
												{t({ id: 'dashboard.provisions.info.link' })}
											</HashLink>
										),
									}
								)}
							/>
						</>
					}
				/>
				<DetailSubheading
					value={
						<>
							<span>
								{t({ id: 'dashboard.provisions.logistics' })}{' '}
								<span className={styles.provisionsEdit}>
									{t(
										{
											id: isShipping
												? 'dashboard.provisions.shipping'
												: 'dashboard.provisions.pickup',
										},
										{
											edit: (
												<HashLink to="/settings#shipping-method">
													{t({ id: 'dashboard.provisions.shipping.edit' })}
												</HashLink>
											),
										}
									)}
								</span>
							</span>

							<span className={styles.b2wrap}>
								<span>B2C</span>
								<span>B2B</span>
							</span>
						</>
					}
					className={styles.subheading}
				/>

				{feeValuesLogistic}

				<DetailSubheading
					value={
						<>
							<span>{t({ id: 'dashboard.provisions.sales' })}</span>
							<span className={styles.b2wrap}>
								<span>B2C</span>
								<span>B2B</span>
							</span>
						</>
					}
					className={styles.subheading}
				/>
				{feeValuesSales}
			</Detail.Container>

			<Detail.Container className={styles.cardB}>
				<Detail.Heading value={t({ id: 'dashboard.sales' })}></Detail.Heading>
				<DashBoardSales />
			</Detail.Container>

			<Detail.Container className={styles.cardC}>
				<Detail.Heading value={t({ id: 'dashboard.stockingRequests' }) + ':'} />
				<DashboardStockingRequests />
			</Detail.Container>

			<Detail.Container className={styles.cardD}>
				<Detail.Heading
					value={
						<>
							{t({ id: 'dashboard.discounts' })}
							<span className={styles.b2buttons}>
								<button
									className={cx(
										styles.b2cButton,
										bussinessType === BusinessType.B2C && styles.active
									)}
									onClick={() => setBussinessType(BusinessType.B2C)}
								>
									B2C
								</button>
								<button
									className={cx(
										styles.b2bButton,
										bussinessType === BusinessType.B2B && styles.active
									)}
									onClick={() => setBussinessType(BusinessType.B2B)}
								>
									B2B
								</button>
							</span>
						</>
					}
				/>
				<DashboardDiscounts bussinessType={bussinessType} />
			</Detail.Container>
		</div>
	);
};

export default DashBoardPage;
