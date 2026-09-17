import {
	B2B_NUMERIC_CODE,
	B2C_NUMERIC_CODE,
	VICOM_NUMERIC_CODE,
} from './constants';

export const isB2c = (platformId: number) => platformId === B2C_NUMERIC_CODE;
export const isB2b = (platformId: number) => platformId === B2B_NUMERIC_CODE;
export const isVicom = (platformId: number) =>
	platformId === VICOM_NUMERIC_CODE;
