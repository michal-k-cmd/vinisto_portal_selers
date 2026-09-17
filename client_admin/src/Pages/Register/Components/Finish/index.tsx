import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LocalizationContext } from 'Services/LocalizationService';
import RegisterHelp from 'Pages/Register/Components/Help';

/**
 * @category Component Register Page
 */
const RegisterFinishPage: FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<div className="register">
			<h1>{t({ id: 'admin.registrationFinish.summary' })}</h1>

			<h2>{t({ id: 'admin.registrationFinish.thankYouForRegistration' })}</h2>

			<div className="register__btns">
				<Link
					className="w-100"
					style={{ maxWidth: '250px' }}
					to="/payment-list"
				>
					<button className="vinisto-btn vinisto-bg-green">
						{t({ id: 'admin.registrationFinish.billingInfo' })}
					</button>
				</Link>
				<Link
					className="w-100"
					style={{ maxWidth: '250px' }}
					to="/delivery-list"
				>
					<button className="vinisto-btn vinisto-bg-warn">
						{t({ id: 'admin.registrationFinish.deliveryType' })}
					</button>
				</Link>
				<Link
					className="w-100"
					style={{ maxWidth: '250px' }}
					to="/supplier-list"
				>
					<button className="vinisto-btn vinisto-bg-warn">
						{t({ id: 'admin.registrationFinish.winery' })}
					</button>
				</Link>
				<Link
					className="w-100"
					style={{ maxWidth: '250px' }}
					to="/product-list"
				>
					<button className="vinisto-btn vinisto-bg-warn">
						{t({ id: 'admin.registrationFinish.products' })}
					</button>
				</Link>
				<Link
					className="w-100"
					style={{ maxWidth: '250px' }}
					to="/"
				>
					<button className="vinisto-btn vinisto-bg-green">
						{t({ id: 'admin.registrationFinish.goToAdministration' })}
					</button>
				</Link>
			</div>

			<RegisterHelp />
		</div>
	);
};

export default RegisterFinishPage;
