import { FC } from 'react';
import { CCard, CCardBody, CCardTitle, CForm } from '@coreui/react';
import RegisterNavigation from 'Pages/Register/Components/Navigation';

/**
 * @category Component Register Page
 */
const RegisterProductsPage: FC = () => {
	return (
		<div className="register-process">
			<RegisterNavigation />
			<div className="register-process__body">
				<CForm>
					<CCard>
						<CCardBody>
							<CCardTitle
								component="h2"
								className="vinisto-card__heading"
							>
								Zalistování produktů
							</CCardTitle>
						</CCardBody>
					</CCard>
				</CForm>
			</div>
		</div>
	);
};

export default RegisterProductsPage;
