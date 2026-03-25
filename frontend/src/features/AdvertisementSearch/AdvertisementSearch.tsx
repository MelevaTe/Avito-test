import { Search } from "lucide-react";
import { Input } from "@/shared/ui/Input/Input.tsx";

interface AdvertisementSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const AdvertisementSearch = ({ value, onChange }: AdvertisementSearchProps) => {
  return (
    <Input
      value={value}
      tone="search"
      onChange={(event) => onChange(event.target.value)}
      placeholder="Найти объявление..."
      className="h-8"
      rightSlot={<Search className="h-5 w-5" />}
    />
  );
};
