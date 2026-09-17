import { useQuery } from '@tanstack/react-query';
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
} from 'react';
import { StorageContext } from 'Services/StorageService/context';

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
	const StorageService = useContext(StorageContext).StorageService;

	const storedIntegrations = StorageService.getStorageItem('INTEGRATIONS');

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
		//initialData:
		//	storedIntegrationValues as VinistoServicesApiServicesIntegrationsReturn['integrations'],
	});

	useEffect(() => {
		if (integrationsQuery.data) {
			StorageService.setItem('INTEGRATIONS', integrationsQuery.data);
		}
		// Its unclear if StorageService is properly memoized
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [integrationsQuery.data]);

	const integrationsData = useMemo(
		() =>
			integrationsQuery.data?.length
				? integrationsQuery.data
				: (storedIntegrations as VinistoServicesApiServicesIntegrationsReturn['integrations']),
		// storedIntegrations are most likely unstable
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[integrationsQuery.data]
	);

	const integrationsById: Record<
		PropertyKey,
		VinistoServicesApiServicesIntegrationListItemDto
	> = useMemo(
		() =>
			Object.fromEntries(
				integrationsData?.map((platform) => [
					platform.integrationId,
					platform,
				]) ?? []
			),
		[integrationsData]
	);

	const getIntegrationById = useCallback(
		(id: number) => {
			return integrationsById[id];
		},
		[integrationsById]
	);

	const integrationServiceValues = useMemo(
		() => ({
			integrations: integrationsData ?? null,
			integrationsById,
			getIntegrationById,
			isIntegrationsLoading: false,
			integrationsCount: 0,
			intergationsError: null,
		}),
		[getIntegrationById, integrationsById, integrationsData]
	);

	return (
		<IntegrationContext.Provider value={integrationServiceValues}>
			{children}
		</IntegrationContext.Provider>
	);
};

export default IntegrationProvider;
