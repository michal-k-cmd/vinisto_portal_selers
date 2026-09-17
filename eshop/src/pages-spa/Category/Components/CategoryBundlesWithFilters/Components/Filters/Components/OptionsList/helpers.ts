import removeDiacritics from 'Helpers/removeDiacritics';

import { SHOW_ALL_OPTIONS_THRESHOLD } from '../../constants';

import { Option } from './interfaces';

const soundexCache: Record<string, string> = {};

// https://en.wikipedia.org/wiki/Soundex
// Does not seem to work that well, maybe this implementation is not optimal?
export function soundex(text = ''): string {
	if (!text.length) return '';
	const s = [];
	let si = 1;
	let c;
	//              	ABCDEFGHIJKLMNOPQRSTUVWXYZ
	const mappings = '01230120022455012623010202';
	s[0] = text[0].toUpperCase();
	for (let i = 1, l = text.length; i < l; i++) {
		c = text[i].toUpperCase().charCodeAt(0) - 65;
		if (c >= 0 && c <= 25) {
			if (mappings[c] != '0') {
				if (mappings[c] != s[si - 1]) {
					s[si] = mappings[c];
					si++;
				}

				if (si > 3) {
					break;
				}
			}
		}
	}
	if (si <= 3) {
		while (si <= 3) {
			s[si] = '0';
			si++;
		}
	}
	return s.join('');
}

export function getFilteredOptions(
	options: Option[],
	showMax: number,
	search?: string,
	showRest?: boolean
) {
	const displayOptions = [];

	let tempOptions = options
		.map((option) => ({
			...option,
			checked: !!option?.checked,
			soundex: (() => {
				if (soundexCache[option.value]) return soundexCache[option.value];
				const valueSoundex = soundex(option.value);
				soundexCache[option.value] = valueSoundex;
				return valueSoundex;
			})(),
		}))
		.sort((a, b) => Number(b.checked) - Number(a.checked));

	if (search) {
		const searchSoundex = soundex(search);
		const searchFormatted = removeDiacritics(search).toLowerCase();
		tempOptions = tempOptions.filter((option) => {
			return (
				option.soundex.includes(searchSoundex) ||
				removeDiacritics(option.value).toLowerCase().includes(searchFormatted)
			);
		});
	}

	if (
		showRest ||
		showMax === 0 ||
		tempOptions.length <= SHOW_ALL_OPTIONS_THRESHOLD
	)
		return { totalLength: tempOptions.length, options: tempOptions };

	for (let i = 0; i < tempOptions.length; i++) {
		if (tempOptions[i]?.checked) {
			displayOptions.push(tempOptions[i]);
		} else if (showMax !== 0 && displayOptions.length < showMax) {
			displayOptions.push(tempOptions[i]);
		}
	}
	return { totalLength: tempOptions.length, options: displayOptions };
}

export function getUpdatedOptionsOnClick(
	type: 'checkbox' | 'radio',
	option: Option,
	options: (Option | null)[]
): Option[] {
	const nonNullishOptions = options.filter(
		(item): item is Exclude<typeof item, null> => Boolean(item)
	);
	if (type === 'radio') {
		if (!option?.checked) {
			return nonNullishOptions.map((item) => ({
				...item,
				checked: item?.id === option.id,
			}));
		}
	} else if (type === 'checkbox') {
		return nonNullishOptions.map((item) => ({
			...item,
			checked: item?.id === option.id ? !option.checked : item?.checked,
		}));
	}

	return nonNullishOptions;
}
