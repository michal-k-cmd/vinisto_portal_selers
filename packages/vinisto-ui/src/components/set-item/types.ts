import { ReactNode } from 'react';

import type Image from '../../../../vinisto-api-client/src/domain/image';
import { VinistoHelperDllEnumsCurrency } from '../../../../vinisto-api-client/src/api-types/product-api';

type SetItemTranslationKeys = 'seller' | 'more' | 'less';

type SetItemProps = {
	imageUrl: string;
	bundleImage?: Image;
	bundleName: string;
	basicInfo?: string;
	seller: string;
	canDisplayPrice: boolean;
	price: number;
	originalPrice: number | null;
	discountPercent?: ReactNode;
	bundleInfo?: string | ReactNode;
	params: ReactNode;
	translations: { [key in SetItemTranslationKeys]: string } & {
		currency: VinistoHelperDllEnumsCurrency;
	};
};

export type { SetItemProps };
