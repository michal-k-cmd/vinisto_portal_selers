import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdKeyboardBackspace, MdShoppingCart } from 'react-icons/md';
import { RiBarcodeBoxLine, RiBarcodeLine } from 'react-icons/ri';
import { BsFillCartDashFill, BsFillCartPlusFill } from 'react-icons/bs';
import {
	ADD_QUANTITY_TO_WAREHOUSE_BUNDLE,
	REMOVE_QUANTITY_FROM_WAREHOUSE_BUNDLE,
} from 'Components/Modal/constants';
import { apiServiceInstance } from 'Services/ApiService';
import { NotificationsContext } from 'Services/NotificationService';
import { ModalContext } from 'Components/Modal/context';
import AdminDetail from 'Components/AdminDetail';
import { VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemReturn } from 'vinisto_api_client/src/api-types/warehouse-api';

import { ItemState } from './interfaces';
import WarehouseItemDetailChangelog from './Changelog';

const WarehouseItemDetailPage = () => {
	const notificationsContext = useContext(NotificationsContext);
	const modalContext = useContext(ModalContext);

	const history = useNavigate();

	const { id: itemId } = useParams();
	const detailUrl = `warehouse-api/warehouse/bundles/${itemId}/GetWarehouseItem`;

	const [itemState, setItemState] = useState<ItemState>({
		loading: false,
		loaded: false,
		warehouseItem: {},
		error: null,
	});

	useEffect(() => {
		if (!itemState.loaded && !itemState.loading) {
			setItemState({
				loading: true,
				loaded: false,
				warehouseItem: {},
				error: null,
			});

			apiServiceInstance
				.get<VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemReturn>(
					detailUrl,
					true,
					undefined
				)
				.then((payload) => {
					setItemState({
						loading: false,
						loaded: true,
						warehouseItem: payload.warehouseBundleSnapshot?.bundleItem
							? {
									bundleItem: payload.warehouseBundleSnapshot?.bundleItem,
									totalQuantity: payload.warehouseBundleSnapshot?.totalQuantity,
							  }
							: {},
						error: null,
					});
				})
				.catch((error) => {
					notificationsContext.handleShowErrorNotification(
						'admin.warehouseItemDetail.loadingError'
					);
					setItemState({
						loading: false,
						loaded: true,
						warehouseItem: {},
						error: error.message ?? '',
					});
				});
		}
	}, [detailUrl, itemState, notificationsContext]);

	const getDetailSchema = useCallback(() => {
		const warehouseItem = itemState.warehouseItem;
		return [
			{
				icon: RiBarcodeBoxLine,
				label: 'admin.warehouseItemDetail.id.label',
				value: warehouseItem.bundleItem?.id ?? '',
				type: null,
			},
			{
				icon: RiBarcodeLine,
				label: 'admin.warehouseItemDetail.itemId.label',
				value: <Link to={`/bundle-detail/${itemId}`}>{itemId}</Link>,
				type: null,
			},
			{
				icon: MdShoppingCart,
				label: 'admin.warehouseItemDetail.quantity.label',
				value: warehouseItem.totalQuantity,
				type: null,
			},
		];
	}, [itemId, itemState]);

	const actionButtonsSchema = [
		{
			rowId: 'WAREHOUSE_BUTTON_ROW_1',
			items: [
				{
					label: 'admin.btn.addQuantityToWarehouseBundle',
					key: 'addQuantityToWarehouseBundle',
					disabled: itemState.loading ?? true,
					onClick: () => {
						modalContext.handleOpenModal(ADD_QUANTITY_TO_WAREHOUSE_BUNDLE, {
							bundleState: { ...itemState, bundleId: itemId },
							setBundleState: setItemState,
						});
					},
					icon: BsFillCartPlusFill,
				},
				{
					label: 'admin.btn.removeQuantityFromWarehouseBundle',
					key: 'removeQuantityFromWarehouseBundle',
					disabled: itemState.loading ?? true,
					onClick: () => {
						modalContext.handleOpenModal(
							REMOVE_QUANTITY_FROM_WAREHOUSE_BUNDLE,
							{
								bundleState: { ...itemState, bundleId: itemId },
								setBundleState: setItemState,
							}
						);
					},
					icon: BsFillCartDashFill,
				},
				{
					label: 'admin.btn.back',
					key: 'back',
					onClick: () => {
						history(-1);
					},
					icon: MdKeyboardBackspace,
				},
			].filter(Boolean),
		},
	];

	return (
		<>
			{itemState.loaded && (
				<AdminDetail
					detailSchema={getDetailSchema()}
					actionButtonsSchema={actionButtonsSchema}
					customComponentRender={() => (
						<WarehouseItemDetailChangelog itemState={itemState} />
					)}
				/>
			)}
		</>
	);
};

export default WarehouseItemDetailPage;
