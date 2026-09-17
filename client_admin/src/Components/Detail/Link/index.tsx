import styles from './styles.module.css';

interface LinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

const DetailLinkButton = ({ children, ...props }: LinkProps) => {
	return (
		<button
			className={styles.link}
			{...props}
		>
			{children}
		</button>
	);
};

export default DetailLinkButton;
