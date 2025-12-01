import { useState } from "react";
import { Send, Mic, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  onVoiceInput?: () => void;
  onImageInput?: () => void;
  disabled?: boolean;
}

export const ChatInput = ({
  onSend,
  onVoiceInput,
  onImageInput,
  disabled,
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-4 bg-background border-t border-border"
    >
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={onImageInput}
        disabled={disabled}
        className="flex-shrink-0 hover:bg-primary-light hover:text-primary"
      >
        <ImageIcon className="w-5 h-5" />
      </Button>

      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={onVoiceInput}
        disabled={disabled}
        className="flex-shrink-0 hover:bg-primary-light hover:text-primary"
      >
        <Mic className="w-5 h-5" />
      </Button>

      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        disabled={disabled}
        className={cn(
          "flex-1 bg-input border-border focus:border-primary",
          "placeholder:text-muted-foreground"
        )}
      />

      <Button
        type="submit"
        size="icon"
        disabled={!message.trim() || disabled}
        className="flex-shrink-0 bg-accent hover:bg-accent-hover text-accent-foreground"
      >
        <Send className="w-5 h-5" />
      </Button>
    </form>
  );
};
