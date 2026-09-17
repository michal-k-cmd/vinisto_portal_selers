import Link from 'next/link';
import cx from 'classnames';
import Flag from 'Components/Flag';
import { ICategoryLink } from 'Components/Navbar/Components/CategoryLink/interfaces';

import styles from './styles.module.css';

interface ICategoryItemProps extends ICategoryLink {
	onClick?: () => void;
}

const CategoryItem = ({ name, flag, url, onClick }: ICategoryItemProps) => {
	return (
		<Link
			href={`${url}`}
			className={styles.wrapper}
			onClick={onClick}
		>
			{flag && (
				<Flag
					code={flag}
					width={23}
					height={15}
					className={cx('vinisto-flag', styles.flag)}
				/>
			)}
			<span className={styles.name}>{name}</span>
		</Link>
	);
};

export default CategoryItem;
