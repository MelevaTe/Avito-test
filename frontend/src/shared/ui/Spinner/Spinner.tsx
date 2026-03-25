import { Loader2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib/utils.ts";

function Spinner(props: React.ComponentProps<"svg">) {
  const { t } = useTranslation("common");
  const { className, ...otherProps } = props;
  return (
    <Loader2Icon
      role="status"
      aria-label={t("loading")}
      className={cn("size-4 animate-spin", className)}
      {...otherProps}
    />
  );
}

export { Spinner };
