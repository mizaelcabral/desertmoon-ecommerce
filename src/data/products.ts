import type { Language, LocalizedText } from '../i18n';

export type ProductCategory =
  | 'All'
  | 'CBD Tinctures'
  | 'Sleep Aid'
  | 'CBD Gummies'
  | 'CBD Topicals'
  | 'CBD Bundles';

export interface SkincareProduct {
  id: string;
  name: LocalizedText;
  displayTitle: LocalizedText;
  badge: LocalizedText;
  category: Exclude<ProductCategory, 'All'>;
  volume: string;
  variant: LocalizedText;
  price: number;
  priceDisplay: string;
  image: string;
  gallery: string[];
  editorialImage: string;
  bgColor: string;
  tagline: LocalizedText;
  shortDescription: LocalizedText;
  keyIngredients: LocalizedText;
  skinType: LocalizedText;
  accentTone: string;
  colors: string[];
  packSizes: string[];
  reviewCount: number;
  pairWithId: string;
  details: { en: string[]; pt: string[] };
  features: { en: string[]; pt: string[] };
}

export const BITPAN_PRODUCTS: SkincareProduct[] = [
  {
    id: 'cbd-cbn-sleep-aid',
    name: { en: 'CBD + CBN SLEEP AID', pt: 'CBD + CBN SONO' },
    displayTitle: { en: 'CBD + CBN Sleep Aid', pt: 'CBD + CBN Sono' },
    badge: { en: 'SLEEP AID', pt: 'SONO & CALMA' },
    category: 'Sleep Aid',
    volume: '30 ml · 1500 mg',
    variant: { en: '1500MG · LAVENDER', pt: '1500MG · LAVANDA' },
    price: 79.9,
    priceDisplay: '$79.90',
    image: '/assets/product-charcoal-mask.png',
    gallery: [
      '/assets/product-charcoal-mask.png',
      '/assets/cbd-cbn.png',
      '/assets/product-clay-mask.png',
      '/assets/cbd-cbn-mulher.png',
    ],
    editorialImage: '/assets/cbd-cbn-mulher-2.png',
    bgColor: '#F5F2F7',
    tagline: {
      en: 'Restorative lavender sleep tonic with CBD, CBN, GABA, and calming ashwagandha.',
      pt: 'Tônico noturno de lavanda com CBD, CBN, GABA e ashwagandha para sono calmo.',
    },
    shortDescription: {
      en: 'SOLVENTLESS NIGHTTIME FORMULA BLENDING 50MG CBD AND 10MG CBN PER DROPPER WITH LAVENDER, GABA, AND ASHWAGANDHA FOR DEEP, CALM REST...',
      pt: 'FÓRMULA NOTURNA SEM SOLVENTES COM 50MG DE CBD E 10MG DE CBN POR DOSE, LAVANDA, GABA E ASHWAGANDHA PARA UM DESCANSO PROFUNDO...',
    },
    keyIngredients: {
      en: 'CBD + CBN · Lavender · Ashwagandha · GABA',
      pt: 'CBD + CBN · Lavanda · Ashwagandha · GABA',
    },
    skinType: { en: 'Evening & Sleep Ritual', pt: 'Ritual Noturno & Sono' },
    accentTone: '#F5F2F7',
    colors: ['LAVENDER', '1500MG', '30ML'],
    packSizes: ['1 BOTTLE', '2 PACK', '3 PACK'],
    reviewCount: 5,
    pairWithId: 'cbd-traditional-oil',
    details: {
      en: [
        '30 ML (1 OZ) AMBER GLASS DROPPER BOTTLE WITH 1500 MG TOTAL CANNABINOIDS.',
        '30 SERVINGS PER BOTTLE — 1 DROPPER DELIVERS 50 MG CBD + 10 MG CBN.',
        'SOLVENTLESS LOW-HEAT EXTRACTION USING HEAT, WATER, AND PRESSURE ONLY.',
        'INFUSED WITH MCT OIL, HEMP OIL, VITAMIN E, LAVENDER, ASHWAGANDHA & GABA.',
        'HAND-BLENDED AND BOTTLED IN SAN DIEGO, CA WITH FULL COA LAB TESTING.',
      ],
      pt: [
        'FRASCO DE VIDRO ÂMBAR 30 ML (1 OZ) COM 1500 MG TOTAIS DE CANABINOIDES.',
        '30 DOSES POR FRASCO — 1 CONTA-GOTAS ENTREGA 50 MG CBD + 10 MG CBN.',
        'EXTRAÇÃO SEM SOLVENTES A BAIXA TEMPERATURA COM CALOR, ÁGUA E PRESSÃO.',
        'COM ÓLEO MCT, ÓLEO DE CÂNHAMO, VITAMINA E, LAVANDA, ASHWAGANDHA E GABA.',
        'MISTURADO E ENVASADO À MÃO EM SAN DIEGO, CA COM LAUDO LABORATORIAL COA.',
      ],
    },
    features: {
      en: [
        'SUPPORTS DEEP, RESTORATIVE SLEEP WITHOUT MORNING GROGGINESS.',
        'HELPS EASE DAILY STRESS AND EVENING ANXIETY NATURALLY.',
        '100% ORGANIC, VEGAN, NON-GMO, AND FREE OF CHEMICAL SOLVENTS.',
        'CARBON-FREE DELIVERY DIRECT FROM OUR SAN DIEGO APOTHECARY.',
        'BACKED BY OUR 30-DAY 100% SATISFACTION GUARANTEE.',
      ],
      pt: [
        'FAVORECE UM SONO PROFUNDO E RESTAURADOR SEM SONOLÊNCIA PELA MANHÃ.',
        'AJUDA A ALIVIAR O ESTRESSE DIÁRIO E A ANSIEDADE NOTURNA NATURALMENTE.',
        '100% ORGÂNICO, VEGANO, NÃO-OGM E LIVRE DE SOLVENTES QUÍMICOS.',
        'ENTREGA CARBONO ZERO DIRETO DO NOSSO LABORATÓRIO EM SAN DIEGO.',
        'COBERTO PELA NOSSA GARANTIA DE 100% DE SATISFAÇÃO POR 30 DIAS.',
      ],
    },
  },
  {
    id: 'cbd-collagen-beauty',
    name: { en: 'CBD + COLLAGEN OIL', pt: 'ÓLEO CBD + COLÁGENO' },
    displayTitle: { en: 'CBD + Collagen Beauty', pt: 'CBD + Colágeno Beauty' },
    badge: { en: 'CBD TINCTURES', pt: 'ÓLEOS CBD' },
    category: 'CBD Tinctures',
    volume: '30 ml · 1500 mg',
    variant: { en: '1500MG · ROSE', pt: '1500MG · ROSA' },
    price: 79.9,
    priceDisplay: '$79.90',
    image: '/assets/product-clay-mask.png',
    gallery: [
      '/assets/product-clay-mask.png',
      '/assets/CBD-Collagen.png',
      '/assets/cbd-collagem-homem.png',
      '/assets/cbd-collagem-cristais.png',
    ],
    editorialImage: '/assets/cbd-collagem-homem-Details-&-features.png',
    bgColor: '#F5F2F7',
    tagline: {
      en: 'Rose-infused beauty tincture combining pure CBD, collagen, biotin, and MCT oil.',
      pt: 'Tintura beauty com aroma de rosa unindo CBD puro, colágeno, biotina e óleo MCT.',
    },
    shortDescription: {
      en: 'BOTANICAL BEAUTY ELIXIR INFUSED WITH 1500MG CBD, ROSE, COLLAGEN, AND BIOTIN TO SUPPORT RADIANT SKIN, STRONG NAILS, AND HAIR...',
      pt: 'ELIXIR BOTÂNICO BEAUTY COM 1500MG DE CBD, ROSA, COLÁGENO E BIOTINA PARA APOIAR PELE RADIANTE, UNHAS FORTES E CABELOS SAUDÁVEIS...',
    },
    keyIngredients: {
      en: '1500mg CBD · Collagen · Biotin · Rose · Vitamin E',
      pt: '1500mg CBD · Colágeno · Biotina · Rosa · Vitamina E',
    },
    skinType: { en: 'Skin, Hair & Nails', pt: 'Pele, Cabelo & Unhas' },
    accentTone: '#F5F2F7',
    colors: ['ROSE', '1500MG', '30ML'],
    packSizes: ['1 BOTTLE', '2 PACK', '3 PACK'],
    reviewCount: 4,
    pairWithId: 'cbd-cbn-sleep-aid',
    details: {
      en: [
        '30 ML (1 OZ) BEAUTY TINCTURE WITH 1500 MG SOLVENTLESS HEMP CBD.',
        '30 DAILY SERVINGS — EACH FULL DROPPER PROVIDES 50 MG PURE CBD.',
        'FORMULATED WITH COLLAGEN, BIOTIN, ROSE, MCT OIL, AND VITAMIN E.',
        'SLOW-COOKED WITHOUT SOLVENTS TO PRESERVE DELICATE BOTANICALS.',
        'SMALL-BATCH HAND-BOTTLED IN SAN DIEGO WITH THIRD-PARTY LAB COA.',
      ],
      pt: [
        'TINTURA BEAUTY 30 ML (1 OZ) COM 1500 MG DE CBD SEM SOLVENTES.',
        '30 DOSES DIÁRIAS — CADA CONTA-GOTAS FORNECE 50 MG DE CBD PURO.',
        'FORMULADA COM COLÁGENO, BIOTINA, ROSA, ÓLEO MCT E VITAMINA E.',
        'COZIMENTO LENTO SEM SOLVENTES PARA PRESERVAR OS BOTÂNICOS.',
        'ENVASADO À MÃO EM PEQUENOS LOTES EM SAN DIEGO COM LAUDO COA.',
      ],
    },
    features: {
      en: [
        'SUPPORTS SKIN ELASTICITY, HYDRATION, AND NATURAL RADIANCE.',
        'NOURISHES HAIR AND NAILS FROM WITHIN WITH DAILY BIOTIN.',
        'LIGHT FLORAL ROSE NOTE WITH ZERO ARTIFICIAL ADDITIVES.',
        'NON-GMO, ORGANIC HEMP EXTRACTED WITH HEAT, WATER & PRESSURE.',
        'PAIRS EFFORTLESSLY WITH YOUR MORNING WELLNESS RITUAL.',
      ],
      pt: [
        'APOIA A ELASTICIDADE DA PELE, HIDRATAÇÃO E LUMINOSIDADE NATURAL.',
        'NUTRE CABELOS E UNHAS DE DENTRO PARA FORA COM BIOTINA DIÁRIA.',
        'TOQUE SUAVE DE ROSA SEM ADITIVOS OU CORANTES ARTIFICIAIS.',
        'CÂNHAMO ORGÂNICO NÃO-OGM EXTRAÍDO COM CALOR, ÁGUA E PRESSÃO.',
        'COMBINA PERFEITAMENTE COM SEU RITUAL MATINAL DE BEM-ESTAR.',
      ],
    },
  },
  {
    id: 'cbd-traditional-oil',
    name: { en: 'TRADITIONAL CBD OIL', pt: 'ÓLEO CBD TRADICIONAL' },
    displayTitle: { en: 'Traditional CBD Oil', pt: 'Óleo CBD Tradicional' },
    badge: { en: 'CBD TINCTURES', pt: 'ÓLEOS CBD' },
    category: 'CBD Tinctures',
    volume: '30 ml · 1500 mg',
    variant: { en: '1500MG · NATURAL', pt: '1500MG · NATURAL' },
    price: 79.9,
    priceDisplay: '$79.90',
    image: '/assets/product-exfoliating-mask.png',
    gallery: [
      '/assets/product-exfoliating-mask.png',
      '/assets/cbd-tradional-02.png',
      '/assets/cbd-tradional-03.png',
      '/assets/cbd-tradional-04.png',
    ],
    editorialImage: '/assets/cbd-tradional-04-Details-&-features.png',
    bgColor: '#F5F2F7',
    tagline: {
      en: 'Full-spectrum daily tincture enriched with Omega-3, grape seed oil, and vitamins.',
      pt: 'Tintura full-spectrum diária com Ômega-3, óleo de semente de uva e vitaminas.',
    },
    shortDescription: {
      en: 'OUR SIGNATURE FULL-SPECTRUM CBD TINCTURE CRAFTED WITH OMEGA-3, GRAPE SEED OIL, AND VITAMINS E & D FOR DAILY IMMUNE AND CALM SUPPORT...',
      pt: 'NOSSA TINTURA FULL-SPECTRUM ASSINATURA COM ÔMEGA-3, ÓLEO DE SEMENTE DE UVA E VITAMINAS E & D PARA IMUNIDADE E EQUILÍBRIO DIÁRIO...',
    },
    keyIngredients: {
      en: 'Full Spectrum CBD · Omega 3 · Grape Seed · Vitamins E & D',
      pt: 'CBD Full Spectrum · Ômega 3 · Semente de Uva · Vitaminas E & D',
    },
    skinType: { en: 'Daily Full-Body Balance', pt: 'Equilíbrio Diário Completo' },
    accentTone: '#F5F2F7',
    colors: ['FULL SPECTRUM', '1500MG', '30ML'],
    packSizes: ['1 BOTTLE', '2 PACK', '3 PACK'],
    reviewCount: 7,
    pairWithId: 'cbd-balm-extra-strength',
    details: {
      en: [
        '30 ML (1 OZ) FULL-SPECTRUM TINCTURE WITH 1500 MG ORGANIC CBD.',
        '50 MG CBD PER DROPPER ACROSS 30 CONSISTENT DAILY SERVINGS.',
        'ENRICHED WITH OMEGA-3, GRAPE SEED OIL, MCT OIL, AND VITAMINS E & D.',
        'SOLVENTLESS EXTRACTION PRESERVES NATURAL HEMP SYNERGY.',
        'LAB-TESTED FOR PURITY AND <0.3% THC FARM BILL COMPLIANCE.',
      ],
      pt: [
        'TINTURA FULL-SPECTRUM 30 ML (1 OZ) COM 1500 MG DE CBD ORGÂNICO.',
        '50 MG DE CBD POR CONTA-GOTAS EM 30 DOSES DIÁRIAS CONSISTENTES.',
        'ENRIQUECIDA COM ÔMEGA-3, ÓLEO DE SEMENTE DE UVA, MCT E VITAMINAS E & D.',
        'EXTRAÇÃO SEM SOLVENTES QUE PRESERVA A SINERGIA NATURAL DO CÂNHAMO.',
        'TESTADA EM LABORATÓRIO PARA PUREZA E CONFORMIDADE <0.3% THC.',
      ],
    },
    features: {
      en: [
        'SUPPORTS ANTI-INFLAMMATORY RECOVERY AND IMMUNE RESILIENCE.',
        'PROMOTES CALM FOCUS AND EVERYDAY STRESS MANAGEMENT.',
        'CLEAN, EARTHY HEMP FINISH WITH ZERO SYNTHETIC FILLERS.',
        'HAND-BLENDED IN SAN DIEGO AND SHIPPED CARBON-FREE.',
        'IDEAL FOUNDATION FOR ANY DAILY CBD WELLNESS ROUTINE.',
      ],
      pt: [
        'APOIA A RECUPERAÇÃO ANTI-INFLAMATÓRIA E A IMUNIDADE DIÁRIA.',
        'PROMOVE FOCO TRANQUILO E CONTROLE NATURAL DO ESTRESSE.',
        'SABOR NATURAL DE CÂNHAMO COM ZERO ADITIVOS SINTÉTICOS.',
        'MISTURADO À MÃO EM SAN DIEGO COM ENVIO CARBONO ZERO.',
        'BASE IDEAL PARA QUALQUER ROTINA DIÁRIA DE BEM-ESTAR COM CBD.',
      ],
    },
  },
  {
    id: 'cbd-broad-spectrum',
    name: { en: 'BROAD SPECTRUM CBD', pt: 'CBD BROAD SPECTRUM' },
    displayTitle: { en: 'Broad Spectrum CBD', pt: 'CBD Broad Spectrum' },
    badge: { en: 'CBD TINCTURES', pt: 'ÓLEOS CBD' },
    category: 'CBD Tinctures',
    volume: '30 ml · 1500 mg',
    variant: { en: '1500MG · THC-FREE', pt: '1500MG · ZERO THC' },
    price: 79.0,
    priceDisplay: '$79.00',
    image: '/assets/product-hyaluronic-serum.png',
    gallery: [
      '/assets/product-hyaluronic-serum.png',
      '/assets/product-peptide-serum.png',
      '/assets/pdp-thumb-texture.png',
      '/assets/product-exfoliating-mask.png',
    ],
    editorialImage: '/assets/editorial-enzyme-cleanser.png',
    bgColor: '#F5F2F7',
    tagline: {
      en: 'THC-free broad-spectrum CBD tincture for clear-headed everyday balance and calm.',
      pt: 'Tintura broad-spectrum sem THC para equilíbrio diário com total clareza mental.',
    },
    shortDescription: {
      en: 'PURE THC-FREE BROAD SPECTRUM HEMP EXTRACT BLENDED WITH MCT, GRAPE SEED OIL, AND VITAMINS E & D FOR DAILY ANTIOXIDANT WELLNESS...',
      pt: 'EXTRATO PURO BROAD SPECTRUM ZERO THC COM ÓLEO MCT, SEMENTE DE UVA E VITAMINAS E & D PARA BEM-ESTAR ANTIOXIDANTE DIÁRIO...',
    },
    keyIngredients: {
      en: 'Broad Spectrum CBD · Grape Seed · MCT · Vitamins E & D',
      pt: 'CBD Broad Spectrum · Semente de Uva · MCT · Vitaminas E & D',
    },
    skinType: { en: 'THC-Free Daily Calm', pt: 'Calma Diária Zero THC' },
    accentTone: '#F5F2F7',
    colors: ['THC-FREE', '1500MG', '30ML'],
    packSizes: ['1 BOTTLE', '2 PACK', '3 PACK'],
    reviewCount: 6,
    pairWithId: 'cbd-gummies-boost',
    details: {
      en: [
        '30 ML (1 OZ) BROAD SPECTRUM THC-FREE TINCTURE (1500 MG CBD).',
        '30 SERVINGS — 1 FULL DROPPER DELIVERS 50 MG BROAD SPECTRUM CBD.',
        'BLENDED WITH GRAPE SEED OIL, MCT OIL, HEMP OIL & VITAMINS E & D.',
        'SOLVENTLESS EXTRACTION WITH ZERO DETECTABLE THC.',
        'THIRD-PARTY LAB TESTED FOR PURITY, POTENCY, AND PEACE OF MIND.',
      ],
      pt: [
        'TINTURA BROAD SPECTRUM ZERO THC 30 ML (1 OZ) COM 1500 MG DE CBD.',
        '30 DOSES — 1 CONTA-GOTAS ENTREGA 50 MG DE CBD BROAD SPECTRUM.',
        'COM ÓLEO DE SEMENTE DE UVA, MCT, ÓLEO DE CÂNHAMO E VITAMINAS E & D.',
        'EXTRAÇÃO SEM SOLVENTES E LIVRE DE THC DETECTÁVEL.',
        'TESTADA POR LABORATÓRIO INDEPENDENTE PARA MÁXIMA PUREZA.',
      ],
    },
    features: {
      en: [
        'IDEAL FOR PROFESSIONALS AND DAILY USE WITH ZERO THC.',
        'RICH IN ANTIOXIDANTS TO SUPPORT CELLULAR AND IMMUNE HEALTH.',
        'SMOOTH, MILD BOTANICAL TASTE FOR EASY SUBLINGUAL DROPS.',
        '100% VEGAN, ORGANIC, NON-GMO, AND SUSTAINABLY SOURCED.',
        'HAND-BOTTLED IN SAN DIEGO WITH CARBON-FREE SHIPPING.',
      ],
      pt: [
        'IDEAL PARA USO DIÁRIO E PROFISSIONAIS COM ZERO THC.',
        'RICO EM ANTIOXIDANTES PARA SAÚDE CELULAR E IMUNOLÓGICA.',
        'SABOR BOTÂNICO SUAVE PARA USO SUBLINGUAL PRÁTICO.',
        '100% VEGANO, ORGÂNICO, NÃO-OGM E DE ORIGEM SUSTENTÁVEL.',
        'ENVASADO À MÃO EM SAN DIEGO COM ENTREGA CARBONO ZERO.',
      ],
    },
  },
  {
    id: 'cbd-wellness-kit',
    name: { en: 'COMPLETE WELLNESS KIT', pt: 'KIT WELLNESS COMPLETO' },
    displayTitle: { en: 'Complete Wellness Kit', pt: 'Kit Wellness Completo' },
    badge: { en: 'CBD BUNDLES', pt: 'KITS CBD' },
    category: 'CBD Bundles',
    volume: '4 Full-Size Items',
    variant: { en: '4-PIECE BUNDLE', pt: 'KIT 4 PRODUTOS' },
    price: 419.0,
    priceDisplay: '$419.00',
    image: '/assets/product-vitamin-c-serum.png',
    gallery: [
      '/assets/product-vitamin-c-serum.png',
      '/assets/product-retinol-serum.png',
      '/assets/pdp-thumb-texture.png',
      '/assets/editorial-enzyme-cleanser.png',
    ],
    editorialImage: '/assets/editorial-enzyme-cleanser.png',
    bgColor: '#F5F2F7',
    tagline: {
      en: 'Signature 4-piece bundle with two cooling balms, traditional oil, and sleep tonic.',
      pt: 'Kit assinatura com 4 itens: dois bálsamos 5000mg, óleo tradicional e tônico sono.',
    },
    shortDescription: {
      en: 'COMPLETE FULL-SIZE WELLNESS BUNDLE FEATURING 2X EXTRA STRENGTH 5000MG BALMS, TRADITIONAL CBD OIL, AND CBD + CBN SLEEP TONIC...',
      pt: 'KIT COMPLETO COM 2 BÁLSAMOS EXTRA FORTE 5000MG, 1 ÓLEO TRADICIONAL 1500MG E 1 TÔNICO NOTURNO CBD + CBN PARA ROTINA INTEGRAL...',
    },
    keyIngredients: {
      en: '2× 5000mg Balm · 1500mg Traditional · 1500mg Sleep Tonic',
      pt: '2× Bálsamo 5000mg · Tradicional 1500mg · Tônico Sono 1500mg',
    },
    skinType: { en: 'Day, Night & Muscle Care', pt: 'Dia, Noite & Recuperação' },
    accentTone: '#F5F2F7',
    colors: ['4-PIECE KIT', 'SIGNATURE'],
    packSizes: ['1 KIT', '2 KITS'],
    reviewCount: 9,
    pairWithId: 'cbd-gummies-boost',
    details: {
      en: [
        'INCLUDES 2× CBD BALM EXTRA STRENGTH (5000 MG EACH, 8 OZ, COOLING MINT).',
        'INCLUDES 1× TRADITIONAL FULL SPECTRUM CBD OIL (1500 MG, 30 ML).',
        'INCLUDES 1× CBD + CBN SLEEP TONIC WITH LAVENDER (1500 MG, 30 ML).',
        'QUALIFIES AUTOMATICALLY FOR FREE CARBON-FREE SHIPPING ($199+).',
        'EVERY ITEM IS SOLVENTLESS, LAB-TESTED, AND CRAFTED IN SAN DIEGO.',
      ],
      pt: [
        'INCLUI 2× BÁLSAMO CBD EXTRA FORTE (5000 MG CADA, 8 OZ, MENTA).',
        'INCLUI 1× ÓLEO CBD TRADICIONAL FULL SPECTRUM (1500 MG, 30 ML).',
        'INCLUI 1× TÔNICO NOTURNO CBD + CBN LAVANDA (1500 MG, 30 ML).',
        'FRETE GRÁTIS CARBONO ZERO GARANTIDO AUTOMATICAMENTE ($199+).',
        'TODOS OS ITENS SEM SOLVENTES, COM LAUDO COA, FEITOS EM SAN DIEGO.',
      ],
    },
    features: {
      en: [
        'COMPLETE 24-HOUR RELIEF FOR BODY, MIND, AND RESTFUL SLEEP.',
        'SIGNIFICANT BUNDLE SAVINGS COMPARED TO INDIVIDUAL PURCHASE.',
        'TARGETED TOPICAL MUSCLE RELIEF PAIRED WITH DAILY TINCTURES.',
        'PRESENTED IN CURATED PACKAGING IDEAL FOR GIFTING OR HOME.',
        'COVERED BY OUR 30-DAY 100% SATISFACTION GUARANTEE.',
      ],
      pt: [
        'ALÍVIO COMPLETO 24 HORAS PARA CORPO, MENTE E SONO PROFUNDO.',
        'ECONOMIA ESPECIAL NO KIT EM RELAÇÃO À COMPRA INDIVIDUAL.',
        'ALÍVIO MUSCULAR TÓPICO COMBINADO COM TINTURAS DIÁRIAS.',
        'APRESENTAÇÃO CUIDADOSA IDEAL PARA PRESENTE OU USO PESSOAL.',
        'COBERTO PELA GARANTIA DE 100% DE SATISFAÇÃO POR 30 DIAS.',
      ],
    },
  },
  {
    id: 'cbd-balm-extra-strength',
    name: { en: 'EXTRA STRENGTH BALM', pt: 'BÁLSAMO EXTRA FORTE' },
    displayTitle: { en: 'CBD Balm Extra Strength', pt: 'Bálsamo CBD Extra Forte' },
    badge: { en: 'CBD TOPICALS', pt: 'BÁLSAMO CBD' },
    category: 'CBD Topicals',
    volume: '8 oz · 5000 mg',
    variant: { en: '5000MG · MINT', pt: '5000MG · MENTA' },
    price: 154.0,
    priceDisplay: '$154.00',
    image: '/assets/product-retinol-serum.png',
    gallery: [
      '/assets/product-retinol-serum.png',
      '/assets/product-vitamin-c-serum.png',
      '/assets/pdp-thumb-texture.png',
      '/assets/editorial-botanical-serum.png',
    ],
    editorialImage: '/assets/editorial-enzyme-cleanser.png',
    bgColor: '#F5F2F7',
    tagline: {
      en: 'High-potency 5000mg cooling mint balm for targeted muscle and joint relief care.',
      pt: 'Bálsamo potente de 5000mg com menta refrescante para músculos e articulações.',
    },
    shortDescription: {
      en: 'EXTRA STRENGTH 5000MG TOPICAL BALM WITH ORGANIC HEMP SEED OIL, BEESWAX, AND COOLING MINT FOR TARGETED MUSCLE AND JOINT RECOVERY...',
      pt: 'BÁLSAMO TÓPICO EXTRA FORTE 5000MG COM ÓLEO DE CÂNHAMO ORGÂNICO, CERA DE ABELHA E MENTA PARA ALÍVIO MUSCULAR E ARTICULAR...',
    },
    keyIngredients: {
      en: '5000mg CBD · Hemp Seed Oil · MCT · Beeswax · Mint',
      pt: '5000mg CBD · Óleo de Cânhamo · MCT · Cera de Abelha · Menta',
    },
    skinType: { en: 'Targeted Muscle & Joint', pt: 'Alívio Muscular & Articular' },
    accentTone: '#F5F2F7',
    colors: ['COOLING MINT', '5000MG', '8OZ'],
    packSizes: ['1 JAR', '2 JARS', '3 JARS'],
    reviewCount: 8,
    pairWithId: 'cbd-traditional-oil',
    details: {
      en: [
        'GENEROUS 8 OZ (227 G) JAR PACKED WITH 5000 MG PURE HEMP CBD.',
        'CRAFTED WITH MCT OIL, ORGANIC HEMP SEED OIL, BEESWAX, AND MINT.',
        'COMPLIANT <0.3% THC TOPICAL FORMULA FOR LOCALIZED APPLICATION.',
        'SOLVENTLESS EXTRACTION HAND-POURED IN SMALL SAN DIEGO BATCHES.',
        'THIRD-PARTY LAB TESTED FOR POTENCY AND CLEAN INGREDIENTS.',
      ],
      pt: [
        'POTE GENEROSO DE 8 OZ (227 G) COM 5000 MG DE CBD PURO DE CÂNHAMO.',
        'FEITO COM ÓLEO MCT, ÓLEO DE SEMENTE DE CÂNHAMO, CERA DE ABELHA E MENTA.',
        'FÓRMULA TÓPICA <0.3% THC PARA APLICAÇÃO LOCALIZADA DIRETA.',
        'EXTRAÇÃO SEM SOLVENTES ENVASADA À MÃO EM SAN DIEGO, CA.',
        'TESTADO EM LABORATÓRIO INDEPENDENTE PARA POTÊNCIA E PUREZA.',
      ],
    },
    features: {
      en: [
        'DELIVERS FAST, COOLING RELIEF TO SORE MUSCLES AND STIFF JOINTS.',
        'MELTS CLEANLY INTO SKIN WITHOUT GREASY OR HEAVY RESIDUE.',
        'IDEAL FOR POST-WORKOUT RECOVERY AND DAILY TENSION POINTS.',
        'ZERO SYNTHETIC FRAGRANCES, PARABENS, OR PETROCHEMICALS.',
        'LONG-LASTING 8 OZ VESSEL FOR MONTHS OF TARGETED CARE.',
      ],
      pt: [
        'ENTREGA ALÍVIO RÁPIDO E REFRESCANTE PARA MÚSCULOS E ARTICULAÇÕES.',
        'DERRETE SUAVEMENTE NA PELE SEM DEIXAR RESÍDUO OLEOSO.',
        'IDEAL PARA RECUPERAÇÃO PÓS-TREINO E PONTOS DE TENSÃO DIÁRIA.',
        'ZERO FRAGRÂNCIAS SINTÉTICAS, PARABENOS OU PETROQUÍMICOS.',
        'POTE DE 8 OZ DE ALTA DURABILIDADE PARA MESES DE CUIDADO.',
      ],
    },
  },
  {
    id: 'cbd-gummies-boost',
    name: { en: 'CBD GUMMIES BOOST', pt: 'GOMAS CBD BOOST' },
    displayTitle: { en: 'CBD Gummies Boost', pt: 'Gomas CBD Boost' },
    badge: { en: 'CBD GUMMIES', pt: 'GOMAS CBD' },
    category: 'CBD Gummies',
    volume: '10 Gummies · 250 mg',
    variant: { en: '250MG · STRAWBERRY', pt: '250MG · MORANGO' },
    price: 79.9,
    priceDisplay: '$79.90',
    image: '/assets/product-peptide-serum-old.png',
    gallery: [
      '/assets/product-peptide-serum-old.png',
      '/assets/pdp-thumb-texture.png',
      '/assets/category-beauty-tools.png',
      '/assets/editorial-botanical-serum.png',
    ],
    editorialImage: '/assets/editorial-enzyme-cleanser.png',
    bgColor: '#F3F3F3',
    tagline: {
      en: 'Plant-based strawberry gummies delivering 25mg of broad-spectrum CBD per piece.',
      pt: 'Gomas vegetais sabor morango com 25mg de CBD broad-spectrum por unidade.',
    },
    shortDescription: {
      en: 'DELICIOUS PLANT-BASED STRAWBERRY GUMMIES WITH 25MG BROAD SPECTRUM CBD PER PIECE — NON-GMO, LAB-TESTED, AND NON-PSYCHOACTIVE...',
      pt: 'DELICIOSAS GOMAS VEGETAIS DE MORANGO COM 25MG DE CBD BROAD SPECTRUM CADA — NÃO-OGM, TESTADAS EM LAB E NÃO PSICOATIVAS...',
    },
    keyIngredients: {
      en: '25mg Broad Spectrum CBD · Pectin · Tapioca · Strawberry',
      pt: '25mg CBD Broad Spectrum · Pectina · Tapioca · Morango',
    },
    skinType: { en: 'Daytime Calm & Uplift', pt: 'Calma & Bem-Estar Diurno' },
    accentTone: '#F3F3F3',
    colors: ['STRAWBERRY', '250MG'],
    packSizes: ['1 JAR (10)', '2 JARS (20)', '3 JARS (30)'],
    reviewCount: 6,
    pairWithId: 'cbd-broad-spectrum',
    details: {
      en: [
        '10 PLANT-BASED GUMMIES PER JAR (250 MG TOTAL BROAD SPECTRUM CBD).',
        'PRECISE 25 MG CBD PER GUMMY WITH <0.2% THC NON-PSYCHOACTIVE FORMULA.',
        'MADE WITH FRUIT PECTIN, TAPIOCA SYRUP, AND NATURAL STRAWBERRY FLAVOR.',
        '100% VEGAN, NON-GMO, AND FREE OF HIGH-FRUCTOSE CORN SYRUP.',
        'THIRD-PARTY LAB TESTED FOR CONSISTENT DOSING AND PURITY.',
      ],
      pt: [
        '10 GOMAS VEGETAIS POR POTE (250 MG TOTAIS DE CBD BROAD SPECTRUM).',
        'DOSE PRECISA DE 25 MG DE CBD POR GOMA COM <0.2% THC NÃO PSICOATIVO.',
        'FEITAS COM PECTINA DE FRUTAS, XAROPE DE TAPIOCA E SABOR MORANGO.',
        '100% VEGANAS, NÃO-OGM E LIVRES DE XAROPE DE MILHO.',
        'TESTADAS EM LABORATÓRIO PARA DOSAGEM EXATA E PUREZA.',
      ],
    },
    features: {
      en: [
        'CONVENIENT ON-THE-GO CALM WITHOUT MEASURING DROPPERS.',
        'BRIGHT NATURAL STRAWBERRY FLAVOR WITH ZERO HEMPY AFTERTASTE.',
        'SUPPORTS STEADY MOOD, FOCUS, AND DAYTIME STRESS RELIEF.',
        'CRAFTED TO DESERT MOON SAN DIEGO QUALITY STANDARDS.',
        'PACKAGED IN PROTECTIVE TRAVEL-READY JAR.',
      ],
      pt: [
        'PRATICIDADE PARA LEVAR A QUALQUER LUGAR SEM CONTA-GOTAS.',
        'SABOR NATURAL DE MORANGO SEM RETROGUSTO AMARGO.',
        'APOIA O HUMOR EQUILIBRADO, FOCO E ALÍVIO DO ESTRESSE DIURNO.',
        'PRODUZIDAS NO PADRÃO DE QUALIDADE DESERT MOON SAN DIEGO.',
        'EMBALAGEM PROTETORA PRÁTICA PARA VIAGENS E DIA A DIA.',
      ],
    },
  },
  {
    id: 'hemp-thc-gummies',
    name: { en: 'HEMP THC GUMMIES', pt: 'GOMAS THC 25MG' },
    displayTitle: { en: 'Hemp THC Gummies', pt: 'Gomas Hemp THC' },
    badge: { en: 'CBD GUMMIES', pt: 'GOMAS CBD' },
    category: 'CBD Gummies',
    volume: '10 Gummies · 250 mg',
    variant: { en: '250MG · 25MG/EA', pt: '250MG · 25MG/UN' },
    price: 79.9,
    priceDisplay: '$79.90',
    image: '/assets/product-peptide-serum.png',
    gallery: [
      '/assets/product-peptide-serum.png',
      '/assets/product-hyaluronic-serum.png',
      '/assets/pdp-thumb-texture.png',
      '/assets/product-peptide-serum-old.png',
    ],
    editorialImage: '/assets/editorial-enzyme-cleanser.png',
    bgColor: '#F5F2F7',
    tagline: {
      en: 'Hemp-derived 25mg THC plant-based gummies crafted for evening relaxation (21+).',
      pt: 'Gomas vegetais com 25mg de THC derivado do cânhamo para relaxamento noturno (21+).',
    },
    shortDescription: {
      en: 'CRAFTED WITH 25MG HEMP-DERIVED THC PER GUMMY USING TAPIOCA SYRUP AND PECTIN — LAB-TESTED, VEGAN, AND DESIGNED FOR 21+ UNWIND...',
      pt: 'FEITAS COM 25MG DE THC DO CÂNHAMO POR GOMA COM XAROPE DE TAPIOCA E PECTINA — VEGANAS, TESTADAS EM LAB E PARA ADULTOS 21+...',
    },
    keyIngredients: {
      en: '25mg Hemp-Derived THC · Pectin · Tapioca · Natural Flavors',
      pt: '25mg THC do Cânhamo · Pectina · Tapioca · Aromas Naturais',
    },
    skinType: { en: 'Evening Unwind (21+)', pt: 'Relaxamento Noturno (21+)' },
    accentTone: '#F5F2F7',
    colors: ['25MG THC', '250MG JAR'],
    packSizes: ['1 JAR (10)', '2 JARS (20)', '3 JARS (30)'],
    reviewCount: 4,
    pairWithId: 'cbd-cbn-sleep-aid',
    details: {
      en: [
        '10 VEGAN GUMMIES PER JAR — 250 MG TOTAL HEMP-DERIVED THC.',
        '25 MG PER GUMMY — START WITH HALF A GUMMY TO GAUGE TOLERANCE.',
        'PLANT-BASED PECTIN AND TAPIOCA SYRUP WITH NATURAL FRUIT FLAVORS.',
        'NON-GMO AND THIRD-PARTY LAB TESTED FOR ACCURATE POTENCY.',
        'FOR RESPONSIBLE ADULT USE (21+) ONLY. DO NOT DRIVE AFTER USE.',
      ],
      pt: [
        '10 GOMAS VEGANAS POR POTE — 250 MG TOTAIS DE THC DO CÂNHAMO.',
        '25 MG POR GOMA — COMECE COM MEIA GOMA PARA AVALIAR TOLERÂNCIA.',
        'PECTINA VEGETAL E XAROPE DE TAPIOCA COM AROMAS NATURAIS.',
        'NÃO-OGM E TESTADAS POR LABORATÓRIO INDEPENDENTE (COA).',
        'USO ADULTO RESPONSÁVEL (21+). NÃO DIRIJA APÓS O CONSUMO.',
      ],
    },
    features: {
      en: [
        'DEEP EVENING RELAXATION AND ELEVATED UNWIND RITUAL.',
        'CONSISTENT, MEASURED DOSE IN EVERY PLANT-BASED PIECE.',
        'ZERO GELATIN, SYNTHETIC DYES, OR ARTIFICIAL PRESERVATIVES.',
        'CRAFTED WITH TRACEABLE HEMP AND FULL COA TRANSPARENCY.',
        'SHIPPED DISCREETLY AND CARBON-FREE FROM SAN DIEGO, CA.',
      ],
      pt: [
        'RELAXAMENTO NOTURNO PROFUNDO PARA DESACELERAR O DIA.',
        'DOSE CONSISTENTE E PRECISA EM CADA UNIDADE VEGETAL.',
        'ZERO GELATINA, CORANTES SINTÉTICOS OU CONSERVANTES ARTIFICIAIS.',
        'CÂNHAMO RASTREÁVEL COM TRANSPARÊNCIA TOTAL DE LAUDOS COA.',
        'ENVIO DISCRETO E CARBONO ZERO DIRETO DE SAN DIEGO, CA.',
      ],
    },
  },
];

export function getProductById(id: string): SkincareProduct | undefined {
  return BITPAN_PRODUCTS.find((p) => p.id === id);
}

export function getLocalizedProductField(text: LocalizedText, lang: Language): string {
  return text[lang];
}
