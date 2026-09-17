import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { CFormLabel } from '@coreui/react';
import { UPLOAD_CMS_IMAGE } from 'Components/Modal/constants';
import { allowedExtensions } from 'Components/Modal/Components/UploadCMSImage/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';

import 'Components/Modal/Components/UploadCMSImage/styles.css';

/**
 * @category Component Select CMS Image
 */
const SelectCMSImageModal: FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const modalContext = useContext(ModalContext);

	const [imageState, setImageState] = useState<File>();

	const handleOnUpload = ({ target }: ChangeEvent<HTMLInputElement>) => {
		target && target.files && setImageState(target.files[0]);
	};

	useEffect(() => {
		imageState && modalContext.handleCloseModal();
		imageState &&
			modalContext.handleOpenModal(UPLOAD_CMS_IMAGE, {
				imageState: imageState,
				cmsImageTags: modalContext.data?.cmsImageTags ?? [],
				onSelect: modalContext.data?.onSelect,
			});
	}, [imageState, modalContext]);

	return (
		<>
			<CFormLabel
				htmlFor="selectCmsImageInput"
				className="form-label"
			>
				{t({ id: 'admin.modal.form.uploadCMSImage.file' })}
			</CFormLabel>
			<div>
				<label
					htmlFor="selectCmsImageInput"
					className="btn btn-primary btn-select-image"
				>
					{t({ id: 'admin.modal.form.uploadCMSImage.selectImage' })}
				</label>
				<input
					id="selectCmsImageInput"
					name="fileSelect"
					type="file"
					onChange={handleOnUpload}
					accept={allowedExtensions.join()}
					style={{ display: 'none' }}
				/>
			</div>
		</>
	);
};
export default SelectCMSImageModal;
