// src/App.tsx (v3.1 - CURA CONSTITUCIONAL DO TYPESCRIPT)
// <<<<<<<<<< INÍCIO DA CURA SOBERANA E DEFINITIVA >>>>>>>>>>
// A CURA CONSTITUCIONAL: Separamos a importação de "tipos" da importação
// de "ferramentas" (hooks), respeitando a lei soberana do seu projeto.
import { useState, useEffect } from 'react';
import type { FormEvent } from 'react'; 
// <<<<<<<<<< FIM DA CURA SOBERANA E DEFINITIVA >>>>>>>>>>
import axios from 'axios';
import { MessageBubble } from './components/MessageBubble';
import { MessageInput } from './components/MessageInput';

// A URL do nosso cérebro de IA na nuvem (preservada)
const BACKEND_URL = 'https://mateus-brain-orchestrator-6ittgc7toq-uc.a.run.app';

// Estruturas de dados (preservadas)
interface Message { id: number; text: string; sender: 'user' | 'agent'; }
interface User { name: string; phone: string; }

// A FERRAMENTA SOBERANA PARA HUMANIZAÇÃO (Preservada)
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function App() {
  // Lógica de estado e login 100% preservada
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loginName, setLoginName] = useState('');
  const [loginPhone, setLoginPhone] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('chat-user-mateus');
    if (savedUser) { setUser(JSON.parse(savedUser)); }
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (loginName && loginPhone) {
      const newUser = { name: loginName, phone: loginPhone };
      localStorage.setItem('chat-user-mateus', JSON.stringify(newUser));
      setUser(newUser);
    }
  };

  // O MENSAGEIRO SOBERANO (v2.0 - MESTRE DA CADÊNCIA) - Lógica 100% preservada
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !user) return;

    const userMessage: Message = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await axios.post(BACKEND_URL, {
        user_message: messageToSend,
        user_phone_number: user.phone,
        user_name: user.name,
      });

      const { chunks } = response.data;
      
      if (chunks && Array.isArray(chunks)) {
        for (const chunk of chunks) {
          const delay = Math.random() * (2500 - 1000) + 1000;
          await sleep(delay);

          const agentMessage: Message = {
            id: Date.now() + Math.random(),
            text: chunk,
            sender: 'agent',
          };
          setMessages(prev => [...prev, agentMessage]);
        }
      } else {
         const agentMessage: Message = {
            id: Date.now() + 1,
            text: response.data.final_response || "Ocorreu um erro na resposta.",
            sender: 'agent',
          };
          setMessages(prev => [...prev, agentMessage]);
      }

    } catch (error) {
      console.error("Erro ao se comunicar com o backend:", error);
      const errorMessage: Message = { id: Date.now() + 1, text: "Erro de comunicação. Não consegui falar com a Liz.", sender: 'agent' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


  // Lógica de renderização 100% preservada...
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <form onSubmit={handleLogin} className="p-8 bg-gray-800 rounded-lg shadow-xl flex flex-col space-y-4 w-full max-w-sm">
          <h2 className="text-xl font-bold text-center">Simulador de Whatsapp</h2>
          <p className="text-center text-gray-400">Faça login para conversar com a Liz</p>
          <input name="name" placeholder="Seu Nome" required value={loginName} onChange={(e) => setLoginName(e.target.value)} className="p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input name="phone" placeholder="Seu Telefone (ex: 55119...)" required value={loginPhone} onChange={(e) => setLoginPhone(e.target.value)} className="p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
          <button type="submit" className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 font-semibold">Entrar no Simulador</button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="p-4 bg-gray-800 border-b border-gray-700 shadow-md">
        <h1 className="text-xl font-semibold">Liz (Copywriter)</h1>
        <p className="text-sm text-green-400">Online | Testando como: {user.name}</p>
      </header>
      <main className="flex-1 p-4 overflow-y-auto flex flex-col-reverse">
        <div className="flex flex-col">
          {messages.map((msg) => (<MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />))}
        </div>
      </main>
      <MessageInput value={inputValue} onChange={(e) => setInputValue(e.target.value)} onSubmit={handleSendMessage} isLoading={isLoading}/>
    </div>
  );
}

export default App;