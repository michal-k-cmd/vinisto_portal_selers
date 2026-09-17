import { useContext } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import { VinistoPlusCards } from 'vinisto_ui';
import ImageLocal from 'Components/View/ImageLocal';
import { ModalContext } from 'Components/Modal/context';
import { QUICK_PURCHASE_MODAL } from 'Components/Modal/constants';

import styles from './styles.module.css';

import { AddonResponse } from '@/api-types/addons-api';
import { SubscriptionResponse } from '@/api-types/subscription-api';

interface VinistoPlusCardsHeaderProps {
	monthlySubscription: AddonResponse | undefined;
	yearlySubscription: AddonResponse | undefined;
	isLoading?: boolean;
	shouldShowVinistoPlusCards: boolean;
	inactiveSubscriptions: SubscriptionResponse[];
}

const VinistoPlusCardsHeader = ({
	monthlySubscription,
	yearlySubscription,
	isLoading,
	shouldShowVinistoPlusCards,
	inactiveSubscriptions = [],
}: VinistoPlusCardsHeaderProps) => {
	const modalContext = useContext(ModalContext);
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<div
			className={cx(
				styles.cardsHeader,
				!shouldShowVinistoPlusCards && styles.purchased
			)}
		>
			<ImageLocal
				fileName="vinisto_plus.svg"
				alt="Vinisto PLUS+"
				title="Vinisto PLUS+"
				className={styles.vinistoPlusImage}
			/>
			{shouldShowVinistoPlusCards ? (
				!monthlySubscription && !yearlySubscription && !isLoading ? (
					<div className={styles.noSubscriptions}>
						{t({ id: 'userSection.vinistoplus.empty' })}
					</div>
				) : (
					<VinistoPlusCards
						monthlySubscription={monthlySubscription}
						yearlySubscription={yearlySubscription}
						translations={{
							youSave: t({ id: 'vinistoPlus.header.youSave' }),
							withoutVat: t({ id: 'vinistoPlus.header.withoutVat' }),
							totalYearlyPrice: t({
								id: 'vinistoPlus.header.totalYearlyPrice',
							}),
							monthly: t({ id: 'vinistoPlus.header.monthly' }),
							active: t({ id: 'vinistoPlus.state.Active' }),
							activate: t({ id: 'vinistoPlus.header.activate' }),
							renew: t({ id: 'vinistoPlus.header.renew' }),
						}}
						onActivateClick={() => (subscription: AddonResponse | undefined) =>
							modalContext.handleOpenModal(QUICK_PURCHASE_MODAL, {
								subscription,
							})}
						subscriptionsClassName={styles.subscriptionsClassName}
						isLoading={isLoading}
						inactiveSubscriptions={inactiveSubscriptions}
					/>
				)
			) : (
				<div className={styles.purchasedText}>
					<span className={styles.moreInfo}>
						{t(
							{
								id: 'userSection.vinistoplus.details',
							},
							{
								vinistoplus: (
									<strong>
										{t({
											id: 'userSection.vinistoplus.becomeMember.info.vinistoplus',
										})}
									</strong>
								),
							}
						)}
					</span>
				</div>
			)}
		</div>
	);
};

export default VinistoPlusCardsHeader;
