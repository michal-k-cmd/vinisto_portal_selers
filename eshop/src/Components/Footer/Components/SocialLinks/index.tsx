import { lazy, Suspense } from 'react';
import Loader from 'Components/View/Loader';

import { FACEBOOK_URL, INSTAGRAM_URL, LINKEDIN_URL, X_URL } from './constants';
import SocialMediaLink from './SocialMediaLink';
import styles from './styles.module.css';

const FacebookIcon = lazy(() => import('Components/Icons/FacebookIcon'));
const InstagramIcon = lazy(() => import('Components/Icons/InstagramIcon'));
const LinkedInIcon = lazy(() => import('Components/Icons/LinkedinIcon'));
const XIcon = lazy(() => import('Components/Icons/XIcon'));

const socialLinks = [
	{
		title: 'Facebook',
		url: FACEBOOK_URL,
		icon: FacebookIcon,
	},
	{
		title: 'Instagram',
		url: INSTAGRAM_URL,
		icon: InstagramIcon,
	},
	{
		title: 'LinkedIn',
		url: LINKEDIN_URL,
		icon: LinkedInIcon,
	},
	{
		title: 'X',
		url: X_URL,
		icon: XIcon,
	},
];

const SocialLinks = () => {
	return (
		<div className="col-12 social-media-icons d-flex flex-wrap gap-2 mx-0 mt-3">
			{socialLinks.map(({ url, title, icon: Icon }, index) => (
				<SocialMediaLink
					className={styles.socialMediaLink}
					key={'sc' + index}
					url={url}
				>
					<Suspense fallback={<Loader blank />}>
						<Icon
							alt={title}
							title={title}
						/>
					</Suspense>
				</SocialMediaLink>
			))}
		</div>
	);
};

export default SocialLinks;
