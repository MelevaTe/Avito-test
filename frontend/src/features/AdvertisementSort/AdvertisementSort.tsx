import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select/Select.tsx";

import type { AdvertisementSortOption } from "./model/sortOption";

interface AdvertisementSortProps {
  value: AdvertisementSortOption;
  onChange: (value: AdvertisementSortOption) => void;
}

const options: { value: AdvertisementSortOption; label: string }[] = [
  {
    value: "createdAt_desc",
    label: "По новизне (сначала новые)",
  },
  {
    value: "createdAt_asc",
    label: "По новизне (сначала старые)",
  },
  {
    value: "title_asc",
    label: "По названию (А-Я)",
  },
  {
    value: "title_desc",
    label: "По названию (Я-А)",
  },
];

export const AdvertisementSort = ({ value, onChange }: AdvertisementSortProps) => {
  return (
    <Select
      value={value}
      onValueChange={(nextValue) => onChange(nextValue as AdvertisementSortOption)}
    >
      <SelectTrigger className="typo-body-sm border-avito-border-primary bg-avito-bg-surface text-avito-text-primary h-8 min-w-[270px] rounded-lg border px-3">
        <SelectValue placeholder="Сортировка" />
      </SelectTrigger>

      <SelectContent className="border-avito-border-primary bg-avito-bg-surface rounded-lg border">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="typo-body-sm px-3 py-2"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
