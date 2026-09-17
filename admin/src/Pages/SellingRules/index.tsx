import { useContext, useEffect, useState } from 'react';
import CountrySelector from 'Components/CountrySelector';
import AdminListPage from 'Components/AdminListPage';
import { ApiGetParam } from 'Hooks/useAdminTable/interfaces';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';
import useAdminTable from 'Hooks/useAdminTable';
import { Modal } from 'Components/Modal';
import useTableSchema from 'Hooks/useTableSchema';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { IntegrationContext } from 'Services/IntergationService';
import {
	dayjsInstance,
	SPECIFICATION_ID_KIND,
	SPECIFICATION_ID_TYPE,
} from 'vinisto_shared';
import { SaleFeeRuleFormValues } from 'Components/Forms/CreateSellingRule/interfaces';
import SaleFeeRuleForm from 'Components/Forms/CreateSellingRule';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import {
	B2B_NUMERIC_CODE,
	B2C_NUMERIC_CODE,
} from 'Services/IntergationService/constants';
import { toast } from 'react-toastify';
import { StringParam, useQueryParam, withDefault } from 'Helpers/query-params';
import { TablePopover } from 'vinisto_ui';
import FeeRulesHealthCheck from 'Components/FeeRulesHealthCheck';
import { useFeeRuleConflict } from 'Hooks/useFeeRuleConflict';

import {
	formatFeeRulePriceRange,
	formatFeeRuleValidityRange,
	formatFees,
} from './helpers';
import styles from './styles.module.css';

const FEE_RULE_LIST_ENDPOINT = 'supplier-api/admin/fee-rules';
import {
	VinistoCommonDllModelsApiSpecificationsBaseSpecification,
	VinistoFeeSystemModelsFeeRuleSaleFeeRule,
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsFeeRuleFeeRuleState,
	VinistoHelperDllEnumsFeeRuleFeeRuleType,
} from '@/api-types/supplier-api';
import feeRuleService from '@/supplier-service/fee-rule';
import { patchValue } from '@/shared';
import { ApiError } from '@/domain/error';

type SaleRuleList = Omit<
	VinistoFeeSystemModelsFeeRuleSaleFeeRule,
	'specifications'
> & {
	id: string;
	// either this or assert that specification is type multi_combo_box
	specifications: ({
		allowedValues: string[];
	} & VinistoCommonDllModelsApiSpecificationsBaseSpecification)[];
	// for some reason the "B" becomes lowercase in row data.
	originFees: {
		[B2C_NUMERIC_CODE]: {
			fixedPrice: number;
			percentage: number;
		};
		[B2B_NUMERIC_CODE]: {
			fixedPrice: number;
			percentage: number;
		};
	};
	destinationFees: {
		[B2C_NUMERIC_CODE]: {
			fixedPrice: number;
			percentage: number;
		};
		[B2B_NUMERIC_CODE]: {
			fixedPrice: number;
			percentage: number;
		};
	};
};

type SaleRuleListTableRow = Omit<
	VinistoFeeSystemModelsFeeRuleSaleFeeRule,
	'specifications'
> & {
	id: string;
	specifications: ({
		allowedValues: string[];
	} & VinistoCommonDllModelsApiSpecificationsBaseSpecification)[];
};

const SaleRuleListTableKeys = {
	specifications: {
		type: 'type',
		kind: 'kind',
	},
	originFees: 'originFees',
	destinationFees: 'destinationFees',
	validityRange: 'validityRange',
	priceRange: 'priceRange',
	state: 'state',
	bundleCount: 'bundleCount',
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
	setConflictingId: (id: string) => void
) => {
	if (error instanceof ApiError) {
		// e.message is a string. it looks like this:
		// Conflict with sale fee rule id: 67d84e54051c6c8fc6f6251b
		// I need to parse the id from the string (potentially name if provided in the future)
		const conflictingId =
			error.message.toLowerCase().match(/id:\s(\w+)/)?.[1] || '';
		setConflictingId(conflictingId);
	}
};

const SellingRulesPage = () => {
	const { loginHash, permissions } = useContext(
		AuthenticationContext
	).vinistoUser;

	const { getIntegrationById } = useContext(IntegrationContext);

	const isOnlyDynamicFeePermission =
		permissions.includes('USER_ADMIN_DYNAMIC_FEE_RULE') &&
		!permissions.includes('USER_ADMIN_FEE_RULE');

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [formData, setFormData] = useState<SaleFeeRuleFormValues>();

	const onClickSaveAsConcept = async () => {
		if (!formData) {
			toast.error('DEV Error: Form data is missing in save as concept action.');
			return;
		}

		if (formData.id) {
			await updateSaleFeeRule({
				...formData,
				flags: {
					save: true,
				},
			});
		} else {
			await createSaleFeeRule({
				...formData,
				flags: {
					save: true,
				},
			});
		}

		dispatch({ type: PageListAction.setShouldReload, value: true });
		setFormData(undefined);
	};

	const { modal: conflictModal, setConflictingId } = useFeeRuleConflict({
		onClickSaveAsConcept,
	});

	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const getTableSchema = useTableSchema<SaleRuleList>();
	const { fetchData, handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable<SaleRuleListTableRow>();

	const [originCountry, setOriginCountry] = useQueryParam(
		'originCountry',
		withDefault(StringParam, VinistoHelperDllEnumsCountryCode.CZ)
	);
	const [destinationCountry, setDestinationCountry] = useQueryParam(
		'destinationCountry',
		withDefault(StringParam, VinistoHelperDllEnumsCountryCode.CZ)
	);

	const [formInitialValues, setFormInitialValues] =
		useState<SaleFeeRuleFormValues>({
			originCountry: originCountry as VinistoHelperDllEnumsCountryCode,
			destinationCountry:
				destinationCountry as VinistoHelperDllEnumsCountryCode,
		});

	const handleClickCreateNewRule = () => {
		setIsCreateModalOpen(true);
	};

	const tableSchema: TableSchema<SaleRuleList> = [
		{
			enableColumnFilter: true,
			header: `${t({ id: 'saleRuleDetail.specifications.type' })}`,
			id: SaleRuleListTableKeys.specifications.type,
			enableSorting: true,
			accessorFn: (row) => row.specifications,
			cell: ({ row }) => {
				const type = row.original.specifications?.find(
					(spec) => spec.definitionId === SPECIFICATION_ID_TYPE
				)?.allowedValues[0];

				const note = row.original.note;

				if (!type) return '';
				if (!note) return type;

				return (
					<TablePopover
						name={type}
						note={note}
					/>
				);
			},
		},
		{
			enableColumnFilter: true,
			header: `${t({ id: 'saleRuleDetail.specifications.kind' })}`,
			id: SaleRuleListTableKeys.specifications.kind,
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
			id: SaleRuleListTableKeys.validityRange,
			accessorFn: (row) => row.validFrom,
			cell: ({ row }) => formatFeeRuleValidityRange(row.original),
			meta: {
				filterType: AdminTableFilterType.RANGE_DATE,
			},
		},
		{
			header: `${t({ id: 'saleRuleDetail.priceRange' })}`,
			id: SaleRuleListTableKeys.priceRange,
			accessorFn: (row) => row.bundlePriceFrom,
			cell: ({ row }) =>
				formatFeeRulePriceRange(row.original, `${t({ id: 'CZK' })}`),
			meta: {
				filterType: AdminTableFilterType.NUMERIC,
			},
		},
		{
			header: `${t({ id: 'saleRuleDetail.originFees' })}`,
			id: SaleRuleListTableKeys.originFees,
			cell: ({ row }) =>
				formatFees(row.original.originFees, getIntegrationById),
		},
		{
			header: `${t({ id: 'saleRuleDetail.destinationFees' })}`,
			id: SaleRuleListTableKeys.destinationFees,
			cell: ({ row }) =>
				formatFees(row.original.destinationFees, getIntegrationById),
		},
		{
			header: `${t({ id: 'saleRuleDetail.state' })}`,
			id: SaleRuleListTableKeys.state,
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
			.updateSaleFeeRule(id, {
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

	const handleOnClickEdit = (row: SaleRuleList) => {
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
			originB2CAmount: row.originFees?.vinistoB2cLevel1?.fixedPrice?.toString(),
			originB2CPercent:
				row.originFees?.vinistoB2cLevel1?.percentage?.toString(),
			originB2BAmount: row.originFees?.vinistoB2bLevel1?.fixedPrice?.toString(),
			originB2BPercent:
				row.originFees?.vinistoB2bLevel1?.percentage?.toString(),
			destinationB2CAmount:
				row.destinationFees?.vinistoB2cLevel1?.fixedPrice?.toString(),
			destinationB2CPercent:
				row.destinationFees?.vinistoB2cLevel1?.percentage?.toString(),
			destinationB2BAmount:
				row.destinationFees?.vinistoB2bLevel1?.fixedPrice?.toString(),
			destinationB2BPercent:
				row.destinationFees?.vinistoB2bLevel1?.percentage?.toString(),
			note: row.note ?? undefined,
		});

		setIsEditModalOpen(true);
	};

	const createSaleFeeRule = async (data: SaleFeeRuleFormValues) => {
		await feeRuleService
			.createSaleFeeRule({
				userLoginHash: loginHash,
				destinationCountry:
					data.destinationCountry as VinistoHelperDllEnumsCountryCode,
				originCountry: data.originCountry as VinistoHelperDllEnumsCountryCode,
				bundlePriceFrom: data.priceFrom,
				bundlePriceTo: data.priceTo,
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
				state: data.flags?.save
					? VinistoHelperDllEnumsFeeRuleFeeRuleState.Concept
					: VinistoHelperDllEnumsFeeRuleFeeRuleState.Active,
				originFees: {
					[B2C_NUMERIC_CODE]: {
						fixedPrice: Number(data.originB2CAmount) ?? null,
						percentage: Number(data.originB2CPercent) ?? null,
					},
					[B2B_NUMERIC_CODE]: {
						fixedPrice: Number(data.originB2BAmount) ?? null,
						percentage: Number(data.originB2BPercent) ?? null,
					},
				},
				destinationFees: {
					[B2C_NUMERIC_CODE]: {
						fixedPrice: Number(data.destinationB2CAmount) ?? null,
						percentage: Number(data.destinationB2CPercent) ?? null,
					},
					[B2B_NUMERIC_CODE]: {
						fixedPrice: Number(data.destinationB2BAmount) ?? null,
						percentage: Number(data.destinationB2BPercent) ?? null,
					},
				},
			})
			.then(() => {
				toast.success(`${t({ id: 'feeRule.create.success' })}`);
			});
	};

	const updateSaleFeeRule = async (data: SaleFeeRuleFormValues) => {
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
			.updateSaleFeeRule(data.id, {
				userLoginHash: loginHash,
				state: data.flags?.save
					? patchValue(VinistoHelperDllEnumsFeeRuleFeeRuleState.Concept)
					: undefined,
				bundlePriceFrom: { hasValue: true, value: data.priceFrom ?? null },
				bundlePriceTo: { hasValue: true, value: data.priceTo ?? null },
				validFrom: {
					hasValue: true,
					value: data.validFrom ? dayjsInstance(data.validFrom).unix() : null,
				},
				validTo: {
					hasValue: true,
					value: data.validTo ? dayjsInstance(data.validTo).unix() : null,
				},
				note: {
					hasValue: true,
					value: data.note,
				},
				specifications,
				originFees: patchValue({
					VinistoB2cLevel1: {
						fixedPrice: Number(data.originB2CAmount) ?? null,
						percentage: Number(data.originB2CPercent) ?? null,
					},
					VinistoB2bLevel1: {
						fixedPrice: Number(data.originB2BAmount) ?? null,
						percentage: Number(data.originB2BPercent) ?? null,
					},
				}),
				destinationFees: patchValue({
					VinistoB2cLevel1: {
						fixedPrice: Number(data.destinationB2CAmount) ?? null,
						percentage: Number(data.destinationB2CPercent) ?? null,
					},
					VinistoB2bLevel1: {
						fixedPrice: Number(data.destinationB2BAmount) ?? null,
						percentage: Number(data.destinationB2BPercent) ?? null,
					},
				}),
			})
			.then(() => {
				toast.success(`${t({ id: 'feeRule.update.success' })}`);
			});
	};

	const onSubmitCreateSellingRule = async (data: SaleFeeRuleFormValues) => {
		setFormData({ ...data });

		try {
			await createSaleFeeRule(data);
		} catch (error) {
			if (
				error instanceof ApiError &&
				error.message.toLowerCase().match(/id:\s(\w+)/)
			) {
				// Conflict with logistic fee rule id: 67d84e54051c6c8fc6f6251b
				// I need to parse the id from the string (potentially name if provided in the future)
				handleConflictingFeeRuleApiError(error, setConflictingId);
			} else {
				toast.error(`${t({ id: 'feeRule.create.error' })}`);
			}
		}

		setIsCreateModalOpen(false);
		dispatch({ type: PageListAction.setShouldReload, value: true });
	};

	const onSubmitUpdateSellingRule = async (data: SaleFeeRuleFormValues) => {
		setFormData(data);

		try {
			await updateSaleFeeRule(data);
		} catch (error) {
			if (
				error instanceof ApiError &&
				error.message.toLowerCase().match(/id:\s(\w+)/)
			) {
				// Conflict with logistic fee rule id: 67d84e54051c6c8fc6f6251b
				// I need to parse the id from the string (potentially name if provided in the future)
				handleConflictingFeeRuleApiError(error, setConflictingId);
			} else {
				toast.error(`${t({ id: 'feeRule.create.error' })}`);
			}
		}

		setIsEditModalOpen(false);
		dispatch({ type: PageListAction.setShouldReload, value: true });
	};

	useEffect(() => {
		const apiParams: ApiGetParam[] = [
			{ key: 'Type', value: VinistoHelperDllEnumsFeeRuleFeeRuleType.Sale },
			{ key: 'OriginCountry', value: originCountry },
			{ key: 'DestinationCountry', value: destinationCountry },
			{ key: 'UserLoginHash', value: loginHash },
			{ key: 'Limit', value: state.limit },
			{ key: 'Offset', value: state.offset },
		];

		const [sortColumn] = state.sorting;

		if (sortColumn?.id) {
			if (sortColumn.id === SaleRuleListTableKeys.validityRange) {
				apiParams.push({
					key: 'SortingColumn',
					value: FEE_RULE_SORTING_COLUMN_KEYS.validFrom,
				});
			}
			if (sortColumn.id === SaleRuleListTableKeys.priceRange) {
				apiParams.push({
					key: 'SortingColumn',
					value: FEE_RULE_SORTING_COLUMN_KEYS.bundlePriceFrom,
				});
			}
			if (sortColumn.id === SaleRuleListTableKeys.specifications.type) {
				apiParams.push({
					key: 'SortingColumn',
					value: FEE_RULE_SORTING_COLUMN_KEYS.type,
				});
			}
			if (sortColumn.id === SaleRuleListTableKeys.specifications.kind) {
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
			if (id === SaleRuleListTableKeys.state) {
				apiParams.push({
					key: FEE_RULE_FILTER_KEYS.state,
					value: value,
				});
			}

			if (id === SaleRuleListTableKeys.specifications.type) {
				apiParams.push({
					key: FEE_RULE_FILTER_KEYS.bundleType,
					value: value,
				});
			}

			if (id === SaleRuleListTableKeys.specifications.kind) {
				apiParams.push({
					key: FEE_RULE_FILTER_KEYS.bundleKind,
					value: value,
				});
			}

			if (id === SaleRuleListTableKeys.validityRange) {
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
			if (id === SaleRuleListTableKeys.priceRange) {
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
				type={VinistoHelperDllEnumsFeeRuleFeeRuleType.Sale}
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
			<AdminListPage<SaleRuleList>
				adminTableSchema={adminTableSchema}
				handleOnTableRowClick={() => {}}
				handlers={handlers}
				state={state as any}
				pageCount={pageCount}
				pageNumber={pageNumber}
				adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
				columnOrder={[
					SaleRuleListTableKeys.specifications.type,
					SaleRuleListTableKeys.specifications.kind,
					SaleRuleListTableKeys.validityRange,
					SaleRuleListTableKeys.priceRange,
					SaleRuleListTableKeys.originFees,
					SaleRuleListTableKeys.destinationFees,
					SaleRuleListTableKeys.state,
					SaleRuleListTableKeys.bundleCount,
				]}
			/>
			<Modal
				title={`${t({ id: 'feeRule.create' })}`}
				show={isCreateModalOpen}
				handleClose={() => setIsCreateModalOpen(false)}
			>
				<SaleFeeRuleForm
					handleSubmit={(data) => onSubmitCreateSellingRule(data)}
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
				<SaleFeeRuleForm
					handleSubmit={(data) => onSubmitUpdateSellingRule(data)}
					initialValues={formInitialValues}
				/>
			</Modal>

			{conflictModal}
		</div>
	);
};

export default SellingRulesPage;
