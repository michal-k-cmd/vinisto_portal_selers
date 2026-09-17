import { defer, LoaderFunction } from 'react-router-dom';
import StockRequestService from 'Services/StockRequest';
import { StockRequestType } from 'Services/StockRequest/interfaces';

import { StockRequestDetailLoaderReturnValue } from './interfaces';

export const stockRequestDetailLoader: (
	userLoginHash: string
) => LoaderFunction =
	(userLoginHash) =>
	async ({ params }) => {
		const data: StockRequestDetailLoaderReturnValue = {
			stockRequestPromise:
				params.id === undefined
					? Promise.resolve(null)
					: (StockRequestService.getDetail(
							params.id,
							userLoginHash
					  ) as Promise<StockRequestType | null>),
		};
		return defer(data);
	};

export default stockRequestDetailLoader;
