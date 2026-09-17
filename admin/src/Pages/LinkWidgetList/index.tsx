import { useContext, useEffect, useMemo, useState } from 'react';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { PageListAction } from 'Hooks/useAdminTable/constants';
import useAdminTable from 'Hooks/useAdminTable';
import useTableSchema from 'Hooks/useTableSchema';
import { LocalizationContext } from 'Services/LocalizationService';
import AdminListPage from 'Components/AdminListPage';
import { Modal } from 'Components/Modal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NotificationsContext } from 'Services/NotificationService';
import linkWidgetApi from 'vinisto_api_client/src/link-widget-service';
import { LinkWidget } from 'vinisto_api_client/src/domain/link-widget';
import linkWidgetService from 'vinisto_api_client/src/link-widget-service';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';
import { AdminTableFilterType } from 'Components/AdminTable/constants';

import {
	LOCATOR_DB_COLUMN,
	SECTION_DB_COLUMN,
	SECTION_TRANSLATION_MAP,
} from './constants';
import { LinkWidgetListTableRow } from './interfaces';
import LinkWidgetCreateOrUpdateForm from './Components/LinkWidgetCreateOrUpdateForm';
import { LINK_WIDGETS_QUERY_KEY, refreshLinkWidgetQueries } from './hooks';

// TODO: BE limit 0 stopped returning all records, therefore limit 9999
const LIST_PARAMS = { Limit: 9999 };

const LinkWidgetListPage = () => {
	const { useFormatMessage } = useContext(LocalizationContext);

	const notificationContext = useContext(NotificationsContext);
	const queryClient = useQueryClient();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const t = useFormatMessage();
	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema = useTableSchema<LinkWidgetListTableRow>();
	const { handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable<LinkWidgetListTableRow>();

	const sectionFilterOptions = useMemo<[string, string][]>(
		() =>
			Object.entries(SECTION_TRANSLATION_MAP).map(
				([section, translationId]) => [section, `${t({ id: translationId })}`]
			),
		[t]
	);

	const tableSchema: TableSchema<LinkWidgetListTableRow> = [
		{
			header: `${t({ id: 'admin.linkWidgetList.section.label' })}`,
			id: SECTION_DB_COLUMN,
			accessorKey: 'sectionLabel',
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions: sectionFilterOptions,
			},
		},
		{
			header: `${t({ id: 'admin.linkWidgetList.identifier.label' })}`,
			id: LOCATOR_DB_COLUMN,
			accessorKey: 'identifier',
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOnTableRowClick = (
		entity: LinkWidgetListTableRow,
		event: React.MouseEvent
	) =>
		navigateWithNewtabOption(
			`/link-widget-detail/${entity.pathId}`.replace(/\/{2}/, '/'),
			event
		);

	const linkwidgetsQuery = useQuery(
		[...LINK_WIDGETS_QUERY_KEY, LIST_PARAMS],
		() =>
			linkWidgetService
				.linksList(LIST_PARAMS)
				.then((res) => res.data)
				.then((payload) => {
					const uniquePathIds = Array.from(
						new Set(
							(payload ?? [])
								.map((item) => item.pathId)
								.filter((pathId): pathId is string => Boolean(pathId))
						)
					);
					return uniquePathIds.map<LinkWidgetListTableRow>((pathId) => {
						const [identifier = '', section = ''] = pathId.split('|');
						const sectionLabel =
							section in SECTION_TRANSLATION_MAP
								? `${t({
										id: SECTION_TRANSLATION_MAP[
											section as keyof typeof SECTION_TRANSLATION_MAP
										],
								  })}`
								: section;
						return { id: pathId, pathId, section, sectionLabel, identifier };
					});
				}),
		{ refetchOnMount: true }
	);

	// The shared AdminTable runs in manual (server-driven) mode, so it does not
	// filter/sort the data itself — we apply both client-side over the deduped list.
	const visibleRows = useMemo<LinkWidgetListTableRow[]>(() => {
		const rows = [...(linkwidgetsQuery.data ?? [])];

		const filtered = rows.filter((row) =>
			state.filters.every((filter) => {
				const value = String(filter.value ?? '').trim();
				if (!value) return true;
				if (filter.id === SECTION_DB_COLUMN) return row.section === value;
				if (filter.id === LOCATOR_DB_COLUMN)
					return row.identifier.toLowerCase().includes(value.toLowerCase());
				return true;
			})
		);

		const [sortBy] = state.sorting;
		if (sortBy) {
			const getSortValue = (row: LinkWidgetListTableRow) =>
				sortBy.id === SECTION_DB_COLUMN ? row.sectionLabel : row.identifier;
			filtered.sort((a, b) => {
				const result = getSortValue(a).localeCompare(getSortValue(b), 'cs', {
					numeric: true,
					sensitivity: 'base',
				});
				return sortBy.desc ? -result : result;
			});
		} else {
			// Default order: shortest locator first, alphabetical as tie-breaker
			filtered.sort(
				(a, b) =>
					a.identifier.length - b.identifier.length ||
					a.identifier.localeCompare(b.identifier, 'cs', {
						numeric: true,
						sensitivity: 'base',
					})
			);
		}

		return filtered;
	}, [linkwidgetsQuery.data, state.filters, state.sorting]);

	useEffect(() => {
		dispatch({
			type: PageListAction.setPageListState,
			value: {
				data: visibleRows,
				count: visibleRows.length,
				loadedIds: visibleRows.map(({ id }) => id),
				loading: linkwidgetsQuery.isLoading,
				loaded: linkwidgetsQuery.isFetched,
			},
		});
	}, [
		dispatch,
		linkwidgetsQuery.isFetched,
		linkwidgetsQuery.isLoading,
		visibleRows,
	]);

	const handleCreateLink = (
		data: Partial<LinkWidget> & {
			name: string;
			pathId: string;
			availableOnPlatforms: number[];
		}
	) => linkWidgetApi.linkCreate(data, { secure: true });

	const linkWidgetCreateMutation = useMutation(
		({
			data,
		}: {
			data: Partial<LinkWidget> & {
				name: string;
				pathId: string;
				availableOnPlatforms: number[];
			};
		}) => handleCreateLink(data),
		{
			onSuccess: async () => {
				await refreshLinkWidgetQueries(queryClient);
				notificationContext.handleShowSuccessNotification(
					`${t({
						id: 'admin.linkWidgetList.create.success',
					})}`
				);
				setIsModalOpen(false);
			},
			onError: () => {
				notificationContext.handleShowErrorNotification(
					`${t({
						id: 'admin.linkWidgetList.create.error',
					})}`
				);
			},
		}
	);

	return (
		<>
			<AdminListPage<LinkWidgetListTableRow>
				adminTableSchema={adminTableSchema}
				handleOpenCreateModal={() => setIsModalOpen(true)}
				btnCreateLabel="admin.linkWidgetList.addNewLinkWidget"
				handleOnTableRowClick={handleOnTableRowClick}
				handlers={handlers}
				state={state}
				pageCount={pageCount}
				pageNumber={pageNumber}
				adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
				columnOrder={[SECTION_DB_COLUMN, LOCATOR_DB_COLUMN]}
			/>
			<Modal
				title={`${t({ id: 'admin.linkWidget.create.title' })}`}
				show={isModalOpen}
				handleClose={() => setIsModalOpen(false)}
			>
				<LinkWidgetCreateOrUpdateForm
					mode="CREATE"
					data={{}}
					createHandler={linkWidgetCreateMutation.mutateAsync}
				/>
			</Modal>
		</>
	);
};

export default LinkWidgetListPage;
