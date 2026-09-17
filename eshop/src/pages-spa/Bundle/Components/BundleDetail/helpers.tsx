import {
	DeliveriesListParams,
	PaymentsGetActivePaymentsListParams,
	VinistoOrderDllModelsApiReturnDataDeliveriesReturn,
	VinistoOrderDllModelsApiReturnDataPaymentsReturn,
} from 'vinisto_api_client/src/api-types/order-api';
import api from 'vinisto_api_client/src/api';
import { PlatformIdType } from 'vinisto_api_client/src/shared';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { WarehouseContext } from 'Services/WarehouseService';

import BargainPriceBadge from './Components/ShopControls/Components/BargainPriceBadge';

import { Bundle } from '@/domain/bundle';

export const fetchDeliveriesData = async (
	requestQuery: DeliveriesListParams
): Promise<VinistoOrderDllModelsApiReturnDataDeliveriesReturn> => {
	try {
		return await api.get<VinistoOrderDllModelsApiReturnDataDeliveriesReturn>(
			'order-api/deliveries',
			requestQuery
		);
	} catch (error) {
		return {
			deliveries: [],
			count: 0,
			isError: true,
			// todo: transform error to this error array response
			error: [],
		};
	}
};

export const fetchPaymentsData = async (
	requestQuery: PaymentsGetActivePaymentsListParams
) => {
	try {
		return await api.get<VinistoOrderDllModelsApiReturnDataPaymentsReturn>(
			'order-api/payments/GetActivePayments',
			requestQuery
		);
	} catch (error) {
		return {
			payments: [],
			count: 0,
			isError: true,
			// todo: transform error to this error array response
			error: [],
		};
	}
};

export const usePaymentsData = (
	requestQuery: PaymentsGetActivePaymentsListParams,
	platformId: PlatformIdType
) => {
	return useQuery({
		queryKey: ['payments', platformId, requestQuery],
		queryFn: () => fetchPaymentsData(requestQuery),
	});
};

export const useDeliveriesData = (requestQuery: DeliveriesListParams) => {
	return useQuery({
		queryKey: ['deliveries', requestQuery],
		queryFn: () => fetchDeliveriesData(requestQuery),
	});
};

/**
 * Rules for displaying the bargain price badge
 * https://vinisto.atlassian.net/wiki/spaces/MFS/pages/322633734/Nejv+hodn+j+cena+na+platform?force_transition=ce3f70fa-733a-4963-93f3-79bbc039a646
 */

export const useBargainPriceBadge = (
	bundle?: Bundle,
	displayBargainPriceBadge = true
): React.ReactNode => {
	const warehouse = useContext(WarehouseContext);
	// Initial guards
	if (!bundle || !displayBargainPriceBadge) {
		return null;
	}

	if (!bundle.flags.isEnabled) {
		return null;
	}

	if (
		bundle.flags.isSaleOver ||
		bundle.flags.isTemporaryUnavailable ||
		bundle.flags.isGift
	) {
		return null;
	}

	const quantity = warehouse.getQuantity(bundle.id) ?? 0;
	const isInStock = quantity > 0;

	// The badge should generally be shown unless it's a clearance item that is out of stock.
	// If it IS a clearance sale AND it's NOT in stock, show nothing.
	if (bundle.flags.isClearanceSale && !isInStock) {
		return null;
	}

	// In all other eligible cases (not clearance, OR clearance and in stock), show the badge.
	return <BargainPriceBadge bundle={bundle} />;
};
