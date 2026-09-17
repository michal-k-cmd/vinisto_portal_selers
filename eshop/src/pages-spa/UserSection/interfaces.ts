import { ReactNode } from 'react';

export interface UserSectionLink {
	route: string;
	name: string | ReactNode;
	icon: ReactNode;
	flags?: string[];
	highlighted?: boolean;
}
