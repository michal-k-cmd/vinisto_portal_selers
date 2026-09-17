import { useQuery } from '@tanstack/react-query';
import { useCallback, useContext } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import {
	createEnumParam,
	NumberParam,
	StringParam,
	useQueryParams,
	withDefault,
} from 'Helpers/query-params';
import { CFormLabel, CFormSelect } from '@coreui/react';
import { LocalizationContext } from 'Services/LocalizationService';
import { Link } from 'react-router-dom';
import AdminPagination from 'Components/AdminPagination';
import AutocompleteB2bCustomer, {
	useAutocompleteCompanies,
} from 'Components/AutocompleteB2bCustomer';
import { Spinner } from 'react-bootstrap';

import B2bBasket from './B2bBasket';
import styles from './styles.module.css';
import B2bBasketContextProvider from './B2bBasket/context';

import { BasketApprovalState, BasketResponseB2B } from '@/api-types/basket-api';
import api, { BaseResponse } from '@/api';
import {
	VinistoHelperDllEnumsUserUserRights,
	VinistoHelperDllEnumsUserUserState,
} from '@/api-types/user-api';

const DEFAULT_ITEMS_PER_PAGE = 25;

export const USER_BASKETS_QUERY_KEY = 'getUserBaskets';

const B2bBasketList = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const {
		loginHash: userLoginHash,
		id: userId,
		permissions,
	} = useContext(AuthenticationContext).vinistoUser;

	const { setSearch, companiesQuery, isCompaniesQueryEnabled } =
		useAutocompleteCompanies({
			userLoginHash,
			SearchByUserState: VinistoHelperDllEnumsUserUserState.Active,
		});

	const canApproveBasketAsCSO = permissions.includes(
		VinistoHelperDllEnumsUserUserRights.USER_CSO
	);

	const [query, setQuery] = useQueryParams({
		CustomerId: StringParam,
		ApprovalState: withDefault(
			createEnumParam(Object.values(BasketApprovalState)),
			canApproveBasketAsCSO
				? BasketApprovalState.WAITING_FOR_DIRECTOR_APPROVAL
				: BasketApprovalState.WAITING_FOR_APPROVAL
		),
		page: withDefault(NumberParam, 1),
		itemsPerPage: withDefault(NumberParam, DEFAULT_ITEMS_PER_PAGE),
	});

	const basketsQuery = useQuery({
		queryKey: ['getUserBaskets', { userId, userLoginHash, ...query }],
		queryFn: () =>
			api.get<{ baskets: BasketResponseB2B[]; count: number } & BaseResponse>(
				`basket-api/Basket`,
				{
					UserLoginHash: userLoginHash,
					...(query.CustomerId && { CustomerId: query.CustomerId }),
					...(query.ApprovalState && { ApprovalState: query.ApprovalState }),
					Limit: query.itemsPerPage,
					Offset: query.page * query.itemsPerPage,
					IsSortingDescending: canApproveBasketAsCSO ? false : true,
				},
				{
					headers: {
						['X-Api-Key']: import.meta.env.VITE_INTEGRATIONS_API_KEY_B2B,
					},
				}
			),
		refetchOnMount: true,
	});

	const approvalStateOptions = Object.values(BasketApprovalState).map(
		(state) => ({
			value: state,
			label: `${t({ id: `admin.basket.approvalState.${state}` })}`,
		})
	);

	const totalPageCount = Math.ceil(
		(basketsQuery.data?.count ?? 0) / query.itemsPerPage
	);

	const handleOnSelectB2bCustomer = useCallback(
		(companies: { label: string; value: string }[]) => {
			if (!companies || !companies.length) return;
			const firstMatch = companies[0];
			setQuery((q) => ({
				...q,
				CustomerId: firstMatch.value,
			}));
		},
		[setQuery]
	);

	const handleB2bCustomerInputChange = useCallback(
		(query: string) => {
			if (!query.length) {
				setQuery((q) => ({
					...q,
					CustomerId: null,
				}));
			}
			setSearch(query);
		},
		[setQuery, setSearch]
	);

	return (
		<div>
			<div className="d-flex justify-content-end mx-2 mb-2">
				<Link
					to="/basket"
					className="btn btn-primary"
				>
					+ Nová objednávka
				</Link>
			</div>
			<div className={styles.basketList}>
				<div className="d-flex gap-1 align-items-center justify-content-between mb-2">
					<div className="flex-1 w-75">
						<CFormLabel className="form-label">Zákazník</CFormLabel>
						<AutocompleteB2bCustomer
							onChange={handleOnSelectB2bCustomer}
							onInputChange={handleB2bCustomerInputChange}
							data={companiesQuery.data ?? []}
							isLoading={isCompaniesQueryEnabled && companiesQuery.isLoading}
						/>
					</div>
					<div>
						<CFormLabel className="form-label">Stav objednávky</CFormLabel>
						<CFormSelect
							value={query.ApprovalState ?? ''}
							onChange={(e) =>
								setQuery((q) => ({
									...q,
									ApprovalState: e.target.value as BasketApprovalState,
								}))
							}
							options={approvalStateOptions}
						/>
					</div>
				</div>
				{basketsQuery.isLoading && (
					<div className="d-flex flex-1  h-100 align-items-center justify-content-center flex-column">
						<div className={styles.topHalf}>
							<Spinner size="sm" />
						</div>
					</div>
				)}
				{basketsQuery.isSuccess && !basketsQuery.data.baskets.length && (
					<div className="d-flex flex-1 h-100 flex-column align-items-center justify-content-center">
						<div className={styles.topHalf}>Nic nenalezeno</div>
					</div>
				)}
				{basketsQuery.data?.baskets?.map((basket) => (
					<B2bBasketContextProvider
						key={basket.id}
						basket={basket}
						refetchBaskets={basketsQuery.refetch}
					>
						<B2bBasket />
					</B2bBasketContextProvider>
				))}
			</div>
			<AdminPagination
				currentPage={query.page}
				pageCount={totalPageCount}
				itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
				onPageChange={(newPage) =>
					setQuery((prev) => ({ ...prev, page: newPage }))
				}
				onSizeChange={(newSize) =>
					setQuery((prev) => ({ ...prev, page: 1, itemsPerPage: newSize }))
				}
			/>
		</div>
	);
};

export default B2bBasketList;
