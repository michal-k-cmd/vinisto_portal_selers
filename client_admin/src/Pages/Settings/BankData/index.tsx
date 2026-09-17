import { FC, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import BankAccountForm from './BankAccount';

const BankData: FC = () => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	return (
		<section>
			<header className="vinisto-card mb-3">
				<h3>{t({ id: 'settings.heading.seller.bank' })}</h3>
				<BankAccountForm />
			</header>
		</section>
	);
};

export default BankData;
