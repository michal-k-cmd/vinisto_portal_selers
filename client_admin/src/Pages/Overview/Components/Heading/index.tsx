import * as React from 'react';
import { IHeadingProps } from 'Pages/Overview/Components/Heading/interfaces';
import { FONT_SIZES } from 'Pages/Overview/Components/Heading/constants';

import './styles.css';

const Heading: React.FC<IHeadingProps> = ({ size, className, title }) => {
	const getFontStyle = () => {
		return { fontSize: FONT_SIZES[size - 1] };
	};

	return (
		<div
			style={getFontStyle()}
			className={`vinisto-card__heading ${className}`}
		>
			{title}
		</div>
	);
};

export default Heading;
