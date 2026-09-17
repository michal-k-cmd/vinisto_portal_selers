import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { MdCheckCircle, MdOutlineError } from 'react-icons/md';
import { FaQuestionCircle } from 'react-icons/fa';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { Link } from 'react-router-dom';
import { LocalizationContext } from 'Services/LocalizationService';

import api from '@/api';
import { VinistoHelperDllEnumsFeeRuleFeeRuleType } from '@/api-types/order-api';
import {
	VinistoHelperDllBaseBoolReturn,
	VinistoHelperDllEnumsCountryCode,
} from '@/api-types/user-api';

interface FeeRulesHealthCheckProps {
	type: VinistoHelperDllEnumsFeeRuleFeeRuleType;
	originCountry: VinistoHelperDllEnumsCountryCode;
	destinationCountry: VinistoHelperDllEnumsCountryCode;
}

const FeeRulesHealthCheck = ({
	type,
	originCountry,
	destinationCountry,
}: FeeRulesHealthCheckProps) => {
	const { loginHash: UserLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const notificationsContext = useContext(NotificationsContext);
	const t = useContext(LocalizationContext).useFormatMessage();

	const requestParams = {
		UserLoginHash,
		Type: type,
		OriginCountry: originCountry,
		DestinationCountry: destinationCountry,
	};

	const bundlesValidityQuery = useQuery({
		queryKey: ['check-bundles-validity', requestParams],
		queryFn: () =>
			api
				.get<VinistoHelperDllBaseBoolReturn>(
					`supplier-api/admin/fee-rules/check-bundles-validity`,
					requestParams
				)
				.then((res) => !!res.result)
				.catch((e) => {
					if (!Number.isNaN(Number(e.message))) return Number(e.message);
					notificationsContext.handleShowErrorNotification(e.message);
					return false;
				}),
	});

	if (bundlesValidityQuery.isLoading) {
		return (
			<div className="d-flex align-items-center mb-3 gap-2">
				<FaQuestionCircle
					fill="rgb(var(--vinisto-color-dark-gray))"
					style={{ width: '1.25rem', height: '1.25rem' }}
				/>
				<span>Načítání…</span>
			</div>
		);
	}

	return (
		<div className="d-flex align-items-center mb-3 gap-2">
			{typeof bundlesValidityQuery.data === 'number' ? (
				<>
					<MdOutlineError
						fill="rgb(var(--vinisto-color-red))"
						style={{ width: '1.25rem', height: '1.25rem' }}
					/>
					<span>
						{t(
							{ id: 'feeRule.controlPanel.state.warning' },
							{
								linkWithCount: (
									<Link
										to={`/bundles-without-selling-rules?${new URLSearchParams({
											Type: requestParams.Type,
											OriginCountry: requestParams.OriginCountry,
											DestinationCountry: requestParams.DestinationCountry,
										}).toString()}`}
									>
										{t(
											{ id: 'feeRule.controlPanel.state.linkWithCount' },
											{ count: bundlesValidityQuery.data }
										)}
									</Link>
								),
							}
						)}
					</span>
				</>
			) : (
				<>
					<MdCheckCircle
						fill="rgb(var(--vinisto-color-green))"
						style={{ width: '1.25rem', height: '1.25rem' }}
					/>
					<span>{t({ id: 'feeRule.controlPanel.state.ok' })}</span>
				</>
			)}
		</div>
	);
};

export default FeeRulesHealthCheck;
