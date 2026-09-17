import React from 'react';
import cx from 'classnames';
import { get } from 'Helpers/lodash';
import DeleteIcon from 'Components/Icons/Delete';
import { LocalizationContext } from 'Services/LocalizationService';

import { IImageProps } from './interfaces';

import './styles.css';

const Image: React.FC<IImageProps> = (props): JSX.Element => {
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnDelete = get(props, 'onDelete', () => {});
	const imageUrl = get(props, 'imageUrl', '');
	const isMain = get(props, 'isMain', false);

	return (
		<div
			className={cx('bundle-detail-images-container-image-wrapper', {
				main: isMain,
			})}
		>
			<DeleteIcon
				className="delete-icon"
				onClick={handleOnDelete}
			/>
			<img
				className="image"
				src={imageUrl}
				alt={`${t({ id: 'admin.image.alt' })}`}
			/>
			{isMain && (
				<div className="main-title">{t({ id: 'admin.image.main' })}</div>
			)}
		</div>
	);
};

export default Image;
