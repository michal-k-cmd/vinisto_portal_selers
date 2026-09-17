import { useLoaderData } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import { useContext } from 'react';
import Multiselect from 'Components/Multiselect';
import { SELECT_CMS_IMAGE } from 'Components/Modal/constants';
import { CmsImage } from 'Services/CmsService/interfaces';
import { ModalContext } from 'Components/Modal/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';

import { CmsImageListLoader } from './interfaces';
import useImageList from './useImageList';
import './styles.css';

const ImageListPage = () => {
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const t = useContext(LocalizationContext).useFormatMessage();

	const { cmsImageTags } = useLoaderData() as CmsImageListLoader;

	const {
		images,
		loadMoreRef,
		handleFilterByName,
		handleFilterByTags,
		isLoading,
		isFetchingNextPage,
		hasNextPage,
	} = useImageList();

	if (!images || !cmsImageTags) {
		notificationsContext.handleShowErrorNotification('errorLoadingData');
		return <div>{t({ id: 'errorLoadingData' })}</div>;
	}

	return (
		<div>
			<div className="image-list-toolbar">
				<input
					className="image-list-search"
					type="text"
					placeholder={
						t({ id: 'imageList.placeholder.searchName' })?.toString() ??
						'Search by name'
					}
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
				<Button
					variant="primary"
					onClick={() =>
						modalContext.handleOpenModal(SELECT_CMS_IMAGE, {
							cmsImageTags,
						})
					}
				>
					{t({ id: 'imageList.button.uploadFile' })}
				</Button>
			</div>

			{isLoading ? (
				<div className="image-list-sentinel">
					<Spinner
						animation="border"
						size="sm"
					/>
				</div>
			) : images.length === 0 ? (
				<div className="image-list-empty">
					{t({ id: 'imageList.empty' })?.toString() ?? 'No images found'}
				</div>
			) : (
				<>
					<ImageGrid images={images} />
					<div
						ref={loadMoreRef}
						className="image-list-sentinel"
					>
						{isFetchingNextPage && (
							<Spinner
								animation="border"
								size="sm"
							/>
						)}
						{!hasNextPage && images.length > 0 && null}
					</div>
				</>
			)}
		</div>
	);
};

const ImageGrid = ({ images }: { images: CmsImage[] }) => (
	<div className="image-list">
		{images.map((image) => (
			<ImageCard
				key={image.id}
				image={image}
			/>
		))}
	</div>
);

const ImageCard = ({ image }: { image: CmsImage }) => {
	const imageUrl =
		image.urls.thumb_330x260 ?? image.urls.thumb_300 ?? image.urls.original_png;

	return (
		<div className="image-card">
			<img
				src={imageUrl}
				alt={image.alternativeText || image.name}
				loading="lazy"
			/>
			<div className="image-card-overlay">{image.name}</div>
		</div>
	);
};

export default ImageListPage;
