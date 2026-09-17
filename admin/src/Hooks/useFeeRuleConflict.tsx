import { Modal } from 'Components/Modal';
import { useContext, useState } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useQuery } from '@tanstack/react-query';
import {
	SPECIFICATION_ID_KIND,
	SPECIFICATION_ID_TYPE,
} from 'vinisto_shared/src/system-constants';
import { formatFeeRuleValidityRange } from 'Pages/SellingRules/helpers';

import {
	SupplierApi,
	VinistoCommonDllModelsApiSpecificationsBaseSpecification,
} from '@/api-types/supplier-api';
import api from '@/api';

interface UseFeeRuleCollisionProps {
	onClickSaveAsConcept: () => Promise<void>;
}

type EnrichedResponseBody = SupplierApi.AdminFeeRulesDetail.ResponseBody & {
	feeRule: SupplierApi.AdminFeeRulesDetail.ResponseBody['feeRule'] & {
		specifications: ({
			allowedValues: string[];
			definitionId: string;
		} & VinistoCommonDllModelsApiSpecificationsBaseSpecification)[];
	};
};

export const useFeeRuleConflict = ({
	onClickSaveAsConcept,
}: UseFeeRuleCollisionProps): {
	modal: React.ReactNode;
	setConflictingId: (message: string) => void;
} => {
	const { loginHash } = useContext(AuthenticationContext).vinistoUser;
	const [conflictingId, setConflictingId] = useState<string | null>();
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const { data } = useQuery({
		queryKey: ['fee-rule-detail', conflictingId],
		queryFn: async () => {
			const response = await api.get<
				EnrichedResponseBody,
				SupplierApi.AdminFeeRulesDetail.RequestQuery
			>(`supplier-api/admin/fee-rules/${conflictingId}`, {
				UserLoginHash: loginHash,
			});

			const typeSpec = response.feeRule?.specifications?.find(
				(spec) => spec.definitionId === SPECIFICATION_ID_TYPE
			);
			const kindSpec = response.feeRule?.specifications?.find(
				(spec) => spec.definitionId === SPECIFICATION_ID_KIND
			);

			const enrichedFeeRule = {
				...response.feeRule,
				typeValue: typeSpec?.allowedValues?.[0] || '',
				kindValue: kindSpec?.allowedValues?.[0] || '',
			};

			return enrichedFeeRule;
		},
		enabled: !!conflictingId,
	});

	return {
		setConflictingId,
		modal: (
			<Modal
				title={`${t({ id: 'feeRule.confirm' })}`}
				show={!!conflictingId}
				handleClose={() => setConflictingId('')}
			>
				<p>{t({ id: 'feeRule.conflict.text' })}</p>
				{data && 'name' in data && (
					<p>
						<strong>{t({ id: 'saleRuleDetail.name' })}:</strong> {data.name}
					</p>
				)}
				{data && 'typeValue' in data && data.typeValue !== '' && (
					<p>
						<strong>{t({ id: 'saleRuleDetail.specifications.type' })}:</strong>{' '}
						{data?.typeValue}
					</p>
				)}
				{data && 'kindValue' in data && data.kindValue !== '' && (
					<p>
						<strong>{t({ id: 'saleRuleDetail.specifications.kind' })}:</strong>{' '}
						{data?.kindValue}
					</p>
				)}
				<p>
					<strong>{t({ id: 'saleRuleDetail.validityRange' })}:</strong>{' '}
					{data && formatFeeRuleValidityRange(data)}
				</p>
				<div className="d-flex gap-2 justify-content-end">
					<button
						className="btn btn-primary"
						onClick={async () => {
							await onClickSaveAsConcept();
							setConflictingId('');
						}}
					>
						{t({ id: 'feeRule.saveAsConcept' })}
					</button>
					<button
						className="btn btn-primary"
						onClick={() => setConflictingId('')}
					>
						{t({ id: 'feeRule.leave' })}
					</button>
				</div>
			</Modal>
		),
	};
};
