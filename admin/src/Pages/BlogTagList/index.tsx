import { useCallback, useContext, useEffect } from 'react';
import Config from 'Config';
import { dayjsInstance as dayjs } from 'Services/Date';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { CmsPostTagListQueryArgument } from 'Services/CmsService/interfaces';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import { CREATE_CMS_BLOG_TAG } from 'Components/Modal/constants';
import { BLOG_TAG_URI } from 'Services/CmsService/constants';
import useAdminTable from 'Hooks/useAdminTable';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useTableSchema from 'Hooks/useTableSchema';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import AdminListPage from 'Components/AdminListPage';
import { RefetchEvent, refetchEventEmitter } from 'Services/RefetchService';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';

import {
	CREATE_TIME_DB_COLUMN,
	LABEL_DB_COLUMN,
	NAME_DB_COLUMN,
	URL_DB_COLUMN,
} from './constants';

const BlogTagListPage = () => {
	const localizationContext = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const { vinistoUser } = useContext(AuthenticationContext);

	const t = localizationContext.useFormatMessage();
	const navigateWithNewtabOption = useNavigateWithNewtabOption();
	const getTableSchema = useTableSchema();
	const getLocalizedValue = useLocalizedValue();
	const { fetchData, handlers, state, dispatch, pageNumber, pageCount } =
		useAdminTable();

	const tableSchema: TableSchema = [
		{
			header: `${t({ id: 'admin.blogTagDetail.name.label' })}`,
			id: NAME_DB_COLUMN,
			enableColumnFilter: false,
			accessorFn: (row) => getLocalizedValue(row.name ?? []),
		},
		{
			header: `${t({ id: 'admin.blogTagDetail.date.label' })}`,
			id: CREATE_TIME_DB_COLUMN,
			accessorKey: CREATE_TIME_DB_COLUMN,
			enableColumnFilter: false,
			accessorFn: (row) => {
				return dayjs
					.unix(row.createdAt)
					.format(`${t({ id: 'admin.dateFormat' })}`);
			},
		},
		{
			header: `${t({ id: 'admin.blogTagDetail.translations.label' })}`,
			id: LABEL_DB_COLUMN,
			enableColumnFilter: false,
			enableSorting: false,
			accessorFn: (row) =>
				row.name.map((name: any) => {
					return t({ id: `languageCode.${name.language}` });
				}),
		},
		{
			header: `${t({ id: 'admin.blogTagDetail.url.label' })}`,
			id: URL_DB_COLUMN,
			enableColumnFilter: false,
			enableSorting: false,
			accessorFn: (row) => getLocalizedValue(row?.url),
			cell: ({ row }) => {
				return (
					<a
						href={`${Config.eshopUrl}${t({
							id: 'eshop.routes.blog.route',
						})}/${t({
							id: 'eshop.routes.blog.tag.route',
						})}/${getLocalizedValue(row?.original?.url)}`}
					>
						{getLocalizedValue(row?.original?.url)}
					</a>
				);
			},
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOnTableRowClick = (
		entity: IPageListTableRow,
		event: React.MouseEvent
	) => navigateWithNewtabOption(`/cms-blog-tags/${entity.id}`, event);

	const handleOpenCreateModal = useCallback(() => {
		modalContext.handleOpenModal(CREATE_CMS_BLOG_TAG, {
			resetBundleList: () => dispatch({ type: PageListAction.reset }),
		});
	}, [modalContext, dispatch]);

	//TOOD: Fetch API
	useEffect(() => {
		const params: CmsPostTagListQueryArgument[] = [
			{ key: 'Limit', value: state.limit },
			{ key: 'Offset', value: state.offset },
			{ key: 'UserLoginHash', value: vinistoUser?.loginHash },
		];

		const fetch = () => {
			fetchData(
				BLOG_TAG_URI,
				params,
				(payload) => payload.tags ?? [],
				'admin.tagList.loadingError',
				API_METHOD.GET
			);
		};

		fetch();
		return refetchEventEmitter.onEvent(RefetchEvent.BLOG_TAG_LIST, fetch);
	}, [fetchData, vinistoUser, notificationsContext, modalContext]);

	return (
		<AdminListPage
			adminTableSchema={adminTableSchema}
			handleOpenCreateModal={handleOpenCreateModal}
			btnCreateLabel="admin.tagList.tagCreate"
			handleOnTableRowClick={handleOnTableRowClick}
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
			adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
			columnOrder={[
				NAME_DB_COLUMN,
				CREATE_TIME_DB_COLUMN,
				LABEL_DB_COLUMN,
				URL_DB_COLUMN,
			]}
		/>
	);
};

export default BlogTagListPage;
