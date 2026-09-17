export interface IUserUpdateData {
	userLoginHash: string;
	email: string;
	isAgreementCC?: boolean;
	nickname?: string;
	isNewsletterActive?: boolean;
}

export interface IAccountUpdateData {
	email?: string;
	nickname?: string;
	isNewsletterActive?: boolean;
	isAgreementCC?: boolean;
}
