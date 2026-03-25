interface DescriptionPromptData {
  category: string;
  title: string;
  price: string;
  description: string;
  params: Record<string, string | undefined>;
}

export const buildDescriptionPrompt = ({
  category,
  title,
  price,
  description,
  params,
}: DescriptionPromptData): string => {
  const paramsStr = Object.entries(params)
    .filter(([, v]) => v?.trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ");

  const hasDescription = description.trim().length > 0;

  if (hasDescription) {
    return [
      "Улучши описание объявления, сделай его более привлекательным:",
      `Текущее описание: ${description}`,
      `Категория: ${category}, Название: ${title}`,
      paramsStr ? `Параметры: ${paramsStr}` : "",
      "Сохрани суть, улучши стиль. На русском, до 500 символов.",
    ]
      .filter(Boolean)
      .join("\n");
  }

  return [
    "Напиши привлекательное описание для объявления:",
    `Категория: ${category}, Название: ${title}, Цена: ${price}`,
    paramsStr ? `Параметры: ${paramsStr}` : "",
    "Описание должно быть на русском, до 500 символов.",
  ]
    .filter(Boolean)
    .join("\n");
};
