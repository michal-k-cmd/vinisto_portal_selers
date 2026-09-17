import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { StringParam, useQueryParam, withDefault } from 'Helpers/query-params';
import CountrySelector from 'Components/CountrySelector';
import AdminListPage from 'Components/AdminListPage';
import { ApiGetParam } from 'Hooks/useAdminTable/interfaces';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';
import useAdminTable from 'Hooks/useAdminTable';
import { Modal } from 'Components/Modal';
import { NotificationsContext } from 'Services/NotificationService';
import useTableSchema from 'Hooks/useTableSchema';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import {
	dayjsInstance,
	SPECIFICATION_ID_KIND,
	SPECIFICATION_ID_TYPE,
} from 'vinisto_shared';
import { LogisticFeeRuleFormValues } from 'Components/Forms/CreateLogisticRule/interfaces';
import CreateLogisticRuleForm from 'Components/Forms/CreateLogisticRule';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { TablePopover } from 'vinisto_ui';
import FeeRulesHealthCheck from 'Components/FeeRulesHealthCheck';
import {
	formatFeeRulePriceRange,
	formatFeeRuleValidityRange,
	formatLogisticFees,
} from 'Pages/SellingRules/helpers';
import { useFeeRuleConflict } from 'Hooks/useFeeRuleConflict';
import { IntegrationContext } from 'Services/IntergationService';

import styles from './styles.module.css';
import { FEE_RULE_LIST_ENDPOINT, WAREHOUSE_DATABASE_ID } from './constants';

import {
	VinistoCommonDllModelsApiSpecificationsBaseSpecification,
	VinistoFeeSystemModelsFeeRuleLogisticFeeRule,
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsFeeRuleFeeRuleState,
	VinistoHelperDllEnumsFeeRuleFeeRuleType,
} from '@/api-types/supplier-api';
import feeRuleService from '@/supplier-service/fee-rule';
import { patchValue } from '@/shared';
import { ApiError } from '@/domain/error';

type LogisticRuleList = Omit<
	VinistoFeeSystemModelsFeeRuleLogisticFeeRule,
	'specifications'
> & {
	id: string;
	// either this or assert that specification is type multi_combo_box
	specifications: ({
		allowedValues: string[];
	} & VinistoCommonDllModelsApiSpecificationsBaseSpecification)[];
};

type LogisticRuleListTableRow = Omit<
	VinistoFeeSystemModelsFeeRuleLogisticFeeRule,
	'specifications'
> & {
	id: string;
	specifications: ({
		allowedValues: string[];
	} & VinistoCommonDllModelsApiSpecificationsBaseSpecification)[];
};

const LogisticRuleListTableKeys = {
	specifications: {
		type: 'type',
		kind: 'kind',
	},
	originFees: 'originFees',
	validityRange: 'validityRange',
	priceRange: 'priceRange',
	state: 'state',
	bundleCount: 'bundleCount',
	name: 'name',
	vinistoTransport: 'vinistoTransport',
	supplierTransport: 'supplierTransport',
	packaging: 'packaging',
	dispatching: 'dispatching',
	storage: 'storage',
	completion: 'completion',
};

const FEE_RULE_FILTER_KEYS = {
	bundleType: 'BundleType',
	bundleKind: 'BundleKind',
	name: 'Name',
	state: 'State',
	validFrom: 'ValidFrom',
	validTo: 'ValidTo',
	bundlePriceFrom: 'BundlePriceFrom',
	bundlePriceTo: 'BundlePriceTo',
};

const FEE_RULE_SORTING_COLUMN_KEYS = {
	validFrom: 'VALID_FROM',
	validTo: 'VALID_TO',
	bundlePriceFrom: 'BUNDLE_PRICE_FROM',
	bundlePriceTo: 'BUNDLE_PRICE_TO',
	name: 'NAME',
	type: 'SPECIFICATION_TYPE',
	kind: 'SPECIFICATION_KIND',
};

const FeeRuleStateLocaleMap = {
	[VinistoHelperDllEnumsFeeRuleFeeRuleState.Active]: 'feeRuleState.active',
	[VinistoHelperDllEnumsFeeRuleFeeRuleState.Inactive]: 'feeRuleState.inactive',
	[VinistoHelperDllEnumsFeeRuleFeeRuleState.Concept]: 'feeRuleState.concept',
	[VinistoHelperDllEnumsFeeRuleFeeRuleState.Deleted]: 'feeRuleState.deleted',
	[VinistoHelperDllEnumsFeeRuleFeeRuleState.EndingSoon]:
		'feeRuleState.endingSoon',
	[VinistoHelperDllEnumsFeeRuleFeeRuleState.Scheduled]:
		'feeRuleState.scheduled',
};

const handleConflictingFeeRuleApiError = (
	error: unknown,
	setConflictingId: (message: string) => void
) => {
	if (error instanceof ApiError) {
		// Conflict with logistic fee rule id: 67d84e54051c6c8fc6f6251b
		// I need to parse the id from the string (potentially name if provided in the future)
		const conflictingId =
			error.message.toLowerCase().match(/id:\s(\w+)/)?.[1] || '';
		setConflictingId(conflictingId);
	}
};

const LogisticRulesPage = () => {
	const { loginHash, permissions } = useContext(
		AuthenticationContext
	).vinistoUser;

	const { getIntegrationById } = useContext(IntegrationContext);

	const isOnlyDynamicFeePermission =
		permissions.includes('USER_ADMIN_DYNAMIC_FEE_RULE') &&
		!permissions.includes('USER_ADMIN_FEE_RULE');

	const notificationsContext = useContext(NotificationsContext);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [formData, setFormData] = useState<LogisticFeeRuleFormValues>();

	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const getTableSchema = useTableSchema<LogisticRuleList>();
	const { fetchData, handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable<LogisticRuleListTableRow>();

	const [originCountry, setOriginCountry] = useQueryParam(
		'originCountry',
		withDefault(StringParam, VinistoHelperDllEnumsCountryCode.CZ)
	);
	const [destinationCountry, setDestinationCountry] = useQueryParam(
		'destinationCountry',
		withDefault(StringParam, VinistoHelperDllEnumsCountryCode.CZ)
	);

	const [formInitialValues, setFormInitialValues] =
		useState<LogisticFeeRuleFormValues>({
			originCountry,
			destinationCountry,
		});

	const handleClickCreateNewRule = () => {
		setIsCreateModalOpen(true);
	};

	const onClickSaveAsConcept = async () => {
		if (!formData) {
			toast.error('DEV Error: Form data is missing in save as concept action.');
			return;
		}

		if (formData.id) {
			await updateLogisticFeeRule({
				...formData,
				flags: {
					save: true,
				},
			});
		} else {
			await createLogisticFeeRule({
				...formData,
				flags: {
					save: true,
				},
				state: VinistoHelperDllEnumsFeeRuleFeeRuleState.Concept,
			});
		}

		dispatch({ type: PageListAction.setShouldReload, value: true });
		setFormData(undefined);
	};

	const { modal: conflictModal, setConflictingId } = useFeeRuleConflict({
		onClickSaveAsConcept,
	});

	const tableSchema: TableSchema<LogisticRuleList> = [
		{
			header: `${t({ id: 'saleRuleDetail.name' })}`,
			id: LogisticRuleListTableKeys.name,
			accessorKey: LogisticRuleListTableKeys.name,
			enableColumnFilter: true,
			enableSorting: false,
			accessorFn: (row) => row.name,
			cell: ({ row }) => {
				const name = row.original.name;
				const note = row.original.note;

				if (!name) return '';
				if (!note) return name;

				return (
					<TablePopover
						name={name}
						note={note}
					/>
				);
			},
		},
		{
			enableColumnFilter: true,
			header: `${t({ id: 'saleRuleDetail.specifications.type' })}`,
			id: LogisticRuleListTableKeys.specifications.type,
			enableSorting: true,
			accessorFn: (row) => row.specifications,
			cell: ({ row }) => {
				const type = row.original.specifications?.find(
					(spec) => spec.definitionId === SPECIFICATION_ID_TYPE
				)?.allowedValues[0];

				if (!type) return '';
				return type;
			},
		},
		{
			enableColumnFilter: true,
			header: `${t({ id: 'saleRuleDetail.specifications.kind' })}`,
			id: LogisticRuleListTableKeys.specifications.kind,
			enableSorting: true,
			accessorFn: (row) => row.specifications,
			cell: ({ row }) => {
				const kind = row.original.specifications?.find(
					(spec) => spec.definitionId === SPECIFICATION_ID_KIND
				)?.allowedValues[0];

				if (!kind) return '';
				return kind;
			},
		},
		{
			header: `${t({ id: 'saleRuleDetail.validityRange' })}`,
			id: LogisticRuleListTableKeys.validityRange,
			accessorFn: (row) => row.validFrom,
			cell: ({ row }) => formatFeeRuleValidityRange(row.original),
			meta: {
				filterType: AdminTableFilterType.RANGE_DATE,
			},
		},
		{
			header: `${t({ id: 'saleRuleDetail.priceRange' })}`,
			id: LogisticRuleListTableKeys.priceRange,
			accessorFn: (row) => row.bundlePriceFrom,
			cell: ({ row }) =>
				formatFeeRulePriceRange(row.original, `${t({ id: 'CZK' })}`),
			meta: {
				filterType: AdminTableFilterType.NUMERIC,
			},
		},
		{
			header: `${t({ id: 'saleRuleDetail.vinistoTransport' })}`,
			id: LogisticRuleListTableKeys.vinistoTransport,
			cell: ({ row }) =>
				formatLogisticFees(
					// @ts-expect-error for some reason api is camel case but type is pascal case
					row.original.originFees?.vinistoTransport,
					getIntegrationById
				),
		},
		{
			header: `${t({ id: 'saleRuleDetail.supplierTransport' })}`,
			id: LogisticRuleListTableKeys.supplierTransport,
			cell: ({ row }) =>
				formatLogisticFees(
					// @ts-expect-error for some reason api is camel case but type is pascal case
					row.original.originFees?.supplierTransport,
					getIntegrationById
				),
		},

		{
			header: `${t({ id: 'saleRuleDetail.fulfillmentPackaging' })}`,
			id: LogisticRuleListTableKeys.packaging,
			cell: ({ row }) =>
				formatLogisticFees(
					// @ts-expect-error for some reason api is camel case but type is pascal case
					row.original.originFees?.packaging,
					getIntegrationById
				),
		},

		{
			header: `${t({ id: 'saleRuleDetail.fulfillmentDispatching' })}`,
			id: LogisticRuleListTableKeys.dispatching,
			cell: ({ row }) =>
				formatLogisticFees(
					// @ts-expect-error for some reason api is camel case but type is pascal case
					row.original.originFees?.dispatching,
					getIntegrationById
				),
		},

		{
			header: `${t({ id: 'saleRuleDetail.fulfillmentStorage' })}`,
			id: 'storage',
			cell: ({ row }) =>
				formatLogisticFees(
					// @ts-expect-error for some reason api is camel case but type is pascal case
					row.original.originFees?.storage,
					getIntegrationById
				),
		},
		{
			header: `${t({ id: 'saleRuleDetail.fulfillmentCompletion' })}`,
			id: LogisticRuleListTableKeys.completion,
			cell: ({ row }) => {
				return formatLogisticFees(
					// @ts-expect-error for some reason api is camel case but type is pascal case
					row.original.originFees?.completion,
					getIntegrationById
				);
			},
		},

		{
			header: `${t({ id: 'saleRuleDetail.state' })}`,
			id: LogisticRuleListTableKeys.state,
			enableSorting: false,
			accessorFn: (row) => row.state,
			cell: ({ row }) => {
				const state = row.original.state;
				if (!state) return '';

				const localized = t({ id: FeeRuleStateLocaleMap[state] });

				return localized;
			},
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions: Object.entries(FeeRuleStateLocaleMap).map(
					([value, label]) => [value, t({ id: label })] as [string, string]
				),
			},
		},
		{
			header: `${t({ id: 'saleRuleDetail.actions' })}`,
			cell: ({ row }) => {
				const state = row.original.state;

				if (isOnlyDynamicFeePermission) return;

				switch (state) {
					case VinistoHelperDllEnumsFeeRuleFeeRuleState.Active:
						return (
							<button
								className="btn btn-primary"
								onClick={() => handleOnClickDeactivate(row.original.id)}
							>
								{t({ id: 'feeRule.deactivate' })}
							</button>
						);

					case VinistoHelperDllEnumsFeeRuleFeeRuleState.Scheduled:
						return (
							<span className="d-flex gap-2">
								<button
									className="btn btn-primary"
									onClick={() => handleOnClickDeactivate(row.original.id)}
								>
									{t({ id: 'feeRule.deactivate' })}
								</button>
							</span>
						);

					case VinistoHelperDllEnumsFeeRuleFeeRuleState.Concept:
						return (
							<span className="d-flex gap-2">
								<button
									className="btn btn-primary"
									onClick={() => handleOnClickActivate(row.original.id)}
								>
									{t({ id: 'feeRule.activate' })}
								</button>
								<button
									className="btn btn-primary"
									onClick={() => handleOnClickEdit(row.original)}
								>
									{t({ id: 'feeRule.edit' })}
								</button>
							</span>
						);

					case VinistoHelperDllEnumsFeeRuleFeeRuleState.Inactive:
						return null;

					default:
						return null;
				}
			},
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const changeFeeRuleState = (
		id: string,
		state: VinistoHelperDllEnumsFeeRuleFeeRuleState
	) => {
		feeRuleService
			.updateLogisticFeeRule(id, {
				state: {
					hasValue: true,
					value: state,
				},
				userLoginHash: loginHash,
			})
			.then(() => {
				toast.success(`${t({ id: 'feeRule.stateChange.success' })}`);
				dispatch({ type: PageListAction.setShouldReload, value: true });
			})
			.catch((e) => {
				if (e instanceof ApiError && e.message.includes('Conflict')) {
					toast.error(`${t({ id: 'feeRule.collision' })}`);
					return;
				}
			});
	};

	const handleOnClickActivate = (id: string) => {
		changeFeeRuleState(id, VinistoHelperDllEnumsFeeRuleFeeRuleState.Active);
	};

	const handleOnClickDeactivate = (id: string) => {
		changeFeeRuleState(id, VinistoHelperDllEnumsFeeRuleFeeRuleState.Inactive);
	};

	const getFeeValue = (feeObj: any, platformId: number, property: string) => {
		if (!feeObj) return undefined;

		const fee = feeObj.find((f: any) => f.platformId === platformId);
		return fee ? fee[property]?.toString() : undefined;
	};

	const handleOnClickEdit = (row: LogisticRuleList) => {
		setFormInitialValues({
			id: row.id,
			originCountry: row.originCountry,
			destinationCountry: row.destinationCountry,
			validFrom: row.validFrom
				? dayjsInstance.unix(row.validFrom).toDate()
				: undefined,
			validTo: row.validTo
				? dayjsInstance.unix(row.validTo).toDate()
				: undefined,
			productType: row.specifications.find(
				(spec) => spec.definitionId === SPECIFICATION_ID_TYPE
			)?.allowedValues[0],
			kind: row.specifications.find(
				(spec) => spec.definitionId === SPECIFICATION_ID_KIND
			)?.allowedValues[0],
			priceFrom: row.bundlePriceFrom ?? undefined,
			priceTo: row.bundlePriceTo ?? undefined,

			// Extract all fee values
			supplierTransportB2CAmount: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.supplierTransport,
				0,
				'fixedPrice'
			),
			supplierTransportB2CPercent: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.supplierTransport,
				0,
				'percentage'
			),
			supplierTransportB2BAmount: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.supplierTransport,
				1,
				'fixedPrice'
			),
			supplierTransportB2BPercent: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.supplierTransport,
				1,
				'percentage'
			),

			vinistoTransportB2CAmount: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.vinistoTransport,
				0,
				'fixedPrice'
			),
			vinistoTransportB2CPercent: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.vinistoTransport,
				0,
				'percentage'
			),
			vinistoTransportB2BAmount: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.vinistoTransport,
				1,
				'fixedPrice'
			),
			vinistoTransportB2BPercent: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.vinistoTransport,
				1,
				'percentage'
			),

			dispatchingB2CAmount: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.dispatching,
				0,
				'fixedPrice'
			),
			dispatchingB2CPercent: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.dispatching,
				0,
				'percentage'
			),
			dispatchingB2BAmount: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.dispatching,
				1,
				'fixedPrice'
			),
			dispatchingB2BPercent: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.dispatching,
				1,
				'percentage'
			),

			packagingB2CAmount: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.packaging,
				0,
				'fixedPrice'
			),
			packagingB2CPercent: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.packaging,
				0,
				'percentage'
			),
			packagingB2BAmount: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.packaging,
				1,
				'fixedPrice'
			),
			packagingB2BPercent: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.packaging,
				1,
				'percentage'
			),
			completionB2CAmount: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.completion,
				0,
				'fixedPrice'
			),
			completionB2CPercent: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.completion,
				0,
				'percentage'
			),
			completionB2BAmount: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.completion,
				1,
				'fixedPrice'
			),
			completionB2BPercent: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.completion,
				1,
				'percentage'
			),

			storageB2CAmount: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.storage,
				0,
				'fixedPrice'
			),
			storageB2CPercent: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.storage,
				0,
				'percentage'
			),
			storageB2BAmount: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.storage,
				1,
				'fixedPrice'
			),
			storageB2BPercent: getFeeValue(
				// @ts-expect-error for some reason api is camel case but type is pascal case
				row.originFees?.storage,
				1,
				'percentage'
			),

			name: row.name ?? undefined,
			note: row.note ?? undefined,
		});

		setIsEditModalOpen(true);
	};

	const createLogisticFeeRule = async (data: LogisticFeeRuleFormValues) => {
		await feeRuleService
			.createLogisticFeeRule({
				userLoginHash: loginHash,
				destinationCountry:
					data.destinationCountry as VinistoHelperDllEnumsCountryCode,
				originCountry: data.originCountry as VinistoHelperDllEnumsCountryCode,
				bundlePriceFrom: data.priceFrom ?? null,
				bundlePriceTo: data.priceTo ?? null,
				specifications: [
					{
						specificationDefinitionId: SPECIFICATION_ID_TYPE,
						specificationType: 'MULTI_COMBO_BOX',
						// @ts-ignore product type is array of objects
						allowedValues: data.productType?.map((type) => type.value) ?? [],
					},
					{
						specificationDefinitionId: SPECIFICATION_ID_KIND,
						specificationType: 'MULTI_COMBO_BOX',
						// @ts-ignore product kind is array of objects
						allowedValues: data.kind?.map((kind) => kind.value) ?? [],
					},
				],
				validFrom: dayjsInstance(data.validFrom).unix(),
				validTo: data.validTo ? dayjsInstance(data.validTo).unix() : undefined,
				note: data.note,
				name: data.name ?? '',
				state: data.flags?.save
					? VinistoHelperDllEnumsFeeRuleFeeRuleState.Concept
					: VinistoHelperDllEnumsFeeRuleFeeRuleState.Active,
				warehouseId: WAREHOUSE_DATABASE_ID,
				originFees: {
					SupplierTransport: [
						{
							platformId: 0,
							fixedPrice: Number(data.supplierTransportB2CAmount) ?? null,
							percentage: Number(data.supplierTransportB2CPercent) ?? null,
						},
						{
							platformId: 1,
							fixedPrice: Number(data.supplierTransportB2BAmount) ?? null,
							percentage: Number(data.supplierTransportB2BPercent) ?? null,
						},
					],
					VinistoTransport: [
						{
							platformId: 0,
							fixedPrice: Number(data.vinistoTransportB2CAmount) ?? null,
							percentage: Number(data.vinistoTransportB2CPercent) ?? null,
						},
						{
							platformId: 1,
							fixedPrice: Number(data.vinistoTransportB2BAmount) ?? null,
							percentage: Number(data.vinistoTransportB2BPercent) ?? null,
						},
					],
					Dispatching: [
						{
							platformId: 0,
							fixedPrice: Number(data.dispatchingB2CAmount) ?? null,
							percentage: Number(data.dispatchingB2CPercent) ?? null,
						},
						{
							platformId: 1,
							fixedPrice: Number(data.dispatchingB2BAmount) ?? null,
							percentage: Number(data.dispatchingB2BPercent) ?? null,
						},
					],
					Packaging: [
						{
							platformId: 0,
							fixedPrice: Number(data.packagingB2CAmount) ?? null,
							percentage: Number(data.packagingB2CPercent) ?? null,
						},
						{
							platformId: 1,
							fixedPrice: Number(data.packagingB2BAmount) ?? null,
							percentage: Number(data.packagingB2BPercent) ?? null,
						},
					],
					Completion: [
						{
							platformId: 0,
							fixedPrice: Number(data.completionB2CAmount) ?? null,
							percentage: Number(data.completionB2CPercent) ?? null,
						},
						{
							platformId: 1,
							fixedPrice: Number(data.completionB2BAmount) ?? null,
							percentage: Number(data.completionB2BPercent) ?? null,
						},
					],
					Storage: [
						{
							platformId: 0,
							fixedPrice: Number(data.storageB2CAmount) ?? null,
							percentage: Number(data.storageB2CPercent) ?? null,
						},
						{
							platformId: 1,
							fixedPrice: Number(data.storageB2BAmount) ?? null,
							percentage: Number(data.storageB2BPercent) ?? null,
						},
					],
				},
			})
			.then(() => {
				toast.success(`${t({ id: 'feeRule.create.success' })}`);
			});
	};

	const updateLogisticFeeRule = async (data: LogisticFeeRuleFormValues) => {
		if (!data.id) {
			toast.error('DEV Error: FeeRule ID is missing in update action.');
			return;
		}

		let specifications = null;
		if (Array.isArray(data.productType) && Array.isArray(data.kind)) {
			specifications = patchValue([
				{
					specificationDefinitionId: SPECIFICATION_ID_TYPE,
					specificationType: 'MULTI_COMBO_BOX',
					allowedValues: data.productType?.map((type) => type.value) ?? [],
				},
				{
					specificationDefinitionId: SPECIFICATION_ID_KIND,
					specificationType: 'MULTI_COMBO_BOX',
					allowedValues: data.kind?.map((kind) => kind.value) ?? [],
				},
			]);
		} else if (Array.isArray(data.productType)) {
			specifications = patchValue([
				{
					specificationDefinitionId: SPECIFICATION_ID_TYPE,
					specificationType: 'MULTI_COMBO_BOX',
					allowedValues: data.productType?.map((type) => type.value) ?? [],
				},
				{
					specificationDefinitionId: SPECIFICATION_ID_KIND,
					specificationType: 'MULTI_COMBO_BOX',
					allowedValues: [data.kind],
				},
			]);
		} else if (Array.isArray(data.kind)) {
			specifications = patchValue([
				{
					specificationDefinitionId: SPECIFICATION_ID_TYPE,
					specificationType: 'MULTI_COMBO_BOX',
					allowedValues: [data.productType],
				},
				{
					specificationDefinitionId: SPECIFICATION_ID_KIND,
					specificationType: 'MULTI_COMBO_BOX',
					allowedValues: data.kind?.map((type) => type.value) ?? [],
				},
			]);
		}

		await feeRuleService
			.updateLogisticFeeRule(data.id, {
				userLoginHash: loginHash,
				state: {
					hasValue: true,
					value: data.flags?.save
						? VinistoHelperDllEnumsFeeRuleFeeRuleState.Concept
						: VinistoHelperDllEnumsFeeRuleFeeRuleState.Active,
				},
				bundlePriceFrom: { hasValue: true, value: data.priceFrom ?? null },
				bundlePriceTo: { hasValue: true, value: data.priceTo ?? null },
				validFrom: patchValue(dayjsInstance(data.validFrom).unix()),
				validTo: patchValue(
					data.validTo ? dayjsInstance(data.validTo).unix() : undefined
				),
				note: {
					hasValue: true,
					value: data.note ?? null,
				},
				name: patchValue(data.name),
				specifications,
				originFees: {
					hasValue: true,
					value: {
						SupplierTransport: [
							{
								platformId: 0,
								fixedPrice: Number(data.supplierTransportB2CAmount) ?? null,
								percentage: Number(data.supplierTransportB2CPercent) ?? null,
							},
							{
								platformId: 1,
								fixedPrice: Number(data.supplierTransportB2BAmount) ?? null,
								percentage: Number(data.supplierTransportB2BPercent) ?? null,
							},
						],
						VinistoTransport: [
							{
								platformId: 0,
								fixedPrice: Number(data.vinistoTransportB2CAmount) ?? null,
								percentage: Number(data.vinistoTransportB2CPercent) ?? null,
							},
							{
								platformId: 1,
								fixedPrice: Number(data.vinistoTransportB2BAmount) ?? null,
								percentage: Number(data.vinistoTransportB2BPercent) ?? null,
							},
						],
						Dispatching: [
							{
								platformId: 0,
								fixedPrice: Number(data.dispatchingB2CAmount) ?? null,
								percentage: Number(data.dispatchingB2CPercent) ?? null,
							},
							{
								platformId: 1,
								fixedPrice: Number(data.dispatchingB2BAmount) ?? null,
								percentage: Number(data.dispatchingB2BPercent) ?? null,
							},
						],
						Packaging: [
							{
								platformId: 0,
								fixedPrice: Number(data.packagingB2CAmount) ?? null,
								percentage: Number(data.packagingB2CPercent) ?? null,
							},
							{
								platformId: 1,
								fixedPrice: Number(data.packagingB2BAmount) ?? null,
								percentage: Number(data.packagingB2BPercent) ?? null,
							},
						],
						Completion: [
							{
								platformId: 0,
								fixedPrice: Number(data.completionB2CAmount) ?? null,
								percentage: Number(data.completionB2CPercent) ?? null,
							},
							{
								platformId: 0,
								fixedPrice: Number(data.completionB2BAmount) ?? null,
								percentage: Number(data.completionB2BPercent) ?? null,
							},
						],
						Storage: [
							{
								platformId: 0,
								fixedPrice: Number(data.storageB2CAmount) ?? null,
								percentage: Number(data.storageB2CPercent) ?? null,
							},
							{
								platformId: 1,
								fixedPrice: Number(data.storageB2BAmount) ?? null,
								percentage: Number(data.storageB2BPercent) ?? null,
							},
						],
					},
				},
			})
			.then(() => {
				toast.success(`${t({ id: 'feeRule.update.success' })}`);
			});
	};

	const onSubmitCreateLogisticRule = async (
		data: LogisticFeeRuleFormValues
	) => {
		setFormData({ ...data });

		try {
			await createLogisticFeeRule(data);
			notificationsContext.handleShowSuccessNotification(
				`${t({ id: 'feeRule.create.success' })}`
			);
		} catch (error) {
			if (
				error instanceof ApiError &&
				error.message.toLowerCase().match(/id:\s(\w+)/)
			) {
				// Conflict with logistic fee rule id: 67d84e54051c6c8fc6f6251b
				// I need to parse the id from the string (potentially name if provided in the future)
				handleConflictingFeeRuleApiError(error, setConflictingId);
			} else {
				notificationsContext.handleShowErrorNotification(
					`${t({ id: 'feeRule.create.error' })}`
				);
			}
		}
		setIsCreateModalOpen(false);
		dispatch({ type: PageListAction.setShouldReload, value: true });
	};

	const onSubmitUpdateLogisticRule = async (
		data: LogisticFeeRuleFormValues
	) => {
		setFormData(data);

		try {
			await updateLogisticFeeRule(data);
			notificationsContext.handleShowSuccessNotification(
				`${t({ id: 'feeRule.update.success' })}`
			);
		} catch (error) {
			if (
				error instanceof ApiError &&
				error.message.toLowerCase().match(/id:\s(\w+)/)
			) {
				// Conflict with logistic fee rule id: 67d84e54051c6c8fc6f6251b
				// I need to parse the id from the string (potentially name if provided in the future)
				handleConflictingFeeRuleApiError(error, setConflictingId);
			} else {
				notificationsContext.handleShowErrorNotification(
					`${t({ id: 'feeRule.update.error' })}`
				);
			}
		}
		setIsEditModalOpen(false);
		dispatch({ type: PageListAction.setShouldReload, value: true });
	};

	useEffect(() => {
		const apiParams: ApiGetParam[] = [
			{ key: 'limit', value: state.limit },
			{ key: 'offset', value: state.offset },
			{ key: 'Type', value: VinistoHelperDllEnumsFeeRuleFeeRuleType.Logistic },
			{ key: 'OriginCountry', value: originCountry },
			{ key: 'DestinationCountry', value: destinationCountry },
			{ key: 'UserLoginHash', value: loginHash },
		];

		const [sortColumn] = state.sorting;

		if (sortColumn?.id) {
			if (sortColumn.id === LogisticRuleListTableKeys.validityRange) {
				apiParams.push({
					key: 'SortingColumn',
					value: FEE_RULE_SORTING_COLUMN_KEYS.validFrom,
				});
			}
			if (sortColumn.id === LogisticRuleListTableKeys.priceRange) {
				apiParams.push({
					key: 'SortingColumn',
					value: FEE_RULE_SORTING_COLUMN_KEYS.bundlePriceFrom,
				});
			}
			if (sortColumn.id === LogisticRuleListTableKeys.specifications.type) {
				apiParams.push({
					key: 'SortingColumn',
					value: FEE_RULE_SORTING_COLUMN_KEYS.type,
				});
			}
			if (sortColumn.id === LogisticRuleListTableKeys.specifications.kind) {
				apiParams.push({
					key: 'SortingColumn',
					value: FEE_RULE_SORTING_COLUMN_KEYS.kind,
				});
			}
			apiParams.push({
				key: 'IsSortingDescending',
				value: sortColumn.desc ? 'true' : 'false',
			});
		}

		state.filters?.forEach(({ id, value }: { id: string; value: any }) => {
			if (id === LogisticRuleListTableKeys.state) {
				apiParams.push({
					key: FEE_RULE_FILTER_KEYS.state,
					value: value,
				});
			}

			if (id === LogisticRuleListTableKeys.name) {
				apiParams.push({
					key: FEE_RULE_FILTER_KEYS.name,
					value: value,
				});
			}

			if (id === LogisticRuleListTableKeys.specifications.type) {
				apiParams.push({
					key: FEE_RULE_FILTER_KEYS.bundleType,
					value: value,
				});
			}

			if (id === LogisticRuleListTableKeys.specifications.kind) {
				apiParams.push({
					key: FEE_RULE_FILTER_KEYS.bundleKind,
					value: value,
				});
			}
			if (id === LogisticRuleListTableKeys.validityRange) {
				const [validFrom, validTo] = value.split(':');

				apiParams.push({
					key: FEE_RULE_FILTER_KEYS.validFrom,
					value: validFrom,
				});
				apiParams.push({
					key: FEE_RULE_FILTER_KEYS.validTo,
					value: validTo,
				});
			}
			if (id === LogisticRuleListTableKeys.priceRange) {
				const [priceFrom, priceTo] = value.split(':');
				apiParams.push({
					key: FEE_RULE_FILTER_KEYS.bundlePriceFrom,
					value: priceFrom ?? 0,
				});
				apiParams.push({
					key: FEE_RULE_FILTER_KEYS.bundlePriceTo,
					value: priceTo ?? 1000000,
				});
			}
		});

		fetchData(
			FEE_RULE_LIST_ENDPOINT,
			apiParams,
			(payload) => payload?.feeRules ?? [],
			'feeRules.loadingError',
			API_METHOD.GET
		);
	}, [state, originCountry, destinationCountry, loginHash, fetchData]);

	return (
		<div className="col-12">
			<FeeRulesHealthCheck
				type={VinistoHelperDllEnumsFeeRuleFeeRuleType.Logistic}
				originCountry={originCountry as VinistoHelperDllEnumsCountryCode}
				destinationCountry={
					destinationCountry as VinistoHelperDllEnumsCountryCode
				}
			/>
			<div className="card mb-4">
				<div className={styles.wrap}>
					<CountrySelector
						sourceCountry={originCountry as VinistoHelperDllEnumsCountryCode}
						setSourceCountry={setOriginCountry}
						targetCountry={
							destinationCountry as VinistoHelperDllEnumsCountryCode
						}
						setTargetCountry={setDestinationCountry}
					/>
					{!isOnlyDynamicFeePermission && (
						<button
							className="btn btn-primary"
							onClick={handleClickCreateNewRule}
						>
							{t({ id: 'feeRule.createNewRule' })}
						</button>
					)}
				</div>
			</div>
			<AdminListPage<LogisticRuleList>
				adminTableSchema={adminTableSchema}
				handleOnTableRowClick={() => {}}
				handlers={handlers}
				state={state as any}
				pageCount={pageCount}
				pageNumber={pageNumber}
				adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
				columnOrder={[
					LogisticRuleListTableKeys.name,
					LogisticRuleListTableKeys.specifications.type,
					LogisticRuleListTableKeys.specifications.kind,
					LogisticRuleListTableKeys.validityRange,
					LogisticRuleListTableKeys.priceRange,
					LogisticRuleListTableKeys.vinistoTransport,
					LogisticRuleListTableKeys.supplierTransport,
					LogisticRuleListTableKeys.packaging,
					LogisticRuleListTableKeys.dispatching,
					LogisticRuleListTableKeys.storage,
					LogisticRuleListTableKeys.completion,
					LogisticRuleListTableKeys.state,
				]}
			/>
			<Modal
				title={`${t({ id: 'feeRule.create' })}`}
				show={isCreateModalOpen}
				handleClose={() => setIsCreateModalOpen(false)}
			>
				<CreateLogisticRuleForm
					handleSubmit={(data) => onSubmitCreateLogisticRule(data)}
					initialValues={{
						originCountry,
						destinationCountry,
					}}
				/>
			</Modal>

			<Modal
				title={`${t({ id: 'feeRule.edit' })}`}
				show={isEditModalOpen}
				handleClose={() => setIsEditModalOpen(false)}
			>
				<CreateLogisticRuleForm
					handleSubmit={(data) => onSubmitUpdateLogisticRule(data)}
					initialValues={formInitialValues}
				/>
			</Modal>

			{conflictModal}
		</div>
	);
};

export default LogisticRulesPage;
