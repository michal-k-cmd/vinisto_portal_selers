import { CREATE_EDIT_ADDON } from 'Components/Modal/constants';

import Table from '../Gifts/Components/AddonsTable';

import { AddonType } from '@/api-types/addons-api';

const RelatedProductsPage = () => {
	return (
		<Table
			addonType={AddonType.RelatedProduct}
			addModalName={CREATE_EDIT_ADDON}
		/>
	);
};

export default RelatedProductsPage;
