import type { Advertisement } from "@/entities/Advertisement";
import imagePlaceholder from "@/shared/assets/image-placeholder.png";

interface AdvertisementImageProps {
  advertisement: Advertisement;
}

export const AdvertisementImage = ({ advertisement }: AdvertisementImageProps) => {
  const imageSrc = imagePlaceholder;

  return (
    <div className="bg-avito-bg-page aspect-[4/3] overflow-hidden rounded-xl">
      <img
        src={imageSrc}
        alt={advertisement.title}
        className="h-full w-full object-cover"
      />
    </div>
  );
};
