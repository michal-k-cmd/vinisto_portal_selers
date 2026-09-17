// Modulový systém portálu prodejce — stejný vzor jako CML: každá položka
// menu = samostatný modul (definice lib/modules/<key>.ts, UI app/(app)/<route>/,
// data lib/platform/<key>.ts). Role se v portálu prodejce neřeší: kdo má
// prodejce, vidí všechny moduly.

export type NavChild = {
  label: string;
  /** cílová routa (může nést query) nebo absolutní URL (externí odkaz) */
  href: string;
  /** Legenda položky (tooltip v záložkách). */
  hint?: string;
  /** Externí odkaz — otevře se v nové záložce. */
  external?: boolean;
};

export type ModuleDef = {
  key: string;
  label: string;
  route: string;
  /** lucide-react ikona (název pro components/app-sidebar.tsx) */
  icon: string;
  /** Podmenu modulu (2. úroveň). */
  children?: NavChild[];
  /** Etapa přestavby, ve které modul dostane obsah (do té doby placeholder). */
  etapa?: number;
};
