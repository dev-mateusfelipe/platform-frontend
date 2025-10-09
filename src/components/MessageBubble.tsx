// src/components/MessageBubble.tsx

interface MessageBubbleProps {
  text: string;
  sender: 'user' | 'agent';
}

export function MessageBubble({ text, sender }: MessageBubbleProps) {
  const isUser = sender === 'user';

  // Aplica estilos diferentes se a mensagem for do usuário ou do agente (Liz)
  const bubbleClasses = isUser
    ? 'bg-green-700 text-white self-end'
    : 'bg-gray-800 text-gray-300 self-start';

  return (
    <div className={`max-w-xl rounded-lg px-4 py-2 my-1 whitespace-pre-wrap ${bubbleClasses}`}>
      {text}
    </div>
  );
}