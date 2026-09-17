import NextLink from 'next/link';
import cx from 'classnames';
import isExternalLink from 'Helpers/is-external-link';
import type { FooterInfoLink } from 'Components/Footer/interfaces';

type TInfoColumnProps = {
	links: FooterInfoLink[];
};

const InfoColumn = ({ links }: TInfoColumnProps) => {
	return (
		<ul className="nav flex-column underline-effect">
			{links?.map(({ name, to, as = 'link' }, index) => {
				return (
					<li
						key={'fl' + index}
						className="nav-item"
					>
						{typeof name === 'string' && typeof to === 'string' ? (
							<NextLink
								href={to}
								className={cx({
									'vinisto-btn vinisto-success-btn p-2': as === 'button',
									'vnav-link p-0 underline-item': as === 'link',
								})}
								{...(isExternalLink(to)
									? { target: '_blank', rel: 'noopener noreferrer' }
									: {})}
							>
								{name}
							</NextLink>
						) : (
							<div className="vnav-link">{name}</div>
						)}
					</li>
				);
			})}
		</ul>
	);
};

export default InfoColumn;
