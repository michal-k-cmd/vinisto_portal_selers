import useStaticCategories from 'Components/Navbar/useStaticCategories';
import MobileMenu from 'Components/MobileMenu';
import { useState } from 'react';

import TwinsMenuItems from './TwinsMenuItems';
import styles from './styles.module.css';

const MobileMenuInitialPage = () => {
	const { mobileMenu } = useStaticCategories();

	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<MobileMenu.Page topPanel={{ title: 'Menu' }}>
			<div className={styles.mobileMenuWrap}>
				{mobileMenu?.map((category, index) => {
					if (index % 2 === 0) {
						const nextCategory = mobileMenu[index + 1];
						return (
							<TwinsMenuItems
								key={'navpagem' + index}
								indexLeft={index}
								indexRight={index + 1}
								openIndex={openIndex}
								setOpenIndex={setOpenIndex}
								categoryLeft={category}
								categoryRight={nextCategory}
							/>
						);
					}
					return null;
				})}
			</div>
		</MobileMenu.Page>
	);
};

export default MobileMenuInitialPage;
