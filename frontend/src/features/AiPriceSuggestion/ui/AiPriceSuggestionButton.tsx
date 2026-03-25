import { useMutation } from "@tanstack/react-query";
import { Loader2, RotateCcw } from "lucide-react";
import { generateLlmResponse } from "@/shared/api/llm";
import BulbIcon from "@/shared/assets/blub.svg?react";

import { cn } from "@/shared/lib/utils.ts";
import { AiSuggestionPopover } from "@/shared/ui/AiSuggestionPopover/AiSuggestionPopover.tsx";
import { Button } from "@/shared/ui/Button/Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/Tooltip/Tooltip.tsx";

import { buildPricePrompt } from "../model/buildPricePrompt";
import { parsePriceResponse } from "../model/parsePriceResponse";

interface AiPriceSuggestionButtonProps {
  formValues: {
    category?: string;
    title?: string;
    params?: Record<string, string | undefined>;
  };
  onApply?: (price: string) => void;
  className?: string;
}

export const AiPriceSuggestionButton = ({
  formValues,
  onApply,
  className,
}: AiPriceSuggestionButtonProps) => {
  const mutation = useMutation({
    mutationFn: (prompt: string) => generateLlmResponse(prompt),
  });

  const handleRequest = () => {
    const prompt = buildPricePrompt({
      category: formValues.category ?? "",
      title: formValues.title ?? "",
      params: formValues.params ?? {},
    });
    mutation.mutate(prompt);
  };

  const handleRetry = () => {
    if (mutation.variables) {
      mutation.mutate(mutation.variables);
    }
  };

  const handleApply = () => {
    if (!mutation.data || !onApply) return;
    const parsed = parsePriceResponse(mutation.data);
    if (parsed) {
      onApply(parsed);
      mutation.reset();
    }
  };

  const isOpen = mutation.isSuccess || mutation.isError;

  const buttonLabel = mutation.isPending
    ? "Выполняется запрос"
    : isOpen
      ? "Повторить запрос"
      : "Узнать рыночную цену";

  const buttonIcon = mutation.isPending ? (
    <Loader2 className="animate-spin" />
  ) : isOpen ? (
    <RotateCcw />
  ) : (
    <BulbIcon />
  );

  const handleButtonClick = () => {
    if (isOpen) {
      handleRetry();
    } else {
      handleRequest();
    }
  };

  return (
    <div className={className}>
      <Tooltip open={isOpen}>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="warning"
            size="ai"
            disabled={mutation.isPending}
            onClick={handleButtonClick}
          >
            {buttonIcon}
            {buttonLabel}
          </Button>
        </TooltipTrigger>

        {isOpen && (
          <TooltipContent
            side="top"
            className={cn(
              "w-[340px] rounded-[2px] p-2 text-sm shadow-lg",
              mutation.isError
                ? "bg-avito-danger-bg text-avito-danger-text"
                : "bg-avito-bg-surface border-avito-border-primary text-avito-text-primary",
            )}
          >
            {mutation.isSuccess ? (
              <AiSuggestionPopover
                status="success"
                response={mutation.data}
                onApply={onApply ? handleApply : undefined}
                onClose={mutation.reset}
              />
            ) : (
              <AiSuggestionPopover
                status="error"
                onClose={mutation.reset}
              />
            )}
          </TooltipContent>
        )}
      </Tooltip>
    </div>
  );
};
