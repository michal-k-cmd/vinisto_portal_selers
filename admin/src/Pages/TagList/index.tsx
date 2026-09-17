import { useContext, useEffect, useState } from 'react';
import { get, head } from 'Helpers/lodash';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import Config from 'Config';
import useAdminTable from 'Hooks/useAdminTable';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useTableSchema from 'Hooks/useTableSchema';
import { LocalizationContext } from 'Services/LocalizationService';
import AdminListPage from 'Components/AdminListPage';
import { Modal } from 'Components/Modal';
import CreateEditTagForm from 'Components/Modal/Components/Tag';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import { StringParam, useQueryParams, withDefault } from 'Helpers/query-params';
import { CFormSelect } from '@coreui/react';
import { Button } from 'react-bootstrap';
import {
	tagModalModes,
	tagTypeTranslationMap,
} from 'Pages/TagDetail/constants';
import dayjs from 'dayjs';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';

import styles from './styles.module.css';
import {
	COLOR,
	HIDDEN_DB_COLUMN,
	NAME_DB_COLUMN,
	SORTING_COLUMN_MAP,
	TAG_TYPE,
	URL_DB_COLUMN,
	VALID_FROM,
	VALID_TO,
} from './constants';

import { VinistoHelperDllEnumsCountryCode } from '@/api-types/product-api';

const TagListPage = () => {
	const localizationContext = useContext(LocalizationContext);

	const [queryParams, setQueryParams] = useQueryParams({
		countryOfSale: withDefault(
			StringParam,
			VinistoHelperDllEnumsCountryCode.CZ
		),
		page: withDefault(StringParam, '1'),
	});
	const countryOfSale = queryParams.countryOfSale;
	const setCountryOfSale = (value: string) => {
		setQueryParams({ countryOfSale: value, page: '1' });
	};

	const t = localizationContext.useFormatMessage();
	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema = useTableSchema();
	const getLocalizedValue = useLocalizedValue();
	const { fetchData, dispatch, handlers, state, pageNumber, pageCount } =
		useAdminTable();

	const [isCreateTaglModalOpen, setIsCreateTaglModalOpen] = useState(false);

	const tableSchema: TableSchema = [
		{
			header: `${t({ id: 'admin.tagDetail.name.label' })}`,
			id: NAME_DB_COLUMN,
			accessorFn: (row) => getLocalizedValue(get(row, 'name', [])),
		},
		{
			header: `${t({ id: 'type' })}`,
			id: TAG_TYPE,
			accessorKey: 'type',
			accessorFn: (row) =>
				tagTypeTranslationMap[row.type as keyof typeof tagTypeTranslationMap]
					? t({
							id: tagTypeTranslationMap[
								row.type as keyof typeof tagTypeTranslationMap
							],
					  })
					: '',
			// Neither filtering nor sorting is available for this column yet
			enableColumnFilter: false,
			enableSorting: false,
			//meta: {
			//	filterType: AdminTableFilterType.DROPDOWN,
			//	// @ts-expect-error TODO fix this later
			//	dropDownFilterOptions: Object.keys(tagTypeTranslationMap).map((key) => [
			//		key,
			//		t({
			//			id: tagTypeTranslationMap[
			//				key as keyof typeof tagTypeTranslationMap
			//			],
			//		}),
			//	]),
			//},
		},
		{
			header: `${t({ id: 'admin.tagDetail.isEnabled.label' })}`,
			id: HIDDEN_DB_COLUMN,
			accessorKey: HIDDEN_DB_COLUMN,
			enableColumnFilter: false,
			enableSorting: false,
			accessorFn: (row) => {
				const isHidden = row.isEnabled ?? false;
				const localeString = isHidden
					? t({ id: 'admin.no' })
					: t({ id: 'admin.yes' });

				return localeString;
			},
		},
		{
			header: `${t({ id: 'admin.tagDetail.url.label' })}`,
			id: URL_DB_COLUMN,
			cell: ({ row }) => {
				return (
					<a
						href={`${Config.eshopUrl}${t({
							id: 'eshop.routes.tag.route',
						})}/${getLocalizedValue(row?.original?.slugs?.[0]?.value)}`}
						target="_blank"
						rel="noreferrer"
					>
						{getLocalizedValue(row?.original?.slugs?.[0]?.value)}
					</a>
				);
			},
		},
		{
			header: `${t({ id: 'validity.from' })}`,
			id: VALID_FROM,
			accessorKey: VALID_FROM,
			enableColumnFilter: false,
			enableSorting: false,
			accessorFn: (row) => {
				return row?.validFrom
					? dayjs
							.unix(row?.validFrom)
							.format(`${t({ id: 'admin.dateFormat' })}`)
					: null;
			},
		},
		{
			header: `${t({ id: 'validity.to' })}`,
			id: VALID_TO,
			accessorKey: VALID_TO,
			enableColumnFilter: false,
			enableSorting: false,
			accessorFn: (row) => {
				return row?.validTo
					? dayjs.unix(row?.validTo).format(`${t({ id: 'admin.dateFormat' })}`)
					: null;
			},
		},
		{
			header: `${t({ id: 'admin.tagDetail.color.label' })}`,
			id: COLOR,
			accessorKey: COLOR,
			enableColumnFilter: false,
			enableSorting: false,
			cell: ({ row }) => {
				return (
					<div
						className={styles.colorColumn}
						style={{ '--tagColor': row.original.color }}
					>
						{row.original.color}
					</div>
				);
			},
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOnTableRowClick = (
		entity: IPageListTableRow,
		event: React.MouseEvent
	) =>
		navigateWithNewtabOption(
			`/tag-detail/${entity.id}?countryOfSale=${countryOfSale}`,
			event
		);

	const handleOpenCreateModal = () => {
		setIsCreateTaglModalOpen(true);
	};

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [
			{ key: 'limit', value: state.limit },
			{ key: 'offset', value: state.offset },
			{ key: 'CountryOfSale', value: countryOfSale },
		];
		const sortByColumn = head(state.sorting);
		if (sortByColumn?.id) {
			apiParams.push({
				key: 'SortingColumn',
				value: get(SORTING_COLUMN_MAP, `[${sortByColumn.id}]`),
			});
			apiParams.push({ key: 'IsSortingDescending', value: sortByColumn.desc });
		}
		state.filters?.forEach((filter) => {
			if (filter.id === URL_DB_COLUMN) {
				apiParams.push({ key: 'SearchUrl', value: filter.value });
			} else if (filter.id === NAME_DB_COLUMN) {
				apiParams.push({ key: 'SearchName', value: filter.value });
			} else {
				apiParams.push({ key: filter.id, value: filter.value });
			}
		});
		fetchData(
			'product-api/tags',
			apiParams,
			(payload) => get(payload, 'tags', []) ?? [],
			'admin.tagList.loadingError',
			API_METHOD.GET
		);
	}, [countryOfSale, fetchData, state]);

	const typeSafeCountryOfSale =
		VinistoHelperDllEnumsCountryCode[
			countryOfSale as keyof typeof VinistoHelperDllEnumsCountryCode
		] ?? undefined;

	return (
		<>
			<div className={styles.headerWrapper}>
				<CFormSelect
					name="countryOfSale"
					value={countryOfSale}
					onChange={(e) => setCountryOfSale(e.target.value)}
					className={styles.countrySelect}
				>
					{Object.values(VinistoHelperDllEnumsCountryCode).map(
						(countryCode) => (
							<option
								key={countryCode}
								value={countryCode}
							>
								{t({ id: `country.${countryCode}` })}
							</option>
						)
					)}
				</CFormSelect>
				<Modal
					title={t({ id: 'admin.modal.createTag' })?.toString()}
					show={isCreateTaglModalOpen}
					handleClose={() => setIsCreateTaglModalOpen(false)}
				>
					<CreateEditTagForm
						countryOfSale={typeSafeCountryOfSale}
						handleClose={() => setIsCreateTaglModalOpen(false)}
						resetTagList={() => dispatch({ type: PageListAction.reset })}
						mode={tagModalModes.CREATE}
					/>
				</Modal>
				<Button
					onClick={handleOpenCreateModal}
					className={'text-nowrap'}
				>
					{t({ id: 'admin.tagList.tagCreate' })}
				</Button>
			</div>
			<AdminListPage
				adminTableSchema={adminTableSchema}
				handleOnTableRowClick={handleOnTableRowClick}
				handlers={handlers}
				state={state}
				pageCount={pageCount}
				pageNumber={pageNumber}
				adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
				columnOrder={[
					NAME_DB_COLUMN,
					TAG_TYPE,
					HIDDEN_DB_COLUMN,
					URL_DB_COLUMN,
					VALID_FROM,
					VALID_TO,
					COLOR,
				]}
			/>
		</>
	);
};

export default TagListPage;
