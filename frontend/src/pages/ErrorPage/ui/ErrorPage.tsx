import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StatusPage } from "@/widgets/StatusPage";

const ErrorPage = () => {
  const { t } = useTranslation("error");

  return (
    <StatusPage
      code={t("error")}
      title={t("unexpectedError")}
      description={t("tryRefreshing")}
      Icon={AlertTriangle}
      action={{
        label: t("refreshPage"),
        onClick: () => location.reload(),
      }}
    />
  );
};

export default ErrorPage;
