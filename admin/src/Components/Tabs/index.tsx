import { useState } from 'react';
import cx from 'classnames';

import { TabsProps } from './interfaces';

export const Tabs = ({
	tabs,
	initialActiveTab,
	buttonClassName,
	activeButtonClassName,
}: TabsProps) => {
	const [activeTab, setActiveTab] = useState(initialActiveTab);

	return (
		<nav>
			{tabs.map((tab) => (
				<button
					key={tab.id}
					className={cx(buttonClassName, {
						[activeButtonClassName || '']: activeTab === tab.id,
					})}
					onClick={() => {
						setActiveTab(tab.id);
						tab.onClick();
					}}
				>
					{tab.label}
				</button>
			))}
		</nav>
	);
};

export default Tabs;
