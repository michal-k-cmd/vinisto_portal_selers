import BundleAdapter from './domain/bundle/adapter';
import PriceAdapter from './domain/price/adapter';
import TagAdapter from './domain/tag/adapter';
import ProductAdapter from './domain/product/adapter';
import ImageAdapter from './domain/image/adapter';
import SupplierAdapter from './domain/supplier/adapter';
import BundleItemAdapter from './domain/bundle/item/adapter';
import BundleEvaluationAdapter from './domain/bundle/evaluation/adapter';
import BundleOrderLimitationAdapter from './domain/bundle/order-limitation/adapter';
import SpecificationAdapter from './domain/specification/adapter';
import BundleSpecificationDetailsAdapter from './domain/bundle/specification-details/adapter';
import { GiftRuleAdapter } from './domain/gift-rule/adapter';
import { FavoriteAdapter } from './domain/favorite/adapter';
import OrderAdapter from './domain/order/adapter';
import { GiftAdapter, UxAdapter } from './domain/addons/adapter';
import UserAdapter from "./domain/user/adapter"

//TODO: refactor adapters as static
const bundleAdapter = new BundleAdapter();
const bundleSpecificationDetailAdapter =
	new BundleSpecificationDetailsAdapter();
const specificationAdapter = new SpecificationAdapter();
const priceAdapter = new PriceAdapter();
const bundleItemAdapter = new BundleItemAdapter();
const tagAdapter = new TagAdapter();
const productAdapter = new ProductAdapter();
const imageAdapter = new ImageAdapter();
const supplierAdapter = new SupplierAdapter();
const bundleEvaluationAdapter = new BundleEvaluationAdapter();
const orderLimitationAdapter = new BundleOrderLimitationAdapter();
const giftRuleAdapter = new GiftRuleAdapter();
const favoriteAdapter = new FavoriteAdapter();
const orderAdapter = new OrderAdapter();
const giftAdapter = new GiftAdapter();
const uxAdapter = new UxAdapter();
const userAdapter = new UserAdapter();

export {
	bundleAdapter,
	bundleSpecificationDetailAdapter,
	specificationAdapter,
	priceAdapter,
	bundleItemAdapter,
	tagAdapter,
	productAdapter,
	imageAdapter,
	supplierAdapter,
	bundleEvaluationAdapter,
	orderLimitationAdapter,
	giftRuleAdapter,
	favoriteAdapter,
	orderAdapter,
	giftAdapter,
	uxAdapter,
	userAdapter
};
