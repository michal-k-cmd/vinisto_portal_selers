'use client';
import { useContext } from 'react';
import Link from 'next/link';
import { LocalizationContext } from 'Services/LocalizationService';
import { DeviceServiceContext } from 'Services/DeviceService';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';

import UserTileMenu from '../UserTileMenu';
import Header from '../Header';

import styles from './styles.module.css';

interface BreadCrumbsUserSectionProps {
	subpageTitle?: string;
	subpageLink?: string;
}

const BreadCrumbsUserSection = ({
	subpageTitle,
	subpageLink,
}: BreadCrumbsUserSectionProps) => {
	const { isDesktop } = useContext(DeviceServiceContext);
	const t = useContext(LocalizationContext).useFormatMessage();

	if (isDesktop) {
		return (
			<>
				<ContainerFullWidth className="mt-3">
					<Header />
				</ContainerFullWidth>
				<UserTileMenu />
			</>
		);
	}

	return (
		<div className={styles.breadcrumbs}>
			<Link
				href={`/${t({ id: 'routes.user-section.route' })}`}
				className={styles.breadcrumb}
			>
				{t({ id: 'userSection.myAccount' })}
			</Link>
			<span className={styles.breadcrumbArrow}>{'>'}</span>
			{subpageTitle && subpageLink && (
				<>
					<Link
						href={subpageLink}
						className={styles.breadcrumb}
					>
						{t({ id: subpageTitle })}
					</Link>
					<span className={styles.breadcrumbArrow}>{'>'}</span>
				</>
			)}
		</div>
	);
};

export default BreadCrumbsUserSection;
