import { Bundle } from '@/domain/bundle';

export interface FormValues {
	email: string;
	where?: string;
	url: string;
	count: number;
}

export interface GuaranteeFormProps {
	bundle: Bundle;
}
