import { useMutation } from '@tanstack/react-query';
import getUrlString from 'Helpers/getUrlString';
import { useContext } from 'react';
import { NotificationsContext } from 'Services/NotificationService';

import supplierTagService from '@/supplier-service/tag';
import { VinistoSupplierDllModelsApiSupplierTagCreateSupplierTagResponseContract } from '@/api-types/supplier-api';
import { VinistoHelperDllEnumsLanguage } from '@/api-types/product-api';

interface CreateSupplierTagParams {
	name: string;
	url?: string;
	activeLanguageKey: VinistoHelperDllEnumsLanguage;
	userLoginHash: string;
}

const createSupplierTag = ({
	name,
	url,
	activeLanguageKey,
	userLoginHash,
}: CreateSupplierTagParams) =>
	supplierTagService.create({
		name: [{ language: activeLanguageKey, value: name }],
		url: [
			{
				language: activeLanguageKey,
				value: url ? url : getUrlString(name),
			},
		],
		userLoginHash,
	});

export const useCreateSupplierTag = ({
	onSuccessCallback,
}: {
	onSuccessCallback: (
		args: VinistoSupplierDllModelsApiSupplierTagCreateSupplierTagResponseContract &
			CreateSupplierTagParams
	) => void;
}) => {
	const notificationsContext = useContext(NotificationsContext);

	return useMutation(createSupplierTag, {
		onSuccess: (response, variables) => {
			notificationsContext.handleShowSuccessNotification(
				'supplierTag.create.success'
			);
			onSuccessCallback({ ...response, ...variables });
		},
		onError: () => {
			notificationsContext.handleShowErrorNotification(
				'supplierTag.create.error'
			);
		},
	});
};

const attachTagsToSupplier = ({
	tagIds,
	supplierId,
	userLoginHash,
}: {
	tagIds: string[];
	supplierId: string;
	userLoginHash: string;
}) =>
	supplierTagService.attachTagToSupplier({
		supplierTagIds: tagIds,
		supplierId,
		userLoginHash,
	});

export const useAttachTagToSupplier = () => {
	const notificationsContext = useContext(NotificationsContext);

	return useMutation(attachTagsToSupplier, {
		onSuccess: () => {
			notificationsContext.handleShowSuccessNotification(
				'supplierTag.attachToSupplier.success'
			);
		},
		onError: () => {
			notificationsContext.handleShowErrorNotification(
				'supplierTag.attachToSupplier.error'
			);
		},
	});
};

const detachTagFromSupplier = ({
	tagIds,
	supplierId,
	userLoginHash,
}: {
	tagIds: string[];
	supplierId: string;
	userLoginHash: string;
}) =>
	supplierTagService.detachTagFromSupplier({
		supplierTagIds: tagIds,
		supplierId,
		userLoginHash,
	});

export const useDetachTagFromSupplier = () => {
	const notificationsContext = useContext(NotificationsContext);

	return useMutation(detachTagFromSupplier, {
		onSuccess: () => {
			notificationsContext.handleShowSuccessNotification(
				'admin.detachTagFromSupplier.success'
			);
		},
		onError: () => {
			notificationsContext.handleShowErrorNotification(
				'admin.detachTagFromSupplier.error'
			);
		},
	});
};
