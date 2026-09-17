import {
	ChangeEvent,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { NotificationsContext } from 'Services/NotificationService';
import { TInputError } from 'Components/Form/interfaces';

import { DEFAULT_TYPES } from './constants';

const useFileUpload = (allowedTypes: string[] = DEFAULT_TYPES) => {
	const notificationsContext = useContext(NotificationsContext);

	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [imageError, setFileError] = useState<TInputError<string>>(null);

	const filePreviewRef = useRef<HTMLImageElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleOnUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files?.length) {
			setFileError('admin.modal.uploadFile.empty.error');
			return;
		}

		const uploadedImage = event.target.files[0];
		if (!allowedTypes.some((fileType) => uploadedImage.type === fileType)) {
			if (fileInputRef.current !== null) {
				fileInputRef.current.value = '';
			}
			setSelectedFile(null);
			setFileError('admin.modal.uploadFile.extension.error');
			return;
		}

		setSelectedFile(uploadedImage);
		setFileError(null);
	}, []);

	useEffect(() => {
		if (filePreviewRef.current === null) return;
		if (selectedFile === null) {
			filePreviewRef.current.src = '';
			return;
		}
		const src = URL.createObjectURL(selectedFile);
		filePreviewRef.current.src = src;
	}, [selectedFile]);

	useEffect(() => {
		if (imageError) {
			notificationsContext.handleShowErrorNotification(imageError);
		}
	}, [imageError, notificationsContext]);

	return {
		filePreviewRef,
		fileInputRef,
		selectedFile,
		imageError,
		handleOnUpload,
	};
};

export default useFileUpload;
