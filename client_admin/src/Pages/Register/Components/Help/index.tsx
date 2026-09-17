import { FC, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

const RegisterHelp: FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<>
			<h2>
				{`${t({ id: 'admin.registration.help.heading' })} `}
				<small>{t({ id: 'admin.registration.help.message' })}</small>
			</h2>
			<div className="text-center">
				<input
					className="vinisto-input me-2"
					type="phone"
					name="phone"
					placeholder={`${t({
						id: 'admin.registration.help.phone.placeholder',
					})}`}
				/>
				<button className="vinisto-btn vinisto-bg">
					{t({ id: 'admin.registration.help.send' })}
				</button>
			</div>
		</>
	);
};

export default RegisterHelp;
