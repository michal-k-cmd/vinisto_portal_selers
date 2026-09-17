import { useContext } from 'react';
import { ModalContext } from 'Components/Modal/context';
import { CButton, CCol, CRow } from '@coreui/react';
import { LocalizationContext } from 'Services/LocalizationService';

import { SubmitButtonProps } from './interfaces';

import './styles.css';

const SubmitButton = ({
	isBackButton: backButton,
	submitText,
	extraText,
	isDisabled,
}: SubmitButtonProps) => {
	const modalContext = useContext(ModalContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnCloseModal = () => {
		modalContext.handleCloseModal();
	};

	return (
		<CRow>
			<CCol>
				{backButton && (
					<CButton
						color="primary"
						className="px-4 me-5 admin-button"
						type="button"
						onClick={handleOnCloseModal}
					>
						{t({ id: 'admin.btn.back' })}
					</CButton>
				)}

				<CButton
					disabled={isDisabled}
					color="primary"
					className="px-4 admin-button-submit"
					type="submit"
				>
					{t({ id: submitText })} {extraText}
				</CButton>
			</CCol>
		</CRow>
	);
};

export default SubmitButton;
