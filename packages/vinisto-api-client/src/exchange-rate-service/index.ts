import api from '../api';
import {
	VinistoHelperDllBaseBaseReturn,
	VinistoHelperDllEnumsCurrency,
} from '../api-types/product-api';

interface ExchangeRate extends VinistoHelperDllBaseBaseReturn {
	exchangeRates: {
		day: string;
		currency: VinistoHelperDllEnumsCurrency;
		value: number;
		valueGoods: number;
		valueDiscountCoupons: number;
		coefficient: number;
	}[];
	count: number;
}

const getExchangeRate = async () => {
	const response = await api.get<ExchangeRate>(`services-api/exchange-rates`);

	if (!response.exchangeRates) {
		throw new Error('No exchange rates found');
	}

	const mostUpToDateExchangeRate = response.exchangeRates[0];

	return {
		valueGoods: mostUpToDateExchangeRate.valueGoods,
		valueDiscountCoupons: mostUpToDateExchangeRate.valueDiscountCoupons,
		coefficient: mostUpToDateExchangeRate.coefficient,
	};
};

const ExchangeRateService = {
	getExchangeRate,
};

export default ExchangeRateService;
