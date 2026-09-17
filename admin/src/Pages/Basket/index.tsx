import cx from 'classnames';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { UserService } from 'Services/UserService/User';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import DeleteIcon from 'Components/Icons/Delete';
import { useBasketContext } from 'Services/BasketService';
import { MdOutlineRestartAlt } from 'react-icons/md';
import { StringParam, useQueryParam } from 'Helpers/query-params';
// import { FiPlus } from 'react-icons/fi';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { USER_BASKETS_QUERY_KEY } from 'Pages/B2bBasketList';
import { BiCart } from 'react-icons/bi';
import AutocompleteB2bCustomer, {
	useAutocompleteCompanies,
} from 'Components/AutocompleteB2bCustomer';
import { mapB2bCustomerToString } from 'Pages/UserDetail/helpers';

import EshopIframe from './EshopIframe';
import UserInfo from './UserInfo';

import { MessageEventType } from '@/message-bus/interfaces';
import { Actions } from '@/message-bus/constants';
import {
	VinistoHelperDllEnumsUserUserRights,
	VinistoHelperDllEnumsUserUserState,
} from '@/api-types/user-api';

const { getUserById } = UserService;

const Basket = () => {
	const {
		basketId,
		setBasketId,
		customerId,
		setAndSaveCustomerId,
		clearCustomerId,
		loggedInEshopUser,
		setLoggedInEshopUser,
		clearLoggedInEshopUser,
	} = useBasketContext();
	const t = useContext(LocalizationContext).useFormatMessage();
	const vinistoUser = useContext(AuthenticationContext).vinistoUser;
	const { loginHash: userLoginHash } = vinistoUser;
	const queryClient = useQueryClient();

	const [requestedBasketId, setRequestedBasketId] = useQueryParam(
		'requestedBasketId',
		StringParam
	);
	const [customerIdParam, setCustomerIdParam] = useQueryParam(
		'customerId',
		StringParam
	);

	const [isIframeLoaded, setIsIframeLoaded] = useState(false);

	const iframeUrl = `${import.meta.env.VITE_ESHOP_URI}`;
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const isUserSupportRole = vinistoUser.permissions.includes(
		VinistoHelperDllEnumsUserUserRights.USER_B2B_ORDERS_CREATE
	);
	const isCSORole = vinistoUser.permissions.includes(
		VinistoHelperDllEnumsUserUserRights.USER_CSO
	);

	const handleMessageFromIframe = useCallback(
		(e: MessageEvent<MessageEventType>) => {
			const originWithoutTrailingSlash = `${e.origin}`.replace(/\/$/, '');
			const iframeUrlWithoutTrailingSlash = iframeUrl.replace(/\/$/, '');

			if (originWithoutTrailingSlash !== iframeUrlWithoutTrailingSlash) return;

			if (
				e.data?.action === Actions.LOGIN_FROM_ADMIN_SUCCESS &&
				e.data?.vinistoUser
			) {
				// @ts-expect-error TODO Create UserDomain in api-client
				setLoggedInEshopUser(e.data.vinistoUser);
			}

			if (e.data?.action === Actions.LOGOUT_FROM_ESHOP) {
				queryClient.invalidateQueries([USER_BASKETS_QUERY_KEY]);
				clearLoggedInEshopUser();
			}

			if (e.data?.action === Actions.DELETE_BASKET_FROM_ADMIN_SUCCESS) {
				queryClient.invalidateQueries([USER_BASKETS_QUERY_KEY]);
				setBasketId(null);
				clearCustomerId();
			}

			if (
				e.data?.action === Actions.SET_BASKET_ID &&
				e.data &&
				'basketId' in e.data
			) {
				queryClient.invalidateQueries([USER_BASKETS_QUERY_KEY]);
				setBasketId(e.data?.basketId ?? null);
			}

			if (e.data?.action === Actions.RESET_BASKET_FROM_ESHOP) {
				queryClient.invalidateQueries([USER_BASKETS_QUERY_KEY]);
				clearCustomerId();
				setCustomerIdParam(null);
				setBasketId(null);
			}
		},
		[
			iframeUrl,
			setLoggedInEshopUser,
			queryClient,
			clearLoggedInEshopUser,
			setBasketId,
			clearCustomerId,
			setCustomerIdParam,
		]
	);

	useEffect(() => {
		window.addEventListener('message', handleMessageFromIframe);
		return () => {
			window.removeEventListener('message', handleMessageFromIframe);
		};
	}, [handleMessageFromIframe]);

	const authenticate = useCallback(() => {
		iframeRef.current?.contentWindow?.postMessage(
			{ action: Actions.LOGIN_FROM_ADMIN, vinistoUser },
			iframeUrl
		);
	}, [iframeUrl, vinistoUser]);

	const setIsLoaded = useCallback(() => {
		setIsIframeLoaded(true);
		// This does not seem to do anything (iframe itself might be loaded, but javascript not yet?)
		//iframeRef.current?.contentWindow?.postMessage(
		//	{ action: Actions.LOGIN_FROM_ADMIN, vinistoUser },
		//	iframeUrl
		//);
	}, []);

	useEffect(() => {
		const iframeRefCurrent = iframeRef.current;
		iframeRefCurrent?.addEventListener('load', setIsLoaded);
		return () => {
			iframeRefCurrent?.removeEventListener('load', setIsLoaded);
		};
	}, [setIsLoaded]);

	const deleteBasket = () => {
		setRequestedBasketId(null);
		setCustomerIdParam(null);
		setBasketId(null);
		iframeRef.current?.contentWindow?.postMessage(
			{ action: Actions.DELETE_BASKET_FROM_ADMIN, vinistoUser },
			iframeUrl
		);
	};

	//const createNewBasket = () => {
	//	setRequestedBasketId(null);
	//	setCustomerIdParam(null);
	//	setBasketId(null);
	//	iframeRef.current?.contentWindow?.postMessage(
	//		{ action: Actions.CREATE_NEW_BASKET_FROM_ADMIN, vinistoUser },
	//		iframeUrl
	//	);
	//};

	const { setSearch, companiesQuery, isCompaniesQueryEnabled } =
		useAutocompleteCompanies({
			userLoginHash,
			...(!(isUserSupportRole || isCSORole) && {
				// Merchant can see and select only his assigned companies
				SearchCompaniesByMerchantId: vinistoUser.id ?? undefined,
			}),
			SearchByUserState: VinistoHelperDllEnumsUserUserState.Active,
		});

	const handleOnSelectB2bCustomer = useCallback(
		(companies: { label: string; value: string }[]) => {
			if (!companies || !companies.length) return;
			const firstMatch = companies[0];
			setAndSaveCustomerId(firstMatch.value);
		},
		[setAndSaveCustomerId]
	);

	const handleB2bCustomerInputChange = useCallback(
		(query: string) => {
			setSearch(query);
		},
		[setSearch]
	);

	const userQueryKey = ['user', customerIdParam || customerId];

	const b2bCustomerByIdQuery = useQuery(
		userQueryKey,
		async () =>
			await getUserById(customerIdParam || customerId || '', {
				userId: customerIdParam || customerId || '',
				UserLoginHash: userLoginHash,
			}),
		{
			enabled: !!(customerIdParam || customerId),
		}
	);

	return (
		<>
			<div className="px-3">
				<div className="d-flex gap-2 align-items-center mb-2">
					{customerId || customerIdParam ? (
						<div className="form-control">
							{b2bCustomerByIdQuery.data?.user
								? mapB2bCustomerToString(b2bCustomerByIdQuery.data.user)
								: null}
						</div>
					) : (
						<div className="flex-1 w-100">
							<AutocompleteB2bCustomer
								onChange={handleOnSelectB2bCustomer}
								onInputChange={handleB2bCustomerInputChange}
								data={companiesQuery.data ?? []}
								isLoading={isCompaniesQueryEnabled && companiesQuery.isLoading}
							/>
						</div>
					)}
					{!!customerId && (
						<Button
							onClick={() => {
								clearCustomerId();
								setBasketId(null);
							}}
							className="d-flex align-items-center"
						>
							<span
								style={{ height: 24 }}
								className="d-flex align-items-center text-nowrap gap-1"
							>
								reset / změnit zákazníka
								<MdOutlineRestartAlt />
							</span>
						</Button>
					)}
				</div>
				<div className="d-flex align-items-center justify-content-between mb-2">
					<div className="d-flex gap-2 align-items-center">
						{loggedInEshopUser ? (
							<UserInfo
								userId={vinistoUser.id ?? ''}
								userLoginHash={userLoginHash}
							/>
						) : (
							<Button
								disabled={
									!(customerIdParam || customerId) ||
									!!loggedInEshopUser ||
									!isIframeLoaded
								}
								onClick={authenticate}
								className={cx(
									'd-flex align-items-center justify-content-center relative gap-2',
									{ invisible: !(customerIdParam || customerId) }
								)}
							>
								{requestedBasketId ? (
									t({ id: 'admin.basket.login.title' })
								) : (
									<>
										<BiCart />
										{t({ id: 'admin.basket.shop.title' })}
									</>
								)}
							</Button>
						)}
					</div>
					<div className="d-flex gap-2 align-items-center">
						{/*<Button
							className="d-flex gap-2 align-items-center"
							disabled={
								!loggedInEshopUser ||
								//!basketId ||
								!(customerId || customerIdParam)
							}
							onClick={() => {
								createNewBasket();
							}}
						>
							<FiPlus />
							Nový košík
						</Button>*/}
						<Button
							variant="outline-danger"
							className="d-flex gap-2 align-items-center"
							disabled={!loggedInEshopUser || !basketId}
							onClick={() => {
								deleteBasket();
							}}
						>
							<DeleteIcon fill="currentColor" />
							Smazat košík
						</Button>
					</div>
				</div>
			</div>
			<EshopIframe
				ref={iframeRef}
				iframeUrl={iframeUrl}
				eshopAuthUser={loggedInEshopUser}
				customerId={customerIdParam ?? customerId}
				requestedBasketId={requestedBasketId}
			/>
		</>
	);
};

export default Basket;
