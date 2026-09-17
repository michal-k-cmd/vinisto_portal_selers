import { Dispatch, useCallback, useContext } from 'react';
import { MdCategory, MdClose, MdDoneOutline } from 'react-icons/md';
import { BsFillTagsFill } from 'react-icons/bs';
import ProductService from 'Services/ProductService/Product';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { PageListAction } from 'Hooks/useAdminTable/constants';
import {
	IPageListState,
	IPageListStateReducerAction,
} from 'Hooks/useAdminTable/interfaces';
import { ModalContext } from 'Components/Modal/context';
import {
	ADD_CATEGORY_TO_PRODUCT,
	ADD_TAG_TO_PRODUCT,
} from 'Components/Modal/constants';

import { ProductListTableRow } from './interfaces';

const useProductBatchActions = (
	state: IPageListState<ProductListTableRow>,
	dispatch: Dispatch<IPageListStateReducerAction<ProductListTableRow>>
) => {
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const { loginHash } = useContext(AuthenticationContext).vinistoUser;

	const handleBatchAddCategory = useCallback(async () => {
		const selectedIds = Object.keys(state.selection).filter(
			(key) => state.selection[key]
		);

		const onModalClose = () => {
			dispatch({ type: PageListAction.setShouldReload, value: true });
		};

		modalContext.handleOpenModal(ADD_CATEGORY_TO_PRODUCT, {
			selectedIds,
			onModalClose,
		});
	}, [state.selection, modalContext, dispatch]);

	const handleBatchAddTag = () => {
		const selectedIds = Object.keys(state.selection).filter(
			(key) => state.selection[key]
		);

		const onModalClose = () => {
			dispatch({ type: PageListAction.setShouldReload, value: true });
		};

		modalContext.handleOpenModal(ADD_TAG_TO_PRODUCT, {
			productIds: selectedIds,
			onModalClose,
		});
	};

	const handleBatchEnable = async () => {
		const productIds = Object.keys(state.selection).filter(
			(key) => state.selection[key]
		);

		await ProductService.enableProducts({
			userLoginHash: loginHash,
			productIds,
		})
			.then(() => {
				dispatch({ type: PageListAction.setShouldReload, value: true });
				notificationsContext.handleShowSuccessNotification(
					'admin.productList.batchEnableSuccess'
				);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.productList.batchEnableError'
				);
			});
	};

	const handleBatchDisable = async () => {
		const productIds = Object.keys(state.selection).filter(
			(key) => state.selection[key]
		);

		await ProductService.disableProducts({
			userLoginHash: loginHash,
			productIds,
		})
			.then(() => {
				dispatch({ type: PageListAction.setShouldReload, value: true });
				notificationsContext.handleShowSuccessNotification(
					'admin.productList.batchDisableSuccess'
				);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.productList.batchDisableError'
				);
			});
	};

	//TODO: uncomment once API is ready for this feature
	return [
		{
			title: 'admin.productList.batchAddCategory',
			onClick: handleBatchAddCategory,
			ico: <MdCategory />,
		},
		{
			title: 'admin.productList.batchAddTag',
			onClick: handleBatchAddTag,
			ico: <BsFillTagsFill />,
		},
		// {
		//   title: 'admin.productList.batchAddSpecification',
		//   onClick: handleBatchAddSpecification,
		//   ico: <MdAdd />,
		// },
		{
			title: 'admin.productList.batchEnable',
			onClick: handleBatchEnable,
			ico: <MdDoneOutline />,
		},
		{
			title: 'admin.productList.batchDisable',
			onClick: handleBatchDisable,
			ico: <MdClose />,
		},
	];
};

export default useProductBatchActions;
