/**
 * Based on: https://github.com/final-form/react-final-form/issues/663
 *
 * "The trick is to just replace the default change event behavior by giving it the files attribute
 * instead of the value, and leave the input uncontrolled since we extract and ignore the value
 * (this is normal for file inputs)."
 */

import { ChangeEvent, useCallback, useContext, useId } from 'react';
import { CFormInput, CFormLabel, CFormText } from '@coreui/react';
import { Field, FieldInputProps } from 'react-final-form';
import { LocalizationContext } from 'Services/LocalizationService';

import { FileUploadProps } from './interfaces';
import { FILE_INPUT_ID } from './constants';

const ImageUpload = ({
	name,
	handleOnUpload,
	imgInputRef,
	selectedImage,
	allowedTypes,
	imageError,
	selectLabel,
	changeLabel,
	label,
	labelClassname,
	buttonWrapperClassname,
}: FileUploadProps) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	const uniqueInputId = useId();

	const handleOnChange =
		(inputOnChange: FieldInputProps<FileList>['onChange']) =>
		(event: ChangeEvent<HTMLInputElement>) => {
			inputOnChange(event.target.files);
			handleOnUpload(event);
		};

	const renderLabel = useCallback(
		(label: string | { id: string; [key: string]: any } | undefined) => {
			if (typeof label === 'string') return t({ id: label });
			if (typeof label == 'object' && 'id' in label) {
				const { id, ...values } = label;
				return t({ id }, { ...values });
			}
			return t({ id: 'admin.modal.banner.image.label' });
		},
		[t]
	);

	return (
		<Field<FileList> name={name}>
			{(
				/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
				{ input: { value, onChange, ...input } }
			) => {
				return (
					<>
						<CFormLabel
							htmlFor={`${FILE_INPUT_ID}-${uniqueInputId}`}
							className={labelClassname}
						>
							{renderLabel(label)}
							{selectedImage === null && (
								<div className={buttonWrapperClassname}>
									<span className="btn btn-primary ">
										{t({
											id: selectLabel
												? selectLabel
												: 'admin.modal.banner.image.select',
										})}
									</span>
								</div>
							)}
						</CFormLabel>
						{selectedImage !== null && (
							<div className="d-flex align-items-start gap-2">
								<CFormInput
									readOnly
									className="flex-grow-1 w-auto"
									value={
										typeof selectedImage === 'string'
											? selectedImage
											: selectedImage.name
									}
								/>
								<CFormLabel htmlFor={`${FILE_INPUT_ID}-${uniqueInputId}`}>
									<span className="btn btn-primary text-nowrap">
										{t({
											id: changeLabel
												? changeLabel
												: 'admin.modal.banner.image.change',
										})}
									</span>
								</CFormLabel>
							</div>
						)}
						<input
							{...input}
							type="file"
							id={`${FILE_INPUT_ID}-${uniqueInputId}`}
							ref={imgInputRef}
							className="d-none"
							onChange={handleOnChange(onChange)}
							accept={(allowedTypes ?? []).join()}
						/>
						{imageError && (
							<CFormText className="text-danger">
								{t(
									{
										id: imageError.message,
									},
									imageError.variables ? { ...imageError.variables } : {}
								)}
							</CFormText>
						)}
					</>
				);
			}}
		</Field>
	);
};

export default ImageUpload;
