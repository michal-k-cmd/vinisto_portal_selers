'use client';

/* based on https://github.com/shubhamV123/star-rating */
import {
	MouseEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { invoke, map, round, uniqueId } from 'lodash-es';
import cx from 'classnames';
import StarEmptyIcon from 'Components/Icons/StarEmpty';
import StarFullIcon from 'Components/Icons/StarFull';

import { RatingProps } from './interfaces';
import {
	DEFAULT_PRECISION,
	DEFAULT_STAR_COUNT,
	NOT_SELECTED,
} from './constants';

import './styles.css';

const Rating = ({
	defaultValue = NOT_SELECTED,
	readOnly = false,
	handleOnChange = () => {},
	handleOnClick = undefined,
	isLarge = false,
	precision = DEFAULT_PRECISION,
	starCount = DEFAULT_STAR_COUNT,
	className,
	EmptyIcon = StarEmptyIcon,
	FilledIcon = StarFullIcon,
}: RatingProps) => {
	const defaultValueRound =
		round(
			Math.max(NOT_SELECTED, Math.min(defaultValue, starCount)) *
				(1 / precision)
		) * precision;

	const stars = useMemo(() => [...new Array(starCount)], [starCount]);
	const idIco = useMemo(() => uniqueId(), []);

	const [activeStar, setActiveStar] = useState(defaultValueRound);
	const [hoverActiveStar, setHoverActiveStar] = useState(NOT_SELECTED);
	const [isHovered, setIsHovered] = useState(false);
	const ratingContainerRef = useRef<HTMLDivElement>(null);

	const calculateRating = useCallback(
		(e: MouseEvent) => {
			const { width, left }: { width: number; left: number } = invoke(
				ratingContainerRef,
				'current.getBoundingClientRect'
			);
			const percent = (e.clientX - left) / width;
			const numberInStars = percent * starCount;
			const nearestNumber =
				round((numberInStars + precision / 2) / precision) * precision;

			return Number(
				nearestNumber.toFixed(precision.toString().split('.')[1]?.length || 0)
			);
		},
		[starCount, precision]
	);

	const handleOnClickFn = useCallback(
		(e: MouseEvent) => {
			if (readOnly) return;
			setIsHovered(false);
			const rating = calculateRating(e);
			setActiveStar(rating);
			handleOnChange(rating);
		},
		[readOnly]
	);

	const handleOnMouseMove = useCallback(
		(e: MouseEvent) => {
			if (readOnly) return;
			setIsHovered(true);
			setHoverActiveStar(calculateRating(e));
		},
		[readOnly]
	);

	const handleOnMouseLeave = useCallback(() => {
		if (readOnly) return;
		setHoverActiveStar(NOT_SELECTED); // Reset to default state
		setIsHovered(false);
	}, [readOnly]);

	useEffect(() => {
		setActiveStar(defaultValueRound);
	}, [defaultValueRound]);

	return (
		<div
			className={cx('vinisto-rating', className, {
				'vinisto-rating--large': isLarge,
				pointer: !readOnly || handleOnClick !== undefined,
			})}
			onClick={handleOnClick ?? handleOnClickFn}
			onMouseOver={handleOnMouseMove}
			onMouseLeave={handleOnMouseLeave}
			ref={ratingContainerRef}
		>
			{map(stars, (_, index) => {
				const activeState = isHovered ? hoverActiveStar : activeStar;

				const showEmptyIcon =
					activeState === NOT_SELECTED || activeState < index + 1;

				const isActiveRating = activeState !== 1;
				const isRatingWithPrecision = activeState % 1 !== 0;
				const isRatingEqualToIndex = Math.ceil(activeState) === index + 1;
				const showRatingWithPrecision =
					isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;

				return (
					<div
						className="vinisto-rating__ico-wrap"
						key={'pbrat' + index}
					>
						{showRatingWithPrecision && (
							<div
								className="vinisto-rating__ico"
								style={{
									width: `${(activeState % 1) * 100}%`,
								}}
							>
								<FilledIcon
									className="vinisto-rating-ico"
									alt=""
									title=""
								/>
							</div>
						)}
						{showEmptyIcon ? (
							<EmptyIcon
								className="vinisto-rating-ico"
								alt=""
								title=""
								id={idIco}
							/>
						) : (
							<FilledIcon
								className="vinisto-rating-ico"
								alt=""
								title=""
							/>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Rating;
