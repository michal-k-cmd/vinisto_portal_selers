import cx from 'classnames';

import { CtaProps } from './interfaces';
import styles from './styles.module.css';

const Cta = ({ title, url, align }: CtaProps) => {
	return (
		<div
			className={cx(styles.cta, {
				[styles.textLeft]: !align || align === 'left',
				[styles.textCenter]: align === 'center',
				[styles.textRight]: align === 'right',
				[styles.textJustify]: align === 'justify',
			})}
		>
			<a
				href={url}
				className={styles.ctaLink}
			>
				{title}
			</a>
		</div>
	);
};

export default Cta;
