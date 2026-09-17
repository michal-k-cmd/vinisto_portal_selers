import { IVinistoUser } from 'Services/AuthenticationService/interfaces';

export interface IUserUpdateData {
	userLoginHash: NonNullable<IVinistoUser['loginHash']>;
	email: NonNullable<IVinistoUser['email']>;
	isAgreementCC?: NonNullable<IVinistoUser['isAgreementCC']>;
	nickname?: NonNullable<IVinistoUser['nickname']>;
	isNewsletterActive?: NonNullable<IVinistoUser['isNewsletterActive']>;
}

export interface IUserChangePasswordData {
	userLoginHash: NonNullable<IVinistoUser['loginHash']>;
	oldPassword: string;
	newPassword: string;
}
