'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ModalContext } from 'Components/Modal/context';
import { parseAsString, useQueryState } from 'nuqs';
import { useContext } from 'react';
import { LOGIN_MODAL, REGISTRATION_MODAL } from 'Components/Modal/constants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

/**
 * Hook for managing modals through URL parameters.
 *
 * Supports different modal types through the `modal` URL parameter:
 * - `/?modal=login` - Opens the login modal
 * - `/?modal=register` - Opens the registration modal
 *
 * Also handles redirect after successful authentication via the `redirectTo` parameter.
 */
export const useUrlControlledModal = () => {
	const [modalType, setModalType] = useQueryState(
		'modal',
		parseAsString.withDefault('')
	);
	const [redirectTo] = useQueryState('redirectTo');

	const { isLoggedIn } = useContext(AuthenticationContext);
	const router = useRouter();
	const { handleOpenModal } = useContext(ModalContext);

	/**
	 * Maps URL parameter values to modal component types
	 */
	const getModalComponentType = (type: string) => {
		switch (type) {
			case 'login':
				return LOGIN_MODAL;
			case 'register':
				return REGISTRATION_MODAL;
			default:
				return null;
		}
	};

	// Open the appropriate modal based on the URL parameter
	useEffect(() => {
		if (modalType) {
			const modalComponentType = getModalComponentType(modalType);
			if (modalComponentType) {
				handleOpenModal(modalComponentType, {
					onCloseCallback: () => {
						setModalType('');
					},
				});
			}
		}
	}, [modalType, handleOpenModal, setModalType]);

	// Close auth-related modals and handle redirect when user logs in
	useEffect(() => {
		if (isLoggedIn && (modalType === 'login' || modalType === 'register')) {
			setModalType('');
			if (redirectTo) {
				// Decode the URL if it's encoded
				const decodedRedirectTo = decodeURIComponent(redirectTo);

				// Add a small delay to ensure state updates have completed
				setTimeout(() => {
					router.push(decodedRedirectTo);
				}, 100);
			}
		}
	}, [isLoggedIn, modalType, redirectTo, router, setModalType]);

	// Public API
	return {
		/**
		 * Opens the login modal and updates the URL
		 */
		openLoginModal: () => setModalType('login'),

		/**
		 * Opens the registration modal and updates the URL
		 */
		openRegistrationModal: () => setModalType('register'),

		/**
		 * Generic method to open any supported modal
		 */
		openModal: (type: string) => setModalType(type),

		/**
		 * Closes any open modal by clearing the URL parameter
		 */
		closeModal: () => setModalType(''),

		/**
		 * Current modal type from URL
		 */
		modalType,
	};
};
