import { randomUUID } from 'node:crypto';
import { Agent } from 'undici';

const GIGACHAT_AUTH_URL =
		process.env.GIGACHAT_AUTH_URL ??
		'https://ngw.devices.sberbank.ru:9443/api/v2/oauth';

const GIGACHAT_AUTH_KEY = process.env.GIGACHAT_AUTH_KEY;
const GIGACHAT_SCOPE = process.env.GIGACHAT_SCOPE ?? 'GIGACHAT_API_PERS';

type GigaChatOAuthResponse = {
	access_token: string;
	expires_at: number;
};

let cachedAccessToken: string | null = null;
let cachedExpiresAt: number | null = null;
let refreshPromise: Promise<string> | null = null;

const TOKEN_REFRESH_GAP_MS = 60_000;

const isTokenActual = (): boolean => {
	if (!cachedAccessToken || !cachedExpiresAt) {
		return false;
	}

	return Date.now() < cachedExpiresAt - TOKEN_REFRESH_GAP_MS;
};

const requestNewAccessToken = async (): Promise<string> => {
	if (!GIGACHAT_AUTH_KEY) {
		throw new Error('GIGACHAT_AUTH_KEY is not set');
	}

	const response = await fetch(GIGACHAT_AUTH_URL, {
		method: 'POST',
		dispatcher: new Agent({
			connect: {
				rejectUnauthorized: false,
			},
		}),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${GIGACHAT_AUTH_KEY}`,
			RqUID: randomUUID(),
		},
		body: new URLSearchParams({
			scope: GIGACHAT_SCOPE,
		}).toString(),
	});

	if (!response.ok) {
		const text = await response.text();
		throw new Error(`GigaChat auth failed: ${response.status} ${text}`);
	}

	const data = (await response.json()) as GigaChatOAuthResponse;
	cachedAccessToken = data.access_token;
	cachedExpiresAt = data.expires_at;

	return data.access_token;
};

export const getGigaChatAccessToken = async (): Promise<string> => {
	if (isTokenActual()) {
		return cachedAccessToken as string;
	}

	if (!refreshPromise) {
		refreshPromise = requestNewAccessToken().finally(() => {
			refreshPromise = null;
		});
	}

	return refreshPromise;
};