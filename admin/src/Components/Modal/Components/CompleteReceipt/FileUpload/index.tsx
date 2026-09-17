import { ChangeEvent, useContext } from 'react';
import { CFormInput, CFormLabel } from '@coreui/react';
import { Field, FieldInputProps } from 'react-final-form';
import { required } from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label } from 'Components/Form';

import { FILE_INPUT_ID } from './constants';
import { UploadFile } from './interfaces';

import './styles.css';

const FileUpload = ({
	name,
	handleOnUpload,
	fileInputRef,
	selectedFile,
	allowedTypes,
	fileError,
}: UploadFile) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	const handleOnChange =
		(inputOnChange: FieldInputProps<FileList>['onChange']) =>
		(event: ChangeEvent<HTMLInputElement>) => {
			inputOnChange(event.target.files);
			handleOnUpload(event);
		};

	return (
		<Field<FileList>
			name={name}
			validate={required}
		>
			{(
				/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
				{ input: { value, onChange, ...input }, meta }
			) => {
				return (
					<>
						<div className="file-upload">
							<Label
								className="file-upload__label"
								isRequired={true}
							>
								{t({ id: 'admin.modal.completeReceipt.report.label' })}
							</Label>
							<div className="d-flex align-items-start gap-2">
								<CFormInput
									className="file-upload__input"
									value={
										typeof selectedFile === 'string'
											? selectedFile
											: selectedFile?.name
									}
								/>
								<CFormLabel htmlFor={FILE_INPUT_ID}>
									<span className="btn btn-primary text-nowrap file-upload__button">
										{t({ id: 'admin.modal.completeReceipt.report.button' })}
									</span>
								</CFormLabel>
							</div>
							<InputError
								errorMessage={meta.error || meta.submitError || fileError}
								touched={meta.touched}
							/>
						</div>

						<CFormInput
							{...input}
							type="file"
							id={FILE_INPUT_ID}
							ref={fileInputRef}
							className="d-none"
							onChange={handleOnChange(onChange)}
							accept={allowedTypes.join()}
						/>
					</>
				);
			}}
		</Field>
	);
};

export default FileUpload;
