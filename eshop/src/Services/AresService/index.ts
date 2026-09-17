import { z } from 'zod';
import api from 'vinisto_api_client/src/api';

const AresResponseSchema = z.object({
	ico: z.string(),
	dic: z.string().nullish(),
	obchodniJmeno: z.string().optional(),
	sidlo: z.object({
		kodStatu: z.string().optional(),
		nazevStatu: z.string().optional(),
		kodKraje: z.number().optional(),
		nazevKraje: z.string().optional(),
		kodOkresu: z.number().optional(),
		nazevOkresu: z.string().optional(),
		kodObce: z.number().optional(),
		nazevObce: z.string().optional(),
		kodUlice: z.number().optional(),
		nazevUlice: z.string().optional(),
		cisloOrientacni: z
			.number()
			.optional()
			.transform((num) => num?.toString()),
		cisloDomovni: z
			.number()
			.optional()
			.transform((num) => num?.toString()),
		psc: z
			.number()
			.optional()
			.transform((num) => num?.toString()),
		kodCastiObce: z.number().optional(),
		nazevCastiObce: z.string().optional(),
		kodAdresnihoMista: z.number().optional(),
		textovaAdresa: z.string().optional(),
	}),
	pravniForma: z.string().optional(),
	financniUrad: z.string().optional(),
	datumVzniku: z.string().optional(),
	datumAktualizace: z.string().optional(),
	icoId: z.string().optional(),
	adresaDorucovaci: z.record(z.unknown()).optional(),
	seznamRegistraci: z.object({
		stavZdrojeVr: z.string().optional(),
		stavZdrojeRes: z.string().optional(),
		stavZdrojeRzp: z.string().optional(),
		stavZdrojeNrpzs: z.string().optional(),
		stavZdrojeRpsh: z.string().optional(),
		stavZdrojeRcns: z.string().optional(),
		stavZdrojeSzr: z.string().optional(),
		stavZdrojeDph: z.string().optional(),
		stavZdrojeSd: z.string().optional(),
		stavZdrojeIr: z.string().optional(),
		stavZdrojeCeu: z.string().optional(),
		stavZdrojeRs: z.string().optional(),
		stavZdrojeRed: z.string().optional(),
	}),
	primarniZdroj: z.string().optional(),
	czNace: z.array(z.string()).optional(),
});

const ARES_URL = `services-api/ares`;

const getDataByIco = (ico: string) => {
	const reqUrl = `${ARES_URL}/${ico}`;

	const res = api.get(reqUrl).then((response) => {
		// @ts-expect-error Api client is not typed for external service use case
		const validatedResponse = AresResponseSchema.parse(JSON.parse(response));
		return validatedResponse;
	});

	return res;
};

const AresService = {
	getDataByIco,
};

export default AresService;
