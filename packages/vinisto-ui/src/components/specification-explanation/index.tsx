import cx from 'classnames';

import { SpecificationExplanationProps } from './types';
import styles from './styles.module.css';

const SpecificationExplanation = ({
	imageUrl,
	heading,
	text,
	anchorText,
	anchorLink,
}: SpecificationExplanationProps) => {
	return (
		<div className={cx(styles.wrapper)}>
			<div className={styles.imageWrap}>
				<img
					src={imageUrl}
					alt={heading}
					className={styles.image}
					loading="lazy"
					width={330}
					height={260}
				/>
			</div>
			<div className={styles.headingWrap}>
				<h3 className={styles.heading}>{heading}</h3>
			</div>
			<div className={styles.textWrap}>
				<div className={styles.preformattedText}>{text}</div>
				{anchorLink && anchorText && (
					<a
						href={anchorLink}
						className={styles.anchor}
					>
						{anchorText}
					</a>
				)}
			</div>
		</div>
	);
};

export default SpecificationExplanation;
