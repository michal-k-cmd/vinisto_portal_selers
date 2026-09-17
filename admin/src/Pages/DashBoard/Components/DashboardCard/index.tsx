import * as React from 'react';
import { forEach, get, isEmpty } from 'Helpers/lodash';
import { Link } from 'react-router-dom';
import { CCard, CCardBody, CCol } from '@coreui/react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { IQueryArgument } from 'Services/ApiService/interfaces';
import { ModalContext } from 'Components/Modal/context';
import ContentPreloader from 'Components/ContentPreloader';
import ApiService from 'Services/ApiService';

import './styles.css';

const DashBoardCard: React.FC<Record<any, any>> = (props): JSX.Element => {
	const apiService = React.useMemo(() => new ApiService(), []);
	const chart = get(props, 'chart', {});
	const authenticationContext = React.useContext(AuthenticationContext);
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const [dashboardCardState, setDashboardCardState] = React.useState<
		Record<any, any>
	>({
		loading: false,
		loaded: false,
		data: {},
	});
	const modalContext = React.useContext(ModalContext);
	React.useEffect(() => {
		if (
			!get(dashboardCardState, 'loading', false) &&
			!get(dashboardCardState, 'loaded', false)
		) {
			setDashboardCardState({
				loading: true,
				loaded: false,
				data: {},
			});
			if (isEmpty(chart) || !authenticationContext.vinistoUser.loginHash) {
				setDashboardCardState({
					loading: false,
					loaded: true,
					data: {},
				});
			} else {
				const promises = [] as any[];
				forEach(
					get(chart, 'endpoints', []),
					(chartEndpoint: Record<any, any>) => {
						const promise = new Promise((resolve, reject) => {
							const query: IQueryArgument[] = [];
							let requestData = {} as Record<any, any>;
							if (!get(chartEndpoint, 'method', null)) {
								query.push({ key: 'limit', value: 1 });
								query.push({ key: 'offset', value: 0 });
							}
							if (get(chartEndpoint, 'secured', false)) {
								query.push({
									key: 'UserLoginHash',
									value: `${authenticationContext.vinistoUser.loginHash}`,
								});
							}

							if (
								get(chartEndpoint, 'customQueryArguments', false) &&
								!get(chartEndpoint, 'method', null)
							) {
								forEach(
									get(chartEndpoint, 'customQueryArguments', []),
									(customQueryArgument: IQueryArgument) => {
										query.push(customQueryArgument);
									}
								);
							}
							if (
								get(chartEndpoint, 'customQueryArguments', false) &&
								!!get(chartEndpoint, 'method', null)
							) {
								requestData = get(chartEndpoint, 'customQueryArguments', {});
							}
							if (get(chartEndpoint, 'method', null)) {
								return apiService
									.post(get(chartEndpoint, 'url', ''), requestData, true)
									.then((reasponse: Record<any, any>) => {
										return resolve({
											...chartEndpoint,
											count: get(reasponse, 'count', 0),
										});
									})
									.catch((error: Error) => {
										return reject(error);
									});
							}
							return apiService
								.getCollection(get(chartEndpoint, 'url', ''), query, true)
								.then((reasponse: Record<any, any>) => {
									return resolve({
										...chartEndpoint,
										count: get(reasponse, 'count', 0),
									});
								})
								.catch((error: Error) => {
									return reject(error);
								});
						});
						promises.push(promise);
					}
				);
				Promise.all(promises)
					.then((results: Record<any, any>[]) => {
						const labels = [] as string[];
						const backgroundColors = [] as string[];
						const borderColors = [] as string[];
						const datas = [] as number[];
						forEach(results, (result: Record<any, any>) => {
							const handler = get(result, 'handler', null);
							if (handler) {
								datas.push(handler(result, results));
							} else {
								datas.push(get(result, 'count', 0));
							}
							labels.push(`${t({ id: get(result, 'label', '') })}`);
							backgroundColors.push(get(result, 'backgroundColor', ''));
							borderColors.push(get(result, 'borderColor', ''));
						});
						const chartData: Record<any, any> = {
							labels,
							datasets: [
								{
									label: `${t({ id: get(chart, 'mainLabel', '') })}`,
									data: datas,
									backgroundColor: backgroundColors,
									borderColor: borderColors,
									borderWidth: 2,
								},
							],
						};
						setDashboardCardState({
							loading: false,
							loaded: true,
							data: chartData,
						});
					})
					.catch(() => {
						setDashboardCardState({
							loading: false,
							loaded: true,
							data: {},
						});
					});
			}
		}
	}, [dashboardCardState, authenticationContext.vinistoUser]);

	const route = get(props, 'route', '');
	const action = get(props, 'action', '');

	const handleOpenModal = React.useCallback(() => {
		modalContext.handleOpenModal(action);
	}, [modalContext, action]);

	const cardContent = (
		<CCard
			className="dashboard-card"
			id={`${get(props, 'id')}`}
		>
			<CCardBody>
				<div
					style={{
						maxHeight: `220px`,
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					<div
						style={{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<span className="dashboard-card__category">
							{get(props, 'category', '')}
						</span>
						{get(props, 'label', '')}
					</div>
					<div
						style={{
							maxWidth: `220px`,
							maxHeight: `220px`,
							display: 'flex',
							flexDirection: 'row',
							position: 'relative',
						}}
					>
						{get(dashboardCardState, 'loading', false) && (
							<ContentPreloader color="white" />
						)}
					</div>
				</div>
			</CCardBody>
		</CCard>
	);

	return (
		<CCol
			xs={12}
			md={6}
			className="mb-4"
		>
			{action && <div onClick={handleOpenModal}>{cardContent}</div>}
			{!action && route && (
				<Link
					to={route}
					className="dashboard-link"
				>
					{cardContent}
				</Link>
			)}
			{!action && !route && cardContent}
		</CCol>
	);
};

export default DashBoardCard;
