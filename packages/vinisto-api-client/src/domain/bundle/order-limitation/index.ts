import { Dayjs } from 'dayjs';

interface BundleOrderLimitation {
	limit?: number;
	validFrom: Dayjs | null;
	validTo: Dayjs | null;
}

export default BundleOrderLimitation;
