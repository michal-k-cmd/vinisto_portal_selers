import { FC, useContext, useState } from 'react';
import cx from 'classnames';
import { get, map } from 'lodash-es';
import Skeleton from 'react-loading-skeleton';
import { DEFAULT_SLIDER_VALUE } from 'Components/Modal/Components/Review/constants';
import { LocalizationContext } from 'Services/LocalizationService';

import Info from './Info/';
import Evaluation from './Evaluation';
import { evaluationCriteria } from './constants';
import { IProfileProps } from './interfaces';
import styles from './styles.module.css';

const Profile: FC<IProfileProps> = (props) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const isLoading = get(props, 'isLoading', false);

	const [isProfileInfoOpen, setProfileInfoOpen] = useState(false);

	const handleToggleProfileInfo = () => {
		setProfileInfoOpen((isProfileInfoOpen) => !isProfileInfoOpen);
	};

	return (
		<div className={styles.profileWrap}>
			<h3 className={styles.profileHeading}>
				{isLoading ? (
					<Skeleton
						width="140px"
						count={1.2}
						style={{ marginRight: '.25rem' }}
						inline
					/>
				) : (
					<>
						{t({ id: 'bundle.profile.title' })}

						<span className={styles.profileHintWrap}>
							<button
								tabIndex={0}
								className={cx(
									styles.profileHint,
									isProfileInfoOpen && styles.openHint
								)}
								onClick={handleToggleProfileInfo}
								onKeyDown={handleToggleProfileInfo}
								onKeyUp={handleToggleProfileInfo}
							>
								?
							</button>
						</span>
					</>
				)}
			</h3>

			{map(evaluationCriteria, (criterion, index) => (
				<Evaluation
					key={'bdeval' + index}
					{...criterion}
					{...{ isProfileInfoOpen, isLoading }}
					value={get(
						props,
						`evaluation[${get(criterion, 'prop')}]`,
						DEFAULT_SLIDER_VALUE
					)}
					order={index}
				/>
			))}

			<Info />
		</div>
	);
};

export default Profile;
