import { FC } from 'react';
import cx from 'classnames';
import { MdPhotoCamera } from 'react-icons/md';

import { UploadImagePreviewProps } from './interfaces';

import './styles.css';

const UploadImagePreview: FC<UploadImagePreviewProps> = ({
	allowedExtensions,
	handleOnUpload,
	imgInputRef,
	imgPreviewRef,
	selectedImage,
}) => {
	return (
		<>
			<div className={cx('image-preview-wrapper', { empty: !selectedImage })}>
				<MdPhotoCamera className="camera-icon" />
				<img
					ref={imgPreviewRef}
					className="image-preview"
				/>
			</div>
			<input
				ref={imgInputRef}
				className="upload-btn"
				type="file"
				onChange={handleOnUpload}
				accept={allowedExtensions.join()}
			/>
		</>
	);
};

export default UploadImagePreview;
