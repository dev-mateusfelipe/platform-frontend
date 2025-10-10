// src/App.tsx (v2.0 - ARQUITETURA DE IDENTIDADE DINÂMICA)
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageBubble } from './components/MessageBubble';
import { MessageInput } from './components/MessageInput';

// A URL do nosso cérebro de IA na nuvem
const BACKEND_URL = 'https://mateus-brain-orchestrator-6ittgc7toq-uc.a.run.app';

// Define as estruturas de dados do nosso simulador
interface Message { id: number; text: string; sender: 'user' | 'agent'; }
interface User { name: string; phone: string; }

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loginName, setLoginName] = useState('');
  const [loginPhone, setLoginPhone] = useState('');

  // Efeito soberano: Roda uma única vez quando o app carrega para
  // verificar se já existe uma identidade salva na memória do navegador.
  useEffect(() => {
    const savedUser = localStorage.getItem('chat-user-mateus');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // O Guardião da Identidade: Função que lida com o "login" inicial.
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Agora lemos os valores diretamente do estado, de forma 100% segura.
    if (loginName && loginPhone) {
      const newUser = { name: loginName, phone: loginPhone };
      localStorage.setItem('chat-user-mateus', JSON.stringify(newUser));
      setUser(newUser);
    }
  };

  // O Mensageiro Soberano: Lida com o envio da mensagem para o backend.
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !user) return;

    const userMessage: Message = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      // A CHAMADA COM IDENTIDADE: Enviamos o nome e telefone salvos para o backend.
      const response = await axios.post(BACKEND_URL, {
        user_message: messageToSend,
        user_phone_number: user.phone,
        user_name: user.name,
      });

      const agentResponseText = response.data?.final_response || "Desculpe, ocorreu um erro de processamento.";
      const agentMessage: Message = { id: Date.now() + 1, text: agentResponseText, sender: 'agent' };
      setMessages((prev) => [...prev, agentMessage]);

    } catch (error) {
      console.error("Erro ao se comunicar com o backend:", error);
      const errorMessage: Message = { id: Date.now() + 1, text: "Erro de comunicação. Não consegui falar com a Liz. Tente novamente.", sender: 'agent' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- A RENDERIZAÇÃO CONDICIONAL ---

  // SE não houver usuário, renderiza a tela de login.
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <form onSubmit={handleLogin} className="p-8 bg-gray-800 rounded-lg shadow-xl flex flex-col space-y-4 w-full max-w-sm">
          <h2 className="text-xl font-bold text-center">Simulador de IA - Mateus</h2>
          <p className="text-center text-gray-400">Identifique-se com seu telefone para iniciar o teste.</p>
          <input name="name" placeholder="Seu Nome (para o chat)" required value={loginName} onChange={(e) => setLoginName(e.target.value)} className="p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input name="phone" placeholder="Seu Telefone (ex: 55119...)" required value={loginPhone} onChange={(e) => setLoginPhone(e.target.value)} className="p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
          <button type="submit" className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 font-semibold">Entrar no Simulador</button>
        </form>
      </div>
    );
  }

  // SE houver usuário, renderiza a tela de chat.
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