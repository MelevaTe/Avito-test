import { useCallback, useEffect, useRef } from "react";

import { LOCAL_STORAGE_AD_EDIT_DRAFT } from "@/shared/const/localstorage";

import {
  advertisementEditFormSchema,
  type AdvertisementEditFormValues,
} from "../editAdvertisementFormSchema";

const SAVE_DEBOUNCE_MS = 500;

const getDraftKey = (id: number) => `${LOCAL_STORAGE_AD_EDIT_DRAFT}${id}`;

export const getEditFormDraft = (id: number): AdvertisementEditFormValues | null => {
  try {
    const raw = localStorage.getItem(getDraftKey(id));
    if (!raw) return null;
    const parsed = advertisementEditFormSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) {
      localStorage.removeItem(getDraftKey(id));
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
};

export const clearEditFormDraft = (id: number) => {
  localStorage.removeItem(getDraftKey(id));
};

export const useEditFormDraft = (id: number) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const saveDraft = useCallback(
    (values: AdvertisementEditFormValues) => {
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        try {
          localStorage.setItem(getDraftKey(id), JSON.stringify(values));
        } catch {}
      }, SAVE_DEBOUNCE_MS);
    },
    [id],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { saveDraft, clearDraft: () => clearEditFormDraft(id) };
};
