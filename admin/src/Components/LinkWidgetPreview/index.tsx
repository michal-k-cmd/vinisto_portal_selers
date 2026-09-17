import { LinkTile } from 'vinisto_ui';

import styles from './styles.module.css';

import { LinkWidget } from '@/domain/link-widget';

const LinkWidgetPreview = ({
	data,
	onItemClick,
}: {
	data: LinkWidget[] | undefined;
	onItemClick?: (data: any) => void;
}) => {
	return (
		<div className={styles.list}>
			{data
				?.sort((a, b) => a.order - b.order)
				.map?.((link) => (
					<LinkTile
						key={link.id}
						title={link.name}
						img={{ src: link.imageLocator, alt: '' }}
						onClick={() => onItemClick?.(link)}
						className={
							typeof onItemClick === 'function' ? styles.clickable : ''
						}
					/>
				))}
		</div>
	);
};

export default LinkWidgetPreview;
