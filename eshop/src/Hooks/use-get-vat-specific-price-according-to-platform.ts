import { usePlatformContext } from 'Services/PlatformService';

const useGetVatSpecificPriceAccordingToPlatform = () => {
	const { isB2b } = usePlatformContext();

	const getPrimaryPrice = (priceWithoutVat: number, priceWithVat: number) => {
		if (isB2b) {
			return priceWithoutVat;
		}
		return priceWithVat;
	};

	const getSecondaryPrice = (priceWithoutVat: number, priceWithVat: number) => {
		if (isB2b) {
			return priceWithVat;
		}
		return priceWithoutVat;
	};

	return { getPrimaryPrice, getSecondaryPrice };
};

export default useGetVatSpecificPriceAccordingToPlatform;
