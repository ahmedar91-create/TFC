export interface Source {
  nom: string;
  lien: string;
}

export interface FactCheckResult {
  resume: string;
  verdict: "VRAI" | "FAUX" | "TROMPEUR" | "NON VÉRIFIABLE";
  explication_tunisien: string;
  sources: Source[];
  ui_hints: {
    couleur_verdict: string;
    icon: string;
  };
  is_tunisia_related: boolean;
}