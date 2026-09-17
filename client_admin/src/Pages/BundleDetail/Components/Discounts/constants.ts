export enum STATE {
	EXPIRED = 'EXPIRED',
	PLANNED = 'PLANNED',
	ONGOING = 'ONGOING',
}

export const stateLabel = {
	[STATE.EXPIRED]: 'bundleDetail.discounts.state.expired',
	[STATE.PLANNED]: 'bundleDetail.discounts.state.planned',
	[STATE.ONGOING]: 'bundleDetail.discounts.state.ongoing',
};
