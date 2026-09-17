import cx from 'classnames';

import { ITextHighlightedProps } from './interfaces';
import styles from './styles.module.css';

const TextHighlighted = ({ className, children }: ITextHighlightedProps) => {
	return (
		<span className={cx(styles.textHighlighted, className)}>{children}</span>
	);
};

export default TextHighlighted;
