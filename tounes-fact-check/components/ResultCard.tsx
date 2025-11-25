import React from 'react';
import { FactCheckResult } from '../types';

interface ResultCardProps {
  result: FactCheckResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  
  // Fonction pour partager via Messenger/WhatsApp (Natif)
  const shareNative = () => {
    const text = `${result.ui_hints.icon} VERDICT : ${result.verdict}\n\n${result.resume}\n\nVérifié par Tounes Fact Check : https://tounesfactcheck.netlify.app/`;
    if (navigator.share) {
      navigator.share({
        title: 'Tounes Fact Check',
        text: text,
        url: 'https://tounesfactcheck.netlify.app/'
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(text);
      alert('Résultat copié dans le presse-papier !');
    }
  };

  const getVerdictColorClass = (color: string) => {
    switch (color) {
      case 'vert': return 'bg-green-100 text-green-800 border-green-200';
      case 'rouge': return 'bg-red-100 text-red-800 border-red-200';
      case 'orange': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="animate-fade-in-up mt-8">
      
      {!result.is_tunisia_related && (
        <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm">
          <div className="flex items-center">
            <span className="text-xl mr-2">⚠️</span>
            <p className="text-sm text-yellow-700 font-medium">
              Info hors contexte Tunisie (Internationale).
            </p>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6 relative overflow-hidden">
        
        {/* Bandeau Verdict */}
        <div className="flex flex-col items-start gap-4 mb-6">
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getVerdictColorClass(result.ui_hints.couleur_verdict)} shadow-sm uppercase tracking-wide`}>
              {result.ui_hints.icon} {result.verdict}
            </span>
            <h2 className="text-xl font-bold text-slate-800 leading-snug">
                {result.resume}
            </h2>
        </div>

        {/* Explication Arabe */}
        <div className="bg-slate-50 rounded-xl p-5 mb-6 border border-slate-100">
            <div className="flex items-center gap-2 mb-3 border-b border-slate-200 pb-2">
                <img src="https://flagcdn.com/w40/tn.png" alt="Drapeau Tunisie" className="h-5 w-auto shadow-sm rounded-sm" />
                <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Explication</h3>
            </div>
            <p className="ar-text text-right text-lg text-slate-800 leading-relaxed" dir="rtl">
                {result.explication_tunisien}
            </p>
        </div>

        {/* Sources */}
        <div className="mb-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Sources Vérifiées</h3>
            <div className="flex flex-wrap gap-2">
                {result.sources.map((source, index) => (
                <a 
                    key={index} 
                    href={source.lien} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors shadow-sm"
                >
                    <span className="truncate max-w-[150px]">{source.nom}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
                ))}
            </div>
        </div>

        {/* Bouton de Partage Unique */}
        <div className="mt-4 pt-4 border-t border-slate-100">
            <button 
                onClick={shareNative}
                className="w-full flex flex-col items-center justify-center p-3 rounded-xl bg-violet-50 text-violet-700 font-semibold text-sm hover:bg-violet-100 transition-colors"
            >
                <span>💬 Partager le résultat</span>
                <span className="text-xs font-normal opacity-70">Messenger, WhatsApp, Facebook...</span>
            </button>
        </div>

      </div>
    </div>
  );
};