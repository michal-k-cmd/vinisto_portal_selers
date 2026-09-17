'use client';

import { lazy, Suspense, useContext } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import { DeviceServiceContext } from 'Services/DeviceService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { VinistoLinkNext } from 'Components/VinistoLink';
import Loader from 'Components/View/Loader';
import Link from 'next/link';

import { IBundleBreadcrumbProps } from './interfaces';
import styles from './styles.module.css';

const BreadcrumbHomeIcon = lazy(
	() => import('Components/Icons/BreadcrumbHome')
);

const BundleBreadcrumb = ({
	categories,
	bundleName,
	className,
}: IBundleBreadcrumbProps) => {
	const { isMobile } = useContext(DeviceServiceContext);
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const category0 = categories?.[0];
	const category1 = categories?.[1];

	return (
		<nav
			className={cx('breadcrumb', styles.breadcrumbs, className)}
			aria-label="breadcrumb"
		>
			<ol className="breadcrumb">
				<li className="breadcrumb-item">
					<Link href="/">
						<Suspense fallback={<Loader blank />}>
							<BreadcrumbHomeIcon
								id="bundle-detail-breadcrumbs-homepage-ico"
								alt={t({ id: 'alt.breadcrumb.home' })}
								title=""
								className={styles.homeIcon}
							/>
						</Suspense>
					</Link>
				</li>
				{category0 && (
					<li className={cx('breadcrumb-item', styles.breadcrumb)}>
						<VinistoLinkNext
							href={`/${t({ id: 'routes.category.route' })}/${
								getLocalizedValue(category0?.url || []) ?? ''
							}`}
							className={styles.link}
						>
							{getLocalizedValue(category0?.name || []) || '?'}
						</VinistoLinkNext>
					</li>
				)}
				{category1 && (
					<li className={cx('breadcrumb-item', styles.breadcrumb)}>
						<VinistoLinkNext
							href={`/${t({ id: 'routes.category.route' })}/${
								getLocalizedValue(category1?.url || []) ?? ''
							}`}
							className={styles.link}
						>
							{getLocalizedValue(category1?.name || []) || '?'}
						</VinistoLinkNext>
					</li>
				)}
				{!isMobile && (
					<li
						className={cx('breadcrumb-item active', styles.breadcrumb)}
						aria-current="page"
					>
						{bundleName}
					</li>
				)}
			</ol>
		</nav>
	);
};

export default BundleBreadcrumb;
