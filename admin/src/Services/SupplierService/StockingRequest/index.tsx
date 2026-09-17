import { apiServiceInstance } from 'Services/ApiService';
import {
	VinistoHelperDllBaseAuthorizationParameters,
	VinistoStockingRequestDllModelsApiStockingRequestStockingRequestBundleNotesParameters,
	VinistoStockingRequestDllModelsApiStockingRequestStockingRequestConfirmParameters,
	VinistoStockingRequestDllModelsApiStockingRequestStockingRequestCreateParameters,
	VinistoStockingRequestDllModelsApiStockingRequestStockingRequestDeliveryOrderParameters,
	VinistoStockingRequestDllModelsApiStockingRequestStockingRequestModifyBundleParameters,
	VinistoStockingRequestDllModelsApiStockingRequestStockingRequestModifyBundlesParameters,
	VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn,
	VinistoStockingRequestDllModelsApiStockingRequestStockingRequestUpdateAdminNoteParameters,
} from 'vinisto_api_client/src/api-types/supplier-api';
import { IQueryArgument } from 'Services/ApiService/interfaces';
import Config from 'Config';

import {
	DeleteStockingRequestQueryArgument,
	GetAllStockingRequestsQueryArgument,
} from '../interfaces';
import { STOCKING_REQUESTS_URI } from '../constants';

const getAll = async (req: GetAllStockingRequestsQueryArgument[]) =>
	await apiServiceInstance.getCollection<VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn>(
		STOCKING_REQUESTS_URI,
		req
	);

const getById = async (stockingRequestId: string, req: IQueryArgument[]) =>
	await apiServiceInstance.get<VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn>(
		`${STOCKING_REQUESTS_URI}/${stockingRequestId}`,
		true,
		undefined,
		req
	);

const create = async (
	req: VinistoStockingRequestDllModelsApiStockingRequestStockingRequestCreateParameters
) =>
	await apiServiceInstance.post<VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn>(
		STOCKING_REQUESTS_URI,
		req
	);

const remove = async (
	stockingRequestId: string,
	req: DeleteStockingRequestQueryArgument[]
) =>
	await apiServiceInstance.delete(
		`${STOCKING_REQUESTS_URI}/${stockingRequestId}`,
		undefined,
		true,
		req
	);

const cancel = async (
	stockingRequestId: string,
	req: VinistoHelperDllBaseAuthorizationParameters
) => {
	await apiServiceInstance.put(
		`${STOCKING_REQUESTS_URI}/${stockingRequestId}/states/CancelStockingRequest`,
		req
	);
};

interface ReceiptRequest {
	receiptFile: File | null;
}

const mapReceiptRequestToFormData = ({ receiptFile }: ReceiptRequest) => {
	const formData = new FormData();
	if (receiptFile) {
		formData.append('receiptFile', receiptFile);
	}

	return formData;
};

const closeReceipt = async (
	stockingRequestId: string,
	req: ReceiptRequest, // can't find request type in swagger
	UserLoginHash?: string
) => {
	const url = `${STOCKING_REQUESTS_URI}/${stockingRequestId}/states/CloseStockingRequest?UserLoginHash=${UserLoginHash}`;

	await apiServiceInstance.put(
		url,
		mapReceiptRequestToFormData(req),
		true,
		undefined
	);
};

const uploadReceiptToClosedRequest = async (
	stockingRequestId: string,
	req: ReceiptRequest,
	UserLoginHash?: string
) => {
	const url = `${STOCKING_REQUESTS_URI}/${stockingRequestId}/states/UploadReceiptToClosedStockingRequest?UserLoginHash=${UserLoginHash}`;

	await apiServiceInstance.put(
		url,
		mapReceiptRequestToFormData(req),
		true,
		undefined
	);
};

const addBundleNotes = async (
	stockingRequestId: string,
	req: VinistoStockingRequestDllModelsApiStockingRequestStockingRequestBundleNotesParameters
) => {
	const url = `${STOCKING_REQUESTS_URI}/${stockingRequestId}/states/AddBundleNotesToStockingRequest`;

	const res =
		await apiServiceInstance.put<VinistoStockingRequestDllModelsApiStockingRequestStockingRequestReturn>(
			url,
			req
		);

	return res;
};

const modifyBundleInRequest = async (
	stockingRequestId: string,
	req: VinistoStockingRequestDllModelsApiStockingRequestStockingRequestModifyBundleParameters
) =>
	await apiServiceInstance.put(
		`${STOCKING_REQUESTS_URI}/${stockingRequestId}`,
		req
	);

const modifyBundlesInRequest = async (
	stockingRequestId: string,
	req: VinistoStockingRequestDllModelsApiStockingRequestStockingRequestModifyBundlesParameters
) =>
	await apiServiceInstance.put(
		`${STOCKING_REQUESTS_URI}/${stockingRequestId}/ModifyBundlesStockingRequest`,
		req
	);

const sendToSupplier = async (
	stockingRequestId: string,
	req: VinistoHelperDllBaseAuthorizationParameters
) => {
	await apiServiceInstance.post(
		`${STOCKING_REQUESTS_URI}/${stockingRequestId}/states/SendStockingRequestToSupplier`,
		req
	);
};

const sendStockingRequestToSupplierAgain = async (
	stockingRequestId: string,
	req: VinistoHelperDllBaseAuthorizationParameters
) => {
	await apiServiceInstance.post(
		`${STOCKING_REQUESTS_URI}/${stockingRequestId}/states/send-stocking-request-to-supplier-again`,
		req
	);
};

const updateWms = async (
	stockingRequestId: string,
	req: VinistoHelperDllBaseAuthorizationParameters
) => {
	await apiServiceInstance.put(
		`${STOCKING_REQUESTS_URI}/${stockingRequestId}/UpdateStockingRequestWMS`,
		req
	);
};

const confirm = async (
	stockingRequestId: string,
	req: VinistoStockingRequestDllModelsApiStockingRequestStockingRequestConfirmParameters
) => {
	await apiServiceInstance.put(
		`${STOCKING_REQUESTS_URI}/${stockingRequestId}/states/ConfirmStockingRequest`,
		req
	);
};

const delivery = async (
	stockingRequestId: string,
	req: VinistoStockingRequestDllModelsApiStockingRequestStockingRequestDeliveryOrderParameters
) => {
	await apiServiceInstance.post(
		`${STOCKING_REQUESTS_URI}/${stockingRequestId}/states/DeliveryOrderStockingRequest`,
		req
	);
};

const getPdfDownloadLink = (stockingRequestId: string, userLoginHash: string) =>
	`${Config.apiUrl}${STOCKING_REQUESTS_URI}/${stockingRequestId}/DownloadPdf?UserLoginHash=${userLoginHash}`;

const updateAdminNote = async (
	stockingRequestId: string,
	req: VinistoStockingRequestDllModelsApiStockingRequestStockingRequestUpdateAdminNoteParameters
) => {
	await apiServiceInstance.put(
		`${STOCKING_REQUESTS_URI}/${stockingRequestId}/update-admin-note`,
		req
	);
};

export const StockingRequestService = {
	getAll,
	getById,
	create,
	remove,
	cancel,
	closeReceipt,
	uploadReceiptToClosedRequest,
	modifyBundleInRequest,
	modifyBundlesInRequest,
	sendToSupplier,
	sendStockingRequestToSupplierAgain,
	updateWms,
	confirm,
	delivery,
	getPdfDownloadLink,
	addBundleNotes,
	updateAdminNote,
};
