'use client';

import { useState } from 'react';
import cx from 'classnames';

import XIcon from '../icons/X';
import CopyIcon from '../icons/Copy';
import FacebookIcon from '../icons/Facebook';

import { ShareBundleLinkVariant, SocialMediaLinksProps } from './types';
import { FACEBOOK, X } from './constants';
import styles from './styles.module.css';

const ShareProductLink = ({
	bundleName,
	isTabletMobile,
	className,
}: SocialMediaLinksProps) => {
	const bundleUrl = typeof window !== 'undefined' ? window.location.href : '';
	const [socialMediaIconsWrapperIsHide, setSocialMediaIconsWrapperIsHide] =
		useState(true);

	const handleOpensocialMediaIconsWrapper = () =>
		!isTabletMobile && setSocialMediaIconsWrapperIsHide(false);

	const handleClosesocialMediaIconsWrapper = () =>
		!isTabletMobile && setSocialMediaIconsWrapperIsHide(true);

	const handleOpenClosesocialMediaIconsWrapper = () =>
		isTabletMobile &&
		setSocialMediaIconsWrapperIsHide((prevState) => !prevState);

	const shareBundleLink = (variant: ShareBundleLinkVariant) => () => {
		switch (variant) {
			case ShareBundleLinkVariant.FACEBOOK:
				window.open(`${FACEBOOK}/sharer/sharer.php?u=${bundleUrl}`);
				break;
			case ShareBundleLinkVariant.X:
				window.open(`${X}/share?text=${bundleName}&url=${bundleUrl}`);
				break;
			case ShareBundleLinkVariant.COPY_LINK:
				navigator.clipboard.writeText(bundleUrl);
				break;
		}
		handleOpensocialMediaIconsWrapper;
	};

	return (
		<div
			className={cx(styles.wrapper, className)}
			onKeyDown={handleOpensocialMediaIconsWrapper}
			onFocus={handleOpensocialMediaIconsWrapper}
			onMouseOver={handleOpensocialMediaIconsWrapper}
			onMouseLeave={handleClosesocialMediaIconsWrapper}
			onClick={handleOpenClosesocialMediaIconsWrapper}
		>
			<button className={styles.shareButton}>&nbsp;</button>
			{!socialMediaIconsWrapperIsHide && (
				<div className={styles.socialMediaIconsWrapper}>
					<button
						className={styles.socialMediaButton}
						onClick={shareBundleLink(ShareBundleLinkVariant.FACEBOOK)}
					>
						<div className={styles.iconWrapper}>
							<FacebookIcon className={styles.socialMediaIcon} />
						</div>
						Facebook
					</button>
					<button
						className={styles.socialMediaButton}
						onClick={shareBundleLink(ShareBundleLinkVariant.X)}
					>
						<div className={styles.iconWrapper}>
							<XIcon className={styles.socialMediaIcon} />
						</div>
						X
					</button>
					<button
						className={styles.socialMediaButton}
						onClick={shareBundleLink(ShareBundleLinkVariant.COPY_LINK)}
					>
						<div className={styles.iconWrapper}>
							<CopyIcon className={styles.socialMediaIcon} />
						</div>
						Zkopírovat odkaz
					</button>
				</div>
			)}
		</div>
	);
};

export default ShareProductLink;
