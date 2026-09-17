import { createContext, FC } from 'react';

import { ProductBoxContextProps, ProductBoxProviderProps } from './interfaces';

export const ProductBoxContext = createContext<ProductBoxContextProps>({
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	addToBasketCallback: () => {},
});

export const ProductBoxProvider: FC<ProductBoxProviderProps> = ({
	children,
	addToBasketCallback,
	addToBasketButtonLabel,
}) => {
	return (
		<ProductBoxContext.Provider
			value={{
				addToBasketCallback,
				addToBasketButtonLabel,
			}}
		>
			{children}
		</ProductBoxContext.Provider>
	);
};
