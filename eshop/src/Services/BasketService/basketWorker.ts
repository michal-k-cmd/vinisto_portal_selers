import registerPromiseWorker from 'promise-worker/register';

import { B2B_NUMERIC_CODE, B2C_NUMERIC_CODE } from '@/shared';

registerPromiseWorker(async (e) => {
	const integrationsKeyByPlatform = {
		[B2C_NUMERIC_CODE]: process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY ?? '',
		[B2B_NUMERIC_CODE]: process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY_B2B ?? '',
	};

	if (!e) return;
	const { basketId, type, platformId, vinistoUser, payload } = e;

	if (!basketId || !type || !payload) {
		// eslint-disable-next-line no-console
		console.error('Invalid message data:', e.data);
		return;
	}

	const { loginHash: userLoginHash } = vinistoUser ?? {};

	switch (type) {
		case 'onAddBundle':
		case 'onRemoveBundle':
		case 'onChangeItemQuantity':
		case 'onBulkUpdate':
		case 'onRemoveCoupon':
		case 'onAddCoupon':
		case 'handleOnAddBundleWithCoupon':
		case 'onSelectAddons':
		case 'onSwitchCountryOfSaleAndCurrency': {
			// etc.
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URI}basket-api/Basket/${basketId}${
					userLoginHash && `?userLoginHash=${userLoginHash}`
				}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						// @ts-expect-error TODO add types for this
						'X-Api-Key': integrationsKeyByPlatform[platformId],
					},
					body: JSON.stringify(payload),
				}
			);
			if (!response.ok) {
				// All the error handling has to be done here, good luck with that
				// TODO probably match error code and handle that as well
				const error = await response.json();
				throw new Error(
					JSON.stringify(error, Object.getOwnPropertyNames(error))
				);
			}

			return {
				type,
				result: 'success',
				message: 'Basket updated successfully',
			};
		}

		default: {
			// eslint-disable-next-line no-console
			throw new Error(`Unknown message type: ${type}`);
		}
	}
});
