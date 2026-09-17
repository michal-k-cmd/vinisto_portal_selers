import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from 'Services/ApiService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import { FiPackage } from 'react-icons/fi';
import { BiLink } from 'react-icons/bi';
import './styles.css';
import { get } from 'Helpers/lodash';

import { VinistoProductDllModelsApiProductProduct } from '@/api-types/product-api';

const AssociatedBundlesList = ({
	productId,
}: {
	productId: string | undefined;
}) => {
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);
	const localizationContext = useContext(LocalizationContext);
	const [bundlesList, setBundlesList] = useState<
		VinistoProductDllModelsApiProductProduct[]
	>([]);
	const [loaded, setLoaded] = useState(false);

	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();
	const navigate = useNavigate();

	const handleOnClickRedirect = (bundleId: string) => () => {
		navigate(`/bundle-detail/${bundleId}`);
	};

	useEffect(() => {
		const apiService = new ApiService();
		const loginHash = authenticationContext?.vinistoUser?.loginHash ?? '';
		apiService
			.get(`product-api/bundles/by-product/${productId}`, true, undefined, [
				{ key: 'userLoginHash', value: loginHash },
			])
			.then((payload: Record<any, any>) => {
				setBundlesList(get(payload, 'bundles', []));
				setLoaded(true);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.bundleDetail.associatedBundles.load.error'
				);
			});
	}, [
		authenticationContext?.vinistoUser?.loginHash,
		productId,
		notificationsContext,
	]);

	return (
		<div className="product-detail-category-list">
			<div className="detail-category-list-title">
				{t({ id: 'admin.bundleDetail.associatedBundles' })}
			</div>
			{loaded &&
				bundlesList?.map((bundle, i) => (
					<div
						key={`product-category-${i}`}
						className="product-category"
					>
						<FiPackage className="product-category-icon" />
						<div className="product-category-label">
							{getLocalizedValue(bundle?.name ?? [])}
						</div>
						<BiLink
							onClick={handleOnClickRedirect(bundle.id)}
							className="product-category-icon pointer"
						/>
					</div>
				))}
		</div>
	);
};

export default AssociatedBundlesList;
