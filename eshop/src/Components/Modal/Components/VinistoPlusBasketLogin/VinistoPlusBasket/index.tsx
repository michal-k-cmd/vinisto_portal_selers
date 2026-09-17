import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';
import Subscription from './Subscription';

import { AddonResponse } from '@/api-types/addons-api';

interface VinistoPlusBasketProps {
	yearlySubscription?: AddonResponse;
	monthlySubscription?: AddonResponse;
	localySelectedSubscription: AddonResponse;
	setLocalySelectedSubscription: (subscription: AddonResponse) => void;
}

const VinistoPlusBasket = ({
	yearlySubscription,
	monthlySubscription,
	localySelectedSubscription,
	setLocalySelectedSubscription,
}: VinistoPlusBasketProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<>
			<h1 className={styles.heading}>
				{t(
					{ id: 'modal.vinistoPlusLogin.modalTitle' },
					{
						sale: (
							<span
								className={styles.highlight}
								key="sale"
							>
								{t({ id: 'modal.vinistoPlusLogin.modalTitle.sale' })}
							</span>
						),
						freeshipping: (
							<span
								className={styles.highlight}
								key="freeshipping"
							>
								{t({
									id: 'modal.vinistoPlusLogin.modalTitle.freeshipping',
								})}
							</span>
						),
					}
				)}
			</h1>
			<p className={styles.info}>
				{t(
					{ id: 'modal.vinistoPlusLogin.modalInfo' },
					{
						vinistoplus: (
							<span
								className={styles.vinistoplus}
								key="vinistoplus"
							>
								{t({ id: 'modal.vinistoPlusLogin.modalInfo.vinistoplus' })}
							</span>
						),
					}
				)}
			</p>
			<div className={styles.wrap}>
				{yearlySubscription && (
					<Subscription
						subscription={yearlySubscription}
						localySelectedSubscription={localySelectedSubscription}
						setLocalySelectedSubscription={setLocalySelectedSubscription}
					/>
				)}
				{monthlySubscription && (
					<Subscription
						subscription={monthlySubscription}
						localySelectedSubscription={localySelectedSubscription}
						setLocalySelectedSubscription={setLocalySelectedSubscription}
					/>
				)}
			</div>
		</>
	);
};

export default VinistoPlusBasket;
