export const parsePriceResponse = (text: string): string | null => {
  const cleaned = text.replace(/\s/g, "");

  const patterns = [
    /(\d[\d\s]*)\s*(?:руб|₽|рублей|р\.)/i,
    /(?:цена|стоимость|средняя)[:\s]*(\d[\d\s]*)/i,
    /(\d{4,})/,
  ];

  for (const pattern of patterns) {
    const match = cleaned.match(pattern) ?? text.match(pattern);
    if (match?.[1]) {
      const digits = match[1].replace(/\D/g, "");
      if (digits.length >= 3) return digits;
    }
  }

  return null;
};
