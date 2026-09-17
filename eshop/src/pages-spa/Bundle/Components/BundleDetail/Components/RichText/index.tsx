import cx from 'classnames';

import styles from './styles.module.css';
import { RichTextProps } from './interaces';

const RichText = ({ content, className = '', ...props }: RichTextProps) => {
	// const sanitizedHtml = useMemo(() => sanitizeHTML(content), [content]);

	return (
		<div
			{...props}
			className={cx(styles.richText, className)}
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
};

export default RichText;
