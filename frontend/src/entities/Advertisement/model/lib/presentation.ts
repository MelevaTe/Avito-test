import type { Advertisement } from "@/entities/Advertisement/model/types/advertisement";

const categoryLabelMap: Record<Advertisement["category"], string> = {
  auto: "Транспорт",
  real_estate: "Недвижимость",
  electronics: "Электроника",
};

const parameterLabelMap: Record<string, string> = {
  brand: "Бренд",
  model: "Модель",
  yearOfManufacture: "Год выпуска",
  transmission: "Коробка передач",
  mileage: "Пробег",
  enginePower: "Мощность двигателя",
  type: "Тип",
  address: "Адрес",
  area: "Площадь",
  floor: "Этаж",
  condition: "Состояние",
  color: "Цвет",
};

const transmissionValueMap: Record<string, string> = {
  automatic: "Автомат",
  manual: "Механика",
};

const conditionValueMap: Record<string, string> = {
  new: "Новый",
  used: "Б/у",
};

const typeValueMap: Record<string, string> = {
  flat: "Квартира",
  house: "Дом",
  room: "Комната",
  phone: "Телефон",
  laptop: "Ноутбук",
  misc: "Разное",
};

const valueLabelMap: Record<string, string> = {
  ...transmissionValueMap,
  ...conditionValueMap,
  ...typeValueMap,
};

export const getAdvertisementCategoryLabel = (category: Advertisement["category"]) => {
  return categoryLabelMap[category];
};

export const getAdvertisementParameterLabel = (parameterKey: string) => {
  return parameterLabelMap[parameterKey] ?? parameterKey;
};

export const formatAdvertisementParameterValue = (value: unknown) => {
  if (value === undefined || value === null || value === "") {
    return "Не указано";
  }

  if (typeof value === "number") {
    return value.toLocaleString("ru-RU");
  }

  if (typeof value === "string") {
    return valueLabelMap[value] ?? value;
  }

  return String(value);
};

export const formatAdvertisementPrice = (price: number | null) => {
  if (price === null) {
    return "Цена не указана";
  }

  return `${price.toLocaleString("ru-RU")} ₽`;
};

export const formatAdvertisementDate = (value: string) => {
  return new Date(value).toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
};
