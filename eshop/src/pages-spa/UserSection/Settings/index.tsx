'use client';

import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import userSectionStyles from 'pages-spa/UserSection/styles.module.css';

import BreadCrumbsUserSection from '../Breadcrumbs';

import LoginCredentials from './Components/LoginCredentials';
import Newsletter from './Components/LoginCredentials/Components/Newsletter';

const Settings = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<>
			<BreadCrumbsUserSection />

			<h1 className={userSectionStyles.userSectionMainHeader}>
				{t({ id: 'userSection.settings.loginCredentials.title' })}
			</h1>

			<h2 className={userSectionStyles.userSectionHeader}>
				{t({ id: 'userSection.settings.loginCredentials.loginInfo' })}
			</h2>
			<LoginCredentials />

			<h2 className={userSectionStyles.userSectionHeader}>
				{t({ id: 'userSection.settings.newsletter.title' })}
			</h2>
			<Newsletter />
		</>
	);
};

export default Settings;
