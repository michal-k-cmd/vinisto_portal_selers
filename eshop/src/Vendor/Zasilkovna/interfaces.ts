export enum PacketaLanguage {
	EN = 'en',
	CS = 'cs',
	BG = 'bg',
	HU = 'hu',
	PL = 'pl',
	RO = 'ro',
	SK = 'sk',
	FR = 'fr',
	UK = 'uk',
	DE = 'de',
	SL = 'sl',
	LV = 'lv',
	IT = 'it',
	HR = 'hr',
	FI = 'fi',
	ET = 'et',
	DA = 'da',
	ES = 'es',
	EL = 'el',
	LT = 'lt',
	NL = 'nl',
	PT = 'pt',
	RU = 'ru',
	SV = 'sv',
}

export type GpsCoordinates = {
	lat: number;
	lon: number;
};

export type Photo = {
	thumbnail: string;
	normal: string;
};

export type Time = {
	open: string;
	close: string;
};

export type ExceptionDay = {
	from: string;
	to: null | string;
	times: Time[];
};

export type PointHours = {
	monday: string;
	tuesday: string;
	wednesday: string;
	thursday: string;
	friday: string;
	saturday: string;
	sunday: string;
};

export type DirectionsHTML =
	| '<p>'
	| '<b>'
	| '<a href target>'
	| '<i>'
	| '<em>'
	| '<strong>'
	| '<span>'
	| '<br>';

export type ExtendedPoint = {
	/** For internal pick-up points: Branch ID; For external pick-up points: External carrier's pick-up point code. */
	id: string;

	/** Name which usually means city and street address. For large cities also includes city district. */
	name: string;

	/** Country code */
	country: `${PacketaLanguage}`;

	/** ISO 4217 currency alphabetic code */
	currency: string;

	/** Name of the business place */
	place: string;

	/** Short additional information about the pick-up point place, e.g. "by the subway entrance" */
	special: string;

	/** Street name and house number */
	street: string;

	/** City name */
	city: string;

	/** Postal code */
	zip: string;

	/** GPS coordinates */
	gps: GpsCoordinates;

	/** Does the pick-up point allow consigning new parcels? */
	packetConsignment: boolean;

	/** Does the pick-up point accept Return Parcels (paid by you / receiver)? */
	claimAssistant: boolean;

	/** The maximum accepted weight of parcel in kilograms. */
	maxWeight: number;

	/** If not null, then it indicates that you must not allow this pick-up point to be selected by customer. However, you must display it and indicate its unavailability because this state is usually only temporary. */
	error: null | 'vacation' | 'full' | 'closing' | 'technical' | 'xxx';

	/** If not null, then it indicates that you must discourage the customer from selecting this pick-up point. */
	warning: null | 'almostFull';

	/** If not null, then it indicates you should promote this pick-up point over others. */
	recommended: null | 'quick';

	/** Indicates if the pick-up point is new and if it is, you should promote it, so that customers take a notice of new pick-up points in their preferred areas. */
	isNew: boolean;

	/** Indicates (true/false) if the pick-up point allows C.O.D. payment via payment card. If you have disabled card payments for your Packeta client account, the return value will be always be null ("not available"), even if the pick-up point allows card payments for other clients. */
	creditCardPayment: null | boolean;

	/** Indicates if the pickup point is open on Saturday, and if so, until which hour. If it's closed, the value is 0. Recommended as a filtering option. */
	saturdayOpenTo: number;

	/** Indicates if the pickup point is open on Sunday, and if so, until which hour. If it's closed, the value is 0. Recommended as a filtering option. */
	sundayOpenTo: number;

	/** Indicates the latest hour until which the pickup point is open on any single day of the week. E.g. if the opening hours are Mon-Thu 10:00-18:00, Fri 12:00-20:00, then the value would be 20. Recommended as a filtering option. */
	businessDaysOpenUpTo: number;

	/** Indicates if the pick-up point is open during lunch time (does not have a break during lunch time). Recommended as a filtering option. */
	businessDaysOpenLunchtime: boolean;

	/** Information about the pick-up point whereabouts. */
	directions: string | DirectionsHTML;

	/** Instructions for car access to the pick-up point, parking, etc. */
	directionsCar: string | DirectionsHTML;

	/** Instructions for public transport access to the pick-up point, bus stop name, etc. */
	directionsPublic: string | DirectionsHTML;

	/** Contains holidays, exceptions or changes from opening hours. */
	exceptionDays: ExceptionDay[];

	/** Is the pick-up point accessible to people on wheelchairs? */
	wheelchairAccessible: boolean;

	/** Only for internal pick-up points: Unique URL safe identifier to be used in an address of a pick-up point detail web page */
	branchCode: string;

	/** Provides thumbnail and full-size photos of pick-up point. */
	photo: Photo[];

	/** Provides HTML and structured information about pick-up point business hours. */
	openingHours: PointHours;

	/** Values to be provided are either "internal" (internal pick-up points) or "external" (external pick-up points). */
	pickupPointType: string;

	/** Routing code of the branch. Used for custom labels. */
	routingCode: string;

	/** Only for external pick-up points: External carrier ID */
	carrierId: string;

	/** Only for external pick-up points: External carrier's pick-up point code */
	carrierPickupPointId: string;
};

export type PacketaWidgetOptions = {
	/** Provides your e-shop address, either a full URL, or at least top level domain. */
	webUrl?: string;

	/** Provides the e-shop software name and version, and if applicable also Packeta module version. E.g. "prestashop-1.6-packeta-4.1" */
	appIdentity?: string;

	/** Shows only pick-up points from particular countries, specified with ISO 3166-1 alpha-2 code in lower case and separated by comma (e.g.: au, be, gb). If not set, specific pick-up points configured in the client section will be displayed. Default value is based on the Allowed branch settings in the client section (https://client.packeta.com/en/user-branch-settings/edit) */
	country?: string;

	/** This field should contain either carrier ID or string “packeta” for Packeta internal pick-up points. The list of carrier IDs is available in the XML feed. There can be more values added but must be separated by comma. */
	carriers?: string;

	/** Displays user interface in language specified with following options: ['en', 'cs', 'bg', 'hu', 'pl', 'ro', 'sk', 'fr', 'uk', 'de', 'sl', 'lv', 'it', 'hr', 'fi', 'et', 'da', 'es', 'el', 'lt', 'nl', 'pt', 'ru', 'sv']. If not set, browser preference will be used. Default value is "en" language. */
	language?: PacketaLanguage;

	/** If present and set to "yes", it will only display pick-up points, which provide the Claim Assistant (Return Parcel) service. If present and set to any other value, it will only display pick-up points which do not provide the Claim Assistant (Return Parcel) service. */
	claimAssistant?: string;

	/** If present and set to "yes", it will only display pick-up points, which provide new parcel consignment service. If present and set to any other value, it will only display pick-up points which do not provide new parcel consignment service. */
	packetConsignment?: string;

	/** If present, it will only display pick-up points, which accept parcels of this weight in kilograms. */
	weight?: number;

	/** If location is not allowed use longitude and latitude as current position. */
	longitude?: number;

	/** If location is not allowed use longitude and latitude as current position. */
	latitude?: number;

	/** If present and set to true, only pick-up points where age 18+ verification service is available are displayed. */
	livePickupPoint?: boolean;

	/** Expected date of the parcel expedition. A pickup point will be unavailable when the shipping date falls within the pickup point´s holiday that lasts more than 3 days. */
	expeditionDay?: number;
};

export type Packeta = {
	Widget: {
		/** This method launches the widget. */
		pick: (
			/** An identifier of your Packeta account, available at Packeta client section, or can be provided by your account manager. */
			apiKey: string,

			/** Function which will be called when the user confirms or cancels pick-up point selection. The function will receive one argument, which will be either an ExtendedPoint object if pick-up point was selected, or null if selection was cancelled. */
			callback: (res: null | ExtendedPoint) => void,

			/** May contain additional configuration options of the application, see below. */
			options?: PacketaWidgetOptions,

			/** If not null, application will be displayed inside the specified DOM element. We recommend that the element has dimensions specified. */
			inElement?: null | HTMLElement
		) => void;

		/** Closes any previously displayed widget. This method will succeed even if none is currently open. */
		close: () => void;
	};
};

export type WindowWithPacketa = Window & { Packeta?: Packeta };
