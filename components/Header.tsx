import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer" title="Retour au début">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-white text-xl">🛡️</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Tounes Fact Check</h1>
            <p className="text-xs text-slate-500">AI Fact Checker.</p>
          </div>
        </a>
      </div>
    </header>
  );
};