import { dayjsInstance as dayjs } from 'Services/Date';
import { get } from 'lodash-es';
import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';

import { STATE } from './constants';

export const getDiscountState = (row: PageListTableRow) => {
	const now = dayjs();
	const validFrom = dayjs.unix(get(row, 'validFrom', null));
	const validToRaw = get(row, 'validTo', null);
	const validTo = dayjs.unix(validToRaw);

	if (validToRaw == null) return STATE.ONGOING;
	if (validTo < now) {
		return STATE.EXPIRED;
	}
	if (validFrom > now) {
		return STATE.PLANNED;
	}
	return STATE.ONGOING;
};
