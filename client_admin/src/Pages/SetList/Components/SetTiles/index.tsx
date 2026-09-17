import React, { useContext } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
	SET_TYPE_DATA,
	SET_TYPE_LOCALIZATION_MAP,
} from 'Pages/SetList/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import { SetTypeWithoutNone } from 'Pages/SetList/interfaces';

import { tiles } from './constants';
import styles from './styles.module.css';

const SetTiles = () => {
	return (
		<div className={styles.tilesWrapper}>
			{tiles.map((tile) => (
				<SetTile
					key={tile}
					tileType={tile}
				/>
			))}
		</div>
	);
};

export default SetTiles;

const SetTile = ({ tileType }: { tileType: SetTypeWithoutNone }) => {
	const visual = SET_TYPE_DATA[tileType];

	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const renderBottles = (count: number) => (
		<>
			{[...Array(count)].map((_, index) => (
				<img
					key={index}
					src="/assets/images/bottle.svg"
					alt="Wine Bottle icon"
				/>
			))}
		</>
	);

	return (
		<Link
			to={`/set-detail?setType=${tileType}`}
			className={styles.tile}
		>
			<div className={styles.visual}>
				{visual.map((count, index) => (
					<>
						{index > 0 && <FaPlus size={20} />}
						<div>{renderBottles(count)}</div>
					</>
				))}
			</div>
			<span>
				{t({ id: 'create' })} {t({ id: SET_TYPE_LOCALIZATION_MAP[tileType] })}
			</span>
		</Link>
	);
};
