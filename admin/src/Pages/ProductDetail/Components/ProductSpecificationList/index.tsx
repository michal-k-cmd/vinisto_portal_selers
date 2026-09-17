import { FC, useCallback, useContext } from 'react';
import { get } from 'Helpers/lodash';
import { confirmAlert } from 'react-confirm-alert';
import { ModalContext } from 'Components/Modal/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { EDIT_SPECIFICATION_IN_PRODUCT } from 'Components/Modal/constants';
import {
	TYPE_COMBO_BOX,
	TYPE_MULTI_COMBO_BOX,
} from 'Services/Specification/constants';
import { apiServiceInstance } from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import SpecificationList from 'Components/SpecificationList';
import { useQueryClient } from '@tanstack/react-query';
import './styles.css';

import type Product from '@/domain/product';

interface Props {
	product?: Product;
}

const ProductSpecificationList: FC<Props> = ({ product }) => {
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);
	const modalContext = useContext(ModalContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const queryClient = useQueryClient();
	const t = useFormatMessage();

	const handleOnRemoveProductSpecification = useCallback(
		(specificationId: string) => () => {
			const productId = product?.id;

			confirmAlert({
				title: `${t({
					id: 'admin.confirm.deleteProductSpecification.title',
				})}`,
				message: `${t({
					id: 'admin.confirm.deleteProductSpecification.message',
				})}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.confirm.yes',
						})}`,
						onClick: () => {
							apiServiceInstance
								.delete(
									`product-api/products/${productId}/specifications/${specificationId}`,
									undefined,
									true,
									[
										{
											key: 'UserLoginHash',
											value: authenticationContext.vinistoUser.loginHash,
										},
									]
								)
								.then(() => {
									queryClient.invalidateQueries(['productDetail', productId]);
									notificationsContext.handleShowSuccessNotification(
										'admin.deleteSpecificationInProduct.success'
									);
								})
								.catch(() => {
									notificationsContext.handleShowErrorNotification(
										'admin.deleteSpecificationInProduct.error'
									);
								});
						},
					},
					{
						label: `${t({ id: 'admin.confirm.no' })}`,
						onClick: () => {},
					},
				],
			});
		},
		[]
	);

	const handleOnEditProductSpecification = useCallback(
		(specification: Record<any, any>) => () => {
			if (
				get(specification, 'definition.specificationType', '') ===
					TYPE_COMBO_BOX ||
				get(specification, 'definition.specificationType', '') ===
					TYPE_MULTI_COMBO_BOX
			) {
				apiServiceInstance
					.get(
						`product-api/specifications/${get(
							specification,
							'definition.id'
						)}/GetSpecification`,
						true
					)
					.then((payload: Record<any, any>) => {
						modalContext.handleOpenModal(EDIT_SPECIFICATION_IN_PRODUCT, {
							product,
							specification,
							productSpecification: get(payload, 'specification'),
						});
					})
					.catch(() =>
						notificationsContext.handleShowErrorNotification(
							'admin.editSpecificationInProduct.error'
						)
					);
			} else {
				modalContext.handleOpenModal(EDIT_SPECIFICATION_IN_PRODUCT, {
					specification,
					product,
				});
			}
		},
		[]
	);

	return (
		<SpecificationList
			title="admin.productDetail.productSpecifications"
			specifications={product?.specificationDetails ?? []}
			handleOnEdit={handleOnEditProductSpecification}
			handleOnRemove={handleOnRemoveProductSpecification}
			className="product-specification-list"
		/>
	);
};

export default ProductSpecificationList;
