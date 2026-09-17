import BundleItem from '.';

import { AbstractAdapter } from '../../../domain/abstract-adapter';
import {
  VinistoProductDllModelsApiBundleItemsBundleItem,
  VinistoProductDllModelsApiBundleItemsProductItem,
  VinistoCommonDllModelsApiPricesPrice,
} from '../../../api-types/product-api';
import { priceAdapter } from '../../../index';

class BundleItemAdapter extends AbstractAdapter<
  BundleItem,
  | (VinistoProductDllModelsApiBundleItemsBundleItem & {
      price?: VinistoCommonDllModelsApiPricesPrice | null;
    })
  | (VinistoProductDllModelsApiBundleItemsProductItem & {
      price?: VinistoCommonDllModelsApiPricesPrice | null;
    })
> {
  fromApi(
    apiData:
      | (VinistoProductDllModelsApiBundleItemsBundleItem & {
          price?: VinistoCommonDllModelsApiPricesPrice | null;
        })
      | (VinistoProductDllModelsApiBundleItemsProductItem & {
          price?: VinistoCommonDllModelsApiPricesPrice | null;
        })
  ): BundleItem {
    // @ts-expect-error If used by mistake on already mapped bundle productId would be here instead of itemId and it would break the app.
    const productId = apiData.itemId ?? apiData.productId;

    if (!productId) throw new Error('No productId in bundle item');

    const obj: BundleItem = {
      productId,
      amount: apiData.amount ?? 0,
      price: apiData.price ? priceAdapter.fromApi(apiData.price) : undefined,
    };

    if ('id' in apiData && apiData.id) {
      obj.id = apiData.id;
    }

    return obj;
  }
}

export default BundleItemAdapter;
