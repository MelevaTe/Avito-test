import { Button } from "@/shared/ui/Button/Button";

interface AiSuggestionPopoverSuccessProps {
  status: "success";
  response: string;
  onApply?: () => void;
  onClose: () => void;
}

interface AiSuggestionPopoverErrorProps {
  status: "error";
  onClose: () => void;
}

export type AiSuggestionPopoverProps =
  | AiSuggestionPopoverSuccessProps
  | AiSuggestionPopoverErrorProps;

export const AiSuggestionPopover = (props: AiSuggestionPopoverProps) => {
  if (props.status === "error") {
    return (
      <div className="space-y-2">
        <div className="bg-avito-danger-bg">
          <p className="typo-body-sm-strong text-avito-danger-text-secondary">
            Произошла ошибка при запросе к AI
          </p>
        </div>
        <p className="typo-body-sm text-avito-text-secondary">
          Попробуйте повторить запрос или закройте уведомление
        </p>
        <Button
          type="button"
          variant="danger"
          size="small"
          onClick={props.onClose}
        >
          Закрыть
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="typo-body-sm-strong text-avito-text-primary">Ответ AI:</p>
      <p className="typo-body-sm text-avito-text-primary whitespace-pre-wrap">
        {props.response}
      </p>
      <div className="flex items-center gap-2">
        {props.onApply ? (
          <Button
            type="button"
            variant="primary"
            size="small"
            onClick={props.onApply}
          >
            Применить
          </Button>
        ) : null}
        <Button
          type="button"
          variant="outline"
          size="small"
          onClick={props.onClose}
        >
          Закрыть
        </Button>
      </div>
    </div>
  );
};
