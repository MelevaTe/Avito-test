interface PricePromptData {
  category: string;
  title: string;
  params: Record<string, string | undefined>;
}

export const buildPricePrompt = ({
  category,
  title,
  params,
}: PricePromptData): string => {
  const paramsStr = Object.entries(params)
    .filter(([, v]) => v?.trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ");

  return [
    "Ты аналитик рыночных цен.",
    "Проанализируй объявление:",
    `Категория: ${category}, Название: ${title}`,
    paramsStr ? `Параметры: ${paramsStr}` : "",
    "Укажи среднюю рыночную цену в рублях с диапазонами.",
    "Ответ на русском языке, кратко.",
    "Сначала дай короткое текстовое пояснение для пользователя.",
    "В самой последней строке обязательно укажи только одно целое число — среднюю цену в рублях, без слов, без валюты, без markdown, без пояснений.",
    "Пример последней строки:",
    "55000",
  ]
    .filter(Boolean)
    .join("\n");
};
