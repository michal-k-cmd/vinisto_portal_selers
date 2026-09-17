import * as React from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import { ILabelPromoProps } from './interfaces';

const LabelPromo: React.FC<ILabelPromoProps> = () => {
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<span className="vinisto-small-banner__heading">
			{t({ id: 'carousel.card.label.promoExample' })}
			{/* {label} */}
		</span>
	);
};

export default LabelPromo;
