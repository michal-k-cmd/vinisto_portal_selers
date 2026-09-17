import { useContext, useEffect } from 'react';
import { dayjsInstance as dayjs } from 'Services/Date';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import useAdminTable from 'Hooks/useAdminTable';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import AdminListPage from 'Components/AdminListPage';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import {
	AddonResponse,
	ConditionType,
	Currency,
	ItemSpecificationDecimalNumberConditionRequest,
} from 'vinisto_api_client/src/api-types/addons-api';
import { ColumnDef } from '@tanstack/react-table';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';
import { CreateEditAddonModalData } from 'Components/Modal/Components/CreateEditAddon/types';
import { ModalContext } from 'Components/Modal/context';
import { Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import {
	useDeleteAddonMutation,
	useToggleIsActivePropertyMutation,
} from 'Pages/Gifts/handlers';
import { IntegrationContext } from 'Services/IntergationService';
import { platformIdLabelMap } from 'Pages/OrderList/constants';

import {
	ACTIONS_COLUMN,
	AVAILABLE_ON_PLATFORM_COLUMN,
	CONDITIONS_COLUMN,
	FILTER_COLUMN_MAP,
	HANDLERS_COLUMN,
	IS_ACTIVE_COLUMN,
	NAME_COLUMN,
	SORTING_COLUMN_MAP,
	VALID_FROM_COLUMN,
	VALID_TO_COLUMN,
} from '../../constants';
// import TypeSelector from '../TypeSelector';

import SpecificationRow from './conditions/SpecificationRow';
import SupplierRow from './conditions/SupplierRow';
import CategoryRow from './conditions/CategoryRow';
import MinOrderPriceRow from './conditions/MinOrderPriceRow';
import MinQuantityRow from './conditions/ItemQuantityRow';
import CouponRow from './conditions/CouponRow';
import SetGiftRow from './actions/SetGiftRow';
import SetDeliveryRow from './actions/SetDeliveryRow';
import Operator from './conditions/Operator';
import SpecificationDecimalRow from './conditions/SpecificationDecimalRow';

import {
	ActionType,
	AddonType,
	SetDeliveryActionResponse,
	SetGiftActionResponse,
} from '@/api-types/addons-api';
import { PlatformIdType } from '@/shared';

type TableAddonResponse = AddonResponse & { id: string };

interface AddonsTableProps {
	addonType: AddonType;
	addModalName: string;
}

const Table = ({ addonType, addModalName }: AddonsTableProps) => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const t = useContext(LocalizationContext).useFormatMessage();

	const { handleOpenModal } = useContext(ModalContext);

	const { fetchData, handlers, state, pageNumber, pageCount, dispatch } =
		useAdminTable<TableAddonResponse>();

	const { integrations } = useContext(IntegrationContext);

	const toggleIsActivePropertyMutation = useToggleIsActivePropertyMutation({
		onSuccess: () => {
			dispatch({ type: PageListAction.setShouldReload, value: true });
		},
		addonType: addonType,
	});

	const deleteAddonMutation = useDeleteAddonMutation({
		onSuccess: () => {
			dispatch({ type: PageListAction.setShouldReload, value: true });
		},
		addonType: addonType,
	});

	const handleOnTableRowClick = (entity: IPageListTableRow) => {
		handleOpenModal(addModalName, {
			addonType: addonType,
			addonId: entity.id,
			addon: entity,
			onSuccess: () => {
				dispatch({ type: PageListAction.setShouldReload, value: true });
			},
		} satisfies CreateEditAddonModalData);
	};

	const handleDeleteAddon = (addonId: string) =>
		confirmAlert({
			title: `${t({
				id: `admin.createEditAddon.${addonType}.delete.title`,
			})}`,
			message: `${t({
				id: `admin.createEditAddon.${addonType}.delete.message`,
			})}`,
			buttons: [
				{
					label: `${t({ id: 'admin.confirm.yes' })}`,
					onClick: () =>
						deleteAddonMutation.mutate({
							addonId,
						}),
				},
				{
					label: `${t({ id: 'admin.confirm.no' })}`,
				},
			],
		});

	const tableSchema: ColumnDef<TableAddonResponse>[] = [
		{
			header: `${t({ id: 'admin.giftRuleDetail.name.label' })}`,
			id: NAME_COLUMN,
			accessorKey: 'name',
		},

		{
			header: `${t({ id: 'admin.giftRuleDetail.conditions.label' })}`,
			id: CONDITIONS_COLUMN,
			cell: ({ row }) => {
				const conditions = row.original.conditions;
				if (!conditions || conditions.length === 0) {
					return '';
				}
				return (
					<div>
						{conditions.map((condition, index: number) => {
							if (
								condition.conditionType === ConditionType.ItemSpecification &&
								'specification' in condition
							) {
								return (
									<div key={index}>
										{!!index && <Operator operator={condition.operator} />}
										<SpecificationRow condition={condition} />
									</div>
								);
							}
							if (
								condition.conditionType === ConditionType.ItemSupplier &&
								'itemSupplierId' in condition
							) {
								return (
									<div key={index}>
										{!!index && <Operator operator={condition.operator} />}
										<SupplierRow condition={condition} />
									</div>
								);
							}
							if (
								condition.conditionType === ConditionType.ItemCategory &&
								'itemCategoryId' in condition
							) {
								return (
									<div key={index}>
										{!!index && <Operator operator={condition.operator} />}
										<CategoryRow condition={condition} />
									</div>
								);
							}
							if (
								condition.conditionType === ConditionType.MinOrderPrice &&
								'minOrderPrice' in condition
							) {
								return (
									<div key={index}>
										{!!index && <Operator operator={condition.operator} />}
										<MinOrderPriceRow
											condition={condition}
											currency={row.original.currency ?? Currency.CZK}
										/>
									</div>
								);
							}
							if (
								condition.conditionType === ConditionType.ItemQuantity &&
								'minItemQuantity' in condition
							) {
								return (
									<div key={index}>
										{!!index && <Operator operator={condition.operator} />}
										<MinQuantityRow condition={condition} />
									</div>
								);
							}
							if ('itemCouponId' in condition) {
								return (
									<div key={index}>
										{!!index && <Operator operator={condition.operator} />}
										<CouponRow condition={condition} />
									</div>
								);
							}
							if (
								condition.conditionType === ConditionType.SalesDirection &&
								'originCountry' in condition &&
								'destinationCountry' in condition
							) {
								return (
									<div key={index}>
										{!!index && <Operator operator={condition.operator} />}
										<div>
											{t({
												id: 'admin.modal.createEditAddon.conditionType.salesDirection',
											})}
											:<br />
											{`${condition.originCountry} - ${condition.destinationCountry}`}
										</div>
									</div>
								);
							}
							if (
								condition.conditionType ===
									ConditionType.ItemSpecificationDecimalNumber &&
								'itemSpecificationId' in condition
							) {
								return (
									<div key={index}>
										{!!index && <Operator operator={condition.operator} />}
										<SpecificationDecimalRow
											condition={
												condition as ItemSpecificationDecimalNumberConditionRequest
											}
										/>
									</div>
								);
							}
						})}
					</div>
				);
			},
		},
		{
			header: `${t({ id: 'admin.giftRuleDetail.actions.label' })}`,
			id: ACTIONS_COLUMN,
			cell: ({ row }) => {
				const actions = row.original.actions;
				if (!actions || actions.length === 0) {
					return '';
				}
				return (
					<div>
						{actions.map((action, index: number) => {
							if (
								(action.actionType === ActionType.SetGift ||
									action.actionType === ActionType.SetRelatedProduct) &&
								'itemId' in action
							) {
								return (
									<SetGiftRow
										key={index}
										action={action as SetGiftActionResponse}
										currency={row.original.currency ?? Currency.CZK}
									/>
								);
							}

							if (
								action.actionType === ActionType.SetDelivery &&
								'itemId' in action
							) {
								return (
									<SetDeliveryRow
										key={index}
										action={action as SetDeliveryActionResponse}
									/>
								);
							}

							if (
								action.actionType === ActionType.SetUx &&
								'uxAction' in action
							) {
								return (
									<div key={index}>
										{t({
											id: `admin.createEditDeliveryRuleAddon.uxAction.${
												action.uxAction as string
											}`,
										})}
									</div>
								);
							}
						})}
					</div>
				);
			},
		},
		{
			header: `${t({ id: 'platform' })}`,
			id: AVAILABLE_ON_PLATFORM_COLUMN,
			accessorKey: 'availableOnPlatform',
			accessorFn: (row) =>
				typeof row.availableOnPlatform === 'number'
					? platformIdLabelMap[row.availableOnPlatform as PlatformIdType]
					: null,
			meta: {
				// TODO EXTRACT THIS TO DEDICATED FILTER TYPE
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions:
					integrations?.map((platform) => [
						`${platform.integrationId}`,
						`${platformIdLabelMap[platform.integrationId as PlatformIdType]}`,
					]) ?? [],
			},
		},
		{
			header: `${t({ id: 'admin.giftRuleDetail.validFrom.label' })}`,
			id: VALID_FROM_COLUMN,
			accessorKey: 'validFrom',
			accessorFn: (row) => {
				const date = row.validFrom;
				if (!date) return '';
				return dayjs.unix(date).format(`${t({ id: 'admin.dateFormat' })}`);
			},
			meta: { filterType: AdminTableFilterType.DATE },
		},
		{
			header: `${t({ id: 'admin.giftRuleDetail.validTo.label' })}`,
			id: VALID_TO_COLUMN,
			accessorKey: 'validTo',
			accessorFn: (row) => {
				const date = row.validTo;
				if (!date) return '';
				return dayjs.unix(date).format(`${t({ id: 'admin.dateFormat' })}`);
			},
			meta: { filterType: AdminTableFilterType.DATE },
		},
		{
			header: `${t({ id: 'admin.giftRuleDetail.isActive.label' })}`,
			id: IS_ACTIVE_COLUMN,
			accessorKey: 'isActive',
			cell: (row) =>
				row.getValue() ? t({ id: 'admin.yes' }) : t({ id: 'admin.no' }),
			meta: { filterType: AdminTableFilterType.YES_NO },
		},
		{
			header: 'Spravovat',
			id: HANDLERS_COLUMN,
			cell: ({ row }) => (
				<div className="d-flex gap-2 flex-column align-items-start">
					<Button
						size="sm"
						onMouseDown={(e) => e.stopPropagation()}
						onMouseUp={(e) => e.stopPropagation()}
						onClick={(e) => {
							e.stopPropagation();
							toggleIsActivePropertyMutation.mutate({
								addonId: row.original.id,
								currentIsActiveState: !!row.original.isActive,
							});
							return false;
						}}
						disabled={toggleIsActivePropertyMutation.isLoading}
					>
						{t({ id: row.original.isActive ? 'deactivate' : 'activate' })}
					</Button>
					<Button
						size="sm"
						onMouseDown={(e) => e.stopPropagation()}
						onMouseUp={(e) => e.stopPropagation()}
						onClick={(e) => {
							e.stopPropagation();
							handleDeleteAddon(row.original.id);
							return false;
						}}
					>
						{t({ id: 'remove' })}
					</Button>
				</div>
			),
		},
	];

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [
			{ key: 'Limit', value: state.limit },
			{ key: 'Offset', value: state.offset },
			{
				key: 'Types',
				value: addonType,
			},
			{
				key: 'UserLoginHash',
				value: vinistoUser?.loginHash,
			},
		];

		const [sortByColumn] = state.sorting;
		if (sortByColumn && Object.hasOwn(SORTING_COLUMN_MAP, sortByColumn.id)) {
			apiParams.push({
				key: 'SortBy',
				value: SORTING_COLUMN_MAP[sortByColumn.id],
			});
			apiParams.push({ key: 'IsSortingDescending', value: sortByColumn.desc });
		}

		state.filters?.forEach((filter) => {
			if (Object.hasOwn(FILTER_COLUMN_MAP, filter.id)) {
				apiParams.push({
					key: FILTER_COLUMN_MAP[filter.id],
					value: filter.value,
				});
			}
		});

		fetchData(
			'addons-api/Addons',
			apiParams,
			(payload): TableAddonResponse[] =>
				(payload.addons ?? []).filter(
					(item: AddonResponse) => item.id
				) as TableAddonResponse[],
			'admin.giftRuleList.loadingError',
			API_METHOD.GET
		);
	}, [addonType, fetchData, state, vinistoUser?.loginHash]);

	return (
		<div className="col-12">
			<div className="card mb-4">
				<div className="d-flex justify-content-end align-items-center p-3">
					{/*<TypeSelector />*/}
					<button
						onClick={() => {
							handleOpenModal(addModalName, {
								addonType: addonType,
								addonId: undefined,
								addon: undefined,
								onSuccess: () => {
									dispatch({
										type: PageListAction.setShouldReload,
										value: true,
									});
								},
							} satisfies CreateEditAddonModalData);
						}}
						className="btn btn-primary"
					>
						{t({ id: 'feeRule.createNewRule' })}
					</button>
				</div>
			</div>
			<AdminListPage
				adminTableSchema={tableSchema}
				handleOnTableRowClick={handleOnTableRowClick}
				handlers={handlers}
				state={state}
				adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
				pageCount={pageCount}
				pageNumber={pageNumber}
				columnOrder={[
					NAME_COLUMN,
					CONDITIONS_COLUMN,
					ACTIONS_COLUMN,
					VALID_FROM_COLUMN,
					VALID_TO_COLUMN,
					AVAILABLE_ON_PLATFORM_COLUMN,
					IS_ACTIVE_COLUMN,
					HANDLERS_COLUMN,
				]}
			/>
		</div>
	);
};

export default Table;
