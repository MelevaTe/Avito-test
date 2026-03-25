import {
  AdvertisementCategory,
  getAdvertisementCategoryLabel,
} from "@/entities/Advertisement";
import type { AdvertisementCategory as AdvertisementCategoryType } from "@/entities/Advertisement";
import { Button } from "@/shared/ui/Button/Button.tsx";
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox.tsx";
import { Switch } from "@/shared/ui/Switch/Switch.tsx";

interface AdvertisementFiltersProps {
  categories: AdvertisementCategoryType[];
  needsRevision: boolean;
  onChangeCategories: (value: AdvertisementCategoryType[]) => void;
  onChangeNeedsRevision: (value: boolean) => void;
  onReset: () => void;
}

const categoryOptions: AdvertisementCategoryType[] = [
  AdvertisementCategory.AUTO,
  AdvertisementCategory.ELECTRONICS,
  AdvertisementCategory.REAL_ESTATE,
];

export const AdvertisementFilters = ({
  categories,
  needsRevision,
  onChangeCategories,
  onChangeNeedsRevision,
  onReset,
}: AdvertisementFiltersProps) => {
  const handleCategoryChange = (
    category: AdvertisementCategoryType,
    checked: boolean,
  ) => {
    if (checked) {
      onChangeCategories([...categories, category]);
      return;
    }

    onChangeCategories(categories.filter((item) => item !== category));
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="bg-avito-bg-surface rounded-2xl p-5">
        <div className="border-avito-border-primary border-b pb-4">
          <h2 className="text-avito-text-primary-strong text-base leading-6 font-medium">
            Фильтры
          </h2>

          <div className="mt-5">
            <p className="typo-body-sm">Категория</p>

            <div className="mt-4 space-y-3">
              {categoryOptions.map((category) => {
                const checked = categories.includes(category);

                return (
                  <label
                    key={category}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(value) =>
                        handleCategoryChange(category, Boolean(value))
                      }
                    />
                    <span className="typo-body-sm">
                      {getAdvertisementCategoryLabel(category)}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-4">
          <p className="typo-body-sm-strong text-avito-text-primary-strong">
            Только требующие
            <br />
            доработок
          </p>

          <Switch
            checked={needsRevision}
            onCheckedChange={onChangeNeedsRevision}
          />
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onReset}
        className="border-avito-border-primary bg-avito-bg-surface text-avito-text-secondary hover:bg-avito-bg-page hover:text-avito-text-primary h-12"
      >
        Сбросить фильтры
      </Button>
    </div>
  );
};
