export interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  source: string;
}

export const MARKET_STATS: StatItem[] = [
  { value: 87, suffix: "%", label: "Crescimento e-commerce BR em 3 anos", source: "ABCOMM" },
  { value: 4.2, suffix: "M", label: "Lojas físicas sem presença digital", source: "SEBRAE" },
  { value: 204, prefix: "R$", suffix: "bi", label: "Movimentado no e-commerce BR", source: "ABComm / Neotrust" },
  { value: 93, prefix: "US$", suffix: "bi", label: "Mercado global de afiliados até 2033", source: "Global Growth Insights" },
];
