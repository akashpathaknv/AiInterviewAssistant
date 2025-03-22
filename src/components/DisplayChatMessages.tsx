import * as React from "react";
import { ChatBubble } from "@cloudscape-design/chat-components";
import { Avatar } from "@cloudscape-design/chat-components";
import { SpaceBetween } from "@cloudscape-design/components";

export interface ChatMessageProps {
  message: string;
  timestamp: string;
  sender: 'USER' | 'BOT';
}

// Define a proper interface for the component props
interface DisplayChatMessageProps {
  messages: ChatMessageProps[];
}

export default function DisplayChatMessage(props: DisplayChatMessageProps) {
  return (
    <SpaceBetween size="m" direction="vertical">
      {props.messages.map((chatMessage: ChatMessageProps, index) => {
        const isBot = chatMessage.sender === 'BOT';
        
        const avatar = isBot ? (
          <Avatar
            color="gen-ai"
            iconName="gen-ai"
            ariaLabel="Generative AI assistant"
            tooltipText="Generative AI assistant"
          />
        ) : (
          <Avatar
            ariaLabel="John Doe"
            tooltipText="John Doe"
            initials="JD"
          />
        );

        return (
          <ChatBubble
            key={index}
            ariaLabel={`${isBot ? 'AI Assistant' : 'User'} at ${chatMessage.timestamp}`}
            type={isBot ? 'incoming' : 'outgoing'}
            avatar={avatar}
          >
            {chatMessage.message}
          </ChatBubble>
        );
      })}
    </SpaceBetween>
  );
}
