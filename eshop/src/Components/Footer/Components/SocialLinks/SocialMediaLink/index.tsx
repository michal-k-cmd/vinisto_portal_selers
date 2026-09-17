import { SocialMediaLinkProps } from './interfaces';

const SocialMediaLink = ({
	className,
	url,
	children,
}: SocialMediaLinkProps) => {
	return (
		<a
			className={className}
			href={url}
			target="_blank"
			rel="noopener noreferrer"
		>
			{children}
		</a>
	);
};

export default SocialMediaLink;
