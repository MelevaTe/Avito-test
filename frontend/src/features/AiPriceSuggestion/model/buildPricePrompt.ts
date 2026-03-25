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
    `Проанализируй объявление:`,
    `Категория: ${category}, Название: ${title}`,
    paramsStr ? `Параметры: ${paramsStr}` : "",
    "Укажи среднюю рыночную цену в рублях с диапазонами.",
    "Ответ на русском языке, кратко.",
  ]
    .filter(Boolean)
    .join("\n");
};
