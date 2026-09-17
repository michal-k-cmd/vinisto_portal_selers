import DeleteIcon from 'Components/Icons/Delete';
import { LocalizationContext } from 'Services/LocalizationService';
import cx from 'classnames';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsThreeDots } from 'react-icons/bs';

import { ImageListProps } from './interfaces';
import styles from './styles.module.css';

const ImageList = ({
	images = [],
	handleOnDelete,
	handleOnSetMain,
}: ImageListProps) => {
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const sortedImages = React.useMemo(
		() => images.sort((a) => (a.isMain ? -1 : 1)),
		[images]
	);

	return (
		<div className={styles.main_wrapper}>
			<div className={styles.title}>{t({ id: 'admin.images.title' })}</div>
			<div className={styles.image_list_wrapper}>
				{sortedImages.map((image, index) => (
					<div
						key={`${image.id}-${index}`}
						className={cx(styles.image_wrapper, {
							[styles.main]: image?.isMain,
						})}
					>
						<Dropdown className={styles.dropdown}>
							<Dropdown.Toggle
								as={BsThreeDots}
								className={styles.dropdown_toggle_icon}
							></Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item
									as="button"
									onClick={handleOnDelete(`${image.id}`)}
								>
									<DeleteIcon />
									{t({ id: 'admin.confirm.deleteImage.title' })}
								</Dropdown.Item>
								<Dropdown.Item
									as="button"
									onClick={handleOnSetMain(`${image.id}`)}
								>
									{t({ id: 'admin.image.setAsMain' })}
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						<a
							href={`${image?.domainUrls?.original_png}`}
							target="_blank"
							rel="noreferrer noopener"
						>
							<img
								className={styles.image}
								src={`${image?.domainUrls?.original_png}`}
								alt={`${t({ id: 'admin.image.alt' })}`}
							/>
						</a>
						{image?.isMain && (
							<div className={styles.main_title}>
								{t({ id: 'admin.image.main' })}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default ImageList;
