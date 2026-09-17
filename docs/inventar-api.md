# Inventář platformního API používaného portálem prodejce

Zdroj: `client_admin/` (stav k 17. 9. 2026). Slouží jako kontrolní seznam
při přenosu do `portal/` — každý endpoint se přenáší přesně včetně názvu
parametru s hashem (`UserLoginHash` vs `userLoginHash`) a jeho umístění
(query vs tělo).

Legenda: `[axios]` = `client_admin/src/Services/ApiService`,
`[fetch]` = `packages/vinisto-api-client/src/api.ts`.

## user-api

| Metoda | Cesta | Hash | Použití |
|---|---|---|---|
| PUT | `user-api/users/auth/Login` body `{email, password, hashType: "CLIENT"}` | — | login |
| PUT | `user-api/users/auth/Logout` body `{userLoginHash, hashType}` | tělo | logout |
| GET | `user-api/users/auth/GetAuthUserSupplier?UserLoginHash&hashType=CLIENT` | query | po loginu + revalidace každých 5 min; vrací `user.suppliers[]`, `permissions[]` |
| GET | `user-api/forgotten-password?email` | — | zapomenuté heslo |
| PUT | `user-api/users/{userId}` | tělo (IUserUpdateData) | změna e-mailu |
| PUT | `user-api/users/auth/ChangePassword` | tělo | změna hesla |
| PUT | `user-api/users/auth/login-by-external-app` | — | OAuth (nepřenáší se) |
| POST | `user-api/users` | — | registrace (nepoužito, používá se CreateSupplierAndUser) |

## supplier-api

| Metoda | Cesta | Hash | Použití |
|---|---|---|---|
| POST | `supplier-api/suppliers/CreateSupplierAndUser` | — | registrace prodejce |
| PUT | `supplier-api/suppliers/{supplierId}/UpdateSupplier` | tělo | nastavení (profil, fakturace, banka, dodání) |
| PUT | `supplier-api/suppliers/{supplierId}/address` | tělo | nastavení (kontakt) |
| GET | `supplier-api/admin/statistics/{supplierId}` | query `UserLoginHash` | sklad – přehled |
| GET | `supplier-api/admin/products/{supplierId}?Limit&Offset&SearchBundleName&SearchProductWarehouseId` | query | sklad – tabulka |
| GET | `supplier-api/admin/fee-rules/supplier/{supplierId}?OriginCountry&DestinationCountry` | query `UserLoginHash` | provize – seznam |
| GET | `supplier-api/admin/fee-rules/supplier/{supplierId}/fee-values?OriginCountry&DestinationCountry` | query `UserLoginHash` | dashboard, detail produktu, provize |
| GET | `supplier-api/admin/fee-rules/{bundleId}/get-applied?SourceCountry&DestinationCountry` | query `UserLoginHash` | detail produktu – aplikované provize |
| GET | `supplier-api/stocking-requests?Limit&Offset&IsSent&SearchSupplierId&SortingColumn&IsSortingDescending&Search*` | query `UserLoginHash` | naskladnění – seznam, dashboard |
| GET | `supplier-api/stocking-requests/{id}` | query `UserLoginHash` | naskladnění – detail |
| POST / PUT / DELETE | `supplier-api/stocking-requests[/{id}]` | tělo / query | vytvoření, úprava, smazání konceptu |
| PUT | `…/{id}/states/ConfirmStockingRequest` body `{userLoginHash, deliveryDate, deliveryTime…}` | tělo | potvrzení |
| PUT | `…/{id}/states/CancelStockingRequest` | tělo | zrušení |
| POST | `…/{id}/states/SendStockingRequestToSupplier` | tělo | odeslání |
| POST | `…/{id}/states/send-stocking-request-to-supplier-again` | tělo | opětovné odeslání |
| POST | `…/{id}/states/DeliveryOrderStockingRequest` | tělo | objednání svozu |
| PUT | `…/{id}/ModifyBundlesStockingRequest` | tělo | úprava položek |
| PUT | `…/{id}/UpdateStockingRequestWMS` | tělo | WMS |
| PUT multipart | `…/{id}/…` | tělo | přílohy |
| GET | `…/{id}/DownloadPdf?UserLoginHash` | query | PDF (dnes `window.open`) |

## product-api

| Metoda | Cesta | Hash | Použití |
|---|---|---|---|
| POST | `product-api/bundles/get-bundles` body `{limit, offset, isDeleted, isEnabled, hiddenSpecification, supplierIds:[id], filterPrices, sortingColumn, isSortingDescending, searchName, isSaleOver, isSet}` | tělo `userLoginHash` | seznam produktů, dashboard slevy, výběr do setu |
| GET | `product-api/bundles/{id}?priceLevels` | query | detail |
| GET | `product-api/bundles/GetAutocompleteNames?limit` | — | našeptávač |
| GET | `product-api/bundles/{bundleId}/get-identical-bundles` | query | modal slevy |
| POST | `product-api/bundles/get-available-filters` | tělo | filtry |
| POST | `product-api/bundles/get-bundles-categories` | tělo | kategorie k produktům |
| GET | `product-api/bundles/{bundleId}/GetPrices?userLoginHash&currency` | query (malé u) | ceny a slevy |
| POST | `product-api/bundles/{bundleId}/prices` | tělo | přidání ceny / VinistoPlus |
| DELETE | `product-api/bundles/{bundleId}/prices?Currency&PriceLevel&UserLoginHash` | query | smazání VinistoPlus ceny |
| POST | `product-api/bundles/{bundleId}/CreateDiscountPrice` | tělo | sleva |
| DELETE | `product-api/bundles/{bundleId}/DeleteDiscountPrice?UserLoginHash&Currency&DiscountId&PriceLevel&platformId` | query | smazání slevy |
| PUT | `product-api/bundles/{bundleId}/set-is-clearance-sale` body `{isClearanceSale, userLoginHash}` | tělo | výprodej |
| DELETE | `product-api/bundles/{bundleId}/categories/{bundleCategoryId}?userLoginHash` | query (malé u) | odebrání kategorie |
| GET | `product-api/bundles/get-supplier-sets?Limit&Offset&SupplierId&SortingColumn&IsSortingDescending&BundleStates` | query | sety – seznam |
| GET | `product-api/bundles/{bundleId}/get-set-bundle` | query | set – detail |
| POST | `product-api/bundles/CreateSupplierSetBundle` | tělo `userLoginHash` | set – vytvoření |
| PUT | `product-api/bundles/{id}/edit-supplier-set-bundle` | tělo `userLoginHash` | set – editace |
| PUT | `product-api/bundles/{bundleId}/bundle-supplier-set-change-state` body `{userLoginHash, bundleSupplierState}` | tělo | set – ke schválení |
| DELETE | `product-api/bundles/{bundleId}/delete-supplier-set?userLoginHash` | query (malé u) | set – smazání |
| GET | `product-api/categories?Limit` | — | kategorie |
| GET | `product-api/categories/GetCategoriesByIds?CategoryIds=…&CategoryIds=…` | — | názvy kategorií |

## order-api

| Metoda | Cesta | Hash | Použití |
|---|---|---|---|
| GET | `order-api/orders?Limit&Offset&SortingColumn&IsSortingDescending` | query `UserLoginHash` | objednávky (BE zatím neumí `SupplierId`) |
| GET | `order-api/orders/{id}` | query `UserLoginHash` | detail objednávky |
| GET | `order-api/billings?Limit&Offset&SupplierId&SortingColumn&IsSortingDescending` | query `UserLoginHash` | vyúčtování |
| GET | `order-api/billings/{id}` | query `UserLoginHash` | detail vyúčtování |
| GET | `order-api/billings/{id}/DownloadPdf?PdfType=BILLING\|INVOICE` | query `UserLoginHash` | PDF (nově přes server) |
| GET | `order-api/billings/{id}/GenerateXls` | query `UserLoginHash` | XLS (nově přes server) |
| GET | `order-api/dashboard-sale?SupplierId&TimeFrom&TimeTo` | query `UserLoginHash` | dashboard |
| GET | `order-api/discount-coupons?Limit&Offset&SearchSuppliers&SortingColumn&IsSortingDescending` | query `UserLoginHash` | kupóny |
| GET | `order-api/discount-coupons/{id}/GetDiscountCoupon` | query `UserLoginHash` | kupón – editace |
| POST | `order-api/discount-coupons/suppliers/{supplierId}` | tělo | kupón – vytvoření |
| PUT | `order-api/discount-coupons/{id}/EditDiscountCoupon` | tělo | kupón – uložení |
| PUT | `order-api/discount-coupons/{id}/activate` body `{userLoginHash}` | tělo | aktivace |
| DELETE | `order-api/discount-coupons/{id}?userLoginHash` | query (malé u) | smazání |

## warehouse-api

| Metoda | Cesta | Hash | Použití |
|---|---|---|---|
| GET | `warehouse-api/warehouse/bundles/GetWarehouseItemsQuantities?bundleIds=…&bundleIds=…` | — | skladové počty (produkty, detail, sety) |
| GET | `warehouse-api/change-log/supplier/{supplierId}?Limit&Offset&SortingColumn=CREATED_AT&IsSortingDescending` | query | log skladu |

## services-api

| Metoda | Cesta | Hash | Použití |
|---|---|---|---|
| GET | `services-api/ares/{ico}` (string s JSON, validace Zod) | — | registrace – IČO |
| GET | `services-api/exchange-rates` | — | kupóny – kurzy |
| GET | `services-api/integrations` (s prázdným `X-Api-Key`) | — | seznam platforem (`platformId`) |

## Auth model ve starém SPA (pro srovnání)

- Login → `loginHash` → `GetAuthUserSupplier` → `suppliers[]`; prázdné =
  odmítnutí (`USER_NO_SUPPLIERS_ERROR`).
- `VINISTO_AUTH` (celý user vč. hashe) a `ACTIVE_SUPPLIER` v localStorage.
- `AuthorizationService`: každých 5 min a při změně URL znovu
  `GetAuthUserSupplier`; chyba → `forceLogOut`.
- `permissions` se používají jen pro skrytí položek v menu.
- Aktivní prodejce = `getValidActiveSupplierId(uložené, suppliers)`:
  uložené id musí být v seznamu, jinak první.

## Externí integrace

- SupportBox chat (`App/chat-loader.ts`, chatId + secret hardcoded → ENV).
- Marketingové balíčky: `https://ads.vinisto.cz/vinisto-mkt/?prodejceId={supplierId}`.
- Manuály: `https://www.vinisto.cz/vinisto-prodejce`.
- Hosty: `https://prodejce.vinisto.dev/` (dev, testing), `https://prodejce.vinisto.cz/` (prod).
