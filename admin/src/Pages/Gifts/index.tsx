import { CREATE_EDIT_ADDON } from 'Components/Modal/constants';

import Table from './Components/AddonsTable';

import { AddonType } from '@/api-types/addons-api';

const GiftsPage = () => {
	return (
		<Table
			addonType={AddonType.Gift}
			addModalName={CREATE_EDIT_ADDON}
		/>
	);
};

export default GiftsPage;
