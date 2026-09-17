import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { dayjsInstance as dayjs } from 'Services/Date';
import Config from 'Config';
import {
	ARTICLE_STATE,
	ARTICLE_STATE_LOCALIZATION_MAP,
	COLUMN,
	FILTER_COLUMN_MAP,
	SORTING_COLUMN_MAP,
} from 'Services/CmsService/Blog/constants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { PostTag } from 'Services/CmsService/interfaces';
import { BLOG_URI } from 'Services/CmsService/constants';
import BlogService from 'Services/CmsService/Blog';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { API_METHOD } from 'Hooks/useAdminTable/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useTableSchema from 'Hooks/useTableSchema';
import useAdminTable from 'Hooks/useAdminTable';
import AdminListPage from 'Components/AdminListPage';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { AdminTableVariants } from 'Components/AdminTable/interfaces';

import { ArticleListTableRow } from './interfaces';

import './styles.css';

const BlogArticleListPage = () => {
	const localizationContext = useContext(LocalizationContext);
	const { loginHash } = useContext(AuthenticationContext).vinistoUser;

	const navigate = useNavigate();
	const navigateWithNewtabOption = useNavigateWithNewtabOption();

	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const getTableSchema = useTableSchema<ArticleListTableRow>();
	const { fetchData, handlers, state, pageNumber, pageCount } =
		useAdminTable<ArticleListTableRow>([
			{
				id: COLUMN.PUBLISH_DATE,
				desc: true,
			},
		]);

	const handleOpenCreateForm = () => navigate('/blog/article-detail');
	const handleGoToDetail = (
		row: ArticleListTableRow,
		event: React.MouseEvent
	) => navigateWithNewtabOption(`/blog/article-detail/${row.id}`, event);

	const tableSchema: TableSchema<ArticleListTableRow> = [
		{
			id: COLUMN.TITLE,
			accessorKey: COLUMN.TITLE,
			header: `${t({ id: 'admin.cms.articleList.title' })}`,
		},
		{
			id: COLUMN.LANGUAGE,
			accessorKey: COLUMN.LANGUAGE,
			header: `${t({ id: 'admin.cms.articleList.language' })}`,
		},
		{
			id: COLUMN.TAGS,
			accessorKey: COLUMN.TAGS,
			header: `${t({ id: 'admin.cms.articleList.tags' })}`,
			accessorFn: (row) => {
				const tagData = row.tags.map((tag) =>
					row.tagDetails.find((tagDetail: PostTag) => tagDetail.id === tag)
				);

				return tagData
					.map((tag) => getLocalizedValue(tag?.name ?? []))
					.join(', ');
			},
			enableSorting: false,
		},
		{
			id: COLUMN.URL,
			accessorKey: COLUMN.URL,
			header: `${t({ id: 'admin.cms.articleList.url' })}`,
			cell: ({ row }) => {
				return (
					<a
						href={`${Config.eshopUrl}${t({
							id: 'eshop.routes.blog.route',
						})}/${row?.original?.url}`}
					>
						{row?.original?.url}
					</a>
				);
			},
		},
		{
			id: COLUMN.PUBLISH_DATE,
			header: `${t({ id: 'admin.cms.articleList.publishDate' })}`,
			accessorFn: (row) => {
				return dayjs(row.publishDate).format(
					`${t({ id: 'admin.dateFormat' })}`
				);
			},
		},
		{
			id: COLUMN.STATE,
			accessorKey: COLUMN.STATE,
			header: `${t({ id: 'admin.cms.articleList.state' })}`,
			accessorFn: (row) => t({ id: ARTICLE_STATE_LOCALIZATION_MAP[row.state] }),
			meta: {
				filterType: AdminTableFilterType.DROPDOWN,
				dropDownFilterOptions: Object.values(ARTICLE_STATE).map((value) => [
					value,
					`${t({
						id: ARTICLE_STATE_LOCALIZATION_MAP[value],
					})}`,
				]),
			},
			enableSorting: false,
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [
			{ key: 'Limit', value: state.limit },
			{ key: 'Offset', value: state.offset },
			{
				key: 'UserLoginHash',
				value: loginHash,
			},
		];
		const [sortByColumn] = state.sorting;
		if (Object.hasOwn(SORTING_COLUMN_MAP, sortByColumn?.id)) {
			apiParams.push({
				key: 'SortingColumn',
				value: SORTING_COLUMN_MAP[sortByColumn.id],
			});
			apiParams.push({ key: 'IsSortingDescending', value: sortByColumn.desc });
		}
		state.filters?.forEach((filter) => {
			const filterId = filter.id as keyof typeof FILTER_COLUMN_MAP;
			switch (filterId) {
				default:
					if (Object.hasOwn(FILTER_COLUMN_MAP, filterId)) {
						apiParams.push({
							key: FILTER_COLUMN_MAP[filterId],
							value: String(filter.value),
						});
					}
					break;
			}
		});

		fetchData(
			BLOG_URI,
			apiParams,
			(payload) =>
				Array.isArray(payload?.articles)
					? payload.articles.map(BlogService.mapApiToDomain)
					: [],
			'admin.cms.articleList.loadingError',
			API_METHOD.GET
		);
	}, [loginHash, fetchData, state]);

	return (
		<AdminListPage<ArticleListTableRow>
			adminTableSchema={adminTableSchema}
			handleOpenCreateModal={handleOpenCreateForm}
			btnCreateLabel="admin.cms.articleList.create"
			handleOnTableRowClick={handleGoToDetail}
			handlers={{
				...handlers,
			}}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
			adminTableVariant={AdminTableVariants.DYNAMIC_COLUMNS}
			columnOrder={[
				COLUMN.TITLE,
				COLUMN.LANGUAGE,
				COLUMN.TAGS,
				COLUMN.URL,
				COLUMN.PUBLISH_DATE,
				COLUMN.STATE,
			]}
		/>
	);
};

export default BlogArticleListPage;
