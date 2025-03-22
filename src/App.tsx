import React, { useState } from 'react';
import './App.css';
import DisplayChatMessages, { ChatMessageProps } from './components/DisplayChatMessages';
import ChatInput from './components/ChatInput';
import AiInterviewHeader from './components/Header';
import { SpaceBetween } from '@cloudscape-design/components';

function App() {
  const [chatMessages, setChatMessages] = useState<ChatMessageProps[]>([
    { message: 'Hello, how can I help you today?', timestamp: new Date().toISOString(), sender: 'BOT' }]);


  return (
    <SpaceBetween size="l">
      <AiInterviewHeader />
      <SpaceBetween size="m">
      <DisplayChatMessages 
        messages={chatMessages} />  
      </SpaceBetween>
      <ChatInput setMessages={setChatMessages} />
    </SpaceBetween>
  );
}

export default App;
