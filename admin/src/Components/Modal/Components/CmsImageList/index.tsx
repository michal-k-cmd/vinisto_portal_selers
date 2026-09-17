import { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import cx from 'classnames';
import { CmsImage } from 'Services/CmsService/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { ModalContext } from 'Components/Modal/context';
import useImageList from 'Pages/ImageList/useImageList';
import { SELECT_CMS_IMAGE } from 'Components/Modal/constants';
import Multiselect from 'Components/Multiselect';

import { CmsImageListModalData } from './interfaces';
import './styles.css';

/**
 * Requires type CmsImageListModalData as modalData
 */
const CmsImageListModal = () => {
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);

	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const { cmsImageTags, onSelect, selectedImageId } =
		modalContext.data as CmsImageListModalData;

	const { images, loadMoreRef, handleFilterByName, handleFilterByTags } =
		useImageList();

	const handleSelectImage = (
		imageUrl: string,
		imageDescription: string,
		imageAltText: string,
		imageId: string
	) => {
		onSelect(imageUrl, imageDescription, imageAltText, imageId);
		modalContext.handleCloseModal();
	};

	if (!images || !cmsImageTags) {
		notificationsContext.handleShowErrorNotification('errorLoadingData');
		return <div>{t({ id: 'errorLoadingData' })}</div>;
	}

	return (
		<div>
			<div className="d-flex flex-row gap-4 align-items-start mb-4">
				<input
					className="image-list-search"
					type="text"
					placeholder={t({ id: 'imageList.button.searchFile' })?.toString()}
					onChange={(e) => handleFilterByName(e.target.value)}
				/>
				<Multiselect
					options={cmsImageTags.map((tag) => ({
						value: tag.id,
						label: tag.name,
					}))}
					onSelectionChange={(items) => handleFilterByTags(items)}
					maxWidth="300px"
					placeholder={t({ id: 'imageList.placeholder.searchTag' })?.toString()}
				/>
			</div>
			<div style={{ overflowY: 'auto', maxHeight: '50vh' }}>
				<ImageList
					images={images}
					onSelect={handleSelectImage}
					selectedImageId={selectedImageId}
				/>
				<div
					style={{ height: '1px' }}
					ref={loadMoreRef}
				/>
			</div>
			<hr />
			<Button
				onClick={() => {
					modalContext.handleCloseModal();
					modalContext.handleOpenModal(SELECT_CMS_IMAGE, {
						cmsImageTags,
						onSelect,
					});
				}}
			>
				{t({ id: 'imageList.button.uploadFile' })}
			</Button>
		</div>
	);
};

const ImageList = ({
	images,
	selectedImageId,
	onSelect,
}: {
	images: CmsImage[];
	selectedImageId?: string;
	onSelect: (
		imageUrl: string,
		imageDescription: string,
		imageAltText: string,
		imageId: string
	) => void;
}) => {
	const [selectedId, setSelectedId] = useState<string | undefined>(
		selectedImageId
	);

	return (
		<div className="image-list">
			{images.map((image) => (
				<ImageListItem
					key={image.id}
					image={image}
					onSelect={(imageUrl, imageDescription, imageAltText, imageId) => {
						setSelectedId(imageId);
						onSelect(imageUrl, imageDescription, imageAltText, imageId);
					}}
					selectedImageId={selectedId}
				/>
			))}
		</div>
	);
};

const ImageListItem = ({
	image,
	onSelect,
	selectedImageId,
}: {
	image: CmsImage;
	onSelect: (
		imageUrl: string,
		imageDescription: string,
		imageAltText: string,
		imageId: string
	) => void;
	selectedImageId?: string;
}) => {
	const imageUrl =
		image.urls.thumb_1000 ??
		image.urls.thumb_330x260 ??
		image.urls.thumb_300 ??
		image.urls.original_png;

	//todo: Close modal in onClick handler
	return (
		<div
			className={cx('image-container', {
				'selected-image': selectedImageId === image.id,
			})}
			onClick={() => {
				onSelect(imageUrl, image.description, image.alternativeText, image.id);
			}}
		>
			<img
				src={imageUrl}
				alt={image.name}
				className="image-list-item"
			/>
			<div className="image-title">{image.name}</div>
		</div>
	);
};

export default CmsImageListModal;
