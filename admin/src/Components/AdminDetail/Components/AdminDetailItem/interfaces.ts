import { IconType } from 'react-icons';

interface DetailItem {
	label: string;
	value: string;
	icon?: IconType;
	disableFallbackIcon?: boolean;
	visible?: boolean;
	type?: any; // TODO: inspect what kind of 'types' are being passed in DetailSchemas and replace any with the correct type
}

export type { DetailItem };
