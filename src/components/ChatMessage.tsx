import type { ReactNode } from "react";
import { cn } from "../lib/utils";

interface ChatMessageProps {
  role: "user" | "bot";
  children: ReactNode;
  timestamp?: string;
}

export const ChatMessage = ({
  role,
  children,
  timestamp,
}: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex w-full gap-3 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground text-sm font-medium">
            AI
          </span>
        </div>
      )}

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
          isUser
            ? "bg-chat-user-bg text-chat-user-fg"
            : "bg-chat-bot-bg text-chat-bot-fg"
        )}
      >
        {role === "bot" &&
        typeof children === "string" &&
        children.includes("Thinking") ? (
          // 🔹 Animated typing dots instead of ⏳ Thinking...
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
          </div>
        ) : (
          children
        )}

        {timestamp && (
          <div
            className={cn(
              "text-xs mt-1 opacity-60",
              isUser ? "text-right" : "text-left"
            )}
          >
            {timestamp}
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-sm font-medium">U</span>
        </div>
      )}
    </div>
  );
};
