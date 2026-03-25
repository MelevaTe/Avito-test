import { z } from "zod";

const yearOfManufactureSchema = z
  .union([z.number(), z.string()])
  .optional()
  .transform((value) => {
    if (value === undefined || value === "") {
      return undefined;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  });

export const autoAdvertisementParamsSchema = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
  yearOfManufacture: yearOfManufactureSchema,
  transmission: z.enum(["automatic", "manual"]).optional(),
  mileage: z.number().optional(),
  enginePower: z.number().optional(),
});

export const realEstateAdvertisementParamsSchema = z.object({
  type: z.enum(["flat", "house", "room"]).optional(),
  address: z.string().optional(),
  area: z.number().optional(),
  floor: z.number().optional(),
});

export const electronicsAdvertisementParamsSchema = z.object({
  type: z.enum(["phone", "laptop", "misc"]).optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  condition: z.enum(["new", "used"]).optional(),
  color: z.string().optional(),
});

const baseAdvertisementSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  title: z.string(),
  description: z.string().optional(),
  price: z.number().nullable(),
  needsRevision: z.boolean(),
});

const autoAdvertisementSchema = baseAdvertisementSchema.extend({
  category: z.literal("auto"),
  params: autoAdvertisementParamsSchema,
});

const realEstateAdvertisementSchema = baseAdvertisementSchema.extend({
  category: z.literal("real_estate"),
  params: realEstateAdvertisementParamsSchema,
});

const electronicsAdvertisementSchema = baseAdvertisementSchema.extend({
  category: z.literal("electronics"),
  params: electronicsAdvertisementParamsSchema,
});

export const advertisementSchema = z.discriminatedUnion("category", [
  autoAdvertisementSchema,
  realEstateAdvertisementSchema,
  electronicsAdvertisementSchema,
]);

export const advertisementListItemSchema = z.object({
  id: z.number(),
  category: z.enum(["auto", "real_estate", "electronics"]),
  title: z.string(),
  price: z.number().nullable(),
  needsRevision: z.boolean(),
});

export const advertisementsListResponseSchema = z.object({
  items: z.array(advertisementListItemSchema),
  total: z.number(),
});
