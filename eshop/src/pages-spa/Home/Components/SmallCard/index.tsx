import * as React from 'react';

import { ISmallCardProps } from './interfaces';

const SmallCard: React.FC<ISmallCardProps> = () => {
	return (
		<div className="col-md-2 col-sm-4 col-6">
			<h4 className="text-center">Claim </h4>
			<p className="max-lines--3">
				Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
				Lorem ipsum Lorem ipsum
			</p>
		</div>
	);
};

export default SmallCard;
