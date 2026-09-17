import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useCallback, useMemo } from 'react';

import api from '@/api';
import {
	VinistoServicesApiServicesIntegrationListItemDto,
	VinistoServicesApiServicesIntegrationsReturn,
} from '@/api-types/services-api';
import { VinistoHelperDllBaseError } from '@/api-types/user-api';

interface IntegrationContextValue {
	integrations: VinistoServicesApiServicesIntegrationListItemDto[] | null;
	integrationsById: Record<
		PropertyKey,
		VinistoServicesApiServicesIntegrationListItemDto
	>;
	getIntegrationById: (
		id: number
	) => VinistoServicesApiServicesIntegrationListItemDto | null;
	isIntegrationsLoading: boolean;
	integrationsCount: number;
	intergationsError: VinistoHelperDllBaseError[] | null;
}

const defaultValue: IntegrationContextValue = {
	integrations: null,
	integrationsById: {},
	getIntegrationById: () => null,
	isIntegrationsLoading: false,
	integrationsCount: 0,
	intergationsError: null,
};

export const IntegrationContext = createContext(defaultValue);

const IntegrationProvider = ({ children }: { children: ReactNode }) => {
	const integrationsQuery = useQuery({
		queryKey: ['integrations'],
		queryFn: () =>
			api
				.get<VinistoServicesApiServicesIntegrationsReturn>(
					`services-api/integrations`,
					undefined,
					{ headers: { 'X-Api-Key': '' } }
				)
				.then((res) => res.integrations),
	});

	const integrationsById: Record<
		PropertyKey,
		VinistoServicesApiServicesIntegrationListItemDto
	> = useMemo(
		() =>
			Object.fromEntries(
				integrationsQuery.data?.map((platform) => [
					platform.integrationId,
					platform,
				]) ?? []
			),
		[integrationsQuery.data]
	);

	const getIntegrationById = useCallback(
		(id: number) => {
			return integrationsById[id];
		},
		[integrationsById]
	);

	const integrationServiceValues = useMemo(
		() => ({
			integrations: integrationsQuery.data ?? null,
			integrationsById,
			getIntegrationById,
			isIntegrationsLoading: false,
			integrationsCount: 0,
			intergationsError: null,
		}),
		[getIntegrationById, integrationsById, integrationsQuery.data]
	);

	return (
		<IntegrationContext.Provider value={integrationServiceValues}>
			{children}
		</IntegrationContext.Provider>
	);
};

export default IntegrationProvider;
