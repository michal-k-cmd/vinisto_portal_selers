import { useCallback, useContext } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { FaHome, FaRegUserCircle } from 'react-icons/fa';
import { RiSettings4Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { SideBarContext } from 'Components/SideBar/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';

import './styles.css';

const SideBarFooter = () => {
	const sideBarContext = useContext(SideBarContext);
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const navigate = useNavigate();

	const handleGoHome = useCallback(() => {
		sideBarContext.handleOnForceHideSideBar();
		navigate('/');
	}, []);

	const handleGoToUserDetail = useCallback(() => {
		sideBarContext.handleOnForceHideSideBar();
		navigate(`/user-detail/${authenticationContext.vinistoUser.id}`);
	}, []);

	const handleOnLogout = useCallback(() => {
		sideBarContext.handleOnForceHideSideBar();
		confirmAlert({
			title: `${t({
				id: 'admin.confirm.logOut.title',
			})}`,
			message: `${t({
				id: 'admin.confirm.logOut.message',
			})}`,
			buttons: [
				{
					label: `${t({
						id: 'admin.confirm.logOut.yes',
					})}`,
					onClick: () => {
						navigate('/');
						authenticationContext.handleOnLogOut();
					},
				},
				{
					label: `${t({
						id: 'admin.confirm.logOut.no',
					})}`,
				},
			],
		});
	}, []);

	return (
		<div className="sidebar-footer">
			<FaHome
				onClick={handleGoHome}
				className="sidebar-footer-icon"
			/>
			<RiSettings4Fill className="sidebar-footer-icon" />
			<FaRegUserCircle
				onClick={handleGoToUserDetail}
				className="sidebar-footer-icon"
			/>
			<BiLogOut
				onClick={handleOnLogout}
				className="sidebar-footer-icon"
			/>
		</div>
	);
};

export default SideBarFooter;
