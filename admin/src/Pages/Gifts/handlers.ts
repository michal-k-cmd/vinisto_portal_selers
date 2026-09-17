import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { NotificationsContext } from 'Services/NotificationService';

import api from '@/api';
import { AddonType } from '@/api-types/addons-api';

const toggleIsActivePropertyMutationFn = (params: {
	addonId: string;
	currentIsActiveState: boolean;
}) => {
	const { addonId, currentIsActiveState } = params;
	return api.patch(`addons-api/Addons/${addonId}`, undefined, [
		{
			op: 'replace',
			value: !currentIsActiveState,
			path: '/isActive',
		},
	]);
};

export const useToggleIsActivePropertyMutation = ({
	onSuccess,
	addonType,
}: {
	onSuccess?: () => void;
	addonType: AddonType;
}) => {
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	return useMutation({
		mutationFn: toggleIsActivePropertyMutationFn,
		onSuccess: (_, params) => {
			const { currentIsActiveState } = params;
			handleShowSuccessNotification(
				currentIsActiveState
					? `admin.createEditAddon.${addonType}.deactivate.success`
					: `admin.createEditAddon.${addonType}.activate.success`
			);
			onSuccess?.();
		},
		onError: (_, params) => {
			const { currentIsActiveState } = params;
			handleShowErrorNotification(
				currentIsActiveState
					? `admin.createEditAddon.${addonType}.deactivate.success`
					: `admin.createEditAddon.${addonType}.activate.success`
			);
		},
	});
};

const deleteAddonMutation = (params: { addonId: string }) =>
	api.delete(`addons-api/Addons/${params.addonId}`, undefined, undefined, {
		responseType: 'text',
	});

export const useDeleteAddonMutation = ({
	onSuccess,
	addonType,
}: {
	onSuccess?: () => void;
	addonType: AddonType;
}) => {
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	return useMutation({
		mutationFn: deleteAddonMutation,
		onSuccess: () => {
			handleShowSuccessNotification(
				`admin.createEditAddon.${addonType}.delete.success`
			);
			onSuccess?.();
			// dispatch({ type: PageListAction.setShouldReload, value: true });
		},
		onError: () => {
			handleShowErrorNotification(
				`admin.createEditAddon.${addonType}.delete.error`
			);
		},
	});
};
