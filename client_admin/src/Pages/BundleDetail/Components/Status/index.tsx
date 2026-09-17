import { FC, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import { IStatus } from './interfaces';

const Status: FC<IStatus> = ({ isEnabled, availableCount }) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<>
			{isEnabled ? (
				availableCount < 1 ? (
					<span className="item-value vinisto-color-warn">
						{t({ id: 'bundleDetail.topbar.state.outOfStock' })}
					</span>
				) : (
					<span className="item-value value-success">
						{t({ id: 'bundleDetail.topbar.state.enabled' })}
					</span>
				)
			) : (
				<span className="item-value value-danger">
					{t({ id: 'bundleDetail.topbar.state.disabled' })}
				</span>
			)}
		</>
	);
};

export default Status;
