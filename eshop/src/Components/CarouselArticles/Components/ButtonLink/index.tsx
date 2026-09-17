import * as React from 'react';
import Link from 'next/link';
import { get } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';

import { IButtonLinkProps } from './interfaces';

const ButtonLink: React.FC<IButtonLinkProps> = (props): JSX.Element => {
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	return (
		<div className="text-center">
			<Link
				href={`/${t({ id: get(props, 'url', '') })}`}
				className="vinisto-btn vinisto-bg vinisto-btn--all my-3"
			>
				{props.label
					? t({ id: props.label })
					: t({ id: 'carousel.card.button.showMore' })}
				&nbsp; &gt;
			</Link>
		</div>
	);
};

export default ButtonLink;
