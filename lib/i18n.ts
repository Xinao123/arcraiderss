import type { Lang } from "@/lib/getLang";

type Dict = {
  // Hero
  badge: string;
  title: string;
  subtitle: string;
  postNow: string;
  openFeed: string;

  // Stats
  total: string;
  totalHint: string;
  new24h: string;
  new24hHint: string;
  activeNow: string;
  activeNowHint: string;

  // Rules
  rulesTitle: string;
  rules1: string;
  rules2: string;
  rules3: string;

  // Trending
  trendingTitle: string;
  noTags1: string;
  noTags2: string;

  // Preview
  previewTitle: string;
  previewSubtitle: string;
  previewNewPrefix: string;
  previewNewSuffix: string;
  emptyPreview: string;
  viewAll: string;

  // Cards
  cardOffer: string;
  cardWant: string;
  discordAvailable: string;
  noContact: string;
  imageAlt: string;

  // How it works
  howTitle: string;
  howSubtitle: string;
  howCta: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;

  // Footer
  footer: string;
};

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

    rulesTitle: "Regras rápidas",
    rules1: "Print obrigatório (recorta/zoom pra ficar legível).",
    rules2: "Seja específico: “Ofereço” e “Quero” bem descritos.",
    rules3: "Sem taxa, sem reserva paga, sem intermediário. Só troca.",

    trendingTitle: "Tags em alta",
    noTags1: "sem tags ainda",
    noTags2: "poste e comece a trend",

    previewTitle: "Anúncios",
    previewSubtitle: "últimas trocas publicadas pela comunidade",
    previewNewPrefix: "24h: ",
    previewNewSuffix: " novos",
    emptyPreview: "Ainda não tem anúncios. Poste e seja o primeiro.",
    viewAll: "Ver todos os anúncios",

    cardOffer: "Ofereço",
    cardWant: "Quero",
    discordAvailable: "Discord disponível",
    noContact: "sem contato",
    imageAlt: "Print do item",

    howTitle: "Como funciona",
    howSubtitle: "Três passos, zero burocracia.",
    howCta: "Postar troca",
    step1Title: "Sobe o print",
    step1Desc: "Print mostra a real. Recorta e dá zoom pra deixar o item nítido.",
    step2Title: "Escreve a troca",
    step2Desc: "“Ofereço” e “Quero” bem descritos fazem a galera te achar rapidinho.",
    step3Title: "Deixa contato",
    step3Desc: "Steam/Discord ou tag no jogo. A negociação acontece direto com você.",

    footer: "Fan-made, sem afiliação oficial.",
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

    rulesTitle: "Quick rules",
    rules1: "Screenshot required (crop/zoom so the item is readable).",
    rules2: "Be specific: clear “Offering” and “Looking for” text.",
    rules3: "No fees, no paid reservations, no middleman. Trade-only.",

    trendingTitle: "Trending tags",
    noTags1: "no tags yet",
    noTags2: "post and start the trend",

    previewTitle: "Listings",
    previewSubtitle: "latest trades posted by the community",
    previewNewPrefix: "24h: ",
    previewNewSuffix: " new",
    emptyPreview: "No listings yet. Post one and be the first.",
    viewAll: "View all listings",

    cardOffer: "Offering",
    cardWant: "Looking for",
    discordAvailable: "Discord available",
    noContact: "no contact",
    imageAlt: "Item screenshot",

    howTitle: "How it works",
    howSubtitle: "Three steps, zero bureaucracy.",
    howCta: "Post a trade",
    step1Title: "Upload the screenshot",
    step1Desc: "Screenshots keep it real. Crop and zoom so the item is clearly visible.",
    step2Title: "Write the trade",
    step2Desc: "Clear “Offering” and “Looking for” descriptions help people find you fast.",
    step3Title: "Leave a contact",
    step3Desc: "Steam/Discord or your in-game tag. Negotiation happens directly with you.",

    footer: "Fan-made. Not officially affiliated.",
  },
} satisfies Record<Lang, Dict>;
