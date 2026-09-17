import * as React from 'react';
import { get, map } from 'lodash-es';
import { CARD_TYPE } from 'Components/ProductBox/interfaces';
import ProductBox from 'Components/ProductBox';
import ProducerInfo from 'pages-spa/Home/Components/ProducerInfo';

import { IProducerCardProps } from './interfaces';

import './styles.css';

const ProducerCard: React.FC<IProducerCardProps> = (props): JSX.Element => {
	const isLoading = get(props, 'isLoading', false);

	return (
		<div className="vinisto-winery__wrap d-flex flex-md-nowrap flex-wrap">
			{
				<ProducerInfo
					data={get(props, 'data', {})}
					isLoading={isLoading}
				/>
			}

			{/* <Slider {...currentCarouselConfig} className="slider"> */}
			<div className="vinisto-winery__wine-wrap producers-wrap">
				{map(get(props, 'data.bundles'), (bundleData, index) => {
					return (
						<ProductBox
							key={get(bundleData, 'id', index) || 'pb' + index}
							bundleData={bundleData}
							cardType={CARD_TYPE.SINGLE}
							isLoading={isLoading}
						/>
					);
				})}
			</div>
			{/* </Slider> */}
		</div>
	);
};

export default ProducerCard;
