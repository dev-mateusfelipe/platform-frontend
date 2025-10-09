// src/components/MessageInput.tsx

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export function MessageInput({ value, onChange, onSubmit, isLoading }: MessageInputProps) {
  return (
    <form onSubmit={onSubmit} className="p-4 bg-gray-900 border-t border-gray-700">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={value}
          onChange={onChange}
          disabled={isLoading}
          placeholder={isLoading ? "Liz está pensando..." : "Digite sua mensagem..."}
          className="flex-1 p-2 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}