import {
	ChangeEvent,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';

import { Dimensions, ImageError } from './interfaces';
import { DEFAULT_TYPES } from './constants';
import { formatErrorMessage, isIssueWithDimensions } from './helpers';

const useImageUpload = (
	allowedTypes: string[] = DEFAULT_TYPES,
	allowedDimensions?: Dimensions
) => {
	const notificationsContext = useContext(NotificationsContext);
	const t = useContext(LocalizationContext).useFormatMessage();

	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [imageError, setImageError] = useState<ImageError | null>(null);

	const imgPreviewRef = useRef<HTMLImageElement>(null);
	const imgInputRef = useRef<HTMLInputElement>(null);

	const handleOnUpload = useCallback(
		async (event: ChangeEvent<HTMLInputElement>) => {
			if (!event.target.files?.length) {
				setImageError({ message: 'admin.modal.uploadImage.empty.error' });
				return;
			}

			const uploadedImage = event.target.files[0];
			if (!allowedTypes.some((fileType) => uploadedImage.type === fileType)) {
				if (imgInputRef.current !== null) {
					imgInputRef.current.value = '';
				}
				setSelectedImage(null);
				setImageError({ message: 'admin.modal.uploadImage.extension.error' });
				return;
			}

			if (allowedDimensions) {
				const isIssue = await isIssueWithDimensions(
					uploadedImage,
					allowedDimensions
				);
				if (isIssue) {
					if (imgInputRef.current !== null) {
						imgInputRef.current.value = '';
					}
					setSelectedImage(null);

					setImageError(formatErrorMessage(allowedDimensions, t));
					return;
				}
			}

			setSelectedImage(uploadedImage);
			setImageError(null);
		},
		[allowedDimensions, allowedTypes, t]
	);

	useEffect(() => {
		if (imgPreviewRef.current === null) return;
		if (selectedImage === null) {
			imgPreviewRef.current.src = '';
			return;
		}
		const src = URL.createObjectURL(selectedImage);
		imgPreviewRef.current.src = src;
	}, [selectedImage]);

	useEffect(() => {
		if (imageError) {
			notificationsContext.handleShowErrorNotification(imageError.message);
		}
	}, [imageError, notificationsContext]);

	return {
		imgPreviewRef,
		imgInputRef,
		selectedImage,
		imageError,
		handleOnUpload,
	};
};

export default useImageUpload;
