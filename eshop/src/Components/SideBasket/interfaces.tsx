export type OpenedBundleIdType = string | null;

export interface ISideBasketContextValue {
	alternativeBundles: Record<any, any>[];
	setAlternativeBundles: (
		value: []
	) => void | React.Dispatch<React.SetStateAction<[]>>;
	openedBundleId: OpenedBundleIdType;
	setOpenedBundleId: (
		value: OpenedBundleIdType
	) => void | React.Dispatch<React.SetStateAction<OpenedBundleIdType>>;
}

export interface ISideBasketContextProviderProps {
	children: React.ReactNode;
}
