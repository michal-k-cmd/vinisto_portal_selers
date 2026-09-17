import Table from 'Pages/Gifts/Components/AddonsTable';
import { CREATE_EDIT_DELIVERY_RULE } from 'Components/Modal/constants';

import { AddonType } from '@/api-types/addons-api';

const DeliveryRulesPage = () => {
	return (
		<Table
			addonType={AddonType.Ux}
			addModalName={CREATE_EDIT_DELIVERY_RULE}
		/>
	);
};

export default DeliveryRulesPage;
