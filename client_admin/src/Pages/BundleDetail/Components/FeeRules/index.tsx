import { LocalizationContext } from 'Services/LocalizationService';
import { useContext, useMemo, useState } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useQuery } from '@tanstack/react-query';
import {
	CCard,
	CCardBody,
	CCardTitle,
	CCol,
	CRow,
	CTable,
	CTableBody,
	CTableDataCell,
	CTableHead,
	CTableHeaderCell,
	CTableRow,
} from '@coreui/react';
import CountrySelector from 'vinisto_ui/src/components/country-selector';
import InfoBox from 'Components/InfoBox';
import { SPECIFICATION_ID_KIND, SPECIFICATION_ID_TYPE } from 'vinisto_shared';
import { IntegrationContext } from 'Services/IntegrationService';

import {
	formatCondition,
	formatFeeRulePriceRange,
	formatFeeRuleValidityRange,
	formatFees,
	formatLogisticFees,
	formatSpecificationCondition,
} from './helpers';

import {
	VinistoHelperDllEnumsCountryCode,
	VinistoProductDllModelsApiBundleBundle,
} from '@/api-types/product-api';
import api from '@/api';
import {
	SupplierApi,
	VinistoCommonDllModelsApiSpecificationsBaseSpecification,
	VinistoHelperDllEnumsFeeRuleFeeRuleState,
} from '@/api-types/supplier-api';

// Define a type for the individual fee rule item with enriched fields
export type EnrichedFeeRule = NonNullable<
	SupplierApi.AdminFeeRulesList.ResponseBody['feeRules']
>[number] & {
	specifications: ({
		allowedValues: string[];
		definitionId: string;
	} & VinistoCommonDllModelsApiSpecificationsBaseSpecification)[];
};

// Define the enriched response body type
type EnrichedResponseBody = Omit<
	SupplierApi.AdminFeeRulesList.ResponseBody,
	'feeRules'
> & {
	feeRules: EnrichedFeeRule[] | null | undefined;
};

const FeeRules = ({
	bundle,
}: {
	bundle: VinistoProductDllModelsApiBundleBundle;
}) => {
	const { getIntegrationById } = useContext(IntegrationContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const { vinistoUser, activeSupplierId } = useContext(AuthenticationContext);
	const UserLoginHash = vinistoUser?.loginHash;
	const bundleId = bundle?.id;

	const sourceCountry =
		bundle?.supplier?.countryCode ?? VinistoHelperDllEnumsCountryCode.CZ;

	const [targetCountry, setTargetCountry] =
		useState<VinistoHelperDllEnumsCountryCode>(
			VinistoHelperDllEnumsCountryCode.CZ
		);
	const [showHistory, setShowHistory] = useState(false);

	const { data: feeValues } = useQuery({
		queryKey: [
			'fee-rules',
			'supplier',
			activeSupplierId,
			'fee-rules',
			sourceCountry,
			targetCountry,
		],
		queryFn: async () => {
			const response = await api.get<
				SupplierApi.AdminFeeRulesSupplierFeeValuesList.ResponseBody,
				SupplierApi.AdminFeeRulesSupplierFeeValuesList.RequestQuery
			>(
				`supplier-api/admin/fee-rules/supplier/${activeSupplierId}/fee-values`,
				{
					UserLoginHash: vinistoUser?.loginHash ?? '',
					OriginCountry: sourceCountry,
					DestinationCountry: targetCountry,
				}
			);

			return response;
		},
	});

	const feeRulesQuery = useQuery(
		[
			'GetAppliedFeeRules',
			{ bundleId, sourceCountry, targetCountry, showHistory },
		],
		() =>
			api.get<EnrichedResponseBody>(
				`supplier-api/admin/fee-rules/${bundle?.id}/get-applied`,
				{
					bundleId,
					SourceCountry: sourceCountry,
					DestinationCountry: targetCountry,
					UserLoginHash,
					...(showHistory
						? {
								FeeRuleStates:
									VinistoHelperDllEnumsFeeRuleFeeRuleState.Inactive,
						  }
						: {}),
				}
			),
		{
			keepPreviousData: true,
		}
	);

	const defaultFeeRuleRow = useMemo(() => {
		return (
			<CTableRow>
				<CTableDataCell>{t({ id: 'commissions.defaultValue' })}</CTableDataCell>
				<CTableDataCell />
				<CTableDataCell />
				<CTableDataCell>{`${feeValues?.defaultSaleFeeValue ?? 0}% / ${
					feeValues?.defaultSaleFeeValueB2b ?? 0
				}%`}</CTableDataCell>
				<CTableDataCell>{`${feeValues?.defaultSaleFeeValue ?? 0}% / ${
					feeValues?.defaultSaleFeeValueB2b ?? 0
				}%`}</CTableDataCell>
				<CTableDataCell>{`${
					feeValues?.defaultLogisticFeeSupplierTransport ?? 0
				}% / ${
					feeValues?.defaultLogisticFeeSupplierTransport ?? 0
				}%`}</CTableDataCell>
				<CTableDataCell>{`${
					feeValues?.defaultLogisticFeeVinistoTransport ?? 0
				}% / ${
					feeValues?.defaultLogisticFeeVinistoTransport ?? 0
				}%`}</CTableDataCell>
			</CTableRow>
		);
	}, [feeValues, t]);

	return (
		<CRow>
			<CCol xs={12}>
				<CCard className="mb-4">
					<CCardBody>
						<div className="bundle-container">
							<div className="heading-row">
								<CCardTitle className="pb-2">
									{t({ id: 'commissionsList.heading' })}
								</CCardTitle>
							</div>
						</div>
						<div className="d-flex gap-3 align-items-center ps-2">
							<div className="d-flex gap-1 align-items-center">
								{t({ id: 'commissionsList.direction' })}:
								<InfoBox
									content={t({ id: 'commissionsList.heading.info' })}
									className="position-relative"
									style={{ top: '-0.5rem' }}
								/>
							</div>
							<CountrySelector
								sourceCountry={sourceCountry}
								targetCountry={targetCountry}
								setTargetCountry={setTargetCountry}
							/>
						</div>

						<CTable
							striped
							hover
							responsive
							className="table table-hover table-striped vinisto-admin-table"
						>
							<CTableHead>
								<CTableRow>
									<CTableHeaderCell className="vinisto-admin-table__header-cell">
										{t({ id: 'commissionsList.specifications' })}
									</CTableHeaderCell>
									<CTableHeaderCell className="vinisto-admin-table__header-cell">
										{t({ id: 'commissionsList.validityRange' })}
									</CTableHeaderCell>
									<CTableHeaderCell className="vinisto-admin-table__header-cell">
										{t({ id: 'commissionsList.priceRange' })}
									</CTableHeaderCell>
									<CTableHeaderCell className="vinisto-admin-table__header-cell">
										{t({ id: 'commissionsList.domesticProduction' })}
									</CTableHeaderCell>
									<CTableHeaderCell className="vinisto-admin-table__header-cell">
										{t({ id: 'commissionsList.foreignProduction' })}
									</CTableHeaderCell>
									<CTableHeaderCell className="vinisto-admin-table__header-cell">
										{t({ id: 'commissionsList.logisticsWarehouse' })}
									</CTableHeaderCell>
									<CTableHeaderCell className="vinisto-admin-table__header-cell">
										{t({ id: 'commissionsList.logisticVinisto' })}
									</CTableHeaderCell>
								</CTableRow>
							</CTableHead>
							<CTableBody>
								{feeRulesQuery.isFetched &&
								!feeRulesQuery.data?.feeRules?.length ? (
									<>
										<CTableRow key={'no-data'}>
											<CTableDataCell colSpan={7}>
												{t({ id: 'commissionsList.noData' })}
											</CTableDataCell>
										</CTableRow>
										{defaultFeeRuleRow}
									</>
								) : (
									feeRulesQuery.data?.feeRules?.map((feeRule) => (
										<CTableRow key={feeRule.id}>
											{}
											<CTableDataCell>
												{(() => {
													const type = formatSpecificationCondition(
														t,
														SPECIFICATION_ID_TYPE,
														feeRule
													);

													const kind = formatSpecificationCondition(
														t,
														SPECIFICATION_ID_KIND,
														feeRule
													);

													const categoryNames = formatCondition(
														t,
														'categoryNames',
														feeRule
													);

													const supplierNames = formatCondition(
														t,
														'supplierNames',
														feeRule
													);

													const bundleNames = formatCondition(
														t,
														'bundleNames',
														feeRule
													);

													const tagNames = formatCondition(
														t,
														'tagNames',
														feeRule
													);

													const conditions = [
														type,
														kind,
														categoryNames,
														supplierNames,
														bundleNames,
														tagNames,
													];

													return conditions
														.filter(
															(condition): condition is string =>
																condition !== null
														)
														.map((condition) => (
															<div key={`${feeRule.id}-${condition}`}>
																{condition}
															</div>
														));
												})()}
											</CTableDataCell>
											<CTableDataCell>
												{formatFeeRuleValidityRange(
													feeRule,
													`${t({ id: 'commissionsList.unlimited' })}`
												)}
											</CTableDataCell>
											<CTableDataCell>
												{formatFeeRulePriceRange(
													feeRule,
													`${t({ id: 'currency.CZK' })}`
												)}
											</CTableDataCell>
											<CTableDataCell>
												{formatFees(feeRule.originFees, getIntegrationById)}
											</CTableDataCell>
											<CTableDataCell>
												{'destinationFees' in feeRule &&
													formatFees(
														feeRule.destinationFees,
														getIntegrationById
													)}
											</CTableDataCell>
											<CTableDataCell>
												{formatLogisticFees(
													/**
													 * TODO: once types are regenerated, remove the comment
													 */
													// @ts-expect-errors - type regression
													feeRule.originFees?.supplierTransport,
													getIntegrationById
												)}
											</CTableDataCell>
											<CTableDataCell>
												{formatLogisticFees(
													/**
													 * TODO: once types are regenerated, remove the comment
													 */
													// @ts-expect-errors - type regression
													feeRule.originFees?.vinistoTransport,
													getIntegrationById
												)}
											</CTableDataCell>
										</CTableRow>
									))
								)}
							</CTableBody>
						</CTable>
						<button
							className="d-inline-block mt-2 text-decoration-underline ps-2 btn color-primary"
							onClick={(e) => {
								e.preventDefault();
								setShowHistory(!showHistory);
							}}
						>
							{t({
								id: showHistory
									? 'commissionsList.showActiveOnly'
									: 'commissionsList.showHistory',
							})}
						</button>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default FeeRules;
