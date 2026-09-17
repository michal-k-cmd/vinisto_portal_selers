import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { confirmAlert } from 'react-confirm-alert';
import { LocalizationContext } from 'Services/LocalizationService';
import StrapiService from 'vinisto_api_client/src/strapi-service';
import type { BundleNote } from 'vinisto_api_client/src/api-types/strapi-api';

export const ALL_NOTES_QUERY_KEY = 'userNotes';

const getQueryKey = (bundleId: string, userEmail: string | null) => [
	'bundleNotes',
	bundleId,
	userEmail ?? '',
];

export const useGetUserNotesForBundle = (bundleId: string) => {
	const { vinistoUser } = useContext(AuthenticationContext);

	return useQuery({
		queryKey: getQueryKey(bundleId, vinistoUser?.email ?? ''),
		queryFn: ({ signal }) =>
			StrapiService.getBundleNotes(
				bundleId,
				vinistoUser?.email ?? '',
				undefined,
				{
					signal,
				}
			),
	});
};

export const useGetAllUserNotes = () => {
	const { email } = useContext(AuthenticationContext).vinistoUser;

	return useQuery({
		queryKey: [ALL_NOTES_QUERY_KEY, email],
		queryFn: () =>
			StrapiService.getBundleNotesPerUser({
				userEmail: `${email}`,
				pageSize: 100,
			}),
		// To consider: move latter into options param?
		enabled: !!email,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
	});
};

export const useCreateNote = (
	bundleId: string,
	options?: {
		onMutate?: () => void;
		onSuccess?: (note?: BundleNote) => void;
		onError?: (note: string) => void;
	}
) => {
	const { vinistoUser } = useContext(AuthenticationContext);
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (note: string) =>
			StrapiService.createBundleNote(bundleId, vinistoUser?.email ?? '', note),
		onMutate: async (newNote) => {
			options?.onMutate?.();

			const queryKey = getQueryKey(bundleId, vinistoUser?.email ?? '');
			await queryClient.cancelQueries({ queryKey });

			const previousNotes = queryClient.getQueryData<BundleNote[]>(queryKey);

			const optimisticNote: BundleNote = {
				id: Date.now(),
				bundleId,
				note: newNote,
				userEmail: vinistoUser?.email ?? '',
				createdAt: new Date().toISOString(),
			};

			if (previousNotes) {
				queryClient.setQueryData<BundleNote[]>(queryKey, [
					optimisticNote,
					...previousNotes,
				]);
			}

			return { previousNotes };
		},
		onSuccess: (note) => {
			handleShowSuccessNotification('bundle.notes.form.save.success');
			options?.onSuccess?.(note);
		},
		onError: (_, prevNote, context) => {
			if (context?.previousNotes) {
				const queryKey = getQueryKey(bundleId, vinistoUser?.email ?? '');
				queryClient.setQueryData(queryKey, context.previousNotes);
			}

			handleShowErrorNotification('bundle.notes.form.save.error');

			options?.onError?.(prevNote);
		},
	});
};

export const useUpdateNote = (
	note: BundleNote,
	options?: {
		onMutate?: () => void;
		onError?: (note: string) => void;
		onSuccess?: () => void;
	}
) => {
	const queryClient = useQueryClient();
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);

	return useMutation({
		mutationFn: (content: string) =>
			StrapiService.updateBundleNote(
				note.documentId as unknown as number,
				note.bundleId,
				note.userEmail ?? '',
				content
			),
		onMutate: async (newContent) => {
			const queryKey = getQueryKey(note.bundleId, note.userEmail ?? '');
			await queryClient.cancelQueries({ queryKey });

			const previousNotes = queryClient.getQueryData<BundleNote[]>(queryKey);

			if (previousNotes) {
				queryClient.setQueryData<BundleNote[]>(
					queryKey,
					previousNotes.map((n) =>
						n.id === note.id ? { ...n, note: newContent } : n
					)
				);
			}

			options?.onMutate?.();

			return { previousNotes };
		},
		onSuccess: () => {
			handleShowSuccessNotification('bundle.notes.form.edit.success');
			options?.onSuccess?.();
		},
		onError: (_, prevNote, context) => {
			if (context?.previousNotes) {
				const queryKey = getQueryKey(note.bundleId, note.userEmail ?? '');
				queryClient.setQueryData(queryKey, context.previousNotes);
			}

			handleShowErrorNotification('bundle.notes.form.edit.error');

			options?.onError?.(prevNote);
		},
	});
};

export const useDeleteNote = (
	note: BundleNote,
	options?: {
		onMutate?: () => void;
		onError?: () => void;
		onSuccess?: () => void;
	}
) => {
	const queryClient = useQueryClient();
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);

	return useMutation({
		mutationFn: () =>
			StrapiService.deleteBundleNote(note.documentId as unknown as number),
		onMutate: () => {
			// Optimistically remove note from cache
			const queryKey = getQueryKey(note.bundleId, note.userEmail ?? '');
			const previousNotes = queryClient.getQueryData<BundleNote[]>(queryKey);

			if (previousNotes) {
				queryClient.setQueryData<BundleNote[]>(
					queryKey,
					previousNotes.filter((n) => n.id !== note.id)
				);
			}

			options?.onMutate?.();

			// Return context for rollback
			return { previousNotes };
		},
		onSuccess: () => {
			handleShowSuccessNotification('bundle.notes.form.delete.success');
			options?.onSuccess?.();
		},
		onError: (_, __, context) => {
			if (context?.previousNotes) {
				const queryKey = getQueryKey(note.bundleId, note.userEmail ?? '');
				queryClient.setQueryData(queryKey, context.previousNotes);
			}

			handleShowErrorNotification('bundle.notes.form.delete.error');

			options?.onError?.();
		},
	});
};

export const useConfirmAlertOnDeleteNote = ({
	deleteHandler,
}: {
	deleteHandler: () => void;
}) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	return () => {
		confirmAlert({
			title: `${t({
				id: 'bundle.deleteNote',
			})}`,
			message: `${t({
				id: 'bundle.deleteNoteInfo',
			})}`,
			buttons: [
				{
					label: `${t({
						id: 'yes',
					})}`,
					onClick: deleteHandler,
				},
				{
					label: `${t({ id: 'no' })}`,
				},
			],
		});
	};
};
