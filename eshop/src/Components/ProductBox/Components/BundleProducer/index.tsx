'use client';

import { ReactNode, useContext, useMemo } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import { DeviceServiceContext } from 'Services/DeviceService';
import removeDiacritics from 'Helpers/removeDiacritics';
import { VinistoLinkNext } from 'Components/VinistoLink';
import Skeleton from 'react-loading-skeleton';
import { usePlatformContext } from 'Services/PlatformService';
import CustomHighlighter from 'Components/CustomHighlighter';

import styles from './styles.module.css';

type TBundleProducerProps = {
	flag: ReactNode;
	name: string;
	url?: string;
	isLoading?: boolean;
	openInNewTab?: boolean;
	className?: string;
	isLink?: boolean;
	isInViewport?: boolean;
	onClick?: () => void;
	searchString?: string | null;
};

const BundleProducer = ({
	flag,
	name,
	url,
	isLoading = false,
	openInNewTab,
	className,
	isLink = true,
	onClick,
	searchString,
}: TBundleProducerProps) => {
	const { getIsInAdminIframe } = usePlatformContext();
	const deviceContext = useContext(DeviceServiceContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const producerUrl =
		url ??
		removeDiacritics(`${name}`)
			?.replace(/\s+[-–—]\s+/g, ' ')
			?.replace(/\s/g, '+');
	const producerRoute = `/${t({
		id: 'routes.products.route',
	})}/Vyrobce/${producerUrl}`;

	const isInAdminIframe = getIsInAdminIframe();

	const search = useMemo(
		() => (searchString ? [searchString] : []),
		[searchString]
	);

	if (isLoading) {
		return (
			<Skeleton
				width="100%"
				containerClassName={cx(
					'vinisto-wine__variety',
					'vinisto-wine__variety--loading',
					className
				)}
				inline
			/>
		);
	}

	if (isLink && !isInAdminIframe) {
		return (
			<VinistoLinkNext
				href={producerRoute}
				className={cx('vinisto-wine__variety', className)}
				target={
					openInNewTab && !(deviceContext.isMobile || deviceContext.isTablet)
						? '_blank'
						: undefined
				}
				{...(typeof onClick !== 'undefined' ? { onClick } : {})}
			>
				{flag}
				<CustomHighlighter
					searchWords={search}
					textToHighlight={name}
					sanitize={removeDiacritics}
					autoEscape
					className={styles.varietyText}
				/>
			</VinistoLinkNext>
		);
	}

	return (
		<div className={cx('vinisto-wine__variety', className)}>
			{flag}
			<CustomHighlighter
				searchWords={search}
				textToHighlight={name}
				sanitize={removeDiacritics}
				autoEscape
				className={styles.varietyText}
			/>
		</div>
	);
};

export default BundleProducer;
