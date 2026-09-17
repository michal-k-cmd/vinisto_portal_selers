import AuthenticationService from 'Services/AuthenticationService';
import { storageServiceInstance as storageService } from 'Services/StorageService';
import { isEqual } from 'lodash-es';
import { Dispatch, SetStateAction } from 'react';
import { LocalStorageKeys } from 'Services/StorageService/constants';

import User from '@/domain/user';
import { userAdapter } from '@/index';

interface Params {
	loginHash: string;
	vinistoUser: User;
	setVinistoUser: Dispatch<SetStateAction<User>>;
	onError: (err?: unknown) => void;
}

export const authUserWithLoginHash = ({
	loginHash,
	vinistoUser,
	setVinistoUser,
	onError,
}: Params) => {
	const user = AuthenticationService.auth(loginHash)
		.then((response) => {
			const user = response.user;
			if (!user) throw new Error('No user in response');

			const vinistoUserFromResponse = userAdapter.fromApi(user, { loginHash });

			if (!isEqual(vinistoUserFromResponse, vinistoUser)) {
				setVinistoUser(vinistoUserFromResponse);
				storageService.setItem(
					LocalStorageKeys.VINISTO_AUTH,
					vinistoUserFromResponse
				);
			}

			return vinistoUserFromResponse;
		})
		.catch((err) => onError?.(err));

	return user;
};
