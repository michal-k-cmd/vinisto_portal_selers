import cx from 'classnames';

import styles from './styles.module.css';

interface LinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
}

const DetailLinkButton = ({ children, ...props }: LinkProps) => {
	return (
		<button
			{...props}
			className={cx(styles.link, props.className)}
		>
			{children ?? children}
		</button>
	);
};

export default DetailLinkButton;
