import type { Lang } from "@/lib/getLang";

export const i18n = {
  pt: {
    badge: "3 passos para trocar",
    title: "Posta seu item. A galera vê. Você troca.",
    subtitle:
      "ARC Traders é um feed de trocas direto ao ponto: print do item, o que você quer em troca e um contato. Sem conta, sem cadastro chato.",
    postNow: "Postar agora",
    openFeed: "Abrir o feed",
    total: "Anúncios no total",
    totalHint: "tudo que já foi postado",
    new24h: "Novos nas 24h",
    new24hHint: "movimento recente",
    activeNow: "Ativos agora",
    activeNowHint: "aparecem no feed",
  },
  en: {
    badge: "3 steps to trade",
    title: "Post your item. People see it. You trade.",
    subtitle:
      "ARC Traders is a no-nonsense trade feed: upload a screenshot, write what you want in return, and leave a contact. No account. No annoying signup.",
    postNow: "Post now",
    openFeed: "Open the feed",
    total: "Total listings",
    totalHint: "everything ever posted",
    new24h: "New in the last 24h",
    new24hHint: "recent activity",
    activeNow: "Active right now",
    activeNowHint: "visible in the feed",
  },
} satisfies Record<Lang, any>;
