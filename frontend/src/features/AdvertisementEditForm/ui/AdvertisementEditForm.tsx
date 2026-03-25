import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import {
  AdvertisementCategory,
  getAdvertisementCategoryLabel,
} from "@/entities/Advertisement";
import type { Advertisement } from "@/entities/Advertisement";
import type { AdvertisementEditFormValues } from "@/features/AdvertisementEditForm/model";
import { advertisementEditFormSchema } from "@/features/AdvertisementEditForm/model/editAdvertisementFormSchema.ts";
import {
  getEditFormDraft,
  useEditFormDraft,
} from "@/features/AdvertisementEditForm/model/hooks/useEditFormDraft";
import { filterDigitsOnly } from "@/features/AdvertisementEditForm/model/lib/filterDigitsOnly";
import { mapAdvertisementToFormValues } from "@/features/AdvertisementEditForm/model/mapAdvertisementToFormValues.ts";
import { AdvertisementCategoryFields } from "@/features/AdvertisementEditForm/ui/AdvertisementCategoryFields.tsx";
import { AiDescriptionSuggestionButton } from "@/features/AiDescriptionSuggestion";
import { AiPriceSuggestionButton } from "@/features/AiPriceSuggestion";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { FormSelect } from "@/shared/ui/Select/FormSelect.tsx";
import { Textarea } from "@/shared/ui/TextArea/Textarea";

export interface AdvertisementEditFormProps {
  advertisement: Advertisement;
  isSubmitting?: boolean;
  onSubmit: (values: AdvertisementEditFormValues) => void;
  onCancel?: () => void;
}

const DESCRIPTION_MAX_LENGTH = 1000;

export const AdvertisementEditForm = ({
  advertisement,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: AdvertisementEditFormProps) => {
  const defaultValues = useMemo(
    () =>
      getEditFormDraft(advertisement.id) ?? mapAdvertisementToFormValues(advertisement),
    [advertisement],
  );

  const { saveDraft, clearDraft } = useEditFormDraft(advertisement.id);

  const { control, handleSubmit, setValue } = useForm<AdvertisementEditFormValues>({
    resolver: zodResolver(advertisementEditFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues,
  });

  const formValues = useWatch({ control });
  const category = formValues.category ?? AdvertisementCategory.ELECTRONICS;
  const title = formValues.title ?? "";
  const price = formValues.price ?? "";

  useEffect(() => {
    saveDraft(formValues as AdvertisementEditFormValues);
  }, [formValues, saveDraft]);

  const handleFormSubmit = (values: AdvertisementEditFormValues) => {
    clearDraft();
    onSubmit(values);
  };

  const handleCancel = () => {
    clearDraft();
    onCancel?.();
  };

  const canSubmit =
    title.trim().length > 0 &&
    price.trim().length > 0 &&
    !Number.isNaN(Number(price.trim()));

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="mt-[18px]"
    >
      <div className="space-y-[18px]">
        <section>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <div className="max-w-[262px]">
                <FormSelect
                  name={field.name}
                  label="Категория"
                  value={field.value}
                  onValueChange={field.onChange}
                  options={[
                    {
                      value: AdvertisementCategory.AUTO,
                      label: getAdvertisementCategoryLabel(AdvertisementCategory.AUTO),
                    },
                    {
                      value: AdvertisementCategory.REAL_ESTATE,
                      label: getAdvertisementCategoryLabel(
                        AdvertisementCategory.REAL_ESTATE,
                      ),
                    },
                    {
                      value: AdvertisementCategory.ELECTRONICS,
                      label: getAdvertisementCategoryLabel(
                        AdvertisementCategory.ELECTRONICS,
                      ),
                    },
                  ]}
                />
              </div>
            )}
          />
        </section>

        <div className="border-avito-border-primary border-t" />

        <section className="space-y-[18px]">
          <Controller
            control={control}
            name="title"
            render={({ field, fieldState }) => (
              <div className="max-w-[456px]">
                <Input
                  label="Название"
                  requiredMark
                  placeholder="Название"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  onClear={() => field.onChange("")}
                  error={fieldState.error?.message}
                  ref={field.ref}
                />
              </div>
            )}
          />

          <Controller
            control={control}
            name="price"
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="max-w-[456px] flex-1">
                  <Input
                    label="Цена"
                    requiredMark
                    placeholder="Цена"
                    inputMode="numeric"
                    value={field.value}
                    onChange={(e) => field.onChange(filterDigitsOnly(e.target.value))}
                    onBlur={field.onBlur}
                    onClear={() => field.onChange("")}
                    error={fieldState.error?.message}
                    ref={field.ref}
                  />
                </div>
                <AiPriceSuggestionButton
                  className="mt-0 sm:mt-7"
                  formValues={formValues}
                  onApply={(price) => setValue("price", price, { shouldValidate: true })}
                />
              </div>
            )}
          />
        </section>

        <div className="border-avito-border-primary border-t" />

        <section>
          <h2 className="typo-section-title text-avito-text-primary">Характеристики</h2>

          <div className="mt-4 max-w-[456px]">
            <AdvertisementCategoryFields
              category={category}
              control={control}
            />
          </div>
        </section>

        <div className="border-avito-border-primary border-t" />

        <section className="space-y-2">
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <Textarea
                label="Описание"
                rows={3}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                warning={!field.value?.trim()}
                showCount
                maxLength={DESCRIPTION_MAX_LENGTH}
                ref={field.ref}
                wrapperClassName="max-w-[640px]"
              />
            )}
          />
          <AiDescriptionSuggestionButton
            formValues={formValues}
            onApply={(text) => setValue("description", text, { shouldValidate: true })}
          />
        </section>

        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            disabled={!canSubmit || isSubmitting}
          >
            Сохранить
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Отменить
          </Button>
        </div>
      </div>
    </form>
  );
};
