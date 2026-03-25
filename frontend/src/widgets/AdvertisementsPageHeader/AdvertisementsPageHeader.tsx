import { ThemeSwitcher } from "@/features/ThemeSwitcher";

interface AdvertisementsPageHeaderProps {
  total: number;
}

export const AdvertisementsPageHeader = ({ total }: AdvertisementsPageHeaderProps) => {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="typo-page-title text-avito-text-primary-strong">Мои объявления</h1>
        <p className="typo-meta-lg text-avito-text-tertiary mt-1">{total} объявления</p>
      </div>

      <ThemeSwitcher />
    </div>
  );
};
