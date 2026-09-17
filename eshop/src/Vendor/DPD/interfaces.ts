export type DPDWidgetResult = {
	pickupPointResult: string; // ID and full address as returned by DPD widget
};

export type DPDWidgetMessageData = {
	dpdWidget?: {
		pickupPointResult?: string;
		message?: string;
	};
};

export type DPDWidgetMessageEvent = MessageEvent<DPDWidgetMessageData>;

export type DPDSelectDetail = {
	pickupPointResult: string; // Format: "ID|Name|Street|City|ZipCode|Country"
};

export type DPDSelectEvent = Event & {
	detail: DPDSelectDetail;
};

/**
 * Interface for the overall API response structure.
 */
export interface DPDPickupPointApiResponse {
	status: string; // Status of the response (e.g., "ok")
	code: number; // HTTP status code (e.g., 200)
	count: number; // Number of items returned (e.g., 24)
	hash: string; // A hash string (e.g., "63f2e8f003d929224ba86bd005b6976e")
	data: DPDPickupPointData; // The main data object containing pickup point details
}

/**
 * Interface for the detailed data of a single pickup point.
 */
export interface DPDPickupPointData {
	id: string; // Unique identifier for the pickup point (e.g., "CZ31952")
	company: string; // Name of the company or location (e.g., "Potraviny Michal")
	street: string; // Street name (e.g., "Čestmírova")
	city: string; // City name (e.g., "Praha")
	country_id: number; // Country identifier (e.g., 203)
	house_number: string; // House number or descriptive number (e.g., "313/24", "1527")
	postcode: string; // Postal code (e.g., "14000")
	phone: string; // Phone number (e.g., "225373373")
	fax: string; // Fax number, can be an empty string
	email: string; // Email address (e.g., "info@dpd.cz")
	homepage: string; // Homepage URL (e.g., "www.dpd.cz")
	pickup_network_type: string; // Type of pickup network (e.g., "pickup_point")
	pickup_allowed: 0 | 1; // 1 if pickup is allowed, 0 otherwise
	return_allowed: 0 | 1; // 1 if package return/RETURN is allowed, 0 otherwise
	dropoff_allowed: 0 | 1; // 1 if package drop-off is allowed, 0 otherwise
	express_allowed: 0 | 1; // 1 if express service is allowed, 0 otherwise
	cardpayment_allowed: 0 | 1; // 1 if card payment for COD is allowed, 0 otherwise
	cod_allowed: 0 | 1; // 1 if cash on delivery (COD) is allowed, 0 otherwise
	service: number; // Service identifier (e.g., 0)
	open_weekend: 0 | 1; // 0 if open on weekends, 1 if closed on weekends (as per manual)
	latitude: number; // Latitude coordinate
	longitude: number; // Longitude coordinate
	hours: Hours[]; // Array of daily opening hours
	photo: string; // Photo URL or identifier, can be an empty string
}

/**
 * Interface for the opening hours of a pickup point for a specific day.
 */
interface Hours {
	day: number; // Day of the week (1 for Monday, 7 for Sunday)
	dayName: string; // Localized name of the day (e.g., "Monday", "Tuesday")
	openMorning: string; // Morning opening time in HH:MM format, can be an empty string if closed
	closeMorning: string; // Morning closing time in HH:MM format, can be an empty string if closed
	openAfternoon: string; // Afternoon opening time in HH:MM format, can be an empty string if closed
	closeAfternoon: string; // Afternoon closing time in HH:MM format, can be an empty string if closed
}
