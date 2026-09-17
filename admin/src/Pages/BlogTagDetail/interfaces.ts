import { PostTagData } from 'Services/CmsService/interfaces';

export interface BlogTagDetailState {
	loading: boolean;
	loaded: boolean;
	error: boolean | null;
	blogTag?: PostTagData | null;
}
