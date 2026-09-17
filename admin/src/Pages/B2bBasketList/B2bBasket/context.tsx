import { createContext, ReactNode, useCallback, useMemo } from 'react';
import { useContext } from 'react';
import { UserService } from 'Services/UserService/User';
import { LocalizationContext } from 'Services/LocalizationService';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { confirmAlert } from 'react-confirm-alert';
import { APPROVE_B2B_BASKET } from 'Components/Modal/constants';
import { ModalContext } from 'Components/Modal/context';
import { useQuery } from '@tanstack/react-query';

import { VinistoAuthDllModelsApiUserCompany } from '@/api-types/user-api';
import api from '@/api';
import { BasketApprovalState, BasketResponseB2B } from '@/api-types/basket-api';

const { getUserById } = UserService;

interface B2bBasketContextProviderProps {
	children: ReactNode;
	basket: BasketResponseB2B;
	refetchBaskets: () => void;
}

interface B2bBasketContextValues {
	handleSetToWaitingForApproval: () => void;
	handleSetToWaitingForDirectorApproval: () => void;
	handleChangeOwnership: () => void;
	handleClickApproveButton: () => void;
	handleClickApproveConceptButton: () => void;
	handleClickApproveAndTakeOwnershipButton: () => void;
	handleClickPreApproveButton: () => void;
	handleClickPreApproveAndTakeOwnershipButton: () => void;
	handleClickRejectButton: () => void;
	handleClickReopenButton: () => void;
	b2bCustomer: VinistoAuthDllModelsApiUserCompany | null | undefined;
	basket: BasketResponseB2B | null;
}

const defaultB2bContextValues = {
	handleSetToWaitingForApproval: () => null,
	handleSetToWaitingForDirectorApproval: () => null,
	handleChangeOwnership: () => null,
	handleClickApproveButton: () => null,
	handleClickApproveConceptButton: () => null,
	handleClickApproveAndTakeOwnershipButton: () => null,
	handleClickPreApproveButton: () => null,
	handleClickPreApproveAndTakeOwnershipButton: () => null,
	handleClickRejectButton: () => null,
	handleClickReopenButton: () => null,
	b2bCustomer: null,
	basket: null,
};

const B2bBasketContext = createContext<B2bBasketContextValues>(
	defaultB2bContextValues
);

const B2bBasketContextProvider = ({
	children,
	basket,
	refetchBaskets,
}: B2bBasketContextProviderProps) => {
	const navigate = useNavigate();
	const { loginHash: userLoginHash, id: userId } = useContext(
		AuthenticationContext
	).vinistoUser;
	const { handleOpenModal } = useContext(ModalContext);

	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);

	const t = useContext(LocalizationContext).useFormatMessage();

	const userQueryKey = ['user', basket.customerId];

	const b2bCustomerByIdQuery = useQuery(
		userQueryKey,
		async () =>
			await getUserById(basket.customerId || '', {
				userId: basket.customerId || '',
				UserLoginHash: userLoginHash,
			}),
		{
			enabled: !!basket.customerId,
		}
	);

	const b2bCustomer = b2bCustomerByIdQuery.data?.user;

	const handleChangeOwnership = useCallback(
		async () =>
			await api
				.patch(
					`basket-api/Basket/${basket.id}/change-basket-owner`,
					undefined,
					{
						userId,
						websocketId: `ADMIN_${basket.id}`,
					},
					{
						responseType: 'text',
						headers: {
							['X-Api-Key']: import.meta.env.VITE_INTEGRATIONS_API_KEY_B2B,
							['Content-Type']: 'application/json',
						},
					}
				)
				.then(() => {
					handleShowSuccessNotification('admin.basket.takeOwnership.success');
					// Response is sent over websocket and we don't listen to it
					setTimeout(() => {
						refetchBaskets();
					}, 500);
				})
				.catch(() => {
					handleShowErrorNotification('admin.basket.takeOwnership.error');
				}),
		[
			basket.id,
			handleShowErrorNotification,
			handleShowSuccessNotification,
			refetchBaskets,
			userId,
		]
	);

	const handleApproveBasket = useCallback(
		async () =>
			await api
				.put(
					`basket-api/Basket/${basket.id}/state`,
					{
						userLoginHash,
					},
					{ newState: BasketApprovalState.APPROVED },
					{ responseType: 'text' }
				)
				.then(() => {
					handleShowSuccessNotification('admin.basket.approve.success');
					refetchBaskets();
				})
				.catch(() => {
					handleShowErrorNotification('admin.basket.approve.error');
				}),
		[
			basket.id,
			handleShowErrorNotification,
			handleShowSuccessNotification,
			refetchBaskets,
			userLoginHash,
		]
	);

	const handleApproveConceptBasket = useCallback(
		async () =>
			await api
				.put(
					`basket-api/Basket/${basket.id}/state`,
					{
						userLoginHash,
					},
					{ newState: BasketApprovalState.WAITING_FOR_APPROVAL },
					{ responseType: 'text' }
				)
				.then(() =>
					api.put(
						`basket-api/Basket/${basket.id}/state`,
						{
							userLoginHash,
						},
						{ newState: BasketApprovalState.APPROVED },
						{ responseType: 'text' }
					)
				)
				.then(() => {
					handleShowSuccessNotification('admin.basket.approve.success');
					refetchBaskets();
				})
				.catch(() => {
					handleShowErrorNotification('admin.basket.approve.error');
				}),
		[
			basket.id,
			handleShowErrorNotification,
			handleShowSuccessNotification,
			refetchBaskets,
			userLoginHash,
		]
	);

	const handleSetToWaitingForApproval = useCallback(
		async () =>
			await api
				.put(
					`basket-api/Basket/${basket.id}/state`,
					{
						userLoginHash,
					},
					{ newState: BasketApprovalState.WAITING_FOR_APPROVAL },
					{ responseType: 'text' }
				)
				.then(() => {
					handleShowSuccessNotification(
						'admin.basket.setToWaitingToApproval.success'
					);
					refetchBaskets();
				})
				.catch(() => {
					handleShowErrorNotification(
						'admin.basket.setToWaitingToApproval.error'
					);
				}),
		[
			basket.id,
			handleShowErrorNotification,
			handleShowSuccessNotification,
			refetchBaskets,
			userLoginHash,
		]
	);

	const handleSetToWaitingForDirectorApproval = useCallback(
		async () =>
			await api
				.put(
					`basket-api/Basket/${basket.id}/state`,
					{
						userLoginHash,
					},
					{ newState: BasketApprovalState.WAITING_FOR_DIRECTOR_APPROVAL },
					{ responseType: 'text' }
				)
				.then(() => {
					handleShowSuccessNotification(
						'admin.basket.setToWaitingToDirectorApproval.success'
					);
					refetchBaskets();
				})
				.catch(() => {
					handleShowErrorNotification(
						'admin.basket.setToWaitingToDirectorApproval.error'
					);
				}),
		[
			basket.id,
			handleShowErrorNotification,
			handleShowSuccessNotification,
			refetchBaskets,
			userLoginHash,
		]
	);

	const handlePreApproveBasket = useCallback(
		async () =>
			await api
				.patch(
					`basket-api/Basket/${basket.id}/change-approval-flags`,
					undefined,
					{
						userLoginHash,
						approveCustomer: true,
					},
					{ responseType: 'text' }
				)
				.then(() => {
					handleShowSuccessNotification('admin.basket.preApprove.success');
					refetchBaskets();
				})
				.catch(() => {
					handleShowErrorNotification('admin.basket.preApprove.error');
				}),
		[
			basket.id,
			handleShowErrorNotification,
			handleShowSuccessNotification,
			refetchBaskets,
			userLoginHash,
		]
	);

	const handleRejectBasket = useCallback(() => {
		api
			.put(
				`basket-api/Basket/${basket.id}/state`,
				{
					userLoginHash,
				},
				{ newState: BasketApprovalState.REJECTED },
				{ responseType: 'text' }
			)
			.then(() => {
				handleShowSuccessNotification('admin.basket.reject.success');
				refetchBaskets();
			})
			.catch(() => {
				handleShowErrorNotification('admin.basket.reject.error');
			});
	}, [
		basket.id,
		handleShowErrorNotification,
		handleShowSuccessNotification,
		refetchBaskets,
		userLoginHash,
	]);

	const handleReopenBasket = useCallback(() => {
		api
			.put(
				`basket-api/Basket/${basket.id}/state`,
				{
					userLoginHash,
				},
				{ newState: BasketApprovalState.CONCEPT },
				{ responseType: 'text' }
			)
			.then(() => {
				handleShowSuccessNotification('admin.basket.reopen.success');
				refetchBaskets();
			})
			.catch(() => {
				handleShowErrorNotification('admin.basket.reopen.error');
			});
	}, [
		basket.id,
		handleShowErrorNotification,
		handleShowSuccessNotification,
		refetchBaskets,
		userLoginHash,
	]);

	const handleClickApproveConceptButton = useCallback(
		() =>
			confirmAlert({
				title: `${t({
					id: 'admin.basket.approve.title',
				})}`,
				message: `${t({
					id: 'admin.basket.approve.message',
				})}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.yes',
						})}`,
						onClick: () => handleApproveConceptBasket(),
					},
					{
						label: `${t({
							id: 'admin.no',
						})}`,
						onClick: () => null,
					},
				],
			}),
		[handleApproveConceptBasket, t]
	);

	const handleClickApproveButton = useCallback(() => {
		handleOpenModal(APPROVE_B2B_BASKET, {
			basket,
			handleApproveBasket,
			refetchBaskets,
			b2bCustomer,
		});
	}, [
		handleOpenModal,
		handleApproveBasket,
		refetchBaskets,
		basket,
		b2bCustomer,
	]);

	const handleClickPreApproveButton = useCallback(
		() =>
			confirmAlert({
				title: `${t({
					id: 'admin.basket.preApprove.title',
				})}`,
				message: `${t({
					id: 'admin.basket.preApprove.message',
				})}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.yes',
						})}`,
						onClick: () => handlePreApproveBasket(),
					},
					{
						label: `${t({
							id: 'admin.no',
						})}`,
						onClick: () => null,
					},
				],
			}),
		[handlePreApproveBasket, t]
	);

	const handleClickPreApproveAndTakeOwnershipButton = useCallback(
		() =>
			confirmAlert({
				title: `${t({
					id: 'admin.basket.approveAndTakeOwnership.title',
				})}`,
				message: `${t({
					id: 'admin.basket.approveAndTakeOwnership.message',
				})}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.yes',
						})}`,
						onClick: async () => {
							handlePreApproveBasket()
								.then(() => handleChangeOwnership())
								.then(() => {
									navigate(
										`/basket?requestedBasketId=${basket.id}&customerId=${
											b2bCustomer?.id ?? null
										}`
									);
								});
						},
					},
					{
						label: `${t({
							id: 'admin.no',
						})}`,
						onClick: () => null,
					},
				],
			}),
		[
			b2bCustomer?.id,
			basket.id,
			handlePreApproveBasket,
			handleChangeOwnership,
			navigate,
			t,
		]
	);

	const handleClickApproveAndTakeOwnershipButton = useCallback(
		() =>
			confirmAlert({
				title: `${t({
					id: 'admin.basket.approveAndTakeOwnership.title',
				})}`,
				message: `${t({
					id: 'admin.basket.approveAndTakeOwnership.message',
				})}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.yes',
						})}`,
						onClick: async () => {
							handleApproveBasket()
								.then(() => handleChangeOwnership())
								.then(() => {
									navigate(
										`/basket?requestedBasketId=${basket.id}&customerId=${
											b2bCustomer?.id ?? null
										}`
									);
								});
						},
					},
					{
						label: `${t({
							id: 'admin.no',
						})}`,
						onClick: () => null,
					},
				],
			}),
		[
			b2bCustomer?.id,
			basket.id,
			handleApproveBasket,
			handleChangeOwnership,
			navigate,
			t,
		]
	);

	const handleClickRejectButton = useCallback(
		() =>
			confirmAlert({
				title: `${t({
					id: 'admin.basket.reject.title',
				})}`,
				message: `${t({
					id: 'admin.basket.reject.message',
				})}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.yes',
						})}`,
						onClick: () => handleRejectBasket(),
					},
					{
						label: `${t({
							id: 'admin.no',
						})}`,
						onClick: () => null,
					},
				],
			}),
		[handleRejectBasket, t]
	);

	const handleClickReopenButton = useCallback(
		() =>
			confirmAlert({
				title: `${t({
					id: 'admin.basket.reopen.title',
				})}`,
				message: `${t({
					id: 'admin.basket.reopen.message',
				})}`,
				buttons: [
					{
						label: `${t({
							id: 'admin.yes',
						})}`,
						onClick: () => handleReopenBasket(),
					},
					{
						label: `${t({
							id: 'admin.no',
						})}`,
						onClick: () => null,
					},
				],
			}),
		[handleReopenBasket, t]
	);

	const b2bBasketContextValue: B2bBasketContextValues = useMemo(
		() => ({
			handleSetToWaitingForApproval,
			handleSetToWaitingForDirectorApproval,
			handleChangeOwnership,
			handleClickApproveButton,
			handleClickApproveAndTakeOwnershipButton,
			handleClickPreApproveButton,
			handleClickApproveConceptButton,
			handleClickPreApproveAndTakeOwnershipButton,
			handleClickRejectButton,
			handleClickReopenButton,
			b2bCustomer,
			basket,
		}),
		[
			handleSetToWaitingForApproval,
			handleSetToWaitingForDirectorApproval,
			handleChangeOwnership,
			handleClickApproveButton,
			handleClickApproveConceptButton,
			handleClickApproveAndTakeOwnershipButton,
			handleClickPreApproveButton,
			handleClickPreApproveAndTakeOwnershipButton,
			handleClickRejectButton,
			handleClickReopenButton,
			b2bCustomer,
			basket,
		]
	);

	return (
		<B2bBasketContext.Provider value={b2bBasketContextValue}>
			{children}
		</B2bBasketContext.Provider>
	);
};

export const useB2bBasketContext = () => {
	const b2bBasketContext = useContext(B2bBasketContext);
	if (!B2bBasketContext)
		throw new Error(
			'Merchant Basket context is not available. This component needs to be a child of <B2bBasketContext.Provider> component to be able to use the context.'
		);
	return b2bBasketContext;
};
export default B2bBasketContextProvider;
