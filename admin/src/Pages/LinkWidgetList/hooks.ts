import {
	QueryClient,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { useContext } from 'react';

import { LinkWidget } from '@/domain/link-widget';
import linkWidgetApi from '@/link-widget-service';

export const LINK_WIDGETS_QUERY_KEY = ['linkwidgets-api/links'] as const;
export const LINK_WIDGET_DETAIL_QUERY_KEY = 'linkWidgetList';

export const refreshLinkWidgetQueries = async (queryClient: QueryClient) => {
	try {
		await linkWidgetApi.linksClearCacheDelete({ secure: true });
	} catch {
		// Query invalidation still refreshes the admin views if cache clearing fails.
	}
	await Promise.all([
		queryClient.invalidateQueries(LINK_WIDGETS_QUERY_KEY),
		queryClient.invalidateQueries([LINK_WIDGET_DETAIL_QUERY_KEY]),
	]);
};

export const useCreateLinkWidget = ({
	onSuccessCallback,
}: {
	onSuccessCallback?: (data: Partial<LinkWidget>) => void;
}) => {
	const notificationContext = useContext(NotificationsContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const queryClient = useQueryClient();

	const handleCreateLink = (
		data: Partial<LinkWidget> & {
			name: string;
			pathId: string;
			availableOnPlatforms: number[];
		}
	) => linkWidgetApi.linkCreate(data, { secure: true });

	return useMutation(
		({
			data,
		}: {
			data: Partial<LinkWidget> & {
				name: string;
				pathId: string;
				availableOnPlatforms: number[];
			};
		}) => handleCreateLink(data),
		{
			onSuccess: async (_, { data }) => {
				await refreshLinkWidgetQueries(queryClient);
				notificationContext.handleShowSuccessNotification(
					`${t({ id: 'admin.linkWidgetList.create.success' })}`
				);
				if (onSuccessCallback) onSuccessCallback(data);
			},
			onError: () => {
				notificationContext.handleShowErrorNotification(
					`${t({ id: 'admin.linkWidgetList.create.error' })}`
				);
			},
		}
	);
};

export const useEditLinkWidget = ({
	onSuccessCallback,
}: {
	onSuccessCallback?: () => void;
}) => {
	const notificationContext = useContext(NotificationsContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const queryClient = useQueryClient();

	const handleEditLink = (id: string, link: LinkWidget) =>
		linkWidgetApi.linkUpdate(id, link, { secure: true });

	return useMutation(
		({ id, link }: { id: string; link: LinkWidget }) =>
			handleEditLink(id, link),
		{
			onSuccess: async () => {
				await refreshLinkWidgetQueries(queryClient);
				notificationContext.handleShowSuccessNotification(
					`${t({ id: 'admin.linkWidget.edit.success' })}`
				);
				if (onSuccessCallback) onSuccessCallback();
			},
			onError: () => {
				notificationContext.handleShowErrorNotification(
					`${t({ id: 'admin.linkWidget.edit.error' })}`
				);
			},
		}
	);
};

export const useDeletLinkWidget = ({
	onSuccessCallback,
}: {
	onSuccessCallback?: () => void;
}) => {
	const notificationContext = useContext(NotificationsContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const queryClient = useQueryClient();

	const handleDeleteLink = (id: string) =>
		linkWidgetApi.linkDelete(id, { secure: true });

	return useMutation(handleDeleteLink, {
		onSuccess: async () => {
			await refreshLinkWidgetQueries(queryClient);
			notificationContext.handleShowSuccessNotification(
				`${t({ id: 'admin.linkWidget.delete.success' })}`
			);
			if (onSuccessCallback) onSuccessCallback();
		},
		onError: () => {
			notificationContext.handleShowErrorNotification(
				`${t({ id: 'admin.linkWidget.delete.error' })}`
			);
		},
	});
};
