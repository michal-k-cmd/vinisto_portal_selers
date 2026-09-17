import Detail from 'Components/Detail';
import { LocalizationContext } from 'Services/LocalizationService';
import { useCallback, useContext, useMemo, useReducer } from 'react';
import EditIcon from 'Components/Icons/Edit';
import DeleteIcon from 'Components/Icons/Delete';
import { BiPlus } from 'react-icons/bi';
import { Modal } from 'Components/Modal';
import { type LinkWidget } from 'vinisto_api_client/src/domain/link-widget';
import LinkWidgetAdapter from 'vinisto_api_client/src/domain/link-widget/adapter';
import { Link_Widget_Types } from 'vinisto_api_client/src/domain/link-widget/enums';
import linkWidgetApi from 'vinisto_api_client/src/link-widget-service';
import { confirmAlert } from 'react-confirm-alert';
import { Row } from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {
	LINK_WIDGET_DETAIL_QUERY_KEY,
	useCreateLinkWidget,
	useDeletLinkWidget,
	useEditLinkWidget,
} from 'Pages/LinkWidgetList/hooks';
import { SECTION_TRANSLATION_MAP } from 'Pages/LinkWidgetList/constants';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import LinkWidgetPreview from 'Components/LinkWidgetPreview';
import { AdminTableFilterType } from 'Components/AdminTable/constants';
import { IntegrationContext } from 'Services/IntergationService';
import { platformIdLabelMap } from 'Pages/OrderList/constants';

import LinkWidgetCreateOrUpdateForm from '../LinkWidgetList/Components/LinkWidgetCreateOrUpdateForm';

import { LW_CRUD_ACTION, LW_MODAL_ACTION } from './constants';
import { ModalAction, ModalState } from './interfaces';

import { PlatformIdType } from '@/shared';

const LinkWingetDetailPage = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const urlParams = useParams<{ '*': string }>();
	const navigate = useNavigate();
	const { integrations } = useContext(IntegrationContext);

	const pathId = decodeURIComponent(`/${urlParams['*']}`);

	const getTypeFromPathId = (pathId: string) => {
		if (pathId.includes('/kategorie/')) return Link_Widget_Types.Category;
		if (pathId.includes('/specifikace/'))
			return Link_Widget_Types.Specification;
		if (pathId.includes('/blog/')) return Link_Widget_Types.Blog;
	};

	const initialModalState: ModalState = {
		isOpen: false,
		mode: LW_CRUD_ACTION.CREATE,
		data: {},
	};

	const modalStateReducer = (
		state: ModalState,
		action: ModalAction
	): ModalState => {
		const { type, payload } = action;
		switch (type) {
			case LW_MODAL_ACTION.OPEN:
				return {
					...state,
					isOpen: true,
					mode: payload.mode,
					data: payload.data,
				};
			case LW_MODAL_ACTION.CLOSE:
				return {
					...state,
					isOpen: false,
					data: {},
				};
			default:
				return state;
		}
	};

	const [modalState, dispatchModalState] = useReducer<
		(state: ModalState, actions: ModalAction) => ModalState
	>(modalStateReducer, initialModalState);

	const { fromApi } = useMemo(() => new LinkWidgetAdapter(), []);

	const linkWidgetListQuery = useQuery(
		[LINK_WIDGET_DETAIL_QUERY_KEY, pathId],
		() =>
			linkWidgetApi
				.linksList({ PathId: pathId })
				.then((response) => response.data.map(fromApi))
	);

	const linkWidgetDeleteMutation = useDeletLinkWidget({
		onSuccessCallback: () => undefined,
	});

	const linkWidgetEditMutation = useEditLinkWidget({
		onSuccessCallback: () => {
			dispatchModalState({ type: LW_MODAL_ACTION.CLOSE });
		},
	});

	const linkWidgetCreateMutation = useCreateLinkWidget({
		onSuccessCallback: () => {
			dispatchModalState({ type: LW_MODAL_ACTION.CLOSE });
		},
	});

	const handleOnDelete = useCallback(
		(id: string) => {
			confirmAlert({
				title: `${t({
					id: 'admin.linkWidget.delete.title',
				})}`,
				message: `${t({
					id: 'admin.linkWidget.delete.message',
				})}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.yes',
						})}`,
						onClick: () => linkWidgetDeleteMutation.mutateAsync(id),
					},
					{
						label: `${t({
							id: 'admin.no',
						})}`,
						onClick: () => undefined,
					},
				],
			});
		},
		[linkWidgetDeleteMutation, t]
	);

	const adminTableSchema: TableSchema<LinkWidget> = useMemo(
		() => [
			{
				header: `${t({ id: 'nameOf' })}`,
				accessorKey: 'name',
				size: 200,
			},
			{
				header: `${t({ id: 'type' })}`,
				accessorKey: 'type',
				accessorFn: (row: LinkWidget) => {
					return t({ id: `linkWidgetType.${Link_Widget_Types[row.type]}` });
				},
				size: 150,
			},
			{
				header: `${t({ id: 'url' })}`,
				accessorKey: 'url',
				size: 250,
				cell: ({ row }: { row: Row<LinkWidget> }) => {
					const url = row.original?.url ?? '';
					const pathId = row.original?.pathId ?? '';
					if (/^https?:\/\//.test(url)) return <a href={url}>{url}</a>;
					else if (pathId.includes('CATEGORY'))
						return <a href={`/link-widget-detail${url}|CATEGORY`}>{url}</a>;
					else return url;
				},
			},
			{
				header: `${t({ id: 'order' })}`,
				accessorKey: 'order',
				size: 120,
			},

			{
				header: `${t({ id: 'platform' })}`,
				accessorKey: 'availableOnPlatforms',
				accessorFn: (row) =>
					row.availableOnPlatforms
						?.map((platform) => platformIdLabelMap[platform as PlatformIdType])
						.join(', '),
				meta: {
					filterType: AdminTableFilterType.DROPDOWN,
					dropDownFilterOptions:
						integrations?.map((platform) => [
							`${platformIdLabelMap[platform.integrationId as PlatformIdType]}`,
							`${platform.integrationName}`,
						]) ?? [],
				},
			},
			{
				header: `${t({ id: 'actions' })}`,
				size: 150,
				cell: ({ row }: { row: Row<LinkWidget> }) => (
					<>
						<button
							onClick={() =>
								dispatchModalState({
									type: LW_MODAL_ACTION.OPEN,
									payload: {
										mode: LW_CRUD_ACTION.UPDATE,
										data: row.original,
									},
								})
							}
						>
							<EditIcon />
						</button>
						<button>
							<DeleteIcon onClick={() => handleOnDelete(row.original.id)} />
						</button>
					</>
				),
			},
		],
		[handleOnDelete, integrations, t]
	);

	return (
		<Detail.View>
			<Detail.Container>
				<div className="d-flex justify-content-between py-2">
					<Detail.Heading value={`${pathId}`.split('|')[0]} />
					<Detail.Button
						className="w-content"
						onClick={() => navigate(-1)}
					>
						{t({ id: 'admin.btn.back' })}
					</Detail.Button>
				</div>
				<Detail.Subheading
					value={(() => {
						const section = `${pathId}`.split('|')[1];
						if (section in SECTION_TRANSLATION_MAP)
							return t({
								id: SECTION_TRANSLATION_MAP[
									section as keyof typeof SECTION_TRANSLATION_MAP
								],
							});
						return section;
					})()}
				/>
				<LinkWidgetPreview
					data={linkWidgetListQuery.data}
					onItemClick={(data) =>
						dispatchModalState({
							type: LW_MODAL_ACTION.OPEN,
							payload: {
								mode: LW_CRUD_ACTION.UPDATE,
								data,
							},
						})
					}
				/>
				<Detail.Button
					className="my-2"
					onClick={() =>
						dispatchModalState({
							type: LW_MODAL_ACTION.OPEN,
							payload: {
								mode: LW_CRUD_ACTION.CREATE,
								data: {
									pathId,
									type: getTypeFromPathId(pathId),
								},
							},
						})
					}
				>
					<BiPlus className="me-1" />
					{t({ id: 'add' })}
				</Detail.Button>
				<Detail.DynamicTable<LinkWidget>
					columns={adminTableSchema}
					data={linkWidgetListQuery.data ?? []}
				/>
			</Detail.Container>
			<Modal
				title={
					modalState.mode === LW_CRUD_ACTION.CREATE
						? `${t({ id: 'admin.linkWidget.create.title' })}`
						: `${t({ id: 'admin.linkWidget.edit.title' })}`
				}
				show={modalState.isOpen}
				handleClose={() => dispatchModalState({ type: LW_MODAL_ACTION.CLOSE })}
			>
				{/* @ts-expect-error The discriminated union does not work properly (ModalState is the issue), but there's no time to solve this now	*/}
				<LinkWidgetCreateOrUpdateForm
					mode={modalState.mode}
					data={modalState.data}
					updateHandler={linkWidgetEditMutation.mutateAsync}
					createHandler={linkWidgetCreateMutation.mutateAsync}
				/>
			</Modal>
		</Detail.View>
	);
};

export default LinkWingetDetailPage;
