import React, { useMemo } from 'react';
import useBundleById from 'Hooks/Queries/useBundleById';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { IoWarning } from 'react-icons/io5';

import { Currency, SetGiftActionResponse } from '@/api-types/addons-api';

type Props = {
	action: SetGiftActionResponse;
	currency: Currency;
};

const SetGiftRow = ({ action, currency }: Props) => {
	const getLocalizedValue = useLocalizedValue();

	const { data: bundle, isFetched } = useBundleById({
		bundleId: action.itemId ?? '',
	});

	const price = useMemo(() => {
		if (action.price) {
			return getLocalizedPrice({
				price: action.price.valueWithVat ?? 0,
				currency: currency,
			});
		}
		return '';
	}, [action.price, currency]);

	const quantity = useMemo(() => {
		if (typeof action.quantity === 'number') {
			return `${action.quantity}ks`;
		}
		return null;
	}, [action.quantity]);

	if (isFetched && !bundle) {
		return (
			<div>
				<IoWarning fill="rgb(201, 6, 46)" /> Bundle nenalezen!
			</div>
		);
	}

	return (
		<div>
			Bundle: {`${getLocalizedValue(bundle?.name)} ${quantity} ${price}`}
		</div>
	);
};

export default SetGiftRow;
