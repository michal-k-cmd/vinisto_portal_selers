'use client';

import { useContext, useEffect } from 'react';
import { dayjsInstance as dayjs } from 'Services/Date';
import { useSearchParams } from 'next/navigation';
import { OrderUtmParameters } from 'Services/OrderService/interfaces';
import {
	GAD,
	GCLID,
	UTM_CAMPAIGN,
	UTM_MEDIUM,
	UTM_SOURCE,
} from 'Services/RoutingService/Components/StorageUTM/constants';
import { StorageContext } from 'Services/StorageService/context';
import { LocalStorageKeys } from 'Services/StorageService/constants';

const StorageUTM = () => {
	const storageContext = useContext(StorageContext);
	const searchParams = useSearchParams();

	useEffect(() => {
		const utmSource = searchParams.get(UTM_SOURCE);
		const utmMedium = searchParams.get(UTM_MEDIUM);
		const utmCampaign = searchParams.get(UTM_CAMPAIGN);
		const gad = searchParams.get(GAD);
		const gclId = searchParams.get(GCLID);

		if (utmSource || utmCampaign || gad || gclId) {
			const utmDataToSave: OrderUtmParameters = {
				source: utmSource,
				medium: utmMedium,
				campaign: utmCampaign,
				...(gad && { gad }),
				...(gclId && { gclId }),
				expires: dayjs().add(2, 'd').format(),
			};
			storageContext.StorageService.setItem(
				LocalStorageKeys.UTM_CAMPAIGN_DATA,
				utmDataToSave
			);
		}
	}, [searchParams, storageContext.StorageService]);

	return null;
};

export default StorageUTM;
