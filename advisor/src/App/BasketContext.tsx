import useSearchParams from 'Hooks/useSearchParams';
import { createContext, type ReactNode, useContext, useState } from 'react';

type TBasketContext = {
	basketId: string | null;
	hasAddedToBasket: boolean;
	setHasAddedToBasket: (value: boolean) => void;
};

const BasketContext = createContext<TBasketContext>({
	basketId: null,
	hasAddedToBasket: false,
	setHasAddedToBasket: () => {},
});

const BasketProvider = ({ children }: { children: ReactNode }) => {
	const { basketId } = useSearchParams();
	const [hasAddedToBasket, setHasAddedToBasket] = useState(false);

	return (
		<BasketContext.Provider
			value={{ basketId, hasAddedToBasket, setHasAddedToBasket }}
		>
			{children}
		</BasketContext.Provider>
	);
};

export const useBasketContext = () => useContext(BasketContext);

export default BasketProvider;
