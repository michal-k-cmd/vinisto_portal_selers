import { FC } from 'react';
import EditUserPasswordModal from 'Components/Modal/Components/EditUserPassword';

import AddAllowedValueToSpecification from './Components/AddAllowedValueToSpecification';
import AddAlternativeBundleToBundleModal from './Components/AddAlternativeBundleToBundle';
import AddBundleToBlogArticleModal from './Components/AddBundleToBlogArticle';
import AddBundleToCategoryModal from './Components/AddBundleToCategory';
import AddBundleToCustomHomePageCarouselModal from './Components/AddBundleToCustomHomePageCarousel';
import AddBundleToRequestModal from './Components/AddBundleToRequest';
import AddCategoryToBundleModal from './Components/AddCategoryToBundle';
import AddCategoryToProductModal from './Components/AddCategoryToProduct';
import AddParentCategoryToCategoryModal from './Components/AddParentCategoryToCategoryModal';
import AddCountryToDeliveryModal from './Components/AddCountryToDelivery';
import AddCountryToPaymentModal from './Components/AddCountryToPayment';
import CouponLinkedOrdersListModal from './Components/CouponLinkedOrdersList';
import AddDiscountPriceToBundleModal from './Components/AddDiscountPriceToBundle';
import AddPaymentToDeliveryModal from './Components/AddPaymentToDelivery';
import AddPriceToBundleModal from './Components/AddPriceToBundle';
import AddVolumeDiscountToBundleModal from './Components/AddVolumeDiscountToBundle';
import AddPriceToDeliveryModal from './Components/AddPriceToDelivery';
import AddPriceToPaymentModal from './Components/AddPriceToPayment';
import AddPriceToProductModal from './Components/AddPriceToProduct';
import AddProductToBundleModal from './Components/AddProductToBundle';
import AddQuantityToWarehouseBundle from './Components/AddQuantityToWarehouseBundle';
import AddSpecificationToBundleModal from './Components/AddSpecificationToBundle';
import AddSpecificationToProductModal from './Components/AddSpecificationToProduct';
import AddSupplierToUserModal from './Components/AddSupplierToUser';
import AddTagToBundleModal from './Components/AddTagToBundle';
import AddTagToProductModal from './Components/AddTagToProduct';
import AddUserToSupplierModal from './Components/AddUserToSupplier';
import AddPostCodesModal from './Components/AddPostCodesModal';
import BannerModal from './Components/Banner';
import BlogArticleSpecificationModal from './Components/BlogArticleSpecification';
import CategoryModal from './Components/Category';
import CategorySpecificationModal from './Components/CategorySpecification';
import AddTagToCategoryModal from './Components/AddTagToCategory';
import ChangeHPCategorySequenceNumberModal from './Components/ChangeHPCategorySequenceNumber';
import CmsImageListModal from './Components/CmsImageList';
import CompleteReceiptModal from './Components/CompleteReceipt';
import ConfirmStockRequestForSupplierModal from './Components/ConfirmStockRequestForSupplier';
import CreateBundleModal from './Components/CreateBundle';
import CreateBundleSetModal from './Components/CreateBundleSet';
import AddBundleToSetModal from './Components/AddBundleToSet';
import CreateCustomHomePageCarouselModal from './Components/CreateCustomHomePageCarousel';
import CreateDeliveryModal from './Components/CreateDelivery';
import CreateDiscountCouponModal from './Components/CreateDiscountCoupon';
import CreateFeeRecordsModal from './Components/CreateFeeRecords';
import CreateFeeRecordsFromOrderModal from './Components/CreateFeeRecordsFromOrder';
import CreateHomePageCategoryModal from './Components/CreateHomePageCategory';
import CreateHomePageTagModal from './Components/CreateHomePageTag';
import CreatePaymentModal from './Components/CreatePayment';
import CreateProductModal from './Components/CreateProduct';
import CreateRequestModal from './Components/CreateRequest';
import CreateSpecificationModal from './Components/CreateSpecification';
import CreateSupplierModal from './Components/CreateSupplier';
import CreateSupplierAddressModal from './Components/CreateSupplierAddress';
import CreateUserModal from './Components/CreateUser';
import CreateUserAddressModal from './Components/CreateUserAddress';
import CreateUserBillingInfoModal from './Components/CreateUserBillingInfo';
import DiscountCouponAutoModal from './Components/DiscountCouponAuto';
import EditAllowedValueInSpecification from './Components/EditAllowedValueInSpecification';
import EditAllowedValueScore from './Components/EditAllowedValueScore';
import EditBannerValidityModal from './Components/EditBannerValidity';
import EditBundleModal from './Components/EditBundle';
import EditCustomHomePageCarouselModal from './Components/EditCustomHomePageCarousel';
import EditDeliveryModal from './Components/EditDelivery';
import EditPaymentModal from './Components/EditPayment';
import EditProductModal from './Components/EditProduct';
import EditSpecificationModal from './Components/EditSpecification';
import EditSpecificationTranslationModal from './Components/EditSpecificationTranslation';
import EditSpecificationInBundleModal from './Components/EditSpecificationInBundle';
import EditSpecificationInProductModal from './Components/EditSpecificationInProduct';
import EditSpecificationUnitsModal from './Components/EditSpecificationUnits';
import EditSupplierModal from './Components/EditSupplier';
import EditSupplierAddressModal from './Components/EditSupplierAddress';
import EditUserAddressModal from './Components/EditUserAddress';
import EditUserBillingInfoModal from './Components/EditUserBillingInfo';
import LoginModal from './Components/Login';
import OrderAddressModal from './Components/OrderAddress';
import PermissionList from './Components/PermissionList';
import RemoveBundleFromStockRequestModal from './Components/RemoveBundleFromStockRequest';
import RemoveQuantityFromWarehouseBundle from './Components/RemoveQuantityFromWarehouseBundle';
import SelectCMSImageModal from './Components/SelectCMSImage';
import Settings from './Components/Settings';
import StockRequestAddTransportModal from './Components/StockRequestAddTransport';
import UploadCMSImageModal from './Components/UploadCMSImage';
import UploadReceiptForClosedRequestModal from './Components/UploadReceiptForClosedRequest';
import UploadImageModal from './Components/UploadImage';
import UploadPaymentIconModal from './Components/UploadPaymentIcon';
import UploadSupplierBaseImageModal from './Components/UploadSupplierBaseImage';
import UploadSupplierCertificateModal from './Components/UploadSupplierCertificate';
import UploadSupplierLogoModal from './Components/UploadSupplierLogo';
import ConfirmBundleFlagsUpdateModal from './Components/ConfirmBundleFlagsUpdate';
import CmsBlogTagModal from './Components/CmsBlogTag';
import EditExchangeRateCoefficientModal from './Components/EditExchangeRateCoefficient';
import addAllowedCountryToBundle from './Components/AddAllowedCountryToBundle';
import AddSellerToCategoryModal from './Components/AddSellerToCategory';
import EditRegistrationCountryModal from './Components/EditRegistrationCountry';
import TagSpecificationModal from './Components/TagSpecification';
import BundleProvisionsModal from './Components/BundleProvisions';
import CreateEditAddon from './Components/CreateEditAddon';
import CreateEditDeliveryRuleModal from './Components/CreateEditDeliveryRuleModal';
import CreateEditVirtualCategory from './Components/CreateEditVirtualCategory';
import CreateEditVoucherModal from './Components/CreateEditVoucher';
import CreateB2bCustomer from './Components/CreateB2bCustomer';
import EditB2bContactInfo from './Components/EditB2bContactInfo';
import EditB2bBusinessInfo from './Components/EditB2bBusinessInfo';
import CreateEditMerchant from './Components/CreateEditMerchant';
import AddMerchantToCompany from './Components/AddMerchantToCompany';
import AddCompanyToMerchant from './Components/AddCompanyToMerchant';
import ApproveB2bBasket from './Components/ApproveB2bBasket';
import EditB2bCustomerCredit from './Components/EditB2bCustomerCredit';

export const LOGIN_MODAL = 'LOGIN_MODAL';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_ADDRESS = 'CREATE_USER_ADDRESS';
export const EDIT_USER_ADDRESS = 'EDIT_USER_ADDRESS';
export const CREATE_USER_BILLING_INFO = 'CREATE_USER_BILLING_INFO';
export const EDIT_USER_BILLING_INFO = 'EDIT_USER_BILLING_INFO';
export const EDIT_USER_REGISTRATION_COUNTRY = 'EDIT_USER_REGISTRATION_COUNTRY';
export const ADD_SUPPLIER_TO_USER = 'ADD_SUPPLIER_TO_USER';
export const EDIT_USER_PASSWORD = 'SET_USER_PASSWORD';
export const ADD_MERCHANT_TO_COMPANY = 'ADD_MERCHANT_TO_COMPANY';
export const ADD_COMPANY_TO_MERCHANT = 'ADD_COMPANY_TO_MERCHANT';
export const APPROVE_B2B_BASKET = 'APPROVE_B2B_BASKET';

export const CREATE_B2B_CUSTOMER = 'CREATE_B2B_CUSTOMER';
export const EDIT_B2B_CUSTOMER_CONTACT_INFO = 'EDIT_B2B_CUSTOMER_CONTACT_INFO';
export const EDIT_B2B_CUSTOMER_BUSINESS_INFO =
	'EDIT_B2B_CUSTOMER_BUSINESS_INFO';
export const EDIT_B2B_CUSTOMER_CREDIT = 'EDIT_B2B_CUSTOMER_CREDIT';
export const CREATE_MERCHANT = 'CREATE_MERCHANT';
export const EDIT_MERCHANT = 'EDIT_MERCHANT';

export const CATEGORY = 'CATEGORY';
export const CATEGORY_ADD_TRANSLATION = 'CATEGORY_ADD_TRANSLATION';
export const CATEGORY_EDIT_TRANSLATION = 'CATEGORY_EDIT_TRANSLATION';
export const ADD_IMAGE_TO_CATEGORY = 'ADD_IMAGE_TO_CATEGORY';
export const ADD_BUNDLE_TO_CATEGORY = 'ADD_BUNDLE_TO_CATEGORY';
export const ADD_SPECIFICATION_TO_CATEGORY = 'ADD_SPECIFICATION_TO_CATEGORY';
export const EDIT_SPECIFICATION_IN_CATEGORY = 'EDIT_SPECIFICATION_IN_CATEGORY';
export const ADD_SPECIFICATION_TO_TAG = 'ADD_SPECIFICATION_TO_TAG';
export const EDIT_SPECIFICATION_IN_TAG = 'EDIT_SPECIFICATION_IN_TAG';
export const ADD_TAG_TO_CATEGORY = 'ADD_TAG_TO_CATEGORY';
export const ADD_SELLER_TO_CATEGORY = 'ADD_SELLER_TO_CATEGORY';

export const CREATE_TAG = 'CREATE_TAG';
export const EDIT_TAG = 'EDIT_TAG';
export const ADD_TRANSLATION_TAG = 'ADD_TRANSLATION_TAG';

export const SETTINGS = 'SETTINGS';
export const PERMISSIONS = 'PERMISSIONS';
export const CREATE_HOMEPAGE_CATEGORY = 'CREATE_HOMEPAGE_CATEGORY';
export const CHANGE_HOMEPAGE_CATEGORY_SEQUENCE_NUMBER =
	'CHANGE_HOMEPAGE_CATEGORY_SEQUENCE_NUMBER';
export const CREATE_HOMEPAGE_CUSTOM_CAROUSEL =
	'CREATE_HOMEPAGE_CUSTOM_CAROUSEL';
export const EDIT_HOMEPAGE_CUSTOM_CAROUSEL = 'EDIT_HOMEPAGE_CUSTOM_CAROUSEL';
export const ADD_BUNDLE_TO_HOMEPAGE_CUSTOM_CAROUSEL =
	'ADD_BUNDLE_TO_HOMEPAGE_CUSTOM_CAROUSEL';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const ADD_CATEGORY_TO_PRODUCT = 'ADD_CATEGORY_TO_PRODUCT';
export const ADD_PRICE_TO_PRODUCT = 'ADD_PRICE_TO_PRODUCT';
export const ADD_HOME_PAGE_TAG = 'ADD_HOME_PAGE_TAG';
export const ADD_TAG_TO_PRODUCT = 'ADD_TAG_TO_PRODUCT';
export const ADD_SPECIFICATION_TO_PRODUCT = 'ADD_SPECIFICATION_TO_PRODUCT';
export const EDIT_SPECIFICATION_IN_PRODUCT = 'EDIT_SPECIFICATION_IN_PRODUCT';
export const ADD_IMAGE_TO_PRODUCT = 'ADD_IMAGE_TO_PRODUCT';

export const CREATE_BUNDLE = 'CREATE_BUNDLE';
export const CREATE_BUNDLE_SET = 'CREATE_BUNDLE_SET';
export const ADD_BUNDLE_TO_SET = 'ADD_BUNDLE_TO_SET';
export const EDIT_BUNDLE = 'EDIT_BUNDLE';
export const EDIT_BUNDLE_SET = 'EDIT_BUNDLE_SET';
export const ADD_CATEGORY_TO_BUNDLE = 'ADD_CATEGORY_TO_BUNDLE';
export const ADD_PARENT_CATEGORY_TO_CATEGORY =
	'ADD_PARENT_CATEGORY_TO_CATEGORY';
export const ADD_PRODUCT_TO_BUNDLE = 'ADD_PRODUCT_TO_BUNDLE';
export const ADD_ALTERNATIVE_BUNDLE_TO_BUNDLE =
	'ADD_ALTERNATIVE_BUNDLE_TO_BUNDLE';
export const ADD_PRODUCT_BUNDLE_TO_BUNDLE = 'ADD_PRODUCT_BUNDLE_TO_BUNDLE';
export const ADD_PRICE_TO_BUNDLE = 'ADD_PRICE_TO_BUNDLE';
export const ADD_DISCOUNT_PRICE_TO_BUNDLE = 'ADD_DISCOUNT_PRICE_TO_BUNDLE';
export const ADD_TAG_TO_BUNDLE = 'ADD_TAG_TO_BUNDLE';
export const ADD_SPECIFICATION_TO_BUNDLE = 'ADD_SPECIFICATION_TO_BUNDLE';
export const EDIT_SPECIFICATION_IN_BUNDLE = 'EDIT_SPECIFICATION_IN_BUNDLE';
export const ADD_IMAGE_TO_BUNDLE = 'ADD_IMAGE_TO_BUNDLE';
export const CONFIRM_BUNDLE_FLAGS_UPDATE = 'CONFIRM_BUNDLE_FLAGS_UPDATE';
export const ADD_VOLUME_DISCOUNT_TO_BUNDLE = 'ADD_VOLUME_DISCOUNT_TO_BUNDLE';
export const ADD_NOT_ALLOWED_COUNTRY_TO_BUNDLE =
	'ADD_NOT_ALLOWED_COUNTRY_TO_BUNDLE';

export const CREATE_DELIVERY = 'CREATE_DELIVERY';
export const EDIT_DELIVERY = 'EDIT_DELIVERY';
export const ADD_PRICE_TO_DELIVERY = 'ADD_PRICE_TO_DELIVERY';
export const ADD_COUNTRY_TO_DELIVERY = 'ADD_COUNTRY_TO_DELIVERY';
export const ADD_PAYMENT_TO_DELIVERY = 'ADD_PAYMENT_TO_DELIVERY';

export const CREATE_PAYMENT = 'CREATE_PAYMENT';
export const EDIT_PAYMENT = 'EDIT_PAYMENT';
export const ADD_PRICE_TO_PAYMENT = 'ADD_PRICE_TO_PAYMENT';
export const ADD_COUNTRY_TO_PAYMENT = 'ADD_COUNTRY_TO_PAYMENT';
export const UPLOAD_PAYMENT_ICON = 'UPLOAD_PAYMENT_ICON';

export const EDIT_EXCHANGE_RATE_COEFFICIENT = 'EDIT_EXCHANGE_RATE_COEFFICIENT';

export const CREATE_SUPPLIER = 'CREATE_SUPPLIER';
export const EDIT_SUPPLIER = 'EDIT_SUPPLIER';
export const ADD_USER_TO_SUPPLIER = 'ADD_USER_TO_SUPPLIER';
export const CREATE_SUPPLIER_ADDRESS = 'CREATE_SUPPLIER_ADDRESS';
export const EDIT_SUPPLIER_ADDRESS = 'EDIT_SUPPLIER_ADDRESS';
export const UPLOAD_SUPPLIER_LOGO = 'UPLOAD_SUPPLIER_LOGO';
export const UPLOAD_SUPPLIER_BASE_IMAGE = 'UPLOAD_SUPPLIER_BASE_IMAGE';
export const UPLOAD_SUPPLIER_CERTIFICATE = 'UPLOAD_SUPPLIER_CERTIFICATE';

export const CREATE_COUPON = 'CREATE_COUPON';
export const CREATE_VOUCHER = 'CREATE_VOUCHER';
export const DISCOUNT_COUPON_AUTO_CREATE = 'DISCOUNT_COUPON_AUTO_CREATE';
export const DISCOUNT_COUPON_AUTO_UPDATE = 'DISCOUNT_COUPON_AUTO_UPDATE';

export const CREATE_FEE_RECORDS = 'CREATE_FEE_RECORDS';
export const CREATE_FEE_RECORDS_FROM_ORDER = 'CREATE_FEE_RECORDS_FROM_ORDER';

export const CREATE_SPECIFICATION = 'CREATE_SPECIFICATION';
export const EDIT_SPECIFICATION = 'EDIT_SPECIFICATION';
export const EDIT_SPECIFICATION_TRANSLATION = 'EDIT_SPECIFICATION_TRANSLATION';
export const EDIT_SPECIFICATION_UNITS = 'EDIT_SPECIFICATION_UNITS';
export const ADD_SPECIFICATION_TRANSLATION = 'ADD_SPECIFICATION_TRANSLATION';
export const ADD_ALLOWED_VALUE_TO_SPECIFICATION =
	'ADD_ALLOWED_VALUES_TO_SPECIFICATION';
export const EDIT_ALLOWED_VALUE_IN_SPECIFICATION =
	'EDIT_ALLOWED_VALUES_IN_SPECIFICATION';
export const EDIT_ALLOWED_VALUE_SCORE = 'EDIT_ALLOWED_VALUES_SCORE';

export const ADD_QUANTITY_TO_WAREHOUSE_BUNDLE =
	'ADD_QUANTITY_TO_WAREHOUSE_BUNDLE';
export const REMOVE_QUANTITY_FROM_WAREHOUSE_BUNDLE =
	'REMOVE_QUANTITY_FROM_WAREHOUSE_BUNDLE';

export const COUPON_LINKED_ORDERS_LIST = 'COUPON_LINKED_ORDERS_LIST';

export const BANNER = 'BANNER';
export const EDIT_BANNER_VALIDITY = 'EDIT_BANNER_VALIDITY';
export const UPLOAD_CMS_IMAGE = 'UPLOAD_CMS_IMAGE';
export const SELECT_CMS_IMAGE = 'SELECT_CMS_IMAGE';
export const CMS_IMAGE_LIST = 'CMS_IMAGE_LIST';
export const CREATE_CMS_BLOG_TAG = 'CREATE_CMS_BLOG_TAG';
export const EDIT_CMS_BLOG_TAG = 'EDIT_CMS_BLOG_TAG';
export const ADD_TRANSLATION_CMS_BLOG_TAG = 'ADD_TRANSLATION_CMS_BLOG_TAG';

export const ORDER_ADDRESS = 'ORDER_ADDRESS';

export const COMPLETE_RECEIPT = 'COMPLETE_RECEIPT';
export const UPLOAD_RECEIPT_FOR_CLOSED_REQUEST =
	'UPLOAD_RECEIPT_FOR_CLOSED_REQUEST';
export const CREATE_REQUEST = 'CREATE_REQUEST';

export const ADD_BUNDLE_TO_REQUEST = 'ADD_BUNDLE_TO_REQUEST';
export const REMOVE_BUNDLE_FROM_STOCK_REQUEST =
	'REMOVE_BUNDLE_FROM_STOCK_REQUEST';
export const CONFIRM_STOCK_REQUEST_FOR_SUPPLIER =
	'CONFIRM_STOCK_REQUEST_FOR_SUPPLIER';
export const STOCK_REQUEST_ADD_TRANSPORT = 'STOCK_REQUEST_ADD_TRANSPORT';

export const ADD_SPECIFICATION_TO_BLOG_ARTICLE =
	'ADD_SPECIFICATION_TO_BLOG_ARTICLE';
export const EDIT_SPECIFICATION_IN_BLOG_ARTICLE =
	'EDIT_SPECIFICATION_IN_BLOG_ARTICLE';
export const ADD_BUNDLE_TO_BLOG_ARTICLE = 'ADD_BUNDLE_TO_SPECIFICATION';
export const ADD_POSTCODES = 'ADD_POSTCODES';

export const CREATE_LOGISTIC_RULE = 'CREATE_LOGISTIC_RULE';
export const CREATE_DYNAMIC_RULE = 'CREATE_DYNAMIC_RULE';

export const BUNDLE_PROVISIONS = 'BUNDLE_PROVISIONS';
export const CREATE_EDIT_ADDON = 'CREATE_EDIT_ADDON';
export const CREATE_EDIT_DELIVERY_RULE = 'CREATE_EDIT_DELIVERY_RULE';
export const CREATE_EDIT_RELATED_PRODUCT = 'CREATE_EDIT_RELATED_PRODUCT';

export const CREATE_EDIT_VIRTUAL_CATEGORY = 'CREATE_EDIT_VIRTUAL_CATEGORY';

export const MODAL_TITLE_COMPONENT: Record<string, [string, FC]> = {
	[ADD_POSTCODES]: ['admin.modal.addPostCodes.title', AddPostCodesModal],
	[ADD_BUNDLE_TO_REQUEST]: [
		'admin.modal.addBundleToRequest.title',
		AddBundleToRequestModal,
	],
	[CREATE_REQUEST]: ['admin.modal.createRequest.title', CreateRequestModal],
	[COMPLETE_RECEIPT]: [
		'admin.modal.completeReceipt.title',
		CompleteReceiptModal,
	],
	[UPLOAD_RECEIPT_FOR_CLOSED_REQUEST]: [
		'admin.modal.uploadReceiptForClosedRequest.title',
		UploadReceiptForClosedRequestModal,
	],
	[LOGIN_MODAL]: ['modal.logIn.modalTitle', LoginModal],
	[CREATE_USER]: ['admin.modal.createUser', CreateUserModal],
	[CREATE_USER_ADDRESS]: [
		'modal.userAddress.modalTitle',
		CreateUserAddressModal,
	],
	[EDIT_USER_ADDRESS]: [
		'modal.editUserAddress.modalTitle',
		EditUserAddressModal,
	],
	[CREATE_USER_BILLING_INFO]: [
		'admin.modal.createUserBillingInfo.modalTitle',
		CreateUserBillingInfoModal,
	],
	[EDIT_USER_BILLING_INFO]: [
		'admin.modal.editUserBillingInfo.modalTitle',
		EditUserBillingInfoModal,
	],
	[EDIT_USER_REGISTRATION_COUNTRY]: [
		'admin.modal.editUserRegistrationCountry.title',
		EditRegistrationCountryModal,
	],
	[ADD_SUPPLIER_TO_USER]: [
		'admin.detail.actionButtons.supplier.label',
		AddSupplierToUserModal,
	],
	[EDIT_USER_PASSWORD]: [
		'admin.modal.editUserPassword.title',
		EditUserPasswordModal,
	],
	[ADD_MERCHANT_TO_COMPANY]: [
		'admin.merchant.assign.label',
		AddMerchantToCompany,
	],
	[ADD_COMPANY_TO_MERCHANT]: [
		'admin.b2bCustomer.assign.label',
		AddCompanyToMerchant,
	],
	[CREATE_B2B_CUSTOMER]: ['admin.modal.createUser', CreateB2bCustomer],
	[EDIT_B2B_CUSTOMER_CONTACT_INFO]: [
		'admin.b2bCustomer.contactInfo.edit',
		EditB2bContactInfo,
	],
	[EDIT_B2B_CUSTOMER_BUSINESS_INFO]: [
		'admin.b2bCustomer.businessConditions.edit',
		EditB2bBusinessInfo,
	],
	[EDIT_B2B_CUSTOMER_CREDIT]: [
		'admin.b2bCustomer.increaseCredit.title',
		EditB2bCustomerCredit,
	],
	[CREATE_MERCHANT]: ['admin.merchant.new.title', CreateEditMerchant],
	[EDIT_MERCHANT]: ['admin.merchant.edit.title', CreateEditMerchant],
	[APPROVE_B2B_BASKET]: ['admin.basket.approve.title', ApproveB2bBasket],

	[SETTINGS]: ['admin.modal.settings', Settings],
	[PERMISSIONS]: ['admin.modal.permissions', PermissionList],

	[CATEGORY]: ['admin.modal.category.create.title', CategoryModal],
	[CATEGORY_ADD_TRANSLATION]: [
		'admin.modal.category.translation.add.title',
		CategoryModal,
	],
	[CATEGORY_EDIT_TRANSLATION]: [
		'admin.modal.category.translation.edit.title',
		CategoryModal,
	],
	[ADD_BUNDLE_TO_CATEGORY]: [
		'admin.modal.category.bundle.add.title',
		AddBundleToCategoryModal,
	],
	[ADD_SPECIFICATION_TO_CATEGORY]: [
		'admin.modal.category.specification.add.title',
		CategorySpecificationModal,
	],
	[EDIT_SPECIFICATION_IN_CATEGORY]: [
		'admin.modal.category.specification.edit.title',
		CategorySpecificationModal,
	],
	[ADD_SPECIFICATION_TO_TAG]: [
		'admin.modal.tag.specification.add.title',
		TagSpecificationModal,
	],
	[EDIT_SPECIFICATION_IN_TAG]: [
		'admin.modal.tag.specification.edit.title',
		TagSpecificationModal,
	],
	[ADD_TAG_TO_CATEGORY]: [
		'admin.modal.category.tag.add.title',
		AddTagToCategoryModal,
	],
	[ADD_SELLER_TO_CATEGORY]: [
		'admin.modal.category.seller.add.title',
		AddSellerToCategoryModal,
	],
	[CREATE_HOMEPAGE_CATEGORY]: [
		'admin.modal.createHomePageCategory.title',
		CreateHomePageCategoryModal,
	],
	[CHANGE_HOMEPAGE_CATEGORY_SEQUENCE_NUMBER]: [
		'admin.modal.changeHPCategorySequenceNumber.title',
		ChangeHPCategorySequenceNumberModal,
	],
	[CREATE_HOMEPAGE_CUSTOM_CAROUSEL]: [
		'admin.modal.createHomePageCustomCarousel',
		CreateCustomHomePageCarouselModal,
	],
	[EDIT_HOMEPAGE_CUSTOM_CAROUSEL]: [
		'admin.modal.editHomePageCustomCarousel',
		EditCustomHomePageCarouselModal,
	],
	[ADD_BUNDLE_TO_HOMEPAGE_CUSTOM_CAROUSEL]: [
		'admin.modal.addBundleToHomePageCustomCarousel',
		AddBundleToCustomHomePageCarouselModal,
	],
	[CREATE_PRODUCT]: ['admin.modal.createProduct.title', CreateProductModal],
	[EDIT_PRODUCT]: ['admin.modal.editProduct.title', EditProductModal],
	[ADD_CATEGORY_TO_PRODUCT]: [
		'admin.modal.addCategoryToProduct.title',
		AddCategoryToProductModal,
	],
	[ADD_PARENT_CATEGORY_TO_CATEGORY]: [
		'admin.modal.addParentCategoryToCategory.title',
		AddParentCategoryToCategoryModal,
	],
	[ADD_PRICE_TO_PRODUCT]: [
		'admin.modal.addPriceToProduct.title',
		AddPriceToProductModal,
	],
	[ADD_HOME_PAGE_TAG]: [
		'admin.modal.tagHomePageCreate.title',
		CreateHomePageTagModal,
	],
	[ADD_TAG_TO_PRODUCT]: [
		'admin.modal.addTagToProduct.title',
		AddTagToProductModal,
	],
	[ADD_SPECIFICATION_TO_PRODUCT]: [
		'admin.modal.addSpecificationToProduct.title',
		AddSpecificationToProductModal,
	],
	[EDIT_SPECIFICATION_IN_PRODUCT]: [
		'admin.modal.editSpecificationInProduct.title',
		EditSpecificationInProductModal,
	],
	[CREATE_BUNDLE]: ['admin.modal.createBundle.title', CreateBundleModal],
	[CREATE_BUNDLE_SET]: [
		'admin.modal.createBundleSet.title',
		CreateBundleSetModal,
	],
	[ADD_BUNDLE_TO_SET]: [
		'admin.modal.addBundleToSet.title',
		AddBundleToSetModal,
	],
	// NOTE: Shared modal components, different titles ↓↓
	[EDIT_BUNDLE]: ['admin.modal.editBundle.title', EditBundleModal],
	[EDIT_BUNDLE_SET]: ['admin.modal.editBundleSet.title', EditBundleModal],
	[ADD_CATEGORY_TO_BUNDLE]: [
		'admin.modal.addCategoryToBundle',
		AddCategoryToBundleModal,
	],
	[ADD_ALTERNATIVE_BUNDLE_TO_BUNDLE]: [
		'admin.modal.addAlternativeBundleToBundle',
		AddAlternativeBundleToBundleModal,
	],
	[ADD_PRODUCT_TO_BUNDLE]: [
		'admin.modal.addProductToBundle',
		AddProductToBundleModal,
	],
	[ADD_TAG_TO_BUNDLE]: ['admin.modal.addTagToBundle', AddTagToBundleModal],
	[ADD_PRICE_TO_BUNDLE]: [
		'admin.modal.addPriceToBundle',
		AddPriceToBundleModal,
	],
	[ADD_DISCOUNT_PRICE_TO_BUNDLE]: [
		'admin.modal.addDiscountPriceToBundle',
		AddDiscountPriceToBundleModal,
	],
	[ADD_SPECIFICATION_TO_BUNDLE]: [
		'admin.modal.addSpecificationToBundle',
		AddSpecificationToBundleModal,
	],
	[EDIT_SPECIFICATION_IN_BUNDLE]: [
		'admin.modal.editSpecificationInBundle',
		EditSpecificationInBundleModal,
	],
	[ADD_NOT_ALLOWED_COUNTRY_TO_BUNDLE]: [
		'admin.modal.addAllowedCountryToBundle',
		addAllowedCountryToBundle,
	],
	[CREATE_DELIVERY]: ['admin.modal.createDelivery', CreateDeliveryModal],
	[EDIT_DELIVERY]: ['admin.modal.editDelivery', EditDeliveryModal],
	[ADD_PRICE_TO_DELIVERY]: [
		'admin.modal.addPriceToDelivery',
		AddPriceToDeliveryModal,
	],
	[ADD_COUNTRY_TO_DELIVERY]: [
		'admin.modal.addCountryToDelivery',
		AddCountryToDeliveryModal,
	],
	[ADD_PAYMENT_TO_DELIVERY]: [
		'admin.modal.addPaymentToDelivery',
		AddPaymentToDeliveryModal,
	],
	[CREATE_COUPON]: ['admin.modal.createCoupon', CreateDiscountCouponModal],
	[CREATE_VOUCHER]: ['admin.modal.createVoucher', CreateEditVoucherModal],
	[CREATE_FEE_RECORDS]: ['admin.modal.createFeeRecords', CreateFeeRecordsModal],
	[CREATE_FEE_RECORDS_FROM_ORDER]: [
		'admin.modal.createFeeRecordsFromOrder',
		CreateFeeRecordsFromOrderModal,
	],
	[CREATE_SUPPLIER]: ['admin.modal.createSupplier.title', CreateSupplierModal],
	[EDIT_SUPPLIER]: ['admin.modal.editSupplier.title', EditSupplierModal],
	[ADD_USER_TO_SUPPLIER]: [
		'admin.modal.addUserToSupplier.title',
		AddUserToSupplierModal,
	],
	[CREATE_SUPPLIER_ADDRESS]: [
		'admin.modal.createSupplierAddress.title',
		CreateSupplierAddressModal,
	],
	[EDIT_SUPPLIER_ADDRESS]: [
		'admin.modal.editSupplierAddress.title',
		EditSupplierAddressModal,
	],
	[CREATE_PAYMENT]: ['admin.modal.createPayment', CreatePaymentModal],
	[EDIT_PAYMENT]: ['admin.modal.editPayment', EditPaymentModal],

	[EDIT_EXCHANGE_RATE_COEFFICIENT]: [
		'admin.exchangeRateList.changeCoefficient.label',
		EditExchangeRateCoefficientModal,
	],

	[ADD_PRICE_TO_PAYMENT]: [
		'admin.modal.addPriceToPayment',
		AddPriceToPaymentModal,
	],
	[ADD_COUNTRY_TO_PAYMENT]: [
		'admin.modal.addCountryToPayment',
		AddCountryToPaymentModal,
	],
	[CREATE_SPECIFICATION]: [
		'admin.modal.createSpecification',
		CreateSpecificationModal,
	],
	[EDIT_SPECIFICATION]: [
		'admin.modal.editSpecification',
		EditSpecificationModal,
	],
	[ADD_SPECIFICATION_TRANSLATION]: [
		'addTranslation',
		EditSpecificationTranslationModal,
	],
	[EDIT_SPECIFICATION_TRANSLATION]: [
		'editTranslation',
		EditSpecificationTranslationModal,
	],
	[EDIT_SPECIFICATION_UNITS]: [
		'admin.modal.editSpecificationUnits',
		EditSpecificationUnitsModal,
	],
	[ADD_ALLOWED_VALUE_TO_SPECIFICATION]: [
		'admin.modal.addAllowedValueToSpecification',
		AddAllowedValueToSpecification,
	],
	[EDIT_ALLOWED_VALUE_IN_SPECIFICATION]: [
		'admin.modal.editAllowedValueInSpecification',
		EditAllowedValueInSpecification,
	],
	[EDIT_ALLOWED_VALUE_SCORE]: [
		'admin.modal.editAllowedValueInSpecification',
		EditAllowedValueScore,
	],
	[EDIT_BANNER_VALIDITY]: [
		'admin.modal.editBannerValidity',
		EditBannerValidityModal,
	],
	[ADD_QUANTITY_TO_WAREHOUSE_BUNDLE]: [
		'admin.modal.addQuantityToWarehouseBundle.title',
		AddQuantityToWarehouseBundle,
	],
	[REMOVE_QUANTITY_FROM_WAREHOUSE_BUNDLE]: [
		'admin.modal.removeQuantityFromWarehouseBundle.title',
		RemoveQuantityFromWarehouseBundle,
	],
	[CONFIRM_BUNDLE_FLAGS_UPDATE]: [
		'admin.modal.confirmBundleFlagsUpdate.title',
		ConfirmBundleFlagsUpdateModal,
	],
	[ADD_IMAGE_TO_BUNDLE]: [
		'admin.modal.addImageToBundle.title',
		UploadImageModal,
	],
	[ADD_IMAGE_TO_PRODUCT]: [
		'admin.modal.addImageToProduct.title',
		UploadImageModal,
	],
	[ADD_IMAGE_TO_CATEGORY]: [
		'admin.modal.addImageToCategory.title',
		UploadImageModal,
	],
	[UPLOAD_SUPPLIER_LOGO]: [
		'admin.modal.uploadLogoToSupplier.title',
		UploadSupplierLogoModal,
	],
	[UPLOAD_SUPPLIER_BASE_IMAGE]: [
		'admin.modal.uploadBaseImageToSupplier.title',
		UploadSupplierBaseImageModal,
	],
	[UPLOAD_SUPPLIER_CERTIFICATE]: [
		'admin.modal.uploadCertificateToSupplier.title',
		UploadSupplierCertificateModal,
	],
	[COUPON_LINKED_ORDERS_LIST]: [
		'admin.modal.couponLinkedOrdersList.title',
		CouponLinkedOrdersListModal,
	],
	[BANNER]: ['admin.modal.banner.heading', BannerModal],
	[DISCOUNT_COUPON_AUTO_CREATE]: [
		'admin.modal.discountCouponAuto.create',
		DiscountCouponAutoModal,
	],
	[DISCOUNT_COUPON_AUTO_UPDATE]: [
		'admin.modal.discountCouponAuto.update',
		DiscountCouponAutoModal,
	],
	[UPLOAD_PAYMENT_ICON]: [
		'admin.modal.uploadLogoToSupplier.title',
		UploadPaymentIconModal,
	],
	[ORDER_ADDRESS]: ['admin.modal.orderAddress.title', OrderAddressModal],
	[UPLOAD_CMS_IMAGE]: ['admin.modal.uploadCMSImage.title', UploadCMSImageModal],
	[SELECT_CMS_IMAGE]: ['admin.modal.uploadCMSImage.title', SelectCMSImageModal],
	[REMOVE_BUNDLE_FROM_STOCK_REQUEST]: [
		'admin.modal.removeBundleFromStockRequest.title',
		RemoveBundleFromStockRequestModal,
	],
	[CONFIRM_STOCK_REQUEST_FOR_SUPPLIER]: [
		'admin.modal.confirmStockRequestForSupplier.title',
		ConfirmStockRequestForSupplierModal,
	],
	[STOCK_REQUEST_ADD_TRANSPORT]: [
		'admin.modal.stockRequestAddTransport.title',
		StockRequestAddTransportModal,
	],
	[CREATE_CMS_BLOG_TAG]: ['admin.modal.addCmsBlogTag.title', CmsBlogTagModal],
	[EDIT_CMS_BLOG_TAG]: ['admin.modal.editCmsBlogTag.title', CmsBlogTagModal],
	[ADD_TRANSLATION_CMS_BLOG_TAG]: [
		'admin.modal.addTranslationCmsBlogTag.title',
		CmsBlogTagModal,
	],
	[CMS_IMAGE_LIST]: ['admin.modal.cmsImageList.title', CmsImageListModal],
	[ADD_SPECIFICATION_TO_BLOG_ARTICLE]: [
		'admin.modal.cms.article.specification.add.title',
		BlogArticleSpecificationModal,
	],
	[EDIT_SPECIFICATION_IN_BLOG_ARTICLE]: [
		'admin.modal.cms.article.specification.edit.title',
		BlogArticleSpecificationModal,
	],
	[ADD_BUNDLE_TO_BLOG_ARTICLE]: [
		'admin.modal.cms.article.products.title',
		AddBundleToBlogArticleModal,
	],
	[ADD_VOLUME_DISCOUNT_TO_BUNDLE]: [
		'admin.modal.addVolumeDiscountToBundle',
		AddVolumeDiscountToBundleModal,
	],
	[BUNDLE_PROVISIONS]: ['admin.modal.bundleProvisions', BundleProvisionsModal],
	[CREATE_EDIT_ADDON]: ['admin.modal.createEditAddon.title', CreateEditAddon],
	[CREATE_EDIT_DELIVERY_RULE]: [
		'admin.modal.createEditDeliveryRule.title',
		CreateEditDeliveryRuleModal,
	],
	[CREATE_EDIT_VIRTUAL_CATEGORY]: [
		'admin.virtualCategory.title',
		CreateEditVirtualCategory,
	],
};
