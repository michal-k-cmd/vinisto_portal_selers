import * as React from 'react';
import Skeleton from 'react-loading-skeleton';
import { get, map } from 'lodash-es';
import ImageLocal from 'Components/View/ImageLocal';

import { ImageSectionProps } from './interfaces';
import { SKELETONS_NUM_IMAGES } from './constants';

import './styles.css';

const ImageSection: React.FunctionComponent<ImageSectionProps> = (
	props
): JSX.Element => {
	const title = get(props, 'title', '');
	const images = get(props, 'images', []);
	const isLoading = get(props, 'isLoading', false);
	return (
		<div className="vinisto-recommended">
			{isLoading ? (
				<Skeleton
					containerClassName="vinisto-recommended__heading"
					width="30%"
				/>
			) : (
				<p className="vinisto-recommended__heading">{title}</p>
			)}
			<div className="vinisto-recommended__wrap">
				{map(
					isLoading ? map(Array(SKELETONS_NUM_IMAGES), () => '') : images,
					(name: string, key) => (
						<div
							key={'is' + key}
							className="vinisto-recommended__item"
						>
							<div className="vinisto-recommended__item__img">
								{isLoading ? (
									<Skeleton height="80px" />
								) : (
									<ImageLocal
										fileName="zverina.webp"
										alt={`${name}`}
									/>
								)}
							</div>
							<div className="vinisto-recommended__item__name">
								{isLoading ? (
									<Skeleton style={{ marginTop: '.125rem' }} />
								) : (
									name
								)}
							</div>
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default ImageSection;
