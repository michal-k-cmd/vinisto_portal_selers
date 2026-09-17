import { MouseEvent, useCallback, useContext, useEffect } from 'react';
import { get, head } from 'Helpers/lodash';
import { confirmAlert } from 'react-confirm-alert';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import { ADD_HOME_PAGE_TAG } from 'Components/Modal/constants';
import useAdminTable from 'Hooks/useAdminTable';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useTableSchema from 'Hooks/useTableSchema';
import { apiServiceInstance } from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import { NotificationsContext } from 'Services/NotificationService';
import AdminListPage from 'Components/AdminListPage';
import { Button } from 'react-bootstrap';

import { NAME_DB_COLUMN, SORTING_COLUMN_MAP } from '../TagList/constants';

const TagHomePageListPage = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);

	const t = localizationContext.useFormatMessage();
	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema = useTableSchema();
	const getLocalizedValue = useLocalizedValue();
	const { fetchData, handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable();

	const tableSchema: TableSchema = [
		{
			header: `${t({ id: 'admin.tagDetail.name.label' })}`,
			id: NAME_DB_COLUMN,
			accessorFn: (row) => getLocalizedValue(get(row, 'name', [])),
		},
		{
			header: '',
			id: 'placeholder',
			cell: (entity) => (
				<div className="text-end">
					<Button onClick={handleOnDeleteHomePageTag(entity.row.id)}>
						{t({ id: 'admin.btn.deleteHpTag' })}
					</Button>
				</div>
			),
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOnDeleteHomePageTag = useCallback(
		(tagId: string) => (event: MouseEvent) => {
			event.stopPropagation();
			confirmAlert({
				title: `${t({
					id: 'admin.popups.deleteHpTag.title',
				})}`,
				message: `${t({
					id: 'admin.popups.deleteHpTag.description',
				})}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.popups.deleteHpTag.yes',
						})}`,
						onClick: () => {
							apiServiceInstance
								.delete('product-api/home-page/tags', tagId, true, [
									{
										key: 'UserLoginHash',
										value: authenticationContext.vinistoUser?.loginHash,
									},
								])
								.then(() => {
									notificationsContext.handleShowSuccessNotification(
										'admin.deleteHpTag.success'
									);
									dispatch({ type: PageListAction.reset });
								})
								.catch(() => {
									notificationsContext.handleShowErrorNotification(
										'admin.deleteHpTag.error'
									);
								});
						},
					},
					{
						label: `${t({
							id: 'admin.popups.deleteHpTag.no',
						})}`,
						onClick: () => {},
					},
				],
			});
		},
		[authenticationContext, notificationsContext, dispatch, t]
	);

	const handleOnTableRowClick = (
		entity: IPageListTableRow,
		event: React.MouseEvent
	) => navigateWithNewtabOption(`/tag-detail/${entity.id}`, event);

	const handleOpenCreateModal = useCallback(() => {
		modalContext.handleOpenModal(ADD_HOME_PAGE_TAG, {
			resetTagList: () => dispatch({ type: PageListAction.reset }),
		});
	}, [modalContext.handleOpenModal, dispatch]);

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [
			{ key: 'limit', value: state.limit },
			{ key: 'offset', value: state.offset },
			{ key: 'IsInHomePage', value: true },
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
			if (filter.id === NAME_DB_COLUMN) {
				apiParams.push({ key: 'SearchName', value: filter.value });
			}
		});
		fetchData(
			'product-api/tags',
			apiParams,
			(payload) => get(payload, 'tags', []) ?? [],
			'admin.tagList.loadingError',
			API_METHOD.GET
		);
	}, [fetchData, state]);

	return (
		<AdminListPage
			adminTableSchema={adminTableSchema}
			handleOpenCreateModal={handleOpenCreateModal}
			btnCreateLabel="admin.tagListHp.tagCreate"
			handleOnTableRowClick={handleOnTableRowClick}
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
		/>
	);
};

export default TagHomePageListPage;
