import { useAuthenticationContext } from 'Services/AuthenticationService/context';
import { useIsB2b } from 'Services/PlatformService';

import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/product-api';
import Price from '@/domain/price';

interface UseShowVinistoPlusPriceParams {
	vinistoPlusPriceOrDiscount: Price | null | undefined;
	priceWhenCouponApplied: number | null;
	canBeCouponApplied: boolean;
}

const useShowVinistoPlusPrice = ({
	vinistoPlusPriceOrDiscount,
	priceWhenCouponApplied,
	canBeCouponApplied,
}: UseShowVinistoPlusPriceParams) => {
	const isB2b = useIsB2b();
	const vinistoUser = useAuthenticationContext().vinistoUser;
	const userPriceLevel = vinistoUser.priceLevel;

	// vinisto+ price not set
	if (!vinistoPlusPriceOrDiscount)
		return {
			showPossibleVinistoPlusPrice: false,
			canBuyForVinistoPlusPrice: false,
		};

	// coupon price is lower than vinisto+ price
	if (
		canBeCouponApplied &&
		(vinistoPlusPriceOrDiscount.valueWithVat ?? Infinity) >
			(priceWhenCouponApplied ?? Infinity)
	) {
		return {
			showPossibleVinistoPlusPrice: false,
			canBuyForVinistoPlusPrice: false,
		};
	}

	return {
		showPossibleVinistoPlusPrice: isB2b
			? false
			: userPriceLevel !== VinistoHelperDllEnumsPriceLevel.VinistoPlus,
		canBuyForVinistoPlusPrice: isB2b
			? false
			: userPriceLevel === VinistoHelperDllEnumsPriceLevel.VinistoPlus,
	};
};

export default useShowVinistoPlusPrice;
