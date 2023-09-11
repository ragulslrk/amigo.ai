"use client";

import ChatHeader from "@/components/chatHeader";
import { Companion, Message } from "@prisma/client";
import { useCompletion } from "ai/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ChatForm } from "@/components/chatForm";
import {  ChatMessageProps } from "@/components/chatMsgsChild";
import {  ChatMessages } from "@/components/chatMsgsParent";



interface ChatClientProps {
    companion: Companion & {
      messages: Message[];
    };
  };


const ChatWindow = ({companion}:ChatClientProps) => { 


  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(companion.messages);
  
  const {
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    setInput,
  } = useCompletion({
    api: `/api/chat/${companion.id}`,
    onFinish(_prompt, completion) {
      const systemMessage: ChatMessageProps = {
        role: "system",
        content: completion
      };

      setMessages((current) => [...current, systemMessage]);
      setInput("");

      router.refresh();
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input
    };

    setMessages((current) => [...current, userMessage]);

    handleSubmit(e);
  }



    return ( <>
     <div className="flex flex-col h-full p-4 space-y-2">

     <ChatHeader companion={companion} />
     <ChatMessages 
        companion={companion}
        isLoading={isLoading}
        messages={messages}
      />
     <ChatForm 
        isLoading={isLoading} 
        input={input} 
        handleInputChange={handleInputChange} 
        onSubmit={onSubmit} 
      />

     </div>
    </> );
}
 
export default ChatWindow;