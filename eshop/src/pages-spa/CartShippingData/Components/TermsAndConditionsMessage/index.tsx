import useFormatMessage from 'Hooks/useFormatMessage';
import usePlatformStaticPagePath from 'Hooks/usePlatformStaticPagePath';
import VinistoLink from 'Components/VinistoLink';

import styles from './styles.module.css';

const TermsAndConditionsMessage = () => {
	const t = useFormatMessage();
	const termsAndConditionsPath = usePlatformStaticPagePath(
		'termsAndConditions',
		`/${t({ id: 'routes.termsAndConditions.route' })}`
	);
	const privacyProtectionPath = usePlatformStaticPagePath(
		'privacyProtection',
		`/${t({ id: 'routes.privacyProtection.route' })}`
	);

	return (
		<p className={styles.terms}>
			{t(
				{
					id: 'cartShippingData.completeOrderMessage',
				},
				{
					termsAndConditions: (
						<VinistoLink
							key="cartShippingData.completeOrderMessage.termsAndConditions"
							to={termsAndConditionsPath}
							target="_blank"
							className={styles.link}
						>
							{t({
								id: 'cartShippingData.completeOrderMessage.termsAndConditions',
							})}
						</VinistoLink>
					),
					personalDataProcessing: (
						<VinistoLink
							key="cartShippingData.completeOrderMessage.personalDataProcessing"
							to={privacyProtectionPath}
							target="_blank"
							className={styles.link}
						>
							{t({
								id: 'cartShippingData.completeOrderMessage.personalDataProcessing',
							})}
						</VinistoLink>
					),
				}
			)}
		</p>
	);
};

export default TermsAndConditionsMessage;
