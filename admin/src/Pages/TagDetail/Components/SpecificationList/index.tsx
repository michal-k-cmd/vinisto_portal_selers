import { ReactNode, useContext, useState } from 'react';
import { get } from 'Helpers/lodash';
import { confirmAlert } from 'react-confirm-alert';
import { SpecificationDetail } from 'Services/Specification/interfaces';
import {
	ADD_SPECIFICATION_TO_TAG,
	EDIT_SPECIFICATION_IN_TAG,
} from 'Components/Modal/constants';
import { SpecificationType } from 'Services/Specification/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import SpecificationListView from 'Components/SpecificationListView';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { TagService } from 'vinisto_api_client';

import { CountryCode } from '@/shared';

type SpecificationListProps = {
	tagId: string;
	tagCountryCode: CountryCode;
	specificationDetails: any;
	refetchTagsFn: () => void;
};

const SpecificationList = ({
	tagId,
	tagCountryCode,
	specificationDetails,
	refetchTagsFn,
}: SpecificationListProps) => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const { handleOpenModal } = useContext(ModalContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);

	const [matchingBundleCount, setMatchingBundleCount] = useState(
		specificationDetails.length ?? 0
	);
	const [isUpdatingBundleCount, setIsUpdatingBundleCount] = useState(false);

	const t = useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const handleOnRecalculate = () => {
		setIsUpdatingBundleCount(true);
		TagService.getBundlesCountForTag(tagId, tagCountryCode)
			.then((res) => {
				setMatchingBundleCount(res.bundlesCount ?? 0);
			})
			.catch(() =>
				handleShowErrorNotification(
					'admin.tagDetail.specifications.bundleCount.error'
				)
			)
			.finally(() => setIsUpdatingBundleCount(false));
	};

	const handleOnRemove = (specificationId: string) => () => {
		confirmAlert({
			title:
				t({
					id: 'admin.tagDetail.specifications.delete.title',
				})?.toString() ?? '',
			message:
				t({
					id: 'admin.tagDetail.specifications.delete.message',
				})?.toString() ?? '',
			buttons: [
				{
					label: t({ id: 'admin.confirm.yes' })?.toString() ?? '',
					onClick: () => {
						TagService.deleteSpecificationFromTag({
							tagId,
							countryOfSale: tagCountryCode,
							specificationId,
							UserLoginHash: vinistoUser.loginHash,
						})
							.then(() => {
								handleShowSuccessNotification(
									'admin.tagDetail.specifications.delete.success'
								);
								refetchTagsFn();
							})
							.catch(() =>
								handleShowErrorNotification(
									'admin.tagDetail.specifications.delete.error'
								)
							);
					},
				},
				{
					label: t({ id: 'admin.confirm.no' })?.toString() ?? '',
				},
			],
		});
	};

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
					handleOpenModal(EDIT_SPECIFICATION_IN_TAG, {
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
						tagId: tagId,
						countryCode: tagCountryCode,
						refetchTagsFn,
					});
				})
				.catch(() =>
					handleShowErrorNotification(
						'admin.tagDetail.specifications.edit.error'
					)
				);
		} else {
			handleOpenModal(EDIT_SPECIFICATION_IN_TAG, {
				specification: specificationToEdit,
				selectedValues: specification.value.allowedValues,
				tagId: tagId,
				countryCode: tagCountryCode,
				refetchTagsFn,
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
		t({ id: 'admin.tagDetail.specifications.title' })?.toString() ?? '';

	const matchingCountLabel =
		t({
			id: 'admin.tagDetail.specifications.matchingBundles.label',
		})?.toString() ?? '';

	return (
		<SpecificationListView
			title={title}
			matchingCountLabel={matchingCountLabel}
			matchingCount={matchingBundleCount}
			onRecalculate={handleOnRecalculate}
			isRecalculating={isUpdatingBundleCount}
			specifications={specificationDetails}
			handleOnEdit={handleOnEdit}
			handleOnRemove={handleOnRemove}
			specificationValueMapper={specificationValueMapper}
			onAddSpecification={() =>
				handleOpenModal(ADD_SPECIFICATION_TO_TAG, {
					tagId: tagId,
					alreadyAdded: specificationDetails,
					countryCode: tagCountryCode,
					refetchTagsFn,
				})
			}
		/>
	);
};

export default SpecificationList;
