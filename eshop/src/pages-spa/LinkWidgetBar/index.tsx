'use client';

import LinkWidget from 'pages-spa/Home/Components/LinkWidget';
import { DeviceServiceContext } from 'Services/DeviceService';
import { useContext, useEffect, useState } from 'react';
import useSectionLinkWidgetsQuery from 'Hooks/use-section-link-widgets-query';
import LinkWidgetList from 'Components/link-widget';
import cx from 'classnames';
import { useSwipeable } from 'react-swipeable';
import { Allowed_Sections } from 'vinisto_api_client/src/domain/link-widget/enums';
import { usePlatformContext } from 'Services/PlatformService';

import { LayoutPropsInterface } from './interfaces';
import styles from './styles.module.css';

const LinkWidgetBar = ({ children }: LayoutPropsInterface) => {
	return (
		<>
			<NotificationBar />
			{children}
		</>
	);
};

export default LinkWidgetBar;

const NotificationBar = () => {
	const isInAdminIframe = usePlatformContext().getIsInAdminIframe();
	const { isDesktop } = useContext(DeviceServiceContext);

	if (isInAdminIframe) return null;

	const section = isDesktop
		? Allowed_Sections.HEADER_DESKTOP
		: Allowed_Sections.HEADER_MOBILE;
	if (isDesktop)
		return (
			<div
				className={cx(styles.widgetWrapper, 'd-print-none')}
				id="header-widgets"
			>
				<LinkWidget
					container={false}
					section={section}
					className={styles.header}
					itemClassName={styles.linkWidgetItem}
					widgetLimit={4}
				/>
			</div>
		);

	return <MobileRotator section={section} />;
};

type MobileRotatorProps = {
	section: Allowed_Sections;
};

const MobileRotator = ({ section }: MobileRotatorProps) => {
	const { query, filteredLinks } = useSectionLinkWidgetsQuery(
		section,
		undefined,
		4
	);
	const [currentIndex, setCurrentIndex] = useState(0);

	const filteredLinksLength = filteredLinks?.length ?? 0;

	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout>;

		const tick = () => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredLinksLength);
			timeoutId = setTimeout(tick, 5000);
		};

		timeoutId = setTimeout(tick, 5000);

		return () => clearTimeout(timeoutId);
	}, [filteredLinks, filteredLinksLength]);

	const swipeHandlers = useSwipeable({
		onSwipedLeft: () =>
			setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredLinksLength),
		onSwipedRight: () =>
			setCurrentIndex(
				(prevIndex) =>
					(prevIndex - 1 + filteredLinksLength) % filteredLinksLength
			),
	});

	return (
		<div
			{...swipeHandlers}
			className="d-print-none"
		>
			<LinkWidgetList
				itemClassName={styles.linkWidgetItem}
				className={cx(styles.header, styles.headerMobile)}
				isLoading={query.isLoading}
				linkWidgets={(filteredLinksLength
					? [filteredLinks?.[currentIndex]]
					: []
				).map((link) => ({
					id: link?.id,
					name: link?.name,
					imageLocator: link?.imageLocator,
					to: link?.url,
					type: link?.type,
				}))}
			/>
		</div>
	);
};
