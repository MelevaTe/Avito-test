import { Controller, type Control } from "react-hook-form";

import {
  AdvertisementCategory,
  getAdvertisementParameterLabel,
} from "@/entities/Advertisement";

import type { AdvertisementEditFormValues } from "@/features/AdvertisementEditForm/model";
import { filterDigitsOnly } from "@/features/AdvertisementEditForm/model/lib/filterDigitsOnly";
import { Input } from "@/shared/ui/Input/Input";
import { FormSelect } from "@/shared/ui/Select/FormSelect.tsx";

export interface AdvertisementCategoryFieldsProps {
  category: AdvertisementEditFormValues["category"];
  control: Control<AdvertisementEditFormValues>;
}

const isEmptyValue = (value: string | undefined) => {
  return !value?.trim();
};

export const AdvertisementCategoryFields = ({
  category,
  control,
}: AdvertisementCategoryFieldsProps) => {
  if (category === AdvertisementCategory.ELECTRONICS) {
    return (
      <div className="space-y-4">
        <Controller
          control={control}
          name="params.type"
          render={({ field }) => (
            <FormSelect
              name={field.name}
              label={getAdvertisementParameterLabel("type")}
              value={field.value}
              onValueChange={field.onChange}
              warning={isEmptyValue(field.value)}
              placeholder="Тип"
              options={[
                { value: "phone", label: "Телефон" },
                { value: "laptop", label: "Ноутбук" },
                { value: "misc", label: "Разное" },
              ]}
            />
          )}
        />

        <Controller
          control={control}
          name="params.brand"
          render={({ field }) => (
            <Input
              label={getAdvertisementParameterLabel("brand")}
              placeholder="Бренд"
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              onClear={() => field.onChange("")}
              warning={isEmptyValue(field.value)}
              ref={field.ref}
            />
          )}
        />

        <Controller
          control={control}
          name="params.model"
          render={({ field }) => (
            <Input
              label={getAdvertisementParameterLabel("model")}
              placeholder="Модель"
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              onClear={() => field.onChange("")}
              warning={isEmptyValue(field.value)}
              ref={field.ref}
            />
          )}
        />

        <Controller
          control={control}
          name="params.color"
          render={({ field }) => (
            <Input
              label={getAdvertisementParameterLabel("color")}
              placeholder="Цвет"
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              onClear={() => field.onChange("")}
              warning={isEmptyValue(field.value)}
              ref={field.ref}
            />
          )}
        />

        <Controller
          control={control}
          name="params.condition"
          render={({ field }) => (
            <FormSelect
              name={field.name}
              label={getAdvertisementParameterLabel("condition")}
              value={field.value}
              onValueChange={field.onChange}
              warning={isEmptyValue(field.value)}
              placeholder="Состояние"
              options={[
                { value: "new", label: "Новый" },
                { value: "used", label: "Б/у" },
              ]}
            />
          )}
        />
      </div>
    );
  }

  if (category === AdvertisementCategory.AUTO) {
    return (
      <div className="space-y-4">
        <Controller
          control={control}
          name="params.brand"
          render={({ field }) => (
            <Input
              label={getAdvertisementParameterLabel("brand")}
              placeholder="Бренд"
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              onClear={() => field.onChange("")}
              warning={isEmptyValue(field.value)}
              ref={field.ref}
            />
          )}
        />

        <Controller
          control={control}
          name="params.model"
          render={({ field }) => (
            <Input
              label={getAdvertisementParameterLabel("model")}
              placeholder="Модель"
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              onClear={() => field.onChange("")}
              warning={isEmptyValue(field.value)}
              ref={field.ref}
            />
          )}
        />

        <Controller
          control={control}
          name="params.yearOfManufacture"
          render={({ field }) => (
            <Input
              label={getAdvertisementParameterLabel("yearOfManufacture")}
              placeholder="Год выпуска"
              inputMode="numeric"
              value={field.value ?? ""}
              onChange={(e) => field.onChange(filterDigitsOnly(e.target.value))}
              onBlur={field.onBlur}
              onClear={() => field.onChange("")}
              warning={isEmptyValue(field.value)}
              ref={field.ref}
            />
          )}
        />

        <Controller
          control={control}
          name="params.transmission"
          render={({ field }) => (
            <FormSelect
              name={field.name}
              label={getAdvertisementParameterLabel("transmission")}
              value={field.value}
              onValueChange={field.onChange}
              warning={isEmptyValue(field.value)}
              placeholder="Коробка передач"
              options={[
                { value: "automatic", label: "Автомат" },
                { value: "manual", label: "Механика" },
              ]}
            />
          )}
        />

        <Controller
          control={control}
          name="params.mileage"
          render={({ field }) => (
            <Input
              label={getAdvertisementParameterLabel("mileage")}
              placeholder="Пробег"
              inputMode="numeric"
              value={field.value ?? ""}
              onChange={(e) => field.onChange(filterDigitsOnly(e.target.value))}
              onBlur={field.onBlur}
              onClear={() => field.onChange("")}
              warning={isEmptyValue(field.value)}
              ref={field.ref}
            />
          )}
        />

        <Controller
          control={control}
          name="params.enginePower"
          render={({ field }) => (
            <Input
              label={getAdvertisementParameterLabel("enginePower")}
              placeholder="Мощность двигателя"
              inputMode="numeric"
              value={field.value ?? ""}
              onChange={(e) => field.onChange(filterDigitsOnly(e.target.value))}
              onBlur={field.onBlur}
              onClear={() => field.onChange("")}
              warning={isEmptyValue(field.value)}
              ref={field.ref}
            />
          )}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Controller
        control={control}
        name="params.type"
        render={({ field }) => (
          <FormSelect
            name={field.name}
            label={getAdvertisementParameterLabel("type")}
            value={field.value}
            onValueChange={field.onChange}
            warning={isEmptyValue(field.value)}
            placeholder="Тип"
            options={[
              { value: "flat", label: "Квартира" },
              { value: "house", label: "Дом" },
              { value: "room", label: "Комната" },
            ]}
          />
        )}
      />

      <Controller
        control={control}
        name="params.address"
        render={({ field }) => (
          <Input
            label={getAdvertisementParameterLabel("address")}
            placeholder="Адрес"
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            onClear={() => field.onChange("")}
            warning={isEmptyValue(field.value)}
            ref={field.ref}
          />
        )}
      />

      <Controller
        control={control}
        name="params.area"
        render={({ field }) => (
          <Input
            label={getAdvertisementParameterLabel("area")}
            placeholder="Площадь"
            inputMode="numeric"
            value={field.value ?? ""}
            onChange={(e) => field.onChange(filterDigitsOnly(e.target.value))}
            onBlur={field.onBlur}
            onClear={() => field.onChange("")}
            warning={isEmptyValue(field.value)}
            ref={field.ref}
          />
        )}
      />

      <Controller
        control={control}
        name="params.floor"
        render={({ field }) => (
          <Input
            label={getAdvertisementParameterLabel("floor")}
            placeholder="Этаж"
            inputMode="numeric"
            value={field.value ?? ""}
            onChange={(e) => field.onChange(filterDigitsOnly(e.target.value))}
            onBlur={field.onBlur}
            onClear={() => field.onChange("")}
            warning={isEmptyValue(field.value)}
            ref={field.ref}
          />
        )}
      />
    </div>
  );
};
