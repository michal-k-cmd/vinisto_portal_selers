import { SpecificationExplanation } from 'vinisto_ui';
import cx from 'classnames';

import { SpecificationExplanationViewProps } from './interfaces';

const SpecificationExplanationView = ({
	data,
	className,
}: SpecificationExplanationViewProps) => {
	// Specification count must be 3 (https://vinisto.atlassian.net/browse/VWA-1439)
	// const minimumDataLength = 3;
	return (
		data && (
			<div className={cx(className)}>
				{data.map((item, index) => (
					<SpecificationExplanation
						key={'bdsev' + index}
						imageUrl={item.imageUrl}
						heading={item.heading}
						text={item.text}
						anchorLink={item.anchorLink ?? undefined}
						anchorText={item.anchorText ?? undefined}
					/>
				))}
			</div>
		)
	);
};

export default SpecificationExplanationView;
