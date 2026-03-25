import { Agent } from 'undici';
import { getGigaChatAccessToken } from './gigachat-auth.ts';

const GIGACHAT_API_URL =
		process.env.GIGACHAT_API_URL ??
		'https://gigachat.devices.sberbank.ru/api/v1/chat/completions';

const GIGACHAT_MODEL = process.env.GIGACHAT_MODEL || 'GigaChat-2';

type GigaChatCompletionResponse = {
	choices?: Array<{
		message?: {
			content?: string;
			role?: string;
		};
	}>;
};

const delay = (ms: number) =>
		new Promise(resolve => setTimeout(resolve, ms));

const isRetryableNetworkError = (error: unknown): boolean => {
	if (!(error instanceof Error)) {
		return false;
	}

	const message = error.message.toLowerCase();

	return (
			message.includes('fetch failed') ||
			message.includes('timeout') ||
			message.includes('connect timeout') ||
			message.includes('socket') ||
			message.includes('network')
	);
};

const sendGigaChatRequest = async (
		prompt: string,
		accessToken: string,
): Promise<string> => {
	const response = await fetch(GIGACHAT_API_URL, {
		method: 'POST',
		dispatcher: new Agent({
			connect: {
				rejectUnauthorized: false,
			},
		}),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			model: GIGACHAT_MODEL,
			messages: [
				{
					role: 'user',
					content: prompt,
				},
			],
			stream: false,
		}),
	});

	if (!response.ok) {
		const text = await response.text();
		throw new Error(`GigaChat request failed: ${response.status} ${text}`);
	}

	const data = (await response.json()) as GigaChatCompletionResponse;

	return data.choices?.[0]?.message?.content?.trim() ?? '';
};

export const generateWithGigaChat = async (prompt: string): Promise<string> => {
	const accessToken = await getGigaChatAccessToken();

	try {
		return await sendGigaChatRequest(prompt, accessToken);
	} catch (error) {
		if (!isRetryableNetworkError(error)) {
			throw error;
		}

		await delay(700);

		return sendGigaChatRequest(prompt, accessToken);
	}
};