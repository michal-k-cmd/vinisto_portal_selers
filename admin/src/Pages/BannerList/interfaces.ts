import { IPageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { Banner } from 'Services/Banner/interfaces';

export interface MapObject {
	[key: string]: string;
}

export interface BannerListTableRow extends IPageListTableRow, Banner {}
