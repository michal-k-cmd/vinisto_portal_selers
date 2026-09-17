'use client';

import ContainerFullWidth from 'Components/View/ContainerFullWidth';
import { useContext } from 'react';
import ArticleTabs from 'pages-spa/Home/Components/ArticleTabs';
import LinkWidget from 'pages-spa/Home/Components/LinkWidget';
import { DeviceServiceContext } from 'Services/DeviceService';
import { useIsB2b } from 'Services/PlatformService';

import styles from './styles.module.css';

import { Allowed_Sections } from '@/domain/link-widget/enums';

const StrapiFooter = () => {
	const isB2b = useIsB2b();
	const { isMobile, isTablet } = useContext(DeviceServiceContext);

	return (
		<ContainerFullWidth className={styles.wrapper}>
			{!isB2b && <ArticleTabs />}
			<LinkWidget
				section={
					isMobile || isTablet
						? Allowed_Sections.HOMEPAGE_MOBILE
						: Allowed_Sections.HOMEPAGE_DESKTOP
				}
			/>
		</ContainerFullWidth>
	);
};
export default StrapiFooter;
