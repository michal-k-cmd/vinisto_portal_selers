import {
	ChangeEvent,
	createRef,
	FC,
	lazy,
	MouseEvent,
	Suspense,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useRevalidator } from 'react-router-dom';
import { ReactCropperElement } from 'react-cropper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form } from 'react-final-form';
import cx from 'classnames';
import {
	CButton,
	CCol,
	CContainer,
	CForm,
	CFormLabel,
	CRow,
} from '@coreui/react';
import { MdPhotoCamera } from 'react-icons/md';
import { IoLockClosed, IoLockOpen } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import {
	Input,
	InputCheckBox,
	InputMultiselect,
	InputTextArea,
	SubmitButton,
	Validators,
} from 'Components/Form';
import { apiServiceInstance } from 'Services/ApiService';
import {
	VinistoCmsDllModelsApiImageTagImageTag,
	VinistoCmsDllModelsApiReturnCmsImageReturn,
} from 'vinisto_api_client/src/api-types/cms-api/';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import ImagePreview from 'Components/Modal/Components/UploadCMSImage/Preview';
import { Option } from 'Components/Multiselect/interfaces';
import {
	useCmsImageListMutation,
	useCmsImageTagListQuery,
} from 'Pages/ImageList/loader';

import { allowedExtensions } from './constants';

import 'cropperjs/dist/cropper.css';
import './styles.css';

const Cropper = lazy(() => import('react-cropper'));

interface FormValues {
	fileSelected: string;
	fileName: string;
	fileAltText: string;
	fileDescription: string;
	tags: Option[];
	removeBackground: boolean;
	addBackground: boolean;
}

const UploadCMSImageModal: FC = () => {
	const { loginHash } = useContext(AuthenticationContext).vinistoUser;

	const { data: tags } = useCmsImageTagListQuery(loginHash);
	const createImageTagMutation = useCmsImageListMutation(loginHash);

	const localizationContext = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);

	const notificationsContext = useContext(NotificationsContext);
	const t = localizationContext.useFormatMessage();

	const imgCropperRef = createRef<ReactCropperElement>();
	const form = useRef<HTMLFormElement>(null);

	const [imageState, setImageState] = useState<File | null>(null);
	const [croppedImage, setCroppedImage] = useState<File | null>(null);
	const [imageToCrop, setImageToCrop] = useState('');
	const [imagePreview, setImagePreview] = useState('');
	const [imageName, setImageName] = useState('');
	const [isCropperOn, setIsCropperOn] = useState(false);

	const [aspectRatioState, setAspectRatioState] = useState({
		x: 0,
		y: 0,
		locked: false,
	});

	const revalidator = useRevalidator();
	const queryClient = useQueryClient();
	const uploadMutation = useMutation(
		(formData: { data: FormData; url: string }) =>
			apiServiceInstance.upload<VinistoCmsDllModelsApiReturnCmsImageReturn>(
				formData.url,
				formData.data,
				true
			),
		{
			onSuccess: (res) => {
				notificationsContext.handleShowSuccessNotification(
					'admin.modal.uploadImage.upload.success'
				);
				revalidator.revalidate();
				modalContext.data?.onSelect?.(
					res?.image?.urls?.thumb_1000,
					res?.image?.description,
					res?.image?.alternativeText,
					res?.image?.id
				);
				modalContext.handleCloseModal();
			},
			onError: () => {
				notificationsContext.handleShowErrorNotification(
					'admin.modal.uploadImage.upload.error'
				);
			},
			onSettled: () => {
				queryClient.invalidateQueries(['CmsImages']);
			},
		}
	);
	const [newImageTag, setNewTag] =
		useState<VinistoCmsDllModelsApiImageTagImageTag>();

	const handleCreateTag = (item: Option) => {
		const req = {
			name: item.label,
		};

		createImageTagMutation.mutate(req, {
			onSuccess: (data) => {
				data.tag && setNewTag(data.tag);
				notificationsContext.handleShowSuccessNotification(
					'cmsImageTag.create.success'
				);
			},
			onError: () => {
				notificationsContext.handleShowErrorNotification(
					'cmsImageTag.create.error'
				);
			},
		});
	};

	const handleUploadedFileToFileReader = (file: File) => {
		const reader = new FileReader();
		reader.onload = () => {
			setImageToCrop(reader.result as string);
		};

		reader.readAsDataURL(file);
	};

	useEffect(() => {
		handleUploadedFileToFileReader(modalContext?.data?.imageState);
		setImageName(modalContext?.data?.imageState.name);
		setImageState(modalContext?.data?.imageState);
	}, [modalContext]);

	useEffect(() => {
		if (!imageState) return;
		setImagePreview(
			URL.createObjectURL(croppedImage ? croppedImage : imageState)
		);
	}, [imageState, croppedImage]);

	const handleOnUpload = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();

		let file;

		if (event.target instanceof HTMLInputElement && event.target.files) {
			file = event.target.files[0];
		} else return;

		if (file) {
			handleUploadedFileToFileReader(file);
			setImageName(file.name);
			setImageState(file);
			setCroppedImage(null);
			setIsCropperOn(false);
		}
	};

	const handleSetCropperOn = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setIsCropperOn((prevState) => !prevState);
	};

	const handleSetAspectRatioLockOn = (event: MouseEvent<SVGElement>) => {
		event.preventDefault();
		!aspectRatioState.locked
			? setAspectRatioState({
					...aspectRatioState,
					locked: true,
			  })
			: setAspectRatioState({
					x: 0,
					y: 0,
					locked: false,
			  });
	};

	const handleGetCropData = () => {
		if (typeof imgCropperRef.current?.cropper !== 'undefined') {
			const croppedCanvas = imgCropperRef.current?.cropper.getCroppedCanvas();

			croppedCanvas.toBlob((blob) => {
				if (!blob) return;
				const file = new File([blob], 'cropped.png', { type: 'image/png' });
				setCroppedImage(file);
			}, 'image/png');

			setIsCropperOn((prevState) => !prevState);
		}
	};

	const handleOnSubmit = useCallback(
		(formValues: FormValues) => {
			if (!croppedImage && !imageState)
				return notificationsContext.handleShowErrorNotification(
					'admin.modal.uploadImage.imageEmpty.error'
				);
			if (uploadMutation.isLoading) return;

			const formData = new FormData();
			formData.append('imageFile', croppedImage ?? imageState ?? '');

			const params = new URLSearchParams();
			params.set('UserLoginHash', loginHash);
			params.set('Name', formValues.fileName);
			if (formValues.fileAltText !== undefined)
				params.set('alternativeText', formValues.fileAltText);
			if (formValues.fileDescription !== undefined)
				params.set('Description', formValues.fileDescription);
			if (formValues.tags) {
				formValues.tags.forEach((tag) => params.append('Tags', tag.value));
			}
			params.set('RemoveBackground', String(formValues.removeBackground));
			params.set('AddBackground', String(formValues.addBackground));

			const url = `cms-api/images?${params.toString()}`;

			uploadMutation.mutate({ data: formData, url });
		},
		[croppedImage, imageState, notificationsContext, loginHash, uploadMutation]
	);

	if (!Array.isArray(tags)) return <></>;

	return (
		<Form
			onSubmit={handleOnSubmit}
			initializationValues={{
				isCropperOn: isCropperOn,
			}}
			initialValues={{
				removeBackground: false,
				addBackground: false,
			}}
			render={({ handleSubmit, pristine, valid, submitting }) => {
				return (
					<CForm
						onSubmit={handleSubmit}
						ref={form}
					>
						<CRow>
							<CCol sm={8}>
								{!isCropperOn ? (
									<div
										className={cx('image-preview-wrapper', {
											empty: !imageState,
										})}
									>
										<MdPhotoCamera className="camera-icon" />
										<ImagePreview selectedImage={imagePreview} />
									</div>
								) : (
									<Suspense fallback={<></>}>
										<Cropper
											ref={imgCropperRef}
											src={imageToCrop}
											aspectRatio={
												aspectRatioState.locked
													? aspectRatioState.x / aspectRatioState.y
													: undefined
											}
											key={
												aspectRatioState.locked
													? aspectRatioState.x / aspectRatioState.y
													: 'cropperKey'
											} //Dynamic key to update the aspectRatio correctly
											initialAspectRatio={1}
											zoomTo={1}
											preview=".img-preview"
											viewMode={1}
											minCropBoxHeight={10}
											minCropBoxWidth={10}
											background={false}
											responsive={true}
											autoCropArea={1}
											checkOrientation={false}
											guides={true}
											className="image-preview-wrapper"
											cropBoxResizable={true}
											cropBoxMovable={true}
											zoomable={false}
										/>
									</Suspense>
								)}
							</CCol>
							<CCol>
								<CContainer>
									{!isCropperOn ? (
										<div>
											<CFormLabel>
												{t({ id: 'admin.modal.form.uploadCMSImage.file' })}
											</CFormLabel>
											<div className="d-flex">
												<input
													name="fileSelected"
													className="form-control upload-btn w-100"
													type="text"
													defaultValue={imageName}
												/>
												<input
													name="fileSelect"
													className="form-control upload-btn w-100 file-select"
													type="file"
													onChange={handleOnUpload}
													accept={allowedExtensions.join()}
												/>
											</div>

											<CButton
												type="button"
												className="btn btn-primary mb-3"
												onClick={handleSetCropperOn}
												disabled={!imageState}
											>
												{t({ id: 'admin.modal.form.uploadCMSImage.cropImage' })}
											</CButton>
											<div className="d-flex gap-4">
												<InputCheckBox
													name="removeBackground"
													identifier="removeBackground"
													label="admin.modal.uploadImage.form.removeBackground"
												/>
												<InputCheckBox
													name="addBackground"
													identifier="addBackground"
													label="admin.modal.uploadImage.form.addBackground"
												/>
											</div>
											<Input
												type="text"
												name="fileName"
												identifier="fileName"
												label="admin.modal.form.uploadCMSImage.file.name"
												placeholder=""
												validate={Validators.required}
											/>
											<Input
												type="text"
												name="fileAltText"
												identifier="fileAltText"
												label="admin.modal.form.uploadCMSImage.file.altText"
												placeholder=""
											/>
											<InputTextArea
												name="fileDescription"
												identifier="fileDescription"
												label="admin.modal.form.uploadCMSImage.file.description"
												placeholder=""
											/>
											<InputMultiselect
												options={tags.map((item) => ({
													value: item.id,
													label: item.name,
												}))}
												name="tags"
												identifier="tags"
												label="admin.modal.form.uploadCMSImage.file.tags"
												onAddNewItem={(item) => handleCreateTag(item)}
												newItem={{
													label: newImageTag?.name ?? '',
													value: newImageTag?.id ?? '',
												}}
											/>
										</div>
									) : (
										<div>
											<CRow>
												<p className="fw-bold">
													{t({
														id: 'admin.modal.form.uploadCMSImage.cropingImage',
													})}
												</p>
											</CRow>
											<CRow>
												<CFormLabel>
													{t({
														id: 'admin.modal.form.uploadCMSImage.aspectRatio',
													})}
												</CFormLabel>
												<CCol className="d-flex align-items-start pe-0">
													<input
														className="form-control"
														type="number"
														name="uploadCMSImageAspectRatioX"
														value={aspectRatioState.x}
														onChange={(e) =>
															setAspectRatioState({
																...aspectRatioState,
																x: +e.target.value,
															})
														}
													/>
													<IoMdClose className="icon-18" />
												</CCol>
												<CCol className="d-flex align-items-start ps-0">
													<input
														className="form-control mb-3"
														type="number"
														name="uploadCMSImageAspectRatioY"
														value={aspectRatioState.y}
														onChange={(e) =>
															setAspectRatioState({
																...aspectRatioState,
																y: +e.target.value,
															})
														}
													/>
													{!aspectRatioState.locked ? (
														<IoLockOpen
															className="icon-30"
															onClick={handleSetAspectRatioLockOn}
														/>
													) : (
														<IoLockClosed
															className="icon-30"
															onClick={handleSetAspectRatioLockOn}
														/>
													)}
												</CCol>
											</CRow>
											<CButton
												type="button"
												className="btn btn-primary me-4"
												onClick={handleSetCropperOn}
											>
												{t({ id: 'admin.btn.back' })}
											</CButton>
											<CButton
												type="button"
												className="btn btn-primary"
												onClick={handleGetCropData}
											>
												{t({ id: 'admin.modal.form.uploadCMSImage.cropImage' })}
											</CButton>
										</div>
									)}
								</CContainer>
							</CCol>
						</CRow>
						<div className="mt-3">
							<SubmitButton
								valid={valid}
								pristine={pristine}
								submitting={submitting || uploadMutation.isLoading}
								submitText={'admin.modal.form.uploadCMSImage.upload'}
								isDisabled={
									!imageState || isCropperOn || uploadMutation.isLoading
								}
							/>
						</div>
					</CForm>
				);
			}}
		/>
	);
};
export default UploadCMSImageModal;
