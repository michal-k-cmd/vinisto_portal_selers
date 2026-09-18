// Typy platformy vinisto — jen type-only re-exporty ze swagger typů
// v packages/vinisto-api-client/src/api-types (alias @api-types/* v tsconfig).
// Žádný runtime kód se odtud neimportuje, takže Next nic netranspiluje.

export type {
  VinistoProductDllModelsApiBundleBundle as Bundle,
  VinistoProductDllModelsApiBundleBundlesGetParameters as BundlesGetParameters,
  VinistoProductDllModelsApiBundleBundlesReturn as BundlesReturn,
} from "@api-types/product-api";

export type {
  VinistoHelperDllEnumsPriceLevel as PriceLevel,
  VinistoHelperDllEnumsCurrency as Currency,
} from "@api-types/product-api";
