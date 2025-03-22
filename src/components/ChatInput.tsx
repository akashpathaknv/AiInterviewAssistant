import * as React from "react";
import PromptInput from "@cloudscape-design/components/prompt-input";
import { ChatMessageProps } from "./DisplayChatMessages";
import { sendMessage } from "../services/api";

interface ChatInputProps {
    setMessages: React.Dispatch<React.SetStateAction<ChatMessageProps[]>>;
}
export default function ChatInput(chatInputProps: ChatInputProps) {
  const [value, setValue] = React.useState("");
  return (
    <PromptInput
      onChange={({ detail }) => setValue(detail.value)}
      onAction={async ({ detail }) => {
        if (detail.value.trim() === "") {
          return;
        }
        // Add user message and thinking state
        chatInputProps.setMessages((prevMessages) => [
          ...prevMessages,
          { message: detail.value, timestamp: new Date().toISOString(), sender: 'USER' },
          { message: 'Thinking...', timestamp: new Date().toISOString(), sender: 'BOT' }
        ]);

        // Make API call and update with response
        try {
          const response = await sendMessage(detail.value);
          chatInputProps.setMessages((prevMessages) => [
            ...prevMessages.slice(0, -1), // Remove thinking message
            { message: response.message, timestamp: response.timestamp, sender: 'BOT' }
          ]);
        } catch (error) {
          chatInputProps.setMessages((prevMessages) => [
            ...prevMessages.slice(0, -1), // Remove thinking message
            { message: 'Sorry, something went wrong. Please try again.', timestamp: new Date().toISOString(), sender: 'BOT' }
          ]);
        }
        setValue("");
      }}
      value={value}
      actionButtonAriaLabel="Send message"
      actionButtonIconName="send"
      ariaLabel="Prompt input with action button"
      placeholder="Ask a question"
    />
  );
}