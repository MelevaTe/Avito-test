import { z } from "zod";

import { AdvertisementCategory } from "@/entities/Advertisement";

export const advertisementEditFormSchema = z.object({
  category: z.enum([
    AdvertisementCategory.AUTO,
    AdvertisementCategory.REAL_ESTATE,
    AdvertisementCategory.ELECTRONICS,
  ]),
  title: z.string().trim().min(1, "Укажите название"),
  price: z
    .string()
    .trim()
    .min(1, "Укажите цену")
    .refine((value) => !Number.isNaN(Number(value)), "Цена должна быть числом"),
  description: z.string(),
  params: z.record(z.string(), z.string()),
});

export type AdvertisementEditFormValues = z.infer<typeof advertisementEditFormSchema>;
