import cx from 'classnames';
import NextLink from 'next/link';
import BreadcrumbHomeIcon from 'Components/Icons/BreadcrumbHome';

import styles from './styles.module.css';

interface ProducentBreadcrumbProps {
	producerName: string;
	className?: string;
}

const StrapiBreadcrumb = ({
	producerName,
	className,
}: ProducentBreadcrumbProps) => {
	return (
		<nav
			className={cx('breadcrumb', styles.breadcrumbs, className)}
			aria-label="breadcrumb"
		>
			<ol className="breadcrumb">
				<li className="breadcrumb-item">
					<NextLink href="/">
						<BreadcrumbHomeIcon
							id="bundle-detail-breadcrumbs-homepage-ico"
							alt=""
							title=""
							className={styles.homeIcon}
						/>
					</NextLink>
				</li>

				<li
					className={cx('breadcrumb-item active', styles.breadcrumb)}
					aria-current="page"
				>
					{producerName}
				</li>
			</ol>
		</nav>
	);
};

export default StrapiBreadcrumb;
