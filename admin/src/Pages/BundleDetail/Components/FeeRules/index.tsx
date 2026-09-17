import CountrySelector from 'Components/CountrySelector';
import { useContext, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	formatFeeRulePriceRange,
	formatFeeRuleValidityRange,
	formatFees,
	formatLogiscticFees,
} from 'Pages/SellingRules/helpers';
import Detail from 'Components/Detail';
import { TableSchema } from 'Hooks/useTableSchema/interfaces';
import { SPECIFICATION_ID_KIND, SPECIFICATION_ID_TYPE } from 'vinisto_shared';
import { IntegrationContext } from 'Services/IntergationService';

import { Bundle } from '@/domain/bundle';
import api from '@/api';
import {
	VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule,
	VinistoFeeSystemModelsFeeRuleLogisticFeeRule,
	VinistoFeeSystemModelsFeeRuleReturnFeeRulesReturn,
	VinistoFeeSystemModelsFeeRuleSaleFeeRule,
	VinistoHelperDllEnumsFeeRuleFeeRuleState,
} from '@/api-types/supplier-api';
import { VinistoHelperDllEnumsCountryCode } from '@/api-types/user-api';

const BundleDetailFeeRulesSection = ({
	bundle,
}: {
	bundle: Bundle | undefined;
}) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { loginHash: UserLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const { getIntegrationById } = useContext(IntegrationContext);

	const bundleId = bundle?.id;

	const sourceCountry =
		bundle?.supplier?.countryCode ?? VinistoHelperDllEnumsCountryCode.CZ;

	const [targetCountry, setTargetCountry] =
		useState<VinistoHelperDllEnumsCountryCode>(
			VinistoHelperDllEnumsCountryCode.CZ
		);
	const [showHistory, setShowHistory] = useState(false);

	const feeRulesQuery = useQuery(
		[
			'GetAppliedFeeRules',
			{ sourceCountry, targetCountry, showHistory, bundleId },
		],
		() =>
			api.get<VinistoFeeSystemModelsFeeRuleReturnFeeRulesReturn>(
				`supplier-api/admin/fee-rules/${bundleId}/get-applied`,
				{
					bundleId,
					SourceCountry: sourceCountry,
					DestinationCountry: targetCountry,
					UserLoginHash,
					...(showHistory && {
						FeeRuleStates: VinistoHelperDllEnumsFeeRuleFeeRuleState.Inactive,
					}),
				}
			),
		{
			refetchOnWindowFocus: true,
		}
	);

	const data: Array<
		| (VinistoFeeSystemModelsFeeRuleSaleFeeRule & { id: string })
		| (VinistoFeeSystemModelsFeeRuleLogisticFeeRule & { id: string })
		| (VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule & { id: string })
	> = useMemo(
		() =>
			feeRulesQuery.data?.feeRules?.filter(
				(
					rule
				): rule is
					| (VinistoFeeSystemModelsFeeRuleSaleFeeRule & { id: string })
					| (VinistoFeeSystemModelsFeeRuleLogisticFeeRule & { id: string })
					| (VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule & {
							id: string;
					  }) => rule.id != undefined
			) ?? [],
		[feeRulesQuery.data?.feeRules]
	);

	const SaleRuleListTableKeys = {
		name: 'name',
		specifications: {
			type: 'type',
		},
		originFees: 'originFees',
		destinationFees: 'destinationFees',
		validityRange: 'validityRange',
		priceRange: 'priceRange',
		vinistoTransport: 'vinistoTransport',
		supplierTransport: 'supplierTransport',
	};

	const tableSchema: TableSchema<(typeof data)[number]> = [
		{
			header: `${t({ id: 'saleRuleDetail.name' })}`,
			id: SaleRuleListTableKeys.name,
			cell: ({ row }) => ('name' in row.original && row.original.name) ?? '',
		},
		{
			enableColumnFilter: true,
			header: `${t({ id: 'saleRuleDetail.specifications.kindOrType' })}`,
			id: SaleRuleListTableKeys.specifications.type,
			cell: ({ row }) => {
				if (
					!('specifications' in row.original) ||
					!Array.isArray(row.original.specifications)
				)
					return null;
				const type = row.original.specifications?.find(
					(spec: any) => spec.definitionId === SPECIFICATION_ID_TYPE
				)?.allowedValues[0];

				const kind = row.original.specifications?.find(
					(spec: any) => spec.definitionId === SPECIFICATION_ID_KIND
				)?.allowedValues[0];

				if (!type && !kind) return '';
				return (
					<>
						{type}
						<br />
						{kind}
					</>
				);
			},
		},
		{
			header: `${t({ id: 'saleRuleDetail.validityRange' })}`,
			id: SaleRuleListTableKeys.validityRange,
			cell: ({ row }) => formatFeeRuleValidityRange(row.original),
		},
		{
			header: `${t({ id: 'saleRuleDetail.priceRange' })}`,
			id: SaleRuleListTableKeys.priceRange,
			cell: ({ row }) =>
				formatFeeRulePriceRange(row.original, `${t({ id: 'CZK' })}`),
		},
		{
			header: `${t({ id: 'saleRuleDetail.originFees' })}`,
			id: SaleRuleListTableKeys.originFees,
			cell: ({ row }) =>
				formatFees(row.original.originFees, getIntegrationById),
		},
		{
			header: `${t({ id: 'saleRuleDetail.destinationFees' })}`,
			id: SaleRuleListTableKeys.destinationFees,
			cell: ({ row }) =>
				'destinationFees' in row.original &&
				formatFees(row.original.destinationFees, getIntegrationById),
		},
		{
			header: `${t({ id: 'saleRuleDetail.vinistoTransport' })}`,
			id: SaleRuleListTableKeys.originFees,
			cell: ({ row }) =>
				row.original.originFees && 'vinistoTransport' in row.original.originFees
					? formatLogiscticFees(
							row.original.originFees?.vinistoTransport,
							getIntegrationById
					  )
					: null,
		},
		{
			header: `${t({ id: 'saleRuleDetail.supplierTransport' })}`,
			id: SaleRuleListTableKeys.originFees,
			cell: ({ row }) =>
				row.original.originFees &&
				'supplierTransport' in row.original.originFees
					? formatLogiscticFees(
							row.original.originFees?.supplierTransport,
							getIntegrationById
					  )
					: null,
		},
	];

	return (
		<div>
			<CountrySelector
				sourceCountry={sourceCountry}
				targetCountry={targetCountry}
				setTargetCountry={setTargetCountry}
			/>
			<Detail.DynamicTable
				data={data}
				columns={tableSchema}
			/>
			{/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
			<a
				className="d-inline-block mt-2"
				href="#"
				onClick={(e) => {
					e.preventDefault();
					setShowHistory(!showHistory);
				}}
			>
				{t({
					id: showHistory
						? 'saleRuleDetail.showActiveOnly'
						: 'saleRuleDetail.showHistory',
				})}
			</a>
		</div>
	);
};

export default BundleDetailFeeRulesSection;
