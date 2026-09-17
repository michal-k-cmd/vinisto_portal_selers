import styles from './styles.module.css';

type FabProps = {
	isOpen: boolean;
	onClick: () => void;
	className?: string;
	title?: string;
	position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
};

export const AdmintoolsFab = ({
	isOpen,
	onClick,
	className,
	title = 'Admin tools',
	position = 'bottom-right',
}: FabProps) => {
	const posClass =
		position === 'top-right'
			? styles.topRight
			: position === 'top-left'
			? styles.topLeft
			: position === 'bottom-right'
			? styles.bottomRight
			: styles.bottomLeft;

	return (
		<button
			type="button"
			aria-pressed={isOpen}
			aria-label={title}
			onClick={onClick}
			className={[styles.fab, posClass, className].filter(Boolean).join(' ')}
		>
			<span className={styles.fabIcon}>{isOpen ? '×' : '≡'}</span>
		</button>
	);
};
