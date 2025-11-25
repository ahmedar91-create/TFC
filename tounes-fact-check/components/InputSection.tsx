import React, { useState, useRef, useEffect } from 'react';

interface InputSectionProps {
  onCheck: (query: string) => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onCheck, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (input.trim()) {
      onCheck(input);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (input === '' && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [input]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
      <div className="mb-4">
        <label htmlFor="fact-input" className="block text-base font-bold text-slate-800 mb-1">
          Vérifier une information
        </label>
        <p className="text-xs text-slate-500">
            Conseil : Pour un meilleur résultat, copiez le texte de la publication Facebook/Instagram.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          ref={textareaRef}
          id="fact-input"
          className="w-full p-4 bg-white text-slate-900 placeholder:text-slate-400 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-red-50 focus:border-red-500 outline-none transition-all resize-none min-h-[120px] text-lg leading-relaxed shadow-sm overflow-hidden"
          placeholder="Collez le texte de la rumeur ou le lien ici..."
          value={input}
          onChange={handleInput}
          disabled={isLoading}
          rows={3}
        />
        
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`
              px-8 py-3.5 rounded-xl font-bold text-white transition-all transform flex items-center gap-2 text-base shadow-md
              ${!input.trim() || isLoading 
                ? 'bg-slate-300 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700 hover:shadow-lg active:scale-95 hover:-translate-y-0.5'}
            `}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Vérification...</span>
              </>
            ) : (
              <>
                <span>Vérifier</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};