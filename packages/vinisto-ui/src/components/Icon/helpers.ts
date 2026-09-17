import { PATH_PREFIX_MAP } from './constants';

export const getIconFolderAndFilename = (iconName: string = '') => {
	const [prefix, filename] = iconName.split(' ');
	const folder = PATH_PREFIX_MAP[prefix as keyof typeof PATH_PREFIX_MAP];
	return { folder, filename };
};
