import { AdvertisementCategory } from "../consts/advertisementConsts";
import type {
  AdvertisementSortField,
  SortDirection,
} from "../consts/advertisementConsts";

export interface AutoAdvertisementParams {
  brand?: string;
  model?: string;
  yearOfManufacture?: number;
  transmission?: "automatic" | "manual";
  mileage?: number;
  enginePower?: number;
}

export interface RealEstateAdvertisementParams {
  type?: "flat" | "house" | "room";
  address?: string;
  area?: number;
  floor?: number;
}

export interface ElectronicsAdvertisementParams {
  type?: "phone" | "laptop" | "misc";
  brand?: string;
  model?: string;
  condition?: "new" | "used";
  color?: string;
}

export interface BaseAdvertisement {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description?: string;
  price: number | null;
  needsRevision: boolean;
}

export interface AutoAdvertisement extends BaseAdvertisement {
  category: typeof AdvertisementCategory.AUTO;
  params: AutoAdvertisementParams;
}

export interface RealEstateAdvertisement extends BaseAdvertisement {
  category: typeof AdvertisementCategory.REAL_ESTATE;
  params: RealEstateAdvertisementParams;
}

export interface ElectronicsAdvertisement extends BaseAdvertisement {
  category: typeof AdvertisementCategory.ELECTRONICS;
  params: ElectronicsAdvertisementParams;
}

export type Advertisement =
  | AutoAdvertisement
  | RealEstateAdvertisement
  | ElectronicsAdvertisement;

export interface AdvertisementListItem {
  id: number;
  category: AdvertisementCategory;
  title: string;
  price: number | null;
  needsRevision: boolean;
}

export interface AdvertisementsListResponse {
  items: AdvertisementListItem[];
  total: number;
}

export interface GetAdvertisementsListParams {
  q?: string;
  limit?: number;
  skip?: number;
  categories?: AdvertisementCategory[];
  needsRevision?: boolean;
  sortColumn?: AdvertisementSortField;
  sortDirection?: SortDirection;
}
