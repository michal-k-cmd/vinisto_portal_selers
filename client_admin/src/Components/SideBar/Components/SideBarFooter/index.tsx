import { FC, useContext } from 'react';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { LocalizationContext } from 'Services/LocalizationService';

import './styles.css';

const SideBarFooter: FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<div className="vca-sidebar-footer">
			<div className="vca-sidebar-footer__link-container">
				<div>
					<BsQuestionCircleFill className="footer-icon" />
					<Link
						className="footer-link"
						to="/faq"
					>
						{t({ id: 'sidebar.faq.label' })}
					</Link>
				</div>
				<a
					className="footer-link w-100"
					href="https://www.vinisto.cz"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 20 20"
						className="me-2"
					>
						<g transform="translate(-325.946 -5.076)">
							<circle
								cx="10"
								cy="10"
								r="10"
								transform="translate(325.946 5.076)"
								fill="#fff"
							/>
							<path
								d="M343.612,13.826h-8.854V11.335l-6.479,3.742,6.479,3.741V16.327h8.854Z"
								fill="#280044"
							/>
						</g>
					</svg>
					{t({ id: 'sidebar.returnToVinisto.label' })}
				</a>
			</div>

			{/* <Link className='footer-link' to="/">Přejít na vinisto</Link> */}
		</div>
	);
};

export default SideBarFooter;
