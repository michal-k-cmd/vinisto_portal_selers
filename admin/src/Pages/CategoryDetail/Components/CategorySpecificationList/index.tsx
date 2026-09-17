import { FC, ReactNode, useCallback, useContext, useState } from 'react';
import { get } from 'Helpers/lodash';
import { confirmAlert } from 'react-confirm-alert';
import { useLoaderData, useRevalidator } from 'react-router-dom';
import { CategoryDetailLoader } from 'Pages/CategoryDetail/interfaces';
import { SpecificationDetail } from 'Services/Specification/interfaces';
import {
	ADD_SPECIFICATION_TO_CATEGORY,
	EDIT_SPECIFICATION_IN_CATEGORY,
} from 'Components/Modal/constants';
import { SpecificationType } from 'Services/Specification/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { apiServiceInstance } from 'Services/ApiService';
import CategoryService from 'Services/Category';
import { ModalContext } from 'Components/Modal/context';
import SpecificationListView from 'Components/SpecificationListView';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';

import { CategorySpecificationListProps } from './interfaces';

import './styles.css';

const CategorySpecificationList: FC<CategorySpecificationListProps> = ({
	category,
}) => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const { handleOpenModal } = useContext(ModalContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);

	const { bundlesCount } = useLoaderData() as CategoryDetailLoader;

	const [matchingBundleCount, setMatchingBundleCount] = useState(
		bundlesCount ?? 0
	);
	const [isUpdatingBundleCount, setIsUpdatingBundleCount] = useState(false);

	const t = useFormatMessage();
	const revalidator = useRevalidator();
	const getLocalizedValue = useLocalizedValue();

	const handleOnRecalculate = () => {
		setIsUpdatingBundleCount(true);
		CategoryService.getBundlesCount(category.id)
			.then(setMatchingBundleCount)
			.catch(() =>
				handleShowErrorNotification(
					'admin.category.specifications.bundleCount.error'
				)
			)
			.finally(() => setIsUpdatingBundleCount(false));
	};

	const handleOnRemove = useCallback(
		(specificationId: string) => () => {
			confirmAlert({
				title:
					t({ id: 'admin.category.specifications.delete.title' })?.toString() ??
					'',
				message:
					t({
						id: 'admin.category.specifications.delete.message',
					})?.toString() ?? '',
				buttons: [
					{
						label: t({ id: 'admin.confirm.yes' })?.toString() ?? '',
						onClick: () => {
							CategoryService.removeSpecification(
								category.id,
								specificationId,
								vinistoUser.loginHash
							)
								.then(() => {
									handleShowSuccessNotification(
										'admin.category.specifications.delete.success'
									);
									revalidator.revalidate();
								})
								.catch(() =>
									handleShowErrorNotification(
										'admin.category.specifications.delete.error'
									)
								);
						},
					},
					{
						label: t({ id: 'admin.confirm.no' })?.toString() ?? '',
						onClick: () => null,
					},
				],
			});
		},
		[
			t,
			category.id,
			vinistoUser.loginHash,
			handleShowSuccessNotification,
			revalidator,
			handleShowErrorNotification,
		]
	);

	const handleOnEdit = (specification: SpecificationDetail) => () => {
		const specificationType = specification.definition.specificationType;
		const specificationToEdit = {
			id: specification.definition.id,
			name: specification.definition.name,
			specificationType,
			allowedValues: specification.definition.allowedValues,
			availableValues: specification.definition.availableValues,
		};

		if (
			[
				SpecificationType.COMBO_BOX,
				SpecificationType.MULTI_COMBO_BOX,
				SpecificationType.DECIMAL_NUMBER,
				SpecificationType.DECIMAL_NUMBER_IMPERIAL,
				SpecificationType.NUMBER,
				SpecificationType.NUMBER_IMPERIAL,
				SpecificationType.TEXT,
			].includes(specificationType)
		) {
			apiServiceInstance
				.get(
					`product-api/specifications/${specification.definition.id}/GetSpecification`,
					true
				)
				.then((payload) => {
					handleOpenModal(EDIT_SPECIFICATION_IN_CATEGORY, {
						specification: {
							...specificationToEdit,
							allowedValues: get(payload, 'specification.allowedValues', []),
							availableValues: get(
								payload,
								'specification.availableValues',
								[]
							),
						},
						selectedValues: specification.value.allowedValues,
						categoryId: category.id,
					});
				})
				.catch(() =>
					handleShowErrorNotification(
						'admin.category.specifications.edit.error'
					)
				);
		} else {
			handleOpenModal(EDIT_SPECIFICATION_IN_CATEGORY, {
				specification: specificationToEdit,
				selectedValues: specification.value.allowedValues,
				categoryId: category.id,
			});
		}
	};

	const specificationValueMapper = (
		specification: SpecificationDetail,
		yesLabel: ReactNode,
		noLabel: ReactNode
	): string => {
		const specificationType = specification.definition.specificationType;
		if (
			[SpecificationType.MULTI_COMBO_BOX, SpecificationType.COMBO_BOX].includes(
				specificationType
			)
		) {
			return Object.values(specification.definition.allowedValues ?? {})
				.map((value) => getLocalizedValue(value.name))
				.join(', ');
		}
		if (!specification.value.allowedValues) return '';

		if (specificationType === SpecificationType.CHECK_BOX) {
			return specification.value.allowedValues
				.map((value) => (value === true ? yesLabel : noLabel))
				.join(', ');
		}

		return specification.value.allowedValues?.join(', ');
	};

	const title =
		t({ id: 'admin.category.specifications.title' })?.toString() ?? '';

	const matchingCountLabel =
		t({
			id: 'admin.category.specifications.matchingBundles.label',
		})?.toString() ?? '';

	return (
		<SpecificationListView
			title={title}
			matchingCountLabel={matchingCountLabel}
			matchingCount={matchingBundleCount}
			onRecalculate={handleOnRecalculate}
			isRecalculating={isUpdatingBundleCount}
			specifications={category.specificationDetails}
			handleOnEdit={handleOnEdit}
			handleOnRemove={handleOnRemove}
			specificationValueMapper={specificationValueMapper}
			onAddSpecification={() =>
				handleOpenModal(ADD_SPECIFICATION_TO_CATEGORY, {
					categoryId: category.id,
					alreadyAdded: category.specificationDetails,
				})
			}
		/>
	);
};

export default CategorySpecificationList;
