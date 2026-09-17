import { IIconProps } from './Interfaces';

const MailIcon = ({ className, title = '', alt = '' }: IIconProps) => {
	return (
		<svg
			width="35"
			height="22"
			viewBox="0 0 35 22"
			className={className}
		>
			<title>{title}</title>
			<desc>{alt}</desc>
			<g transform="translate(-195.593 -72.301)">
				<path
					d="M209.594,82.732a5.644,5.644,0,0,0,7,0l12.834-10.255a1.969,1.969,0,0,0-.81-.176H197.57a1.976,1.976,0,0,0-.81.176Z"
					fill="#4d4d4e"
				/>
				<path
					d="M230.593,74.265a1.93,1.93,0,0,0-.277-.987L217.9,83.195,230.32,93.317a1.936,1.936,0,0,0,.273-.98Z"
					fill="#4d4d4e"
				/>
				<path
					d="M216.926,83.922a6.717,6.717,0,0,1-7.666,0l-12.509,10.2a1.967,1.967,0,0,0,.819.181h31.046a1.967,1.967,0,0,0,.819-.181Z"
					fill="#4d4d4e"
				/>
				<path
					d="M195.87,73.278a1.93,1.93,0,0,0-.277.987V92.337a1.936,1.936,0,0,0,.273.98l12.416-10.122Z"
					fill="#4d4d4e"
				/>
			</g>
		</svg>
	);
};

export default MailIcon;
