import * as React from 'react';
import Skeleton from 'react-loading-skeleton';
import { get } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';

import { IArticleInfoProps } from './interfaces';

import './styles.css';

const ProducerInfo: React.FC<IArticleInfoProps> = (data): JSX.Element => {
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const isLoading = get(data, 'isLoading', false);

	return (
		<div className="vinisto-articles__img vinisto-articles__img--left">
			{isLoading ? (
				<Skeleton
					height="250px"
					width="99.5%"
					style={{ margin: '.3% .25%' }}
				/>
			) : (
				<></>
			)}

			<div className="vinisto-articles__article py-2 custom-padding">
				<p className="h2 vinisto-card__heading mb-0">
					{isLoading ? <Skeleton width="40%" /> : get(data, 'data.name', '')}
				</p>
				<p className="vinistost-articles__text max-lines--3">
					{isLoading ? (
						<Skeleton count={2.8} />
					) : (
						`${get(data, 'data.text', '')} `
					)}
				</p>
				<div className="underline-effect underline-effect--vinisto text-end">
					<span className="vinisto-review-preview__continue underline-item">
						{isLoading ? (
							<Skeleton width="25%" />
						) : (
							t({ id: 'articleTabs.link.continueReading' })
						)}
					</span>
				</div>
			</div>
		</div>
	);
};

export default ProducerInfo;
