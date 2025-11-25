import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ResultCard } from './components/ResultCard';
import { checkFactWithGemini } from './services/geminiService';
import { FactCheckResult } from './types';

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async (query: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await checkFactWithGemini(query);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la vérification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      
      <main className="max-w-3xl mx-auto px-6 py-10 flex-grow w-full">
        <div className="mb-10 text-center animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">
            Vérifie l'info, <span className="text-red-600">stop à l'intox.</span>
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Le premier assistant IA tunisien qui analyse les rumeurs et les liens en 3 secondes. 
            Fiable, rapide et en Derja.
          </p>
        </div>

        <InputSection onCheck={handleCheck} isLoading={loading} />

        {error && (
          <div className="p-4 mb-6 rounded-lg bg-red-50 text-red-700 border border-red-200 flex items-center gap-3 animate-fade-in-up">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        )}

        {result && <ResultCard result={result} />}
        
        {!result && !loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 opacity-0 animate-[fadeInUp_0.5s_ease-out_0.2s_forwards]">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-bold text-slate-800 mb-2">Ultra Rapide</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Analyse instantanée des textes et des liens grâce à l'Intelligence Artificielle.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
              <div className="mb-3 h-9 flex items-center justify-center">
                <img src="https://flagcdn.com/w80/tn.png" alt="Drapeau Tunisie" className="h-8 w-auto object-contain shadow-sm rounded-sm" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">100% Tounsi</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Explications claires en dialecte tunisien (Derja) pour tout comprendre.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-bold text-slate-800 mb-2">Sources Fiables</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Vérification croisée avec les médias officiels et internationaux.</p>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-10 mt-auto">
        <div className="max-w-3xl mx-auto px-6 text-center">
           <p className="text-slate-500 text-sm mb-6">
             © 2024 <strong>Tounes Fact Check</strong>. Une initiative indépendante pour une information propre.
           </p>
           <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-400 font-medium uppercase tracking-wider">
             <span>Fact Check Tunisie</span>
             <span>Anti Fake News</span>
             <span>Vérification Info</span>
             <span>Intelligence Artificielle</span>
             <span>Open Source</span>
           </div>
        </div>
      </footer>
    </div>
  );
}

export default App;