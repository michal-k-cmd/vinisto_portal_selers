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
import { useFeeRuleConflict } from 'Hooks/useFeeRuleConflict';
import { IntegrationContext } from 'Services/IntergationService';
import {
	dayjsInstance,
	SPECIFICATION_ID_KIND,
	SPECIFICATION_ID_TYPE,
} from 'vinisto_shared';
import { DynamicFeeRuleFormValues } from 'Components/Forms/CreateDynamicRule/interfaces';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { toast } from 'react-toastify';
import { StringParam, useQueryParam, withDefault } from 'Helpers/query-params';
import CreateDynamicRuleForm from 'Components/Forms/CreateDynamicRule';
import { TablePopover } from 'vinisto_ui';
import {
	B2B_NUMERIC_CODE,
	B2C_NUMERIC_CODE,
} from 'Services/IntergationService/constants';

import {
	formatFeeCondition,
	formatFeeRulePriceRange,
	formatFeeRuleValidityRange,
	formatFees,
} from '../SellingRules/helpers';

import styles from './styles.module.css';

import {
	VinistoCommonDllModelsApiSpecificationsBaseSpecification,
	VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule,
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsFeeRuleFeeRuleState,
	VinistoHelperDllEnumsFeeRuleFeeRuleType,
} from '@/api-types/supplier-api';
import feeRuleService from '@/supplier-service/fee-rule';
import { ApiError } from '@/domain/error';

const FEE_RULE_LIST_ENDPOINT = 'supplier-api/admin/fee-rules';

type DynamicRuleList = Omit<
	VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule,
	'specifications'
> & {
	id: string;
	// either this or assert that specification is type multi_combo_box
	specifications: ({
		allowedValues: string[];
	} & VinistoCommonDllModelsApiSpecificationsBaseSpecification)[];
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

type DynamicRuleListTableRow = Omit<
	VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule,
	'specifications'
> & {
	id: string;
	specifications: ({
		allowedValues: string[];
	} & VinistoCommonDllModelsApiSpecificationsBaseSpecification)[];
};

const DynamicRuleListTableKeys = {
	name: 'name',
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
	condition: 'condition',
	full: 'full',
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

// Add a new interface that extends DynamicFeeRuleFormValues to include the flags property
interface DynamicFeeRuleFormValuesWithFlags extends DynamicFeeRuleFormValues {
	flags?: {
		save: boolean;
	};
}

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

const DynamicSellingRulesPage = () => {
	const { loginHash } = useContext(AuthenticationContext).vinistoUser;
	const { getIntegrationById } = useContext(IntegrationContext);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [formData, setFormData] = useState<DynamicFeeRuleFormValuesWithFlags>();

	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const getTableSchema = useTableSchema<DynamicRuleList>();
	const { fetchData, handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable<DynamicRuleListTableRow>();

	const [originCountry, setOriginCountry] = useQueryParam(
		'originCountry',
		withDefault(StringParam, VinistoHelperDllEnumsCountryCode.CZ)
	);
	const [destinationCountry, setDestinationCountry] = useQueryParam(
		'destinationCountry',
		withDefault(StringParam, VinistoHelperDllEnumsCountryCode.CZ)
	);

	const [formInitialValues, setFormInitialValues] = useState<
		Omit<Partial<DynamicFeeRuleFormValues>, 'originFees' | 'destinationFees'>
	>({
		originCountry: originCountry as VinistoHelperDllEnumsCountryCode,
		destinationCountry: destinationCountry as VinistoHelperDllEnumsCountryCode,
	});

	const onClickSaveAsConcept = async () => {
		if (!formData) {
			toast.error('DEV Error: Form data is missing in save as concept action.');
			return;
		}

		if (formData.id) {
			await updateDynamicFeeRule({
				...formData,
				flags: {
					save: true,
				},
			});
		} else {
			await createDynamicFeeRule({
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

	const handleClickCreateNewRule = () => {
		setIsCreateModalOpen(true);
	};

	const tableSchema: TableSchema<DynamicRuleList> = [
		{
			header: `${t({ id: 'saleRuleDetail.name' })}`,
			id: DynamicRuleListTableKeys.name,
			accessorKey: DynamicRuleListTableKeys.name,
			enableColumnFilter: true,
			enableSorting: false,
			accessorFn: (row) => row.name,
			cell: ({ row }) => {
				const name = row.original.name;
				const note = row.original.note;

				if (!note) return name;
				return (
					<TablePopover
						name={name ?? ''}
						note={note}
					/>
				);
			},
		},
		{
			enableColumnFilter: false,
			header: `${t({ id: 'saleRuleDetail.condition' })}`,
			id: DynamicRuleListTableKeys.condition,
			enableSorting: false,
			accessorFn: (row) => row.specifications,
			cell: ({ row }) => {
				return formatFeeCondition(
					row.original.categoryNames ?? [],
					row.original.supplierNames ?? [],
					row.original.bundleNames ?? [],
					row.original.tagNames ?? []
				);
			},
		},
		{
			enableColumnFilter: true,
			header: `${t({ id: 'saleRuleDetail.specifications.type' })}`,
			id: DynamicRuleListTableKeys.specifications.type,
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
			id: DynamicRuleListTableKeys.specifications.kind,
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
			id: DynamicRuleListTableKeys.validityRange,
			accessorFn: (row) => row.validFrom,
			cell: ({ row }) => formatFeeRuleValidityRange(row.original),
			meta: {
				filterType: AdminTableFilterType.RANGE_DATE,
			},
		},
		{
			header: `${t({ id: 'saleRuleDetail.priceRange' })}`,
			id: DynamicRuleListTableKeys.priceRange,
			accessorFn: (row) => row.bundlePriceFrom,
			cell: ({ row }) =>
				formatFeeRulePriceRange(row.original, `${t({ id: 'CZK' })}`),
			meta: {
				filterType: AdminTableFilterType.NUMERIC,
			},
		},
		{
			header: `${t({ id: 'saleRuleDetail.originFees' })}`,
			id: DynamicRuleListTableKeys.originFees,
			cell: ({ row }) =>
				formatFees(row.original.originFees, getIntegrationById),
		},
		{
			header: `${t({ id: 'saleRuleDetail.destinationFees' })}`,
			id: DynamicRuleListTableKeys.destinationFees,
			cell: ({ row }) =>
				formatFees(row.original.destinationFees, getIntegrationById),
		},
		{
			header: `${t({ id: 'saleRuleDetail.state' })}`,
			id: DynamicRuleListTableKeys.state,
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
			.updateDynamicFeeRule(id, {
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
			.catch((e: ApiError) => {
				toast.error(`${e.message}`);
			});
	};

	const handleOnClickActivate = (id: string) => {
		changeFeeRuleState(id, VinistoHelperDllEnumsFeeRuleFeeRuleState.Active);
	};

	const handleOnClickDeactivate = (id: string) => {
		changeFeeRuleState(id, VinistoHelperDllEnumsFeeRuleFeeRuleState.Inactive);
	};

	const handleOnClickEdit = (row: DynamicRuleList) => {
		setFormInitialValues({
			...row,
			// This is an unfortunate workaround to the fact that in react-final-form,
			// It is not possible to have a numeric field name
			originFees: {
				vinistoB2cLevel1: {
					fixedPrice: row.originFees?.[B2C_NUMERIC_CODE].fixedPrice ?? 0,
					percentage: row.originFees?.[B2B_NUMERIC_CODE].percentage ?? 0,
				},
				vinistoB2bLevel1: {
					fixedPrice: row.originFees?.[B2C_NUMERIC_CODE].fixedPrice ?? 0,
					percentage: row.originFees?.[B2B_NUMERIC_CODE].percentage ?? 0,
				},
			},
			destinationFees: {
				vinistoB2cLevel1: {
					fixedPrice: row.destinationFees?.[B2C_NUMERIC_CODE].fixedPrice ?? 0,
					percentage: row.destinationFees?.[B2B_NUMERIC_CODE].percentage ?? 0,
				},
				vinistoB2bLevel1: {
					fixedPrice: row.destinationFees?.[B2C_NUMERIC_CODE].fixedPrice ?? 0,
					percentage: row.destinationFees?.[B2B_NUMERIC_CODE].percentage ?? 0,
				},
			},
			validFrom: dayjsInstance.unix(row.validFrom ?? 0).toDate(),
			validTo: row.validTo
				? dayjsInstance(row.validTo * 1000).toDate()
				: undefined,

			productType: row.specifications.find(
				(spec) => spec.definitionId === SPECIFICATION_ID_TYPE
			)?.allowedValues[0],
			kind: row.specifications.find(
				(spec) => spec.definitionId === SPECIFICATION_ID_KIND
			)?.allowedValues[0],
			turnover: {
				...row.turnover,
				// @ts-expect-error never mind the ts error
				validFrom: row.turnover?.validFrom
					? dayjsInstance.unix(row.turnover.validFrom).toDate()
					: null,
				// @ts-expect-error never mind the ts error
				validTo: row.turnover?.validTo
					? dayjsInstance.unix(row.turnover.validTo).toDate()
					: null,
			},
		});
		setIsEditModalOpen(true);
	};

	const createDynamicFeeRule = async (
		data: DynamicFeeRuleFormValuesWithFlags
	) => {
		const transformedData = {
			userLoginHash: loginHash,
			...data,
			originFees: {
				[B2C_NUMERIC_CODE]: {
					fixedPrice: data.originFees?.vinistoB2cLevel1?.fixedPrice ?? 0,
					percentage: data.originFees?.vinistoB2cLevel1?.percentage ?? 0,
				},
				[B2B_NUMERIC_CODE]: {
					fixedPrice: data.originFees?.vinistoB2bLevel1?.fixedPrice ?? 0,
					percentage: data.originFees?.vinistoB2bLevel1?.percentage ?? 0,
				},
			},
			destinationFees: {
				[B2C_NUMERIC_CODE]: {
					fixedPrice: data.destinationFees?.vinistoB2cLevel1?.fixedPrice ?? 0,
					percentage: data.destinationFees?.vinistoB2cLevel1?.percentage ?? 0,
				},
				[B2B_NUMERIC_CODE]: {
					fixedPrice: data.destinationFees?.vinistoB2bLevel1?.fixedPrice ?? 0,
					percentage: data.destinationFees?.vinistoB2bLevel1?.percentage ?? 0,
				},
			},
			state: data.flags?.save
				? VinistoHelperDllEnumsFeeRuleFeeRuleState.Concept
				: VinistoHelperDllEnumsFeeRuleFeeRuleState.Active,
			validFrom: dayjsInstance(data.validFrom).unix(),
			...(data.validTo && {
				validTo: dayjsInstance(data.validTo).unix(),
			}),
			...(data.tags?.filter(Boolean).length
				? {
						tags: data.tags.map((tag) => ({
							tagId: tag,
						})),
				  }
				: { tags: null }),
			...(data.categoryIds?.filter(Boolean).length
				? {
						categoryIds: data.categoryIds,
				  }
				: {
						categoryIds: null,
				  }),
			...(data.bundleIds?.filter(Boolean).length
				? {
						bundleIds: data.bundleIds,
				  }
				: {
						bundleIds: null,
				  }),
			...(data.supplierIds?.filter(Boolean).length
				? {
						supplierIds: data.supplierIds,
				  }
				: {
						supplierIds: null,
				  }),
			...(data.productType || data.kind
				? {
						specifications: [
							...(data.productType
								? [
										{
											specificationDefinitionId: SPECIFICATION_ID_TYPE,
											specificationType: 'MULTI_COMBO_BOX',
											allowedValues:
												// @ts-ignore product type is array of objects
												data.productType?.map((type) => type.value) ?? [],
										},
								  ]
								: []),
							...(data.kind
								? [
										{
											specificationDefinitionId: SPECIFICATION_ID_KIND,
											specificationType: 'MULTI_COMBO_BOX',
											// @ts-ignore product kind is array of objects
											allowedValues: data.kind?.map((kind) => kind.value) ?? [],
										},
								  ]
								: []),
						],
				  }
				: {
						specifications: null,
				  }),
			...(data.turnover && {
				turnover: {
					...data.turnover,
					validFrom: data.turnover.validFrom
						? dayjsInstance(data.turnover.validFrom).unix()
						: undefined,
					validTo: data.turnover.validTo
						? dayjsInstance(data.turnover.validTo).unix()
						: undefined,
				},
			}),
		};

		await feeRuleService.createDynamicFeeRule(transformedData);
		toast.success(`${t({ id: 'feeRule.create.success' })}`);
	};

	const updateDynamicFeeRule = async (
		data: DynamicFeeRuleFormValuesWithFlags
	) => {
		if (!data.id) {
			toast.error('DEV Error: FeeRule ID is missing in update action.');
			return;
		}
		const emptyInitialValues = Object.fromEntries(
			Object.keys(formInitialValues).map((key) => [key, null])
		);

		const patchedData = Object.fromEntries(
			Object.entries({
				...emptyInitialValues,
				...data,
				originFees: {
					[B2C_NUMERIC_CODE]: {
						fixedPrice: data.originFees?.vinistoB2cLevel1?.fixedPrice ?? 0,
						percentage: data.originFees?.vinistoB2cLevel1?.percentage ?? 0,
					},
					[B2B_NUMERIC_CODE]: {
						fixedPrice: data.originFees?.vinistoB2bLevel1?.fixedPrice ?? 0,
						percentage: data.originFees?.vinistoB2bLevel1?.percentage ?? 0,
					},
				},
				destinationFees: {
					[B2C_NUMERIC_CODE]: {
						fixedPrice: data.destinationFees?.vinistoB2cLevel1?.fixedPrice ?? 0,
						percentage: data.destinationFees?.vinistoB2cLevel1?.percentage ?? 0,
					},
					[B2B_NUMERIC_CODE]: {
						fixedPrice: data.destinationFees?.vinistoB2bLevel1?.fixedPrice ?? 0,
						percentage: data.destinationFees?.vinistoB2bLevel1?.percentage ?? 0,
					},
				},
				state: data.flags?.save
					? VinistoHelperDllEnumsFeeRuleFeeRuleState.Concept
					: VinistoHelperDllEnumsFeeRuleFeeRuleState.Active,
				validFrom: dayjsInstance(data.validFrom).unix(),
				...(data.validTo && {
					validTo: dayjsInstance(data.validTo).unix(),
				}),
				...(data.tags?.filter(Boolean).length && {
					tags: data.tags.map((tag) => ({
						tagId: tag,
					})),
				}),
				...(data.categoryIds?.filter(Boolean).length && {
					categoryIds: data.categoryIds,
				}),
				...(data.bundleIds?.filter(Boolean).length && {
					bundleIds: data.bundleIds,
				}),
				...(data.supplierIds?.filter(Boolean).length && {
					supplierIds: data.supplierIds,
				}),
				...((data.productType || data.kind) && {
					specifications: [
						...(data.productType
							? [
									{
										specificationDefinitionId: SPECIFICATION_ID_TYPE,
										specificationType: 'MULTI_COMBO_BOX',
										allowedValues: Array.isArray(data.productType)
											? data.productType?.map(
													(productType) => productType.value
											  )
											: [data.productType],
									},
							  ]
							: []),
						...(data.kind
							? [
									{
										specificationDefinitionId: SPECIFICATION_ID_KIND,
										specificationType: 'MULTI_COMBO_BOX',
										allowedValues: Array.isArray(data.kind)
											? data.kind?.map((kind) => kind.value) ?? []
											: [data.kind],
									},
							  ]
							: []),
					],
				}),
				...(data.turnover && {
					turnover: {
						...data.turnover,
						validFrom: data.turnover.validFrom
							? dayjsInstance(data.turnover.validFrom).unix()
							: undefined,

						validTo: data.turnover.validTo
							? dayjsInstance(data.turnover.validTo).unix()
							: undefined,
					},
				}),
			}).map(([key, value]) => [
				key,
				value !== undefined &&
				value !== null &&
				value !== '' &&
				(!Array.isArray(value) || value.length > 0)
					? { hasValue: true, value }
					: { hasValue: true, value: null },
			])
		);

		// Scheduled rules are causing api errors when sent with state property
		if (data.state === VinistoHelperDllEnumsFeeRuleFeeRuleState.Scheduled) {
			delete patchedData.state;
		}
		try {
			await feeRuleService.updateDynamicFeeRule(data.id, {
				userLoginHash: loginHash,
				...patchedData,
			});
			toast.success(`${t({ id: 'feeRule.update.success' })}`);
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
	};

	const onSubmitCreateDynamicSellingRule = async (
		data: DynamicFeeRuleFormValues
	) => {
		setFormData({ ...data });

		try {
			await createDynamicFeeRule(data as DynamicFeeRuleFormValuesWithFlags);
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

	const onSubmitUpdateDynamicSellingRule = async (
		data: DynamicFeeRuleFormValues
	) => {
		setFormData(data);

		try {
			await updateDynamicFeeRule(data as DynamicFeeRuleFormValuesWithFlags);
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
			{ key: 'limit', value: state.limit },
			{ key: 'offset', value: state.offset },
			{
				key: 'Type',
				value: VinistoHelperDllEnumsFeeRuleFeeRuleType.DynamicSale,
			},
			{ key: 'OriginCountry', value: originCountry },
			{ key: 'DestinationCountry', value: destinationCountry },
			{ key: 'UserLoginHash', value: loginHash },
			{ key: 'Limit', value: state.limit },
			{ key: 'Offset', value: state.offset },
		];

		const [sortColumn] = state.sorting;

		if (sortColumn?.id) {
			if (sortColumn.id === DynamicRuleListTableKeys.validityRange) {
				apiParams.push({
					key: 'SortingColumn',
					value: FEE_RULE_SORTING_COLUMN_KEYS.validFrom,
				});
			}
			if (sortColumn.id === DynamicRuleListTableKeys.priceRange) {
				apiParams.push({
					key: 'SortingColumn',
					value: FEE_RULE_SORTING_COLUMN_KEYS.bundlePriceFrom,
				});
			}
			if (sortColumn.id === DynamicRuleListTableKeys.specifications.type) {
				apiParams.push({
					key: 'SortingColumn',
					value: FEE_RULE_SORTING_COLUMN_KEYS.type,
				});
			}
			if (sortColumn.id === DynamicRuleListTableKeys.specifications.kind) {
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
			if (id === DynamicRuleListTableKeys.state) {
				apiParams.push({
					key: FEE_RULE_FILTER_KEYS.state,
					value: value,
				});
			}

			if (id === DynamicRuleListTableKeys.name) {
				apiParams.push({
					key: FEE_RULE_FILTER_KEYS.name,
					value: value,
				});
			}
			if (id === DynamicRuleListTableKeys.specifications.type) {
				apiParams.push({
					key: FEE_RULE_FILTER_KEYS.bundleType,
					value: value,
				});
			}
			if (id === DynamicRuleListTableKeys.specifications.kind) {
				apiParams.push({
					key: FEE_RULE_FILTER_KEYS.bundleKind,
					value: value,
				});
			}
			if (id === DynamicRuleListTableKeys.validityRange) {
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
			if (id === DynamicRuleListTableKeys.priceRange) {
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
					<button
						className="btn btn-primary"
						onClick={handleClickCreateNewRule}
					>
						{t({ id: 'feeRule.createNewRule' })}
					</button>
				</div>
			</div>
			<AdminListPage<DynamicRuleList>
				adminTableSchema={adminTableSchema}
				handleOnTableRowClick={() => {}}
				handlers={handlers}
				state={state as any}
				pageCount={pageCount}
				pageNumber={pageNumber}
				adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
				columnOrder={[
					DynamicRuleListTableKeys.name,
					DynamicRuleListTableKeys.condition,
					DynamicRuleListTableKeys.specifications.type,
					DynamicRuleListTableKeys.specifications.kind,
					DynamicRuleListTableKeys.validityRange,
					DynamicRuleListTableKeys.priceRange,
					DynamicRuleListTableKeys.originFees,
					DynamicRuleListTableKeys.destinationFees,
					DynamicRuleListTableKeys.state,
					DynamicRuleListTableKeys.bundleCount,
				]}
			/>
			<Modal
				title={`${t({ id: 'feeRule.create' })}`}
				show={isCreateModalOpen}
				handleClose={() => setIsCreateModalOpen(false)}
			>
				<CreateDynamicRuleForm
					handleSubmit={(data) => onSubmitCreateDynamicSellingRule(data)}
					initialValues={{
						originCountry: originCountry as VinistoHelperDllEnumsCountryCode,
						destinationCountry:
							destinationCountry as VinistoHelperDllEnumsCountryCode,
					}}
				/>
			</Modal>

			<Modal
				title={`${t({ id: 'feeRule.edit' })}`}
				show={isEditModalOpen}
				handleClose={() => setIsEditModalOpen(false)}
			>
				<CreateDynamicRuleForm
					handleSubmit={(data) => onSubmitUpdateDynamicSellingRule(data)}
					initialValues={formInitialValues}
				/>
			</Modal>

			{conflictModal}
		</div>
	);
};

export default DynamicSellingRulesPage;
