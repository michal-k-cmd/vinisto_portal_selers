'use client';

import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import Link from 'next/link';
import removeDiacritics from 'Helpers/removeDiacritics';

import styles from './styles.module.css';

interface LocationInfoProps {
	countryName?: string;
	region?: string;
	region_slug?: string;
}

const LocationInfo = ({
	countryName,
	region,
	region_slug,
}: LocationInfoProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<>
			{countryName && (
				<span>
					{t({ id: 'landing.country' })}:{' '}
					<Link
						href={`/produkty/Zeme+puvodu/${removeDiacritics(
							`${countryName}`
						)?.replace(/\s/g, '+')}`}
						className={styles.highlightedLocation}
					>
						{countryName}
					</Link>
				</span>
			)}
			{region_slug && (
				<span>
					{t({ id: 'landing.region' })}:{' '}
					<Link
						href={`/produkty/Region/${region_slug}`}
						className={styles.highlightedLocation}
					>
						{region}
					</Link>
				</span>
			)}
			{region && !region_slug && (
				<span>
					{t({ id: 'landing.region' })}:{' '}
					<span className={styles.highlightedLocation}>{region}</span>
				</span>
			)}
		</>
	);
};

export default LocationInfo;
