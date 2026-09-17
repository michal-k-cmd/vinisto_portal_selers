import { ENVIRONMENT } from 'Config/environments';
import { get, set, unset } from 'lodash-es';
import Config from 'Config';

import { LocalStorageKeys, STORAGE_PREFIX } from './constants';

let temp = {};

/**
 * Local Storage Service
 * @class StorageServices
 */
class StorageService {
	private ENV: string = get(Config, 'environment', ENVIRONMENT.DEVELOPMENT);

	private storageTestKey = 'STORAGE_TEST_KEY';

	private storageDefaultValue = 'STORAGE_DEFAUT_VALUE';

	/**
	 * A method that checks availability of Local Storage in current Browser
	 * @returns Boolean result
	 */
	private isStorageAvailable() {
		try {
			localStorage.setItem(this.storageTestKey, this.storageTestKey);
			localStorage.removeItem(this.storageTestKey);
			return true;
		} catch (e) {
			return false;
		}
	}

	/**
	 * A method that deletes all records in the local storage
	 * @returns void
	 */
	public clearStorage() {
		if (this.isStorageAvailable()) localStorage.clear();
		temp = {};
	}

	/**
	 * A method that returns one record from a local storage by index
	 * @returns Required value - Record <any, any>| string | number | boolean | any[] | null
	 */
	public getStorageItem(
		itemName: keyof typeof LocalStorageKeys,
		defaultValue = this.storageDefaultValue
	): Record<any, any> | string | number | boolean | any[] | null {
		if (!this.isStorageAvailable()) {
			if (Object.call(temp, `${this.ENV}_${itemName}`)) {
				return get(temp, `${STORAGE_PREFIX}_${this.ENV}_${itemName}`, null);
			} else if (defaultValue !== this.storageDefaultValue) {
				set(temp, `${STORAGE_PREFIX}_${this.ENV}_${itemName}`, defaultValue);
				return defaultValue;
			}
			return null;
		}

		let valueObject = null;
		const storedValue = localStorage.getItem(
			`${STORAGE_PREFIX}_${this.ENV}_${itemName}`
		);
		if (storedValue !== null) {
			try {
				valueObject = JSON.parse(storedValue);
			} catch {
				valueObject = null;
			}
		}
		if (valueObject === null) {
			if (defaultValue !== this.storageDefaultValue) {
				this.setItem(itemName, defaultValue);
				return defaultValue;
			}
			return null;
		}
		if (Object.call(valueObject, 'value')) {
			if (
				valueObject.value === null &&
				defaultValue !== this.storageDefaultValue
			) {
				this.setItem(itemName, defaultValue);

				return defaultValue;
			}

			return valueObject.value;
		}
		return null;
	}

	/**
	 * A method that remove one record from a local storage by index
	 * @returns Result - boolean
	 */
	public removeItem(itemName: keyof typeof LocalStorageKeys) {
		if (this.isStorageAvailable())
			localStorage.removeItem(`${STORAGE_PREFIX}_${this.ENV}_${itemName}`);
		else if (
			Object.prototype.hasOwnProperty.call(
				temp,
				`${STORAGE_PREFIX}_${this.ENV}_${itemName}`
			)
		) {
			unset(temp, `${STORAGE_PREFIX}_${this.ENV}_${itemName}`);
		}

		return true;
	}

	/**
	 * A method that create one record in local storage by provided index and value
	 * @returns Stored value - Record <any, any>| string | number | boolean | any[] | null
	 */
	public setItem(
		itemName: keyof typeof LocalStorageKeys,
		itemValue: Record<any, any> | string | number | boolean | any[] | null
	): Record<any, any> | string | number | boolean | any[] | null {
		if (this.isStorageAvailable()) {
			const valueToBeSerialized = { value: itemValue };
			const serializedValue = JSON.stringify(valueToBeSerialized);
			localStorage.setItem(
				`${STORAGE_PREFIX}_${this.ENV}_${itemName}`,
				serializedValue
			);
		} else {
			set(temp, `${STORAGE_PREFIX}_${this.ENV}_${itemName}`, itemValue);
		}

		return itemValue;
	}
}

export default StorageService;

export const storageServiceInstance = new StorageService();
