import { FC, MouseEvent, useCallback } from 'react';
import { get } from 'lodash-es';
import Flag from 'Components/Flag';
import ImageLocal from 'Components/View/ImageLocal';

import { IRecensionItemProps } from '../../interfaces';

import './styles.css';

const SmallPresentationTile: FC<IRecensionItemProps> = ({
	item,
	clickHandler,
}) => {
	const handleOnHrefClick = useCallback((event: MouseEvent<HTMLElement>) => {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
	}, []);

	return (
		<div
			className="vinisto-wine__item vinisto-wine__item--small"
			onClick={clickHandler(item)}
		>
			<div className="vinisto-wine__img-wrap">
				<div className="vinisto-wine__img-labels">
					<span className="vinisto-wine__img-label vinisto-wine__img-label--trend">
						Trendy!
					</span>
					<span className="vinisto-wine__img-label vinisto-wine__img-label--new">
						Novinka!
					</span>
					<span className="vinisto-wine__img-label vinisto-wine__img-label--tip">
						Náš tip!
					</span>
				</div>
				<ImageLocal
					fileName="Caubernet_Sauvignon_2016_bottle.webp"
					alt="Appasito_Primitivo_bottle"
					className="vinisto-wine__img"
				/>
			</div>
			<div className="vinisto-wine__info-wrap">
				<p className="vinisto-wine__name">{get(item, 'title', '')}</p>
				<div className="vinisto-wine__review">
					<span className="vinisto-wine__review__wrap-count">
						(
						<span className="vinisto-wine__review__count">
							{get(item, 'quantity', 0)}
						</span>
						)
					</span>
				</div>
				<div className="d-block text-center">
					<a
						onClick={handleOnHrefClick}
						href="/"
						className="vinisto-wine__variety underline-effect underline-effect--vinisto"
					>
						<Flag
							code={'us'}
							width={23}
							height={15}
							className="vinisto-flag vinisto-wine__variety__img me-2"
						/>
						<span className="vinisto-wine__variety__text underline-item">
							{get(item, 'brand', '')}
						</span>
					</a>
				</div>
				<p className="vinisto-wine__price">
					<span className="vinisto-wine__price__before">od</span>
					<span className="vinisto-wine__price__amount">
						{get(item, 'priceFrom', 0)}
					</span>{' '}
					<span className="vinisto-wine__price__currency">Kč</span>
				</p>
			</div>
		</div>
	);
};

export default SmallPresentationTile;
