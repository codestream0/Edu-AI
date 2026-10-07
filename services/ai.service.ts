import { api } from "@/lib/api";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type SendMessageResponse = {
  conversationId: string;
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
};

export type Conversation = {
  _id: string;
  user: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type ConversationResponse = {
  conversation: Conversation;
  messages: ChatMessage[];
};

export const sendAIMessage = async (
  message: string,
  conversationId?: string,
) => {
  const response = await api.post<{
    success: boolean;
    message: string;
    data: SendMessageResponse;
  }>("/ai-chat/chat", {
    message,
    ...(conversationId && { conversationId }),
  });

  return response.data.data;
};

export const getConversations = async () => {
  const response = await api.get<{
    success: boolean;
    data: Conversation[];
  }>("/ai-chat/conversations");

  return response.data.data;
};

export const getConversation = async (
  conversationId: string,
) => {
  const response = await api.get<{
    success: boolean;
    data: ConversationResponse;
  }>(`/ai-chat/conversations/${conversationId}`);

  return response.data.data;
};

export const deleteConversation = async (
  conversationId: string,
) => {
  const response = await api.delete<{
    success: boolean;
    message: string;
  }>(`/ai-chat/conversations/${conversationId}`);

  return response.data;
};