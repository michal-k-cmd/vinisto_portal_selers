import { MouseEventHandler, useCallback, useContext, useEffect } from 'react';
import { get } from 'Helpers/lodash';
import { Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { Form } from 'react-final-form';
import { StringParam, useQueryParam, withDefault } from 'Helpers/query-params';
import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import {
	CHANGE_HOMEPAGE_CATEGORY_SEQUENCE_NUMBER,
	CREATE_HOMEPAGE_CATEGORY,
} from 'Components/Modal/constants';
import { API_METHOD, PageListAction } from 'Hooks/useAdminTable/constants';
import useAdminTable from 'Hooks/useAdminTable';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useTableSchema from 'Hooks/useTableSchema';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import AdminListPage from 'Components/AdminListPage';
import { InputSelect } from 'Components/Form';
import useNavigateWithNewtabOption from 'Hooks/useNavigateWithNewtabOption';

import {
	hpCategoryListTableKeys,
	HpCategoryType,
	hpCategoryTypeOptions,
	SORTING_COLUMN_MAP,
} from './constants';

const CategoryHomePageList = () => {
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
	const [selectedType, setSelectedType] = useQueryParam(
		'type',
		withDefault(StringParam, HpCategoryType.HEAD)
	);

	const tableSchema: TableSchema = [
		{
			header: `${t({ id: 'admin.categoryDetail.name.label' })}`,
			id: hpCategoryListTableKeys.NAME_DB_COLUMN,
			accessorFn: (row) => getLocalizedValue(get(row, 'name', [])),
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			header: `${t({
				id: 'admin.customCarouselsHomePageDetail.sequenceNumber.label',
			})}`,
			id: hpCategoryListTableKeys.ORDER_DB_COLUMN,
			accessorKey: hpCategoryListTableKeys.ORDER_DB_COLUMN,
			enableColumnFilter: false,
			enableSorting: true,
		},
		{
			header: '',
			id: 'placeholder',
			cell: (entity) => (
				<div className="d-flex justify-content-end">
					<Button
						className="me-2"
						onClick={(e) => {
							e.stopPropagation();
							handleOpenChangeSequenceNumberModal(entity?.row);
						}}
					>
						{t({ id: 'admin.btn.changeSequenceNumberHpCategory' })}
					</Button>
					<Button onClick={handleOnDeleteHomePageCategory(entity.row.id)}>
						{t({ id: 'admin.btn.deleteHpCategory' })}
					</Button>
				</div>
			),
		},
	];

	const adminTableSchema = getTableSchema(tableSchema);

	const handleOpenChangeSequenceNumberModal = (category: Record<any, any>) => {
		modalContext.handleOpenModal(CHANGE_HOMEPAGE_CATEGORY_SEQUENCE_NUMBER, {
			category,
			selectedType,
			onSubmit: () => dispatch({ type: PageListAction.reset }),
		});
	};

	const handleOnDeleteHomePageCategory = useCallback(
		(categoryId: string): MouseEventHandler =>
			(event) => {
				event.stopPropagation();
				confirmAlert({
					title: `${t({
						id: 'admin.popups.deleteHpCategory.title',
					})}`,
					message: `${t({
						id: 'admin.popups.deleteHpCategory.description',
					})}`,
					buttons: [
						{
							label: `${t({
								id: 'admin.popups.deleteHpCategory.yes',
							})}`,
							onClick: () => {
								apiServiceInstance
									.delete(
										`product-api/home-page/categories/${selectedType}`,
										categoryId,
										true,
										[
											{
												key: 'UserLoginHash',
												value: authenticationContext.vinistoUser?.loginHash,
											},
										]
									)
									.then(() => {
										notificationsContext.handleShowSuccessNotification(
											'admin.deleteHpCategory.success'
										);
										dispatch({ type: PageListAction.reset });
									})
									.catch(() => {
										notificationsContext.handleShowErrorNotification(
											'admin.deleteHpCategory.error'
										);
									});
							},
						},
						{
							label: `${t({
								id: 'admin.popups.deleteHpCategory.no',
							})}`,
							onClick: () => {},
						},
					],
				});
			},
		[authenticationContext, notificationsContext, dispatch, t, selectedType]
	);

	const handleOnSelectType = useCallback(
		(value: string) => {
			setSelectedType(value);
			dispatch({ type: PageListAction.setShouldReload, value: true });
		},
		[setSelectedType]
	);

	const handleOnTableRowClick = (
		entity: IPageListTableRow,
		event: React.MouseEvent
	) => navigateWithNewtabOption(`/category-detail/${entity.id}`, event);

	const handleOpenCreateModal = useCallback(() => {
		modalContext.handleOpenModal(CREATE_HOMEPAGE_CATEGORY, {
			resetCategoryList: () => dispatch({ type: PageListAction.reset }),
			selectedType: selectedType,
			categories: state?.data,
		});
	}, [
		modalContext.handleOpenModal,
		dispatch,
		selectedType,
		state?.data,
		selectedType,
	]);

	useEffect(() => {
		const apiParams: { key: string; value: any }[] = [];

		const [sortByColumn] = state.sorting;

		if (Object.hasOwn(SORTING_COLUMN_MAP, sortByColumn?.id)) {
			apiParams.push({
				key: 'SortingColumn',
				value: SORTING_COLUMN_MAP[sortByColumn.id],
			});
			apiParams.push({ key: 'IsSortingDescending', value: sortByColumn.desc });
		}

		fetchData(
			`product-api/home-page/categories/${selectedType}`,
			apiParams,
			(payload) => {
				return (
					payload.homePageCategory?.categories?.map(
						(category: Record<any, any>) => {
							const categoryDetail =
								payload?.homePageCategory?.categoriesDetail?.find(
									(detail: Record<any, any>) =>
										detail?.id === category?.categoryId
								);

							return {
								...categoryDetail,
								sequenceNumber: category.sequenceNumber,
							};
						}
					) ?? []
				);
			},
			'admin.categoryHomePageList.loadingError',
			API_METHOD.GET
		);
	}, [fetchData, selectedType, state]);

	return (
		<AdminListPage
			adminTableSchema={adminTableSchema}
			handleOpenCreateModal={handleOpenCreateModal}
			btnCreateLabel="admin.categoryHomePageList.addCategory"
			handleOnTableRowClick={handleOnTableRowClick}
			handlers={handlers}
			state={state}
			pageCount={pageCount}
			pageNumber={pageNumber}
			headerContent={
				<div className="col-2 mb-2">
					<Form
						initialValues={{
							homepageCategoryType: selectedType,
						}}
						onSubmit={() => undefined}
					>
						{() => (
							<InputSelect
								identifier="homepageCategoryType"
								name="homepageCategoryType"
								onChange={handleOnSelectType}
								options={hpCategoryTypeOptions}
							/>
						)}
					</Form>
				</div>
			}
		/>
	);
};

export default CategoryHomePageList;
