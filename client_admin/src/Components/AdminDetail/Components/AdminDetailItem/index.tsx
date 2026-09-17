import * as React from 'react';
import { get } from 'lodash-es';
import { FaExclamation } from 'react-icons/fa';
import { LocalizationContext } from 'Services/LocalizationService';

import { IAdminDetailProps } from './interfaces';
import { getFormatedValueByType } from './helpers';

import './styles.css';

const AdminDetailItem: React.FC<IAdminDetailProps> = (
	props: IAdminDetailProps
) => {
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const MainIcon = get(props, 'icon', FaExclamation);
	return (
		<div className="admin-detail-item">
			<MainIcon className="admin-detail-icon" />
			<div className="admin-detail-label">
				{t({ id: get(props, 'label', '') })}
			</div>
			<div className="admin-detail-value">
				{getFormatedValueByType(
					get(props, 'value', null),
					get(props, 'type'),
					t
				)}
			</div>
		</div>
	);
};

export default AdminDetailItem;
