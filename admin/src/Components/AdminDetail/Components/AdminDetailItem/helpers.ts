import { dayjsInstance as dayjs } from 'Services/Date';

export const getFormatedValueByType = (
	value: any,
	type?: string,
	t?: (params: Record<any, any>) => void
): any => {
	if (!value && type !== 'boolean' && type !== 'number') return '-';
	if (type === 'date') {
		return dayjs.unix(value).format('DD. MM. YYYY');
	}
	if (type === 'boolean' && t) {
		return value
			? t({ id: 'admin.userDetail.boolean.yes' })
			: t({ id: 'admin.userDetail.boolean.no' });
	}

	return value;
};
