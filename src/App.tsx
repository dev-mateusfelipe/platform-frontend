// src/App.tsx

import { useState } from 'react';
import axios from 'axios';
import { MessageBubble } from './components/MessageBubble';
import { MessageInput } from './components/MessageInput';

// A URL do nosso cérebro de IA na nuvem
const BACKEND_URL = 'https://mateus-brain-orchestrator-6ittgc7toq-uc.a.run.app';

// Define a estrutura de uma mensagem
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'agent';
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 1. Adiciona a mensagem do usuário à tela imediatamente
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // 2. Envia a mensagem para o nosso cérebro de IA
      const response = await axios.post(BACKEND_URL, {
        user_message: inputValue,
        batch_size: 1 // Pedimos uma única resposta por vez
      });

      // 3. Extrai a resposta da Liz do resultado
      const agentResponseText = response.data?.final_response || "Desculpe, ocorreu um erro.";

      const agentMessage: Message = {
        id: Date.now() + 1,
        text: agentResponseText,
        sender: 'agent',
      };
      setMessages((prevMessages) => [...prevMessages, agentMessage]);

    } catch (error) {
      console.error("Erro ao se comunicar com o backend:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Erro de comunicação. Não consegui falar com a Liz. Tente novamente.",
        sender: 'agent',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Cabeçalho */}
      <header className="p-4 bg-gray-800 border-b border-gray-700 shadow-md">
        <h1 className="text-xl font-semibold">Liz (Copywriter)</h1>
        <p className="text-sm text-green-400">Online</p>
      </header>

      {/* Janela de Chat */}
      <main className="flex-1 p-4 overflow-y-auto flex flex-col-reverse">
        <div className="flex flex-col">
          {messages.slice().reverse().map((msg) => (
            <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
          ))}
        </div>
      </main>

      {/* Input de Mensagem */}
      <MessageInput
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onSubmit={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;