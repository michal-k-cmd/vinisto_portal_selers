import { useQuery } from '@tanstack/react-query';
import Detail from 'Components/Detail';
import { Spinner } from 'react-bootstrap';
import { apiServiceInstance } from 'Services/ApiService';
import { HttpError } from 'Services/ApiService/http';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import BundleNameLink from './BundleNameLink';
import styles from './styles.module.css';

import { BasketResponse, BasketType } from '@/api-types/basket-api';
import { VinistoHelperDllEnumsUserUserType } from '@/api-types/user-api';

interface UserBasketProps {
	userId: string;
	userType: VinistoHelperDllEnumsUserUserType;
}

const UserBasket = ({ userId, userType }: UserBasketProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const integrationApiKey =
		userType === VinistoHelperDllEnumsUserUserType.B2C
			? import.meta.env.VITE_INTEGRATIONS_API_KEY_B2C
			: import.meta.env.VITE_INTEGRATIONS_API_KEY_B2B;
	const basketQuery = useQuery({
		queryKey: ['user-primary-basket', userId, userType],
		queryFn: async () => {
			try {
				return await apiServiceInstance.get<BasketResponse[]>(
					`basket-api/Basket/user/${userId}`,
					true,
					undefined,
					undefined,
					{
						headers: { 'X-Api-Key': integrationApiKey },
					}
				);
			} catch (error) {
				if (error instanceof HttpError && error.status === 404) {
					return [];
				}
				throw error;
			}
		},
		select: (baskets) =>
			baskets.find((basket) => basket.type === BasketType.Primary),
	});

	if (basketQuery.isLoading) {
		return (
			<div className={styles.status}>
				<Spinner size="sm" />
			</div>
		);
	}

	if (basketQuery.isError) {
		return (
			<Detail.Container>
				{t({ id: 'admin.userDetail.basket.loadingError' })}
			</Detail.Container>
		);
	}

	const basket = basketQuery.data;

	if (!basket) {
		return (
			<Detail.Container>
				{t({ id: 'admin.userDetail.basket.empty' })}
			</Detail.Container>
		);
	}

	return (
		<Detail.Container>
			<Detail.Heading
				value={`${t({ id: 'admin.userDetail.basket.heading' })}`}
			/>
			<Detail.Columns>
				<Detail.InfoWithLabel
					label={t({ id: 'admin.userDetail.basket.id' })}
					value={basket.id}
				/>
				<Detail.InfoWithLabel
					label={t({ id: 'admin.userDetail.basket.currency' })}
					value={basket.currency}
				/>
				<Detail.InfoWithLabel
					label={t({ id: 'admin.userDetail.basket.total' })}
					value={`${getLocalizedPrice({
						price: basket.totalPriceWithVat ?? 0,
						currency: basket.currency ?? 'CZK',
						displayCurrency: false,
						decimalPlaces: 2,
					})} ${basket.currency ?? 'CZK'}`}
				/>
				<Detail.InfoWithLabel
					label={t({ id: 'admin.userDetail.basket.itemCount' })}
					value={(basket.items ?? []).reduce(
						(total, item) => total + (item.quantity ?? 0),
						0
					)}
				/>
			</Detail.Columns>

			<h6 className={styles.sectionHeading}>
				{t({ id: 'admin.userDetail.basket.items' })}
			</h6>
			{basket.items?.length ? (
				<div className="table-responsive">
					<table className="table table-sm align-middle">
						<thead>
							<tr>
								<th>{t({ id: 'admin.userDetail.basket.item' })}</th>
								<th>{t({ id: 'admin.userDetail.basket.quantity' })}</th>
								<th>{t({ id: 'admin.userDetail.basket.price' })}</th>
							</tr>
						</thead>
						<tbody>
							{basket.items.map((item) => (
								<tr key={item.itemId}>
									<td>
										{item.itemId ? (
											<BundleNameLink bundleId={item.itemId} />
										) : (
											'-'
										)}
									</td>
									<td>{item.quantity ?? 0}</td>
									<td>
										{getLocalizedPrice({
											price:
												item.discountPriceWithVat ?? item.priceWithVat ?? 0,
											currency: basket.currency ?? 'CZK',
											displayCurrency: false,
											decimalPlaces: 2,
										})}{' '}
										{basket.currency ?? 'CZK'}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div>{t({ id: 'admin.userDetail.basket.noItems' })}</div>
			)}
		</Detail.Container>
	);
};

export default UserBasket;
