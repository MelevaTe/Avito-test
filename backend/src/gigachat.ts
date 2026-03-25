import { Agent } from 'undici';

const GIGACHAT_MODEL = process.env.GIGACHAT_MODEL || 'GigaChat-2';

type GigaChatCompletionResponse = {
	choices?: Array<{
		message?: {
			content?: string;
			role?: string;
		};
	}>;
};

export const generateWithGigaChat = async (prompt: string): Promise<string> => {
	const GIGACHAT_ACCESS_TOKEN = process.env.GIGACHAT_ACCESS_TOKEN;

	if (!GIGACHAT_ACCESS_TOKEN) {
		throw new Error('GIGACHAT_ACCESS_TOKEN is not set');
	}

	const response = await fetch(
			'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
			{
				method: 'POST',
				dispatcher: new Agent({
					connect: {
						rejectUnauthorized: false,
					},
				}),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${GIGACHAT_ACCESS_TOKEN}`,
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
			},
	);

	if (!response.ok) {
		const text = await response.text();
		throw new Error(`GigaChat request failed: ${response.status} ${text}`);
	}

	const data: GigaChatCompletionResponse = await response.json();

	return data.choices?.[0]?.message?.content?.trim() ?? '';
};