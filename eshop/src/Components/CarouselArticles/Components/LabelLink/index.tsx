import * as React from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import { ILabelLinkProps } from './interfaces';

const LabelLink: React.FC<ILabelLinkProps> = () => {
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<span className="vinisto-small-banner__cta">
			{t({ id: 'carousel.card.button.wantIt' })}

			<span className="bolder">&gt;</span>
		</span>
	);
};

export default LabelLink;
