import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import StorageService from 'Services/StorageService';
import { IVinistoUser } from 'Services/AuthenticationService/interfaces';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalStorageKeys } from 'Services/StorageService/constants';

interface BasketContextValues {
	basketId: string | null;
	setBasketId: (id: string | null) => void;
	customerId: string | null;
	setAndSaveCustomerId: (id: string | null) => void;
	clearCustomerId: () => void;
	loggedInEshopUser: IVinistoUser | null;
	setLoggedInEshopUser: (user: IVinistoUser | null) => void;
	clearLoggedInEshopUser: () => void;
}

interface BasketServiceProviderProps {
	children: ReactNode;
}

const storageService = new StorageService();

const BasketContext = createContext<BasketContextValues>({
	basketId: null,
	setBasketId: () => null,
	customerId: null,
	setAndSaveCustomerId: () => null,
	clearCustomerId: () => null,
	loggedInEshopUser: null,
	setLoggedInEshopUser: () => null,
	clearLoggedInEshopUser: () => null,
});

const BasketServiceProvider = ({ children }: BasketServiceProviderProps) => {
	const { isLoggedIn } = useContext(AuthenticationContext);
	const [customerId, setCustomerId] = useState<string | null>(() => {
		const savedCustomerId = storageService.getStorageItem(
			LocalStorageKeys.CUSTOMER_ID
		);
		if (savedCustomerId) return `${savedCustomerId}`;
		return null;
	});
	const [basketId, setBasketId] = useState<string | null>(null);

	const setAndSaveCustomerId = useCallback((id: string | null) => {
		storageService.setItem(LocalStorageKeys.CUSTOMER_ID, id);
		setCustomerId(id);
	}, []);

	const clearCustomerId = useCallback(() => {
		storageService.removeItem(LocalStorageKeys.CUSTOMER_ID);
		setCustomerId(null);
	}, []);

	const [loggedInEshopUser, setLoggedInEshopUser] =
		useState<IVinistoUser | null>(null);

	const clearLoggedInEshopUser = useCallback(
		() => setLoggedInEshopUser(null),
		[setLoggedInEshopUser]
	);

	useEffect(() => {
		if (isLoggedIn) return;
		if (loggedInEshopUser || customerId) {
			clearLoggedInEshopUser();
			clearCustomerId();
		}
	}, [
		clearCustomerId,
		clearLoggedInEshopUser,
		customerId,
		isLoggedIn,
		loggedInEshopUser,
	]);

	const value = useMemo(
		() => ({
			basketId,
			setBasketId,
			customerId,
			setAndSaveCustomerId,
			clearCustomerId,
			loggedInEshopUser,
			setLoggedInEshopUser,
			clearLoggedInEshopUser,
		}),
		[
			basketId,
			customerId,
			setAndSaveCustomerId,
			clearCustomerId,
			loggedInEshopUser,
			setLoggedInEshopUser,
			clearLoggedInEshopUser,
		]
	);
	return (
		<BasketContext.Provider value={value}>{children}</BasketContext.Provider>
	);
};

export default BasketServiceProvider;

export const useBasketContext = () => {
	const basketContext = useContext(BasketContext);
	if (!basketContext)
		throw new Error(
			'Basket context is not available. This component needs to be a child of <BasketContext.Provider> component to be able to use the context.'
		);
	return basketContext;
};
