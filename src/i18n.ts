import { createContext, createElement, useContext, useEffect, useState, type ReactNode } from 'react';
import type { ProductCategory } from './data/products';

export type Language = 'en' | 'pt';

export interface LocalizedText {
  en: string;
  pt: string;
}

export function pickText(text: LocalizedText, lang: Language): string {
  return text[lang];
}

export const CATEGORY_LABELS: Record<ProductCategory, LocalizedText> = {
  All: { en: 'All', pt: 'Todos' },
  'CBD Tinctures': { en: 'CBD Tinctures', pt: 'Óleos CBD' },
  'Sleep Aid': { en: 'Sleep Aid', pt: 'Sono & Calma' },
  'CBD Gummies': { en: 'CBD Gummies', pt: 'Gomas CBD' },
  'CBD Topicals': { en: 'CBD Topicals', pt: 'Bálsamo CBD' },
  'CBD Bundles': { en: 'CBD Bundles', pt: 'Kits CBD' },
};

export const UI_COPY = {
  en: {
    brandName: 'Desert Moon.',
    ageGate: {
      headlinePrefix: 'Are you',
      headlineItalic: '21+?',
      subtitle: 'You must be 21 or older to enter this website.',
      yes: 'YES',
      no: 'NO',
      deniedTitle: 'Access restricted (21+ only)',
      deniedBody: 'You must be 21 or older to browse Desert Moon CBD products.',
      deniedBack: 'Go back',
      legalPrefix: 'By entering this site you are agreeing to the',
      terms: 'Terms of Use',
      legalAnd: 'and',
      privacy: 'Privacy Policy',
      close: 'CLOSE',
      termsBody:
        'By entering Desert Moon CBD, you confirm you are at least 21 years of age and agree to use this storefront responsibly for personal hemp-derived CBD purchases in accordance with applicable local regulations.',
      privacyBody:
        'We do not store personal age records on external servers. Your confirmation is kept strictly in your current browser session solely to remember that you have verified your age.',
    },
    header: {
      home: 'HOME',
      explore: 'EXPLORE',
      shop: 'SHOP',
      story: 'OUR STORY',
      contact: 'CONTACT US',
      mobileHome: 'HOME — OUR STORY',
      mobileExplore: 'EXPLORE ALL',
      mobileShop: 'SHOP CBD',
      mobileStory: 'WELLNESS KITS',
      mobileContact: 'CONTACT US',
      homeMenu: [
        { label: 'Our Story', description: 'Pure solventless San Diego hemp', action: 'philosophy' as const },
        { label: 'Bestsellers', description: 'Most loved daily CBD essentials', category: 'All' as ProductCategory },
        { label: 'Wellness Kits', description: 'Complete daily & night bundles', category: 'CBD Bundles' as ProductCategory },
      ],
      exploreMenu: [
        { label: 'All Products', description: 'Complete solventless CBD lineup', category: 'All' as ProductCategory },
        { label: 'CBD Tinctures', description: 'Pure 1500mg organic hemp drops', category: 'CBD Tinctures' as ProductCategory },
        { label: 'Sleep Aid', description: 'CBD + CBN lavender night tonic', category: 'Sleep Aid' as ProductCategory },
        { label: 'CBD Gummies', description: 'Plant-based 25mg hemp edibles', category: 'CBD Gummies' as ProductCategory },
        { label: 'CBD Topicals', description: '5000mg extra strength mint balm', category: 'CBD Topicals' as ProductCategory },
        { label: 'CBD Bundles', description: 'Signature 4-piece wellness kit', category: 'CBD Bundles' as ProductCategory },
      ],
    },
    hero: {
      line1Italic: 'Your',
      line1Sans: 'Path to a',
      line2Sans: 'better',
      line2Italic: 'Tomorrow.',
      manifesto1: 'PURE, SOLVENTLESS ORGANIC HEMP THAT TRULY WORKS,',
      manifesto2: 'GOOD FOR YOU, YOUR CONSCIENCE, AND THE PLANET!',
      cta: 'EXPLORE CBD PRODUCTS',
    },
    categoryShowcase: {
      line1Sans: 'Find your own',
      line1Italic: 'daily',
      line2Italic: 'balance,',
      line2Sans: 'with pure',
      line3: 'hemp care.',
      promo: 'GET $15 OFF ON YOUR VERY FIRST ORDER!',
      shopNow: 'SHOP NOW',
      pills: {
        'CBD Tinctures': 'CBD TINCTURES',
        'Sleep Aid': 'SLEEP AID',
        'CBD Gummies': 'CBD GUMMIES',
        'CBD Topicals': 'CBD TOPICALS',
        'CBD Bundles': 'CBD BUNDLES',
      },
    },
    editorial: {
      line1: 'Pure, Organic',
      line2: 'Hemp CBD',
      line3Italic: 'Wellness.',
      body: 'CRAFTED IN SAN DIEGO WITH ORGANIC HEMP AND SUPERFOODS USING OUR SOLVENTLESS LOW-HEAT PROCESS. ONLY HEAT, WATER, AND PRESSURE — HAND-BLENDED AND BOTTLED INDIVIDUALLY TO DELIVER PURE, PLANT-BASED RELIEF FOR EVERY SEASON.',
      cta: 'EXPLORE PRODUCTS',
    },
    triptych: {
      col1Line1: 'Pure,',
      col1Line2: 'Organic,',
      col1Line3: 'Solventless',
      col1Copy1: 'ALL-NATURAL ORGANIC HEMP EXTRACTS THAT WORK,',
      col1Copy2: 'CARBON-FREE TO YOUR DOORSTEP — NO EXCEPTIONS!',
      col3Line1: 'Solventless Purity.',
      col3Italic: 'Natural',
      col3End: 'Relief.',
      col3Copy:
        'HEMP WELLNESS PACKED WITH CANNABINOIDS, VITAMINS E & D, AND BOTANICAL SUPERFOODS EXTRACTED WITHOUT SOLVENTS TO DELIVER PURE, CONSISTENT DAILY RELIEF.',
    },
    carousels: {
      cta: 'EXPLORE COLLECTION',
      exploreLabel: 'Explore',
      oilsTitle: 'CBD Oils',
      oilsDesc:
        'PURE SOLVENTLESS CBD TINCTURES CRAFTED IN SAN DIEGO. INFUSED WITH VITAMINS AND BOTANICALS FOR CALM, SLEEP, AND DAILY USE.',
      reliefTitle: 'CBD Relief',
      reliefDesc:
        'PLANT-BASED CBD GUMMIES, EXTRA STRENGTH COOLING BALM, AND COMPLETE WELLNESS KITS LAB-TESTED FOR PURE TARGETED RELIEF.',
    },
    values: {
      line1: 'Pure, Organic,',
      line2Sans: 'Solventless',
      line2Italic: 'Wellness.',
      items: [
        {
          id: 'solventless-extraction',
          title: 'SOLVENTLESS EXTRACTION',
          body: 'WE USE A LOW-TEMPERATURE SLOW-COOKING PROCESS WITH HEAT, WATER, AND PRESSURE ONLY — ZERO CHEMICAL SOLVENTS, ZERO COMPROMISES.',
        },
        {
          id: 'organic-san-diego-hemp',
          title: 'ORGANIC SAN DIEGO HEMP',
          body: 'EVERY FORMULA IS PURE, SUSTAINABLE, ORGANIC, VEGAN, AND NON-GMO — HAND-BLENDED AND BOTTLED INDIVIDUALLY IN SAN DIEGO, CA.',
        },
        {
          id: 'carbon-free-delivery',
          title: 'CARBON-FREE DELIVERY',
          body: 'WE PARTNER DIRECTLY WITH ORGANIC HEMP FARMERS TO SIMPLIFY THE SUPPLY CHAIN AND DELIVER ALL-NATURAL CBD CARBON-FREE TO YOU.',
        },
        {
          id: 'lab-tested-potency',
          title: 'LAB-TESTED POTENCY',
          body: 'THIRD-PARTY LAB TESTED WITH FULL COA TRANSPARENCY AND PAIRED WITH SUPERFOODS LIKE COLLAGEN, BIOTIN, GABA, AND ASHWAGANDHA.',
        },
      ],
    },
    newsletter: {
      line1Sans: 'Sign up for',
      line1Italic: '$15 off',
      line2Italic: 'your first',
      line2Sans: 'order and CBD',
      line3: 'updates.',
      placeholder: 'ENTER YOUR EMAIL',
      subscribed: "YOU'RE ON THE LIST. CHECK YOUR INBOX FOR $15 OFF.",
      privacyPrefix: 'WE CARE ABOUT YOUR DATA. READ OUR',
      privacyLink: 'PRIVACY POLICY',
      privacyNote:
        'We only send Desert Moon CBD wellness notes, batch releases, and your $15 welcome offer—unsubscribe anytime in one click.',
      guarantees: [
        {
          title: 'SOLVENTLESS PURE',
          line1: 'HEAT, WATER & PRESSURE ONLY.',
          line2: 'ZERO HARSH CHEMICALS.',
        },
        {
          title: 'FREE SHIPPING $199+',
          line1: 'CARBON-FREE DELIVERY TO',
          line2: 'YOUR DOORSTEP NATIONWIDE.',
        },
        {
          title: '5 STAR SUPPORT',
          line1: "WE'RE HERE FOR YOU",
          line2Prefix: 'ANYTIME,',
          email: 'DESERTMOONCBD@GMAIL.COM',
        },
        {
          title: '30-DAY GUARANTEE',
          line1: '100% SATISFACTION POLICY.',
          line2: 'EASY 30-DAY RETURNS.',
        },
        {
          title: 'KIND TO PLANET',
          line1: 'GOOD FOR YOU, YOUR',
          line2: 'CONSCIENCE, AND THE PLANET.',
        },
      ],
    },
    footer: {
      columns: [
        {
          heading: 'SHOP',
          links: [
            { label: 'CBD OILS', action: 'shop' as const, category: 'CBD Tinctures' as ProductCategory },
            { label: 'SLEEP AID', action: 'shop' as const, category: 'Sleep Aid' as ProductCategory },
            { label: 'CBD GUMMIES', action: 'shop' as const, category: 'CBD Gummies' as ProductCategory },
            { label: 'WELLNESS KIT', action: 'shop' as const, category: 'CBD Bundles' as ProductCategory },
          ],
        },
        {
          heading: 'SUPPORT',
          links: [
            { label: 'CONTACT US', action: 'contact' as const },
            { label: 'SHIPPING POLICY', action: 'values' as const },
            { label: 'REFUND POLICY', action: 'values' as const },
            { label: 'FAQS', action: 'values' as const },
          ],
        },
        {
          heading: 'COMPANY',
          links: [
            { label: 'OUR STORY', action: 'philosophy' as const },
            { label: 'LAB REPORTS', action: 'values' as const },
            { label: 'OUR MISSION', action: 'philosophy' as const },
            { label: 'SAN DIEGO, CA', action: 'contact' as const },
          ],
        },
        {
          heading: 'LEGAL',
          links: [
            { label: 'TERMS OF SERVICE', action: 'philosophy' as const },
            { label: 'PRIVACY POLICY', action: 'newsletter' as const },
            { label: '21+ & FDA NOTICE', action: 'philosophy' as const },
          ],
        },
      ],
      copyright: '© 2026 DESERT MOON CBD LLC. ALL RIGHTS RESERVED.',
    },
    pdp: {
      home: 'HOME',
      reviewsLink: 'CUSTOMER REVIEWS',
      formulaLabel: 'FORMULA',
      packSizeLabel: 'PACK SIZE',
      qtyLabel: 'QTY',
      addToCart: 'ADD TO CART',
      inCartSuffix: 'IN CART',
      viewBag: 'VIEW BAG & CHECKOUT',
      pairWith: 'PAIR IT WITH',
      selectOptions: 'SELECT OPTIONS',
      badges: [
        ['30 DAYS RETURN', ''],
        ['FREE OVER $199', ''],
        ['100% QUALITY', 'GUARANTEE'],
        ['VEGAN & NON-GMO', 'LAB TESTED'],
      ],
      allAboutItalic: 'all about the',
      allAboutCaps: 'PRODUCT',
      tabs: {
        description: 'DESCRIPTION',
        reviews: 'REVIEWS',
        care: 'USAGE & COA',
        faqs: 'FAQS',
      },
      detailsHeading1: 'Details &',
      detailsHeading2: 'features',
      productDetails: 'PRODUCT DETAILS',
      productFeatures: 'PRODUCT FEATURES',
      customerHeading1: 'Customer',
      customerHeading2: 'reviews',
      writeReview: 'WRITE A REVIEW',
      yourName: 'YOUR NAME',
      reviewHeadline: 'REVIEW HEADLINE',
      shareExperience: 'SHARE YOUR EXPERIENCE...',
      submitReview: 'SUBMIT REVIEW',
      careHeading1: 'Usage &',
      careHeading2: 'storage guide',
      careIntro:
        'STORE IN A COOL, DARK PLACE AWAY FROM DIRECT HEAT AND SUNLIGHT TO PRESERVE SOLVENTLESS CANNABINOID POTENCY.',
      careBullets: [
        '• SHAKE TINCTURES GENTLY BEFORE EACH USE AND PLACE 1 FULL DROPPER UNDER THE TONGUE.',
        '• FOR TOPICAL BALM, MASSAGE GENEROUSLY INTO TARGETED MUSCLES AND JOINTS AS NEEDED.',
        '• EVERY BATCH IS THIRD-PARTY LAB TESTED (COA) FOR PURITY, POTENCY, AND <0.3% THC COMPLIANCE.',
        '• ADULT USE (21+). CONSULT A PHYSICIAN BEFORE USE IF PREGNANT, NURSING, OR TAKING MEDICATION.',
      ],
      faqHeading1: 'Frequently',
      faqHeading2: 'asked questions',
      faqs: [
        {
          q: 'HOW IS DESERT MOON CBD EXTRACTED?',
          a: 'WE USE A SOLVENTLESS LOW-TEMPERATURE SLOW-COOKING PROCESS WITH ONLY HEAT, WATER, AND PRESSURE — HAND-BLENDED IN SAN DIEGO, CA.',
        },
        {
          q: 'ARE YOUR PRODUCTS LAB-TESTED AND VEGAN?',
          a: 'YES. EVERY BATCH IS THIRD-PARTY LAB TESTED WITH FULL COA VERIFICATION, MADE FROM ORGANIC, NON-GMO, PLANT-BASED HEMP.',
        },
        {
          q: 'WHAT IS YOUR SHIPPING AND RETURN POLICY?',
          a: 'ENJOY FREE CARBON-FREE SHIPPING ON ORDERS OVER $199 AND OUR 30-DAY 100% SATISFACTION GUARANTEE ON ALL REGULAR-PRICED ITEMS.',
        },
      ],
      relatedHeading1: 'Take',
      relatedHeading2: 'another look',
      initialReviews: [
        {
          id: 'rev-1',
          author: 'Elena M.',
          date: 'October 2026',
          rating: 5,
          title: 'Deepest, calmest sleep I have had all year',
          body: 'The solventless lavender sleep tonic works gently without morning grogginess. You can immediately taste how pure the botanical extract is.',
        },
        {
          id: 'rev-2',
          author: 'Camila R.',
          date: 'September 2026',
          rating: 5,
          title: 'Clean ingredients and noticeable daily calm',
          body: 'Knowing it is hand-blended in San Diego without chemical solvents makes all the difference. My stress levels feel much more balanced.',
        },
        {
          id: 'rev-3',
          author: 'Hannah K.',
          date: 'August 2026',
          rating: 5,
          title: 'Extra strength mint balm is a lifesaver',
          body: 'Cooling, fast-absorbing, and super potent after workouts. Fast carbon-free delivery and thoughtful packaging.',
        },
      ],
    },
    drawers: {
      titles: {
        shop: 'Desert Moon CBD Collection',
        search: 'Search CBD Formulas',
        cartBag: 'Shopping Bag',
        cartCheckout: 'Checkout',
        cartConfirmed: 'Order Confirmed',
        account: 'Your Account',
        contact: 'Contact Desert Moon',
        philosophy: 'Your Path to a Better Tomorrow',
      },
      subtitles: {
        shopCount: 'solventless hemp essentials',
        search: 'Filter by formula, benefit, or botanical',
        cartConfirmed: 'Receipt #DM-2048',
        cartEmpty: 'Your bag is currently empty',
        account: 'Track orders and wellness subscriptions',
        contact: 'San Diego support · replies within 2 business days',
        philosophy: 'Pure organic hemp, carbon-free to your doorstep',
      },
      searchPlaceholder: 'Search sleep aid, balm, gummies, collagen...',
      noResults: 'No formulas matched',
      clearSearch: 'Clear Search',
      added: 'Added',
      addToCart: 'Add to Cart',
      addShort: 'Add',
      orderConfirmedTitle: 'Order #DM-2048 Confirmed',
      orderConfirmedBody:
        'Thank you for choosing Desert Moon CBD. Your carbon-neutral parcel from San Diego is being prepared.',
      continueExploring: 'Continue Exploring',
      emptyBagTitle: 'Your bag is empty',
      emptyBagBody: 'Discover pure, solventless organic hemp formulas crafted in San Diego.',
      exploreAll: 'Explore All Products',
      freeShippingUnlocked: 'You unlocked complimentary carbon-free shipping ($199+).',
      freeShippingRemainingPrefix: 'Add',
      freeShippingRemainingSuffix: 'more for free carbon-free shipping ($199+).',
      shipping: 'Shipping',
      free: 'Free',
      subtotal: 'Subtotal',
      totalDue: 'Total Due',
      proceedCheckout: 'Proceed to Checkout',
      orderSummary: 'Order Summary',
      editOrDelete: 'You can edit or delete items below',
      remove: 'Remove',
      delete: 'Delete',
      shippingInfo: 'Shipping Information',
      fullName: 'Full Name',
      emailAddress: 'Email Address',
      streetAddress: 'Street Address',
      cityPostal: 'City & Postal Code',
      completeOrder: 'Complete Order',
      signedIn: 'Signed in',
      noOrders: 'No active orders yet. Explore our daily CBD essentials to build your ritual.',
      browseShop: 'Browse Shop',
      signOut: 'Sign Out',
      accountIntro:
        'Sign in with your email to view past orders, manage CBD subscriptions, and access COA batch reports.',
      continueBtn: 'Continue',
      messageReceived: 'Message Received',
      messageReceivedBody:
        'Our Desert Moon CBD team in Encinitas, CA replies within two business days.',
      sendAnother: 'Send Another Note',
      contactIntro:
        'Questions about dosage, COA lab reports, or orders? Write to us or call 1-(760) 782-2506 · 963 Urania Ave, Encinitas, CA 92024.',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      messageLabel: 'Message',
      messagePlaceholder: 'How can we help?',
      sendMessage: 'Send Message',
      philosophyQuote: 'Good for you. Good for your conscience. And good for the planet.',
      philosophyP1:
        'Our mission is to help connect people and the planet in a sustainable way. We work directly with organic hemp farmers to simplify the supply chain and deliver all-natural CBD to your doorstep carbon free.',
      philosophyP2:
        'Processed in San Diego, CA using a solventless low-temperature slow-cooking method — heat, water, and pressure only — every bottle is hand-blended with pure superfoods, vegan, and non-GMO.',
      inBag: 'in bag',
      viewBagCheckout: 'View Bag & Checkout',
    },
  },
  pt: {
    brandName: 'Desert Moon.',
    ageGate: {
      headlinePrefix: 'Você tem',
      headlineItalic: '21+?',
      subtitle: 'Você precisa ter 21 anos ou mais para entrar neste site.',
      yes: 'SIM',
      no: 'NÃO',
      deniedTitle: 'Acesso restrito (maiores de 21)',
      deniedBody: 'Você precisa ter 21 anos ou mais para navegar nos produtos Desert Moon CBD.',
      deniedBack: 'Voltar',
      legalPrefix: 'Ao entrar neste site você concorda com os',
      terms: 'Termos de Uso',
      legalAnd: 'e a',
      privacy: 'Política de Privacidade',
      close: 'FECHAR',
      termsBody:
        'Ao entrar na Desert Moon CBD, você confirma ter pelo menos 21 anos de idade e concorda em utilizar esta loja de forma responsável para compras pessoais de produtos de CBD derivado de cânhamo, conforme as normas locais aplicáveis.',
      privacyBody:
        'Não armazenamos registros pessoais de idade em servidores externos. Sua confirmação é mantida estritamente na sessão atual do navegador apenas para lembrar que você já verificou sua idade.',
    },
    header: {
      home: 'INÍCIO',
      explore: 'EXPLORAR',
      shop: 'LOJA',
      story: 'HISTÓRIA',
      contact: 'CONTATO',
      mobileHome: 'INÍCIO — NOSSA HISTÓRIA',
      mobileExplore: 'EXPLORAR TUDO',
      mobileShop: 'LOJA CBD',
      mobileStory: 'KITS WELLNESS',
      mobileContact: 'CONTATO',
      homeMenu: [
        { label: 'Nossa História', description: 'Cânhamo puro sem solventes de San Diego', action: 'philosophy' as const },
        { label: 'Mais Vendidos', description: 'Essenciais diários de CBD favoritos', category: 'All' as ProductCategory },
        { label: 'Kits Wellness', description: 'Combos completos para dia e noite', category: 'CBD Bundles' as ProductCategory },
      ],
      exploreMenu: [
        { label: 'Todos Produtos', description: 'Linha completa de CBD sem solventes', category: 'All' as ProductCategory },
        { label: 'Óleos CBD', description: 'Tinturas orgânicas puras de 1500mg', category: 'CBD Tinctures' as ProductCategory },
        { label: 'Sono & Calma', description: 'Tônico noturno CBD + CBN lavanda', category: 'Sleep Aid' as ProductCategory },
        { label: 'Gomas CBD', description: 'Gomas vegetais com 25mg por unidade', category: 'CBD Gummies' as ProductCategory },
        { label: 'Bálsamo CBD', description: 'Bálsamo extra forte 5000mg menta', category: 'CBD Topicals' as ProductCategory },
        { label: 'Kits CBD', description: 'Kit assinatura completo de 4 itens', category: 'CBD Bundles' as ProductCategory },
      ],
    },
    hero: {
      line1Italic: 'Seu',
      line1Sans: 'Caminho para',
      line2Sans: 'um novo',
      line2Italic: 'Amanhã.',
      manifesto1: 'CÂNHAMO ORGÂNICO PURO E SEM SOLVENTES QUE AGE,',
      manifesto2: 'BOM PARA VOCÊ, SUA CONSCIÊNCIA E O PLANETA!',
      cta: 'EXPLORAR PRODUTOS CBD',
    },
    categoryShowcase: {
      line1Sans: 'Encontre seu',
      line1Italic: 'ritmo',
      line2Italic: 'natural,',
      line2Sans: 'com puro',
      line3: 'bem-estar.',
      promo: 'GANHE $15 OFF NO SEU PRIMEIRO PEDIDO!',
      shopNow: 'COMPRAR',
      pills: {
        'CBD Tinctures': 'ÓLEOS CBD',
        'Sleep Aid': 'SONO & CALMA',
        'CBD Gummies': 'GOMAS CBD',
        'CBD Topicals': 'BÁLSAMO CBD',
        'CBD Bundles': 'KITS CBD',
      },
    },
    editorial: {
      line1: 'Puro, Natural',
      line2: 'CBD Puro',
      line3Italic: 'Botânico.',
      body: 'FEITO EM SAN DIEGO COM CÂNHAMO ORGÂNICO E SUPERFOODS EM PROCESSO SEM SOLVENTES A BAIXA TEMPERATURA. APENAS CALOR, ÁGUA E PRESSÃO — MISTURADO E ENVASADO À MÃO PARA ENTREGAR ALÍVIO PURO E VEGETAL EM TODAS AS ESTAÇÕES.',
      cta: 'EXPLORAR PRODUTOS',
    },
    triptych: {
      col1Line1: 'Puro,',
      col1Line2: 'Orgânico,',
      col1Line3: 'Natural',
      col1Copy1: 'EXTRATOS ORGÂNICOS DE CÂNHAMO QUE FUNCIONAM,',
      col1Copy2: 'ENTREGA CARBONO ZERO NA SUA PORTA — SEM EXCEÇÃO!',
      col3Line1: 'Pureza Sem Solvente.',
      col3Italic: 'Alívio',
      col3End: 'Real.',
      col3Copy:
        'BEM-ESTAR COM CANABINOIDES, VITAMINAS E & D E SUPERFOODS BOTÂNICOS EXTRAÍDOS SEM SOLVENTES PARA ENTREGAR ALÍVIO DIÁRIO PURO E CONSISTENTE.',
    },
    carousels: {
      cta: 'VER COLEÇÃO',
      exploreLabel: 'Explorar',
      oilsTitle: 'Óleos CBD',
      oilsDesc:
        'TINTURAS DE CBD SEM SOLVENTES FEITAS EM SAN DIEGO. COM VITAMINAS E BOTÂNICOS PARA CALMA, SONO E EQUILÍBRIO DIÁRIO.',
      reliefTitle: 'Alívio CBD',
      reliefDesc:
        'GOMAS VEGETAIS DE CBD, BÁLSAMO REFRESCANTE EXTRA FORTE E KITS COMPLETOS TESTADOS EM LABORATÓRIO PARA ALÍVIO PURO.',
    },
    values: {
      line1: 'Puro, Orgânico,',
      line2Sans: 'Bem-Estar',
      line2Italic: 'Natural.',
      items: [
        {
          id: 'solventless-extraction',
          title: 'EXTRAÇÃO SEM SOLVENTES',
          body: 'USAMOS COZIMENTO LENTO A BAIXA TEMPERATURA APENAS COM CALOR, ÁGUA E PRESSÃO — ZERO SOLVENTES QUÍMICOS, ZERO CONCESSÕES.',
        },
        {
          id: 'organic-san-diego-hemp',
          title: 'CÂNHAMO DE SAN DIEGO',
          body: 'CADA FÓRMULA É PURA, SUSTENTÁVEL, ORGÂNICA, VEGANA E NÃO-OGM — MISTURADA E ENVASADA À MÃO EM SAN DIEGO, CALIFÓRNIA.',
        },
        {
          id: 'carbon-free-delivery',
          title: 'ENTREGA CARBONO ZERO',
          body: 'TRABALHAMOS DIRETO COM PRODUTORES ORGÂNICOS PARA SIMPLIFICAR A CADEIA E ENTREGAR CBD NATURAL CARBONO ZERO ATÉ VOCÊ.',
        },
        {
          id: 'lab-tested-potency',
          title: 'POTÊNCIA TESTADA (COA)',
          body: 'LAUDOS LABORATORIAIS INDEPENDENTES E SUPERFOODS COMO COLÁGENO, BIOTINA, GABA E ASHWAGANDHA PARA RESULTADOS REAIS.',
        },
      ],
    },
    newsletter: {
      line1Sans: 'Ganhe',
      line1Italic: '$15 off',
      line2Italic: 'na primeira',
      line2Sans: 'compra e novidades',
      line3: 'de CBD.',
      placeholder: 'DIGITE SEU E-MAIL',
      subscribed: 'VOCÊ ESTÁ NA LISTA. CONFIRA SEU E-MAIL PARA $15 OFF.',
      privacyPrefix: 'CUIDAMOS DOS SEUS DADOS. LEIA A',
      privacyLink: 'POLÍTICA DE PRIVACIDADE',
      privacyNote:
        'Enviamos apenas lançamentos Desert Moon CBD, notas de pureza e seu cupom de $15 — cancele quando quiser em um clique.',
      guarantees: [
        {
          title: 'PURO SEM SOLVENTE',
          line1: 'APENAS CALOR, ÁGUA E PRESSÃO.',
          line2: 'ZERO QUÍMICOS AGRESSIVOS.',
        },
        {
          title: 'FRETE GRÁTIS $199+',
          line1: 'ENTREGA CARBONO ZERO DIRETO',
          line2: 'NA SUA PORTA COM AGILIDADE.',
        },
        {
          title: 'SUPORTE 5 ESTRELAS',
          line1: 'ESTAMOS AQUI POR VOCÊ',
          line2Prefix: 'SEMPRE,',
          email: 'DESERTMOONCBD@GMAIL.COM',
        },
        {
          title: 'GARANTIA 30 DIAS',
          line1: '100% SATISFAÇÃO GARANTIDA.',
          line2: 'TROCA FÁCIL EM 30 DIAS.',
        },
        {
          title: 'GENTIL AO PLANETA',
          line1: 'BOM PARA VOCÊ, SUA',
          line2: 'CONSCIÊNCIA E O PLANETA.',
        },
      ],
    },
    footer: {
      columns: [
        {
          heading: 'LOJA',
          links: [
            { label: 'ÓLEOS CBD', action: 'shop' as const, category: 'CBD Tinctures' as ProductCategory },
            { label: 'SONO & CALMA', action: 'shop' as const, category: 'Sleep Aid' as ProductCategory },
            { label: 'GOMAS CBD', action: 'shop' as const, category: 'CBD Gummies' as ProductCategory },
            { label: 'KIT WELLNESS', action: 'shop' as const, category: 'CBD Bundles' as ProductCategory },
          ],
        },
        {
          heading: 'SUPORTE',
          links: [
            { label: 'FALE CONOSCO', action: 'contact' as const },
            { label: 'POLÍTICA DE ENVIO', action: 'values' as const },
            { label: 'DEVOLUÇÕES', action: 'values' as const },
            { label: 'PERGUNTAS (FAQ)', action: 'values' as const },
          ],
        },
        {
          heading: 'EMPRESA',
          links: [
            { label: 'NOSSA HISTÓRIA', action: 'philosophy' as const },
            { label: 'LAUDOS (COA)', action: 'values' as const },
            { label: 'NOSSA MISSÃO', action: 'philosophy' as const },
            { label: 'SAN DIEGO, CA', action: 'contact' as const },
          ],
        },
        {
          heading: 'LEGAL',
          links: [
            { label: 'TERMOS DE USO', action: 'philosophy' as const },
            { label: 'PRIVACIDADE', action: 'newsletter' as const },
            { label: 'AVISO 21+ E FDA', action: 'philosophy' as const },
          ],
        },
      ],
      copyright: '© 2026 DESERT MOON CBD LLC. TODOS OS DIREITOS RESERVADOS.',
    },
    pdp: {
      home: 'INÍCIO',
      reviewsLink: 'AVALIAÇÕES',
      formulaLabel: 'FÓRMULA',
      packSizeLabel: 'TAMANHO',
      qtyLabel: 'QTD',
      addToCart: 'ADICIONAR À SACOLA',
      inCartSuffix: 'NA SACOLA',
      viewBag: 'VER SACOLA & CHECKOUT',
      pairWith: 'COMBINE COM',
      selectOptions: 'VER OPÇÕES',
      badges: [
        ['30 DIAS DEVOLUÇÃO', ''],
        ['GRÁTIS ACIMA $199', ''],
        ['100% QUALIDADE', 'GARANTIDA'],
        ['VEGANO & PURO', 'LAUDO COA'],
      ],
      allAboutItalic: 'tudo sobre o',
      allAboutCaps: 'PRODUTO',
      tabs: {
        description: 'DESCRIÇÃO',
        reviews: 'AVALIAÇÕES',
        care: 'USO & COA',
        faqs: 'FAQS',
      },
      detailsHeading1: 'Detalhes &',
      detailsHeading2: 'benefícios',
      productDetails: 'DETALHES DO PRODUTO',
      productFeatures: 'DIFERENCIAIS DA FÓRMULA',
      customerHeading1: 'Avaliações de',
      customerHeading2: 'clientes',
      writeReview: 'ESCREVER AVALIAÇÃO',
      yourName: 'SEU NOME',
      reviewHeadline: 'TÍTULO DA AVALIAÇÃO',
      shareExperience: 'CONTE SUA EXPERIÊNCIA...',
      submitReview: 'ENVIAR AVALIAÇÃO',
      careHeading1: 'Guia de uso &',
      careHeading2: 'conservação',
      careIntro:
        'CONSERVE EM LOCAL FRESCO E ESCURO, LONGE DE CALOR E LUZ SOLAR, PARA PRESERVAR A POTÊNCIA DOS CANABINOIDES SEM SOLVENTES.',
      careBullets: [
        '• AGITE SUAVEMENTE AS TINTURAS ANTES DE USAR E APLIQUE 1 CONTA-GOTAS SOB A LÍNGUA.',
        '• NO BÁLSAMO TÓPICO, MASSAGEIE GENEROSAMENTE NOS MÚSCULOS E ARTICULAÇÕES DESEJADOS.',
        '• CADA LOTE POSSUI LAUDO LABORATORIAL (COA) DE PUREZA, POTÊNCIA E CONFORMIDADE <0.3% THC.',
        '• USO ADULTO (21+). CONSULTE UM MÉDICO SE ESTIVER GRÁVIDA, AMAMENTANDO OU USANDO MEDICAÇÃO.',
      ],
      faqHeading1: 'Perguntas',
      faqHeading2: 'frequentes',
      faqs: [
        {
          q: 'COMO É FEITA A EXTRAÇÃO DA DESERT MOON CBD?',
          a: 'USAMOS UM PROCESSO SEM SOLVENTES A BAIXA TEMPERATURA COM APENAS CALOR, ÁGUA E PRESSÃO — MISTURADO À MÃO EM SAN DIEGO, CA.',
        },
        {
          q: 'OS PRODUTOS SÃO VEGANOS E TESTADOS EM LABORATÓRIO?',
          a: 'SIM. CADA LOTE É TESTADO POR LABORATÓRIO INDEPENDENTE (COA), FEITO COM CÂNHAMO ORGÂNICO, NÃO-OGM E 100% VEGETAL.',
        },
        {
          q: 'QUAL É A POLÍTICA DE FRETE E DEVOLUÇÃO?',
          a: 'FRETE GRÁTIS CARBONO ZERO EM PEDIDOS ACIMA DE $199 E GARANTIA DE 100% DE SATISFAÇÃO POR 30 DIAS EM ITENS DE PREÇO REGULAR.',
        },
      ],
      relatedHeading1: 'Veja',
      relatedHeading2: 'também',
      initialReviews: [
        {
          id: 'rev-1',
          author: 'Elena M.',
          date: 'Outubro 2026',
          rating: 5,
          title: 'O sono mais profundo e calmo do ano',
          body: 'O tônico noturno de lavanda age suavemente sem causar sonolência pela manhã. Dá para sentir a pureza do extrato botânico.',
        },
        {
          id: 'rev-2',
          author: 'Camila R.',
          date: 'Setembro 2026',
          rating: 5,
          title: 'Ingredientes limpos e calma real no dia a dia',
          body: 'Saber que é produzido em San Diego sem solventes químicos faz toda a diferença. Meu nível de estresse ficou muito mais equilibrado.',
        },
        {
          id: 'rev-3',
          author: 'Hannah K.',
          date: 'Agosto 2026',
          rating: 5,
          title: 'O bálsamo extra forte de menta é incrível',
          body: 'Refrescante, absorve rápido e muito potente após treinos. Entrega carbono zero ágil e embalagem impecável.',
        },
      ],
    },
    drawers: {
      titles: {
        shop: 'Coleção Desert Moon CBD',
        search: 'Buscar Fórmulas CBD',
        cartBag: 'Sacola de Compras',
        cartCheckout: 'Finalizar Pedido',
        cartConfirmed: 'Pedido Confirmado',
        account: 'Sua Conta',
        contact: 'Contato Desert Moon',
        philosophy: 'Seu Caminho para um Amanhã Melhor',
      },
      subtitles: {
        shopCount: 'essenciais de cânhamo sem solventes',
        search: 'Filtre por fórmula, benefício ou botânico',
        cartConfirmed: 'Recibo #DM-2048',
        cartEmpty: 'Sua sacola está vazia no momento',
        account: 'Acompanhe pedidos e assinaturas',
        contact: 'Suporte San Diego · resposta em até 2 dias úteis',
        philosophy: 'Cânhamo orgânico puro, carbono zero na sua porta',
      },
      searchPlaceholder: 'Buscar sono, bálsamo, gomas, colágeno...',
      noResults: 'Nenhuma fórmula encontrada para',
      clearSearch: 'Limpar Busca',
      added: 'Adicionado',
      addToCart: 'Adicionar',
      addShort: 'Add',
      orderConfirmedTitle: 'Pedido #DM-2048 Confirmado',
      orderConfirmedBody:
        'Obrigado por escolher a Desert Moon CBD. Seu envio carbono zero de San Diego está sendo preparado.',
      continueExploring: 'Continuar Explorando',
      emptyBagTitle: 'Sua sacola está vazia',
      emptyBagBody: 'Descubra fórmulas puras de cânhamo orgânico sem solventes feitas em San Diego.',
      exploreAll: 'Explorar Produtos',
      freeShippingUnlocked: 'Você desbloqueou frete grátis carbono zero ($199+).',
      freeShippingRemainingPrefix: 'Faltam',
      freeShippingRemainingSuffix: 'para frete grátis carbono zero ($199+).',
      shipping: 'Frete',
      free: 'Grátis',
      subtotal: 'Subtotal',
      totalDue: 'Total',
      proceedCheckout: 'Ir para o Checkout',
      orderSummary: 'Resumo do Pedido',
      editOrDelete: 'Você pode editar ou remover itens abaixo',
      remove: 'Remover',
      delete: 'Excluir',
      shippingInfo: 'Dados de Entrega',
      fullName: 'Nome Completo',
      emailAddress: 'E-mail',
      streetAddress: 'Endereço',
      cityPostal: 'Cidade e CEP',
      completeOrder: 'Concluir Pedido',
      signedIn: 'Conectado como',
      noOrders: 'Nenhum pedido ativo ainda. Explore nossos essenciais de CBD para montar seu ritual.',
      browseShop: 'Ver Loja',
      signOut: 'Sair',
      accountIntro:
        'Entre com seu e-mail para acompanhar pedidos, gerenciar assinaturas de CBD e acessar laudos COA.',
      continueBtn: 'Continuar',
      messageReceived: 'Mensagem Recebida',
      messageReceivedBody:
        'Nossa equipe Desert Moon CBD em Encinitas, CA responde em até dois dias úteis.',
      sendAnother: 'Enviar Outra Mensagem',
      contactIntro:
        'Dúvidas sobre dosagem, laudos COA ou pedidos? Escreva para nós ou ligue 1-(760) 782-2506 · 963 Urania Ave, Encinitas, CA 92024.',
      nameLabel: 'Nome',
      namePlaceholder: 'Seu nome',
      emailLabel: 'E-mail',
      messageLabel: 'Mensagem',
      messagePlaceholder: 'Como podemos ajudar?',
      sendMessage: 'Enviar Mensagem',
      philosophyQuote: 'Bom para você. Bom para sua consciência. E bom para o planeta.',
      philosophyP1:
        'Nossa missão é conectar pessoas e o planeta de forma sustentável. Trabalhamos diretamente com agricultores de cânhamo orgânico para simplificar a cadeia e entregar CBD natural carbono zero na sua porta.',
      philosophyP2:
        'Processado em San Diego, CA com método lento sem solventes a baixa temperatura — apenas calor, água e pressão — cada frasco é misturado à mão com superfoods puros, vegano e não-OGM.',
      inBag: 'na sacola',
      viewBagCheckout: 'Ver Sacola & Checkout',
    },
  },
} as const;

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (typeof UI_COPY)[Language];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = window.localStorage.getItem('dm_lang');
    return saved === 'pt' || saved === 'en' ? saved : 'en';
  });

  const setLang = (next: Language) => {
    setLangState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('dm_lang', next);
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.title =
      lang === 'pt'
        ? 'Desert Moon. — Seu Caminho para um Amanhã Melhor'
        : 'Desert Moon. — Path to a Better Tomorrow';
  }, [lang]);

  return createElement(
    LanguageContext.Provider,
    { value: { lang, setLang, t: UI_COPY[lang] } },
    children
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
