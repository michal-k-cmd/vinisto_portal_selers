import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import InfoIcon from 'Components/Icons/Info';

import styles from './styles.module.css';

const DisabledCompanySaleInfo = () => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<div className={styles.info}>
			<InfoIcon className={styles.infoIcon} />
			<div>
				{t(
					{ id: 'basketShipping.canDeliverToCompany' },
					{
						highlighted: (
							<strong>
								{t({
									id: 'basketShipping.canDeliverToCompany.highlighted',
								})}
							</strong>
						),
					}
				)}
				<br />
				{t({ id: 'basketShipping.canDeliverToCompany.info' })}
			</div>
		</div>
	);
};
export default DisabledCompanySaleInfo;
