import { useContext, useEffect } from 'react';
import AdminListPage from 'Components/AdminListPage';
import { ApiGetParam } from 'Hooks/useAdminTable/interfaces';
import useAdminTable from 'Hooks/useAdminTable';
import useTableSchema from 'Hooks/useTableSchema';
import { API_METHOD } from 'Hooks/useAdminTable/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import {
	dayjsInstance,
	SPECIFICATION_ID_KIND,
	SPECIFICATION_ID_TYPE,
} from 'vinisto_shared';
import { Device } from 'Services/DeviceService/constants';
import CountrySelector from 'Components/CountrySelector';
import Detail from 'Components/Detail';
import InfoBox from 'Components/InfoBox';
import { createEnumParam, useQueryParam, withDefault } from 'use-query-params';
import { useQuery } from '@tanstack/react-query';

const SALE_RULE_LIST_ENDPOINT = 'supplier-api/admin/fee-rules/supplier';

import { SupplierAdminFeeRulesTableRow } from './interfaces';
import { formatCondition, formatSpecificationCondition } from './helpers';
import styles from './styles.module.css';

import {
	SupplierApi,
	VinistoFeeSystemModelsFeeRuleLogisticFeeValue,
	VinistoFeeSystemModelsFeeRuleSaleFeeRule,
	VinistoHelperDllEnumsCountryCode,
} from '@/api-types/supplier-api';
import api from '@/api';

const SaleRuleListTableKeys = {
	specifications: 'specifications',
	originFees: 'originFees',
	destinationFees: 'destinationFees',
	validityRange: 'validityRange',
	priceRange: 'priceRange',
	logisticsWarehouse: 'logisticsWarehouse',
	logisticVinisto: 'logisticVinisto',
};

const getSellingFeePercentage = (
	fees:
		| VinistoFeeSystemModelsFeeRuleSaleFeeRule['originFees']
		| VinistoFeeSystemModelsFeeRuleSaleFeeRule['destinationFees']
) => {
	if (!fees) return '';

	const b2cPercentage = fees['0'];

	const b2bPercentage = fees['1'];

	if (b2cPercentage === null && b2bPercentage === null) {
		return '';
	}

	return `${b2cPercentage === null ? 0 : b2cPercentage.percentage}% / ${
		b2bPercentage === null ? 0 : b2bPercentage.percentage
	}%`;
};

const getLogisticFeePercentage = (
	fees: VinistoFeeSystemModelsFeeRuleLogisticFeeValue[] | undefined
) => {
	if (!fees || fees.length === 0) return '';

	const b2cPercentage = fees.find((fee) => fee.platformId === 0)?.percentage;

	const b2bPercentage = fees.find((fee) => fee.platformId === 1)?.percentage;

	return `${b2cPercentage === null ? 0 : b2cPercentage}% / ${
		b2bPercentage === null ? 0 : b2bPercentage
	}%`;
};

const CommissionsListPage = () => {
	const vinistoUser = useContext(AuthenticationContext).vinistoUser;
	const activeSupplierId = useContext(AuthenticationContext).activeSupplierId;
	const loginHash = vinistoUser?.loginHash;

	const originCountry =
		vinistoUser?.suppliers.find((supplier) => supplier.id === activeSupplierId)
			?.countryCode ?? VinistoHelperDllEnumsCountryCode.CZ;

	const [destinationCountry, setDestinationCountry] =
		useQueryParam<VinistoHelperDllEnumsCountryCode>(
			'destinationCountry',
			withDefault(
				createEnumParam(Object.values(VinistoHelperDllEnumsCountryCode)),
				VinistoHelperDllEnumsCountryCode.CZ
			)
		);

	const { data: feeValues } = useQuery({
		queryKey: [
			'fee-rules',
			'supplier',
			activeSupplierId,
			'fee-rules',
			originCountry,
			destinationCountry,
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
					DestinationCountry: destinationCountry,
				}
			);

			return response;
		},
	});

	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const getTableSchema = useTableSchema<SupplierAdminFeeRulesTableRow>();
	const { fetchData, handlers, state, pageNumber, pageCount } =
		useAdminTable<SupplierAdminFeeRulesTableRow>();

	const tableSchema: TableSchema<SupplierAdminFeeRulesTableRow> = [
		{
			header: `${t({ id: 'commissionsList.specifications' })}`,
			accessorKey: SaleRuleListTableKeys.specifications,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
			id: SaleRuleListTableKeys.specifications,
			enableColumnFilter: false,
			cell: ({ row }) => {
				if (row.original.id === 'default') {
					return t({ id: 'commissions.defaultValue' });
				}

				const productType = formatSpecificationCondition(
					t,
					SPECIFICATION_ID_TYPE,
					row.original
				);
				const kind = formatSpecificationCondition(
					t,
					SPECIFICATION_ID_KIND,
					row.original
				);
				const categoryNames = formatCondition(t, 'categoryNames', row.original);
				const supplierNames = formatCondition(t, 'supplierNames', row.original);
				const bundleNames = formatCondition(t, 'bundleNames', row.original);
				const tagNames = formatCondition(t, 'tagNames', row.original);

				const conditions = [
					productType,
					kind,
					categoryNames,
					supplierNames,
					bundleNames,
					tagNames,
				];

				return conditions
					.filter((condition): condition is string => condition !== null)
					.map((condition) => (
						<div key={`${row.original.id}-${condition}`}>{condition}</div>
					));
			},
		},
		{
			header: `${t({ id: 'commissionsList.validityRange' })}`,
			accessorKey: SaleRuleListTableKeys.validityRange,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
			id: SaleRuleListTableKeys.validityRange,
			enableColumnFilter: false,
			cell: ({ row }) => {
				if (row.original.id === 'default') {
					return '';
				}

				let validFrom: string | null = null;
				let validTo: string | null = null;

				if ('saleFeeRule' in row.original) {
					validFrom = dayjsInstance(
						row.original.saleFeeRule?.validFrom
							? row.original.saleFeeRule.validFrom * 1000
							: null
					).format('MM. YYYY');

					validTo = row.original.saleFeeRule?.validTo
						? dayjsInstance(row.original.saleFeeRule.validTo * 1000).format(
								'MM. YYYY'
						  )
						: 'Neomezeně';
				}

				// Dynamic fee rules
				if ('validFrom' in row.original) {
					validFrom = dayjsInstance(
						row.original.validFrom ? row.original.validFrom * 1000 : null
					).format('MM. YYYY');
				}

				if ('validTo' in row.original) {
					validTo = row.original?.validTo
						? dayjsInstance(row.original.validTo * 1000).format('MM. YYYY')
						: 'Neomezeně';
				}

				if (row.original.id === 'default') {
					return '';
				}

				return `${validFrom} - ${validTo}`;
			},
		},
		{
			header: `${t({ id: 'commissionsList.priceRange' })}`,
			accessorKey: SaleRuleListTableKeys.priceRange,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
			id: SaleRuleListTableKeys.priceRange,
			enableColumnFilter: false,
			cell: ({ row }) => {
				if (row.original.id === 'default') {
					return '';
				}

				let priceFrom: number | null = null;
				let priceTo: number | null = null;

				if ('saleFeeRule' in row.original) {
					priceFrom = row.original.saleFeeRule?.bundlePriceFrom ?? 0;
					priceTo = row.original.saleFeeRule?.bundlePriceTo ?? 0;
				}

				// Dynamic fee rules
				if ('bundlePriceFrom' in row.original) {
					priceFrom = row.original.bundlePriceFrom ?? 0;
				}

				if ('bundlePriceTo' in row.original) {
					priceTo = row.original.bundlePriceTo ?? 0;
				}

				if (priceFrom === 0 && priceTo === 0) {
					return '';
				}

				return `${
					priceFrom === 0
						? t({ id: 'commissionsList.unlimited' })
						: `${priceFrom} ${t({ id: 'currency.CZK' })}`
				}  - ${
					priceTo === 0
						? t({ id: 'commissionsList.unlimited' })
						: `${priceTo} ${t({ id: 'currency.CZK' })}`
				}`;
			},
		},
		{
			header: `${t({ id: 'commissionsList.domesticProduction' })}`,
			accessorKey: SaleRuleListTableKeys.originFees,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
			id: SaleRuleListTableKeys.originFees,
			enableColumnFilter: false,
			cell: ({ row }) => {
				if (row.original.id === 'default') {
					return `${feeValues?.defaultSaleFeeValue ?? 0}% / ${
						feeValues?.defaultSaleFeeValueB2b ?? 0
					}%`;
				}

				if ('saleFeeRule' in row.original) {
					return getSellingFeePercentage(row.original.saleFeeRule?.originFees);
				}

				if ('originFees' in row.original) {
					return getSellingFeePercentage(row.original.originFees);
				}
			},
		},
		{
			header: `${t({ id: 'commissionsList.foreignProduction' })}`,
			accessorKey: SaleRuleListTableKeys.destinationFees,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
			id: SaleRuleListTableKeys.destinationFees,
			enableColumnFilter: false,
			cell: ({ row }) => {
				if (row.original.id === 'default') {
					return `${feeValues?.defaultSaleFeeValue ?? 0}% / ${
						feeValues?.defaultSaleFeeValueB2b ?? 0
					}%`;
				}

				if ('saleFeeRule' in row.original) {
					return getSellingFeePercentage(
						row.original.saleFeeRule?.destinationFees
					);
				}

				if ('destinationFees' in row.original) {
					return getSellingFeePercentage(row.original.destinationFees);
				}
			},
		},
		{
			header: `${t({ id: 'commissionsList.logisticsWarehouse' })}`,
			accessorKey: SaleRuleListTableKeys.logisticsWarehouse,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
			id: SaleRuleListTableKeys.logisticsWarehouse,
			enableColumnFilter: false,
			cell: ({ row }) => {
				if (row.original.id === 'default') {
					return `${feeValues?.defaultLogisticFeeSupplierTransport ?? 0}% / ${
						feeValues?.defaultLogisticFeeSupplierTransport ?? 0
					}%`;
				}

				if ('logisticFeeRule' in row.original) {
					return getLogisticFeePercentage(
						// @ts-expect-error Wrong casing of "supplierTransport" property in generated types
						row.original.logisticFeeRule?.originFees?.supplierTransport
					);
				}
			},
		},
		{
			header: `${t({ id: 'commissionsList.logisticVinisto' })}`,
			accessorKey: SaleRuleListTableKeys.logisticVinisto,
			devices: [Device.MOBILE, Device.TABLET, Device.DESKTOP],
			id: SaleRuleListTableKeys.logisticVinisto,
			enableColumnFilter: false,
			cell: ({ row }) => {
				if (row.original.id === 'default') {
					return `${feeValues?.defaultLogisticFeeVinistoTransport ?? 0}% / ${
						feeValues?.defaultLogisticFeeVinistoTransport ?? 0
					}%`;
				}

				if ('logisticFeeRule' in row.original) {
					return getLogisticFeePercentage(
						// @ts-expect-error Wrong casing of "vinistoTransport" property in generated types
						row.original.logisticFeeRule?.originFees?.vinistoTransport
					);
				}
			},
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	useEffect(() => {
		const apiParams: ApiGetParam[] = [
			{ key: 'OriginCountry', value: originCountry },
			{ key: 'DestinationCountry', value: destinationCountry },
			{ key: 'UserLoginHash', value: loginHash as string },
		];

		fetchData(
			`${SALE_RULE_LIST_ENDPOINT}/${activeSupplierId}`,
			apiParams,
			(payload) => [
				...(payload?.dynamicSaleFeeRules ?? []),
				...(payload?.feeRules ?? []),
			],
			'commissionsList.loadingError',
			API_METHOD.GET
		);
	}, [state, destinationCountry, loginHash, activeSupplierId, originCountry]);

	return (
		<>
			<Detail.Container>
				<Detail.Heading
					value={
						<>
							{t({ id: 'commissionsList.heading' })}{' '}
							<InfoBox content={t({ id: 'commissionsList.heading.info' })} />
						</>
					}
				/>
				<div className={styles.directionWrapper}>
					<span>{t({ id: 'commissionsList.direction' })}</span>
					<CountrySelector
						sourceCountry={originCountry}
						targetCountry={destinationCountry}
						setTargetCountry={setDestinationCountry}
					/>
				</div>
			</Detail.Container>
			<AdminListPage<SupplierAdminFeeRulesTableRow>
				adminTableSchema={adminTableSchema}
				handlers={handlers}
				state={{
					...state,
					data: [
						...(state.data ?? []),
						{
							id: 'default',
							logisticFeeRule: {
								id: 'default',
								specifications: [],
							},
							saleFeeRule: {
								id: 'default',
								specifications: [],
							},
						},
					],
				}}
				pageCount={pageCount}
				pageNumber={pageNumber}
			/>
		</>
	);
};

export default CommissionsListPage;
