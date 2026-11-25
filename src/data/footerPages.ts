import type { Language } from '../i18n';

export type InfoDrawerKey =
  | 'shipping'
  | 'refund'
  | 'faqs'
  | 'lab-reports'
  | 'mission'
  | 'san-diego'
  | 'terms'
  | 'privacy'
  | 'fda-notice';

export interface InfoDrawerSection {
  heading: string;
  body: string;
}

export interface InfoDrawerContent {
  title: string;
  subtitle: string;
  bannerQuote: string;
  badges?: string[];
  sections: InfoDrawerSection[];
  ctaLabel: string;
  ctaTarget: 'shop' | 'contact';
}

export const FOOTER_DRAWER_CONTENT: Record<Language, Record<InfoDrawerKey, InfoDrawerContent>> = {
  en: {
    shipping: {
      title: 'Shipping Policy',
      subtitle: 'Carbon-free fulfillment from San Diego, CA',
      bannerQuote: 'Free carbon-free shipping on all orders over $199.',
      badges: ['Free Over $199', 'Carbon-Free', 'US Nationwide'],
      sections: [
        {
          heading: 'Processing & Dispatch',
          body: 'Every Desert Moon CBD order is hand-packed in Encinitas, CA and dispatched within 1–2 business days. Tracking details are emailed as soon as your parcel ships.',
        },
        {
          heading: 'Shipping Rates & Free Threshold',
          body: 'Orders of $199 USD or more qualify automatically for complimentary carbon-free shipping. Orders below $199 are calculated transparently at checkout.',
        },
        {
          heading: 'Delivery & Discreet Packaging',
          body: 'All shipments arrive in protective, recyclable, discreet packaging with 100% of transit emissions offset from our San Diego apothecary to your doorstep.',
        },
      ],
      ctaLabel: 'Explore All Products',
      ctaTarget: 'shop',
    },
    refund: {
      title: 'Refund Policy',
      subtitle: '30-Day 100% Satisfaction Guarantee',
      bannerQuote: 'Try Desert Moon CBD risk-free with our 30-day guarantee.',
      badges: ['30-Day Window', '100% Guarantee', 'Fast Refunds'],
      sections: [
        {
          heading: '30-Day Return Eligibility',
          body: 'If you are not completely satisfied with any regular-priced item, request a return within 30 days of delivery for a full refund of the purchase price (less shipping & handling). Applies to one-time and subscription orders with proof of purchase.',
        },
        {
          heading: 'Sale & Defective Items',
          body: 'Sale items are final sale. If an order arrives damaged, defective, or incorrect, we provide a full replacement or refund including original shipping costs.',
        },
        {
          heading: 'How to Start a Return',
          body: 'Email desertmooncbd@gmail.com with your order number. Approved returns ship to 963 Urania Ave, Encinitas, CA 92024 and refunds process within 10 business days. EU customers retain a 14-day cooling-off right.',
        },
      ],
      ctaLabel: 'Contact Support',
      ctaTarget: 'contact',
    },
    faqs: {
      title: 'Frequently Asked Questions',
      subtitle: 'Extraction, dosing, lab reports & orders',
      bannerQuote: 'Pure, solventless hemp wellness — every question answered.',
      badges: ['Solventless', 'Lab Tested', '21+ Compliant'],
      sections: [
        {
          heading: 'How is Desert Moon CBD extracted?',
          body: 'We use a solventless, low-temperature slow-cooking process using only heat, water, and pressure — zero chemical solvents, harsh alcohols, or synthetic additives.',
        },
        {
          heading: 'Will CBD products make me feel high?',
          body: 'Our Broad Spectrum CBD tincture and CBD Gummies Boost are non-psychoactive. Traditional Full Spectrum CBD and Balm contain <0.3% hemp-derived THC. Hemp THC Gummies (25mg) are psychoactive and intended for 21+ evening relaxation.',
        },
        {
          heading: 'How should I take CBD tinctures?',
          body: 'Shake gently before use. Place one full dropper (50mg CBD) under the tongue, hold for 30–60 seconds, and swallow. Start with half a dropper if you are new to CBD.',
        },
        {
          heading: 'Are your formulas vegan and third-party lab tested?',
          body: 'Yes. All hemp extracts are organic, non-GMO, and independently lab tested (COA) for cannabinoid potency, heavy metals, pesticides, and residual solvents.',
        },
      ],
      ctaLabel: 'Ask Our Team',
      ctaTarget: 'contact',
    },
    'lab-reports': {
      title: 'Lab Reports (COA)',
      subtitle: 'Independent third-party batch verification',
      bannerQuote: 'Full transparency on every single batch — zero guesswork.',
      badges: ['ISO-17025 Labs', '<0.3% THC', 'Solvent-Free'],
      sections: [
        {
          heading: 'Potency & Cannabinoid Profile',
          body: 'Every batch of tinctures (1500mg), Extra Strength Balm (5000mg), and gummies (250mg) is verified by accredited third-party laboratories to confirm exact CBD, CBN, and compliant THC levels.',
        },
        {
          heading: 'Purity & Contaminant Screening',
          body: 'Our Certificates of Analysis (COAs) screen for pesticides, heavy metals, microbials, mycotoxins, and confirm zero residual solvents thanks to our heat-water-pressure extraction.',
        },
        {
          heading: 'Request a Batch COA',
          body: 'Need the PDF lab report for your specific bottle or jar? Send your batch number to desertmooncbd@gmail.com and our San Diego team will share the full COA immediately.',
        },
      ],
      ctaLabel: 'Request Batch COA',
      ctaTarget: 'contact',
    },
    mission: {
      title: 'Our Mission',
      subtitle: 'Connecting people and the planet sustainably',
      bannerQuote: 'Good for you. Good for your conscience. And good for the planet.',
      badges: ['Organic Farms', 'Carbon-Free', 'Small Batch'],
      sections: [
        {
          heading: 'Direct Organic Hemp Partnerships',
          body: 'We work directly with organic hemp farmers to simplify the supply chain, eliminating unnecessary middlemen while ensuring fair, regenerative agricultural practices.',
        },
        {
          heading: 'Solventless Craft & Superfoods',
          body: 'By pairing pure solventless cannabinoids with botanical superfoods — lavender, rose, collagen, biotin, GABA, and ashwagandha — we create holistic formulas that truly perform.',
        },
        {
          heading: 'Carbon-Free to Your Doorstep',
          body: 'From recyclable amber glass vessels to carbon-neutral fulfillment, every decision is designed to honor both your daily balance and the earth.',
        },
      ],
      ctaLabel: 'Explore All Products',
      ctaTarget: 'shop',
    },
    'san-diego': {
      title: 'San Diego, CA',
      subtitle: 'Encinitas Apothecary & Botanical Studio',
      bannerQuote: 'Hand-blended and individually bottled in coastal San Diego.',
      badges: ['Encinitas, CA', 'Small Batch', 'Mon–Fri Support'],
      sections: [
        {
          heading: 'Studio & Mailing Address',
          body: 'Desert Moon CBD LLC · 963 Urania Ave, Encinitas, CA 92024, United States. Every bottle is small-batch blended, inspected, and packed right here in Southern California.',
        },
        {
          heading: 'Direct Customer Care',
          body: 'Phone: 1-(760) 782-2506 · Email: desertmooncbd@gmail.com. Our wellness specialists respond to every inquiry within 2 business days.',
        },
        {
          heading: 'Crafted Without Shortcuts',
          body: 'Coastal California wellness meets strict laboratory precision — ethical low-temperature processing without chemical solvents, shipped nationwide carbon-free.',
        },
      ],
      ctaLabel: 'Write to Our Studio',
      ctaTarget: 'contact',
    },
    terms: {
      title: 'Terms of Service',
      subtitle: 'Desert Moon CBD LLC · Storefront Agreement',
      bannerQuote: 'Clear, honest terms designed to protect our community.',
      badges: ['21+ Only', '2018 Farm Bill', 'California Law'],
      sections: [
        {
          heading: 'Age Eligibility (21+)',
          body: 'By accessing or purchasing from Desert Moon CBD, you confirm that you are at least 21 years of age and legally permitted to purchase hemp-derived cannabinoid products in your jurisdiction.',
        },
        {
          heading: 'Orders, Pricing & Personal Use',
          body: 'All prices are listed in USD. Products are sold strictly for responsible personal wellness use and not for unauthorized resale. We reserve the right to limit quantities or refuse fraudulent orders.',
        },
        {
          heading: 'Intellectual Property & Governing Law',
          body: 'All Desert Moon CBD branding, formulas, photography, and content belong to Desert Moon CBD LLC and are governed by the laws of the State of California.',
        },
      ],
      ctaLabel: 'Contact Legal Support',
      ctaTarget: 'contact',
    },
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'How Desert Moon CBD protects your data',
      bannerQuote: 'We respect your privacy and never sell your personal data.',
      badges: ['Zero Data Sales', 'Session-Only 21+', '1-Click Opt-Out'],
      sections: [
        {
          heading: 'Information We Collect',
          body: 'We collect only the information needed to fulfill your order and provide support — such as your name, shipping address, email, and order history. Age verification (21+) is stored strictly in your local browser session.',
        },
        {
          heading: 'How Your Data Is Used',
          body: 'Your details are used exclusively to process orders, share tracking updates, and send optional wellness releases when you subscribe to our newsletter. We never sell or rent customer data to third parties.',
        },
        {
          heading: 'Your Rights & Data Deletion',
          body: 'You may unsubscribe from emails in one click or request access, correction, or complete deletion of your personal records anytime by emailing desertmooncbd@gmail.com.',
        },
      ],
      ctaLabel: 'Contact Privacy Team',
      ctaTarget: 'contact',
    },
    'fda-notice': {
      title: '21+ & FDA Notice',
      subtitle: 'Federal Hemp Compliance & Health Disclaimer',
      bannerQuote: 'Committed to responsible adult wellness and full compliance.',
      badges: ['Adults 21+', '<0.3% Delta-9 THC', 'FDA Disclosure'],
      sections: [
        {
          heading: 'FDA Disclaimer',
          body: 'The statements made regarding these products have not been evaluated by the Food and Drug Administration. The efficacy of these products has not been confirmed by FDA-approved research. These products are not intended to diagnose, treat, cure, or prevent any disease.',
        },
        {
          heading: '2018 U.S. Farm Bill Compliance',
          body: 'All hemp-derived products offered by Desert Moon CBD LLC are crafted from industrial hemp containing less than 0.3% Delta-9 THC on a dry-weight basis, in accordance with federal guidelines.',
        },
        {
          heading: 'Responsible Adult Use (21+)',
          body: 'Must be 21 or older to purchase. Consult your physician before use if you are pregnant, nursing, have a medical condition, or take prescription medications. Do not drive or operate machinery after consuming THC gummies.',
        },
      ],
      ctaLabel: 'Explore CBD Collection',
      ctaTarget: 'shop',
    },
  },
  pt: {
    shipping: {
      title: 'Política de Envio',
      subtitle: 'Envio carbono zero direto de San Diego, CA',
      bannerQuote: 'Frete grátis carbono zero em todos os pedidos acima de $199.',
      badges: ['Grátis $199+', 'Carbono Zero', 'Embalagem Discreta'],
      sections: [
        {
          heading: 'Processamento e Despacho',
          body: 'Cada pedido da Desert Moon CBD é embalado à mão em Encinitas, CA e despachado em 1 a 2 dias úteis. O código de rastreamento é enviado por e-mail assim que o pacote sai.',
        },
        {
          heading: 'Frete Grátis e Tarifas',
          body: 'Pedidos a partir de $199 USD recebem frete grátis carbono zero automaticamente. Para valores abaixo de $199, o frete é calculado com transparência no checkout.',
        },
        {
          heading: 'Entrega Sustentável',
          body: 'Todos os envios chegam em embalagens protetoras, discretas e recicláveis, com 100% das emissões de transporte compensadas até a sua porta.',
        },
      ],
      ctaLabel: 'Explorar Produtos',
      ctaTarget: 'shop',
    },
    refund: {
      title: 'Política de Devoluções',
      subtitle: 'Garantia de 100% de Satisfação por 30 Dias',
      bannerQuote: 'Experimente a Desert Moon CBD sem risco com garantia de 30 dias.',
      badges: ['Prazo 30 Dias', '100% Garantia', 'Reembolso Ágil'],
      sections: [
        {
          heading: 'Elegibilidade de Devolução',
          body: 'Se você não ficar completamente satisfeito com qualquer item de preço regular, solicite a devolução em até 30 dias após a entrega para reembolso integral do produto (menos frete). Válido para compras avulsas e assinaturas.',
        },
        {
          heading: 'Itens em Promoção ou com Defeito',
          body: 'Itens em liquidação são venda final. Caso um pedido chegue danificado, incorreto ou com defeito, realizamos a reposição ou reembolso total incluindo o frete.',
        },
        {
          heading: 'Como Solicitar',
          body: 'Envie um e-mail para desertmooncbd@gmail.com com o número do pedido. Devoluções aprovadas seguem para 963 Urania Ave, Encinitas, CA 92024 e o reembolso é processado em até 10 dias úteis.',
        },
      ],
      ctaLabel: 'Falar com o Suporte',
      ctaTarget: 'contact',
    },
    faqs: {
      title: 'Perguntas Frequentes',
      subtitle: 'Extração, dosagem, laudos COA e pedidos',
      bannerQuote: 'Bem-estar com cânhamo puro sem solventes — tire suas dúvidas.',
      badges: ['Sem Solventes', 'Laudo COA', 'Uso Adulto 21+'],
      sections: [
        {
          heading: 'Como é feita a extração da Desert Moon CBD?',
          body: 'Utilizamos um processo lento sem solventes a baixa temperatura usando apenas calor, água e pressão — zero solventes químicos, álcoois agressivos ou aditivos sintéticos.',
        },
        {
          heading: 'Os produtos de CBD causam efeito psicoativo?',
          body: 'Nosso CBD Broad Spectrum e as Gomas CBD Boost não são psicoativos. O Óleo Tradicional e o Bálsamo contêm <0.3% THC. Já as Gomas Hemp THC (25mg) são psicoativas e voltadas ao relaxamento noturno (21+).',
        },
        {
          heading: 'Como usar as tinturas de CBD?',
          body: 'Agite suavemente antes de usar. Coloque um conta-gotas cheio (50mg de CBD) sob a língua, mantenha por 30 a 60 segundos e engula. Comece com meio conta-gotas se for iniciante.',
        },
        {
          heading: 'As fórmulas são veganas e testadas em laboratório?',
          body: 'Sim. Todos os extratos são orgânicos, não-OGM e testados por laboratórios independentes (COA) para potência de canabinoides, metais pesados, pesticidas e ausência de solventes.',
        },
      ],
      ctaLabel: 'Falar com a Equipe',
      ctaTarget: 'contact',
    },
    'lab-reports': {
      title: 'Laudos Laboratoriais (COA)',
      subtitle: 'Verificação independente lote a lote',
      bannerQuote: 'Transparência total em cada lote — zero suposições.',
      badges: ['Labs ISO-17025', '<0.3% THC', 'Zero Solventes'],
      sections: [
        {
          heading: 'Potência e Perfil de Canabinoides',
          body: 'Cada lote de tinturas (1500mg), Bálsamo Extra Forte (5000mg) e gomas (250mg) é auditado por laboratórios independentes credenciados para confirmar níveis exatos de CBD, CBN e THC.',
        },
        {
          heading: 'Pureza e Segurança',
          body: 'Nossos Certificados de Análise (COAs) verificam ausência de pesticidas, metais pesados, microrganismos, micotoxinas e confirmam zero solventes residuais.',
        },
        {
          heading: 'Solicitar COA do Seu Lote',
          body: 'Precisa do laudo em PDF do seu frasco? Envie o número do lote para desertmooncbd@gmail.com e nossa equipe de San Diego enviará o documento completo.',
        },
      ],
      ctaLabel: 'Solicitar Laudo COA',
      ctaTarget: 'contact',
    },
    mission: {
      title: 'Nossa Missão',
      subtitle: 'Conectando pessoas e o planeta de forma sustentável',
      bannerQuote: 'Bom para você. Bom para sua consciência. E bom para o planeta.',
      badges: ['Fazendas Orgânicas', 'Carbono Zero', 'Pequenos Lotes'],
      sections: [
        {
          heading: 'Parceria Direta com Produtores Orgânicos',
          body: 'Trabalhamos diretamente com agricultores de cânhamo orgânico para simplificar a cadeia produtiva, eliminando intermediários e valorizando a agricultura regenerativa.',
        },
        {
          heading: 'Processo Sem Solventes e Superfoods',
          body: 'Combinando canabinoides puros sem solventes com superfoods botânicos — lavanda, rosa, colágeno, biotina, GABA e ashwagandha — criamos fórmulas holísticas de alta eficácia.',
        },
        {
          heading: 'Carbono Zero Até Sua Porta',
          body: 'Dos frascos de vidro âmbar recicláveis ao envio carbono zero, cada escolha honra o seu equilíbrio diário e o meio ambiente.',
        },
      ],
      ctaLabel: 'Explorar Produtos',
      ctaTarget: 'shop',
    },
    'san-diego': {
      title: 'San Diego, CA',
      subtitle: 'Estúdio Botânico em Encinitas, Califórnia',
      bannerQuote: 'Misturado e envasado individualmente à mão em San Diego.',
      badges: ['Encinitas, CA', 'Artesanal', 'Suporte Seg–Sex'],
      sections: [
        {
          heading: 'Endereço do Estúdio',
          body: 'Desert Moon CBD LLC · 963 Urania Ave, Encinitas, CA 92024, Estados Unidos. Cada frasco é formulado, inspecionado e embalado em pequenos lotes no sul da Califórnia.',
        },
        {
          heading: 'Atendimento Direto',
          body: 'Telefone: 1-(760) 782-2506 · E-mail: desertmooncbd@gmail.com. Nossa equipe responde a todas as mensagens em até 2 dias úteis.',
        },
        {
          heading: 'Qualidade Sem Atalhos',
          body: 'O bem-estar californiano aliado ao rigor laboratorial — processamento ético a baixa temperatura sem solventes químicos, com envio carbono zero.',
        },
      ],
      ctaLabel: 'Escrever para o Estúdio',
      ctaTarget: 'contact',
    },
    terms: {
      title: 'Termos de Uso',
      subtitle: 'Desert Moon CBD LLC · Condições da Loja',
      bannerQuote: 'Termos claros e honestos para proteger nossa comunidade.',
      badges: ['Maiores de 21', 'Farm Bill 2018', 'Leis da Califórnia'],
      sections: [
        {
          heading: 'Idade Mínima (21+)',
          body: 'Ao acessar ou comprar na Desert Moon CBD, você confirma ter pelo menos 21 anos de idade e estar legalmente autorizado a adquirir produtos de cânhamo em sua região.',
        },
        {
          heading: 'Pedidos, Preços e Uso Pessoal',
          body: 'Todos os preços são exibidos em USD. Os produtos destinam-se exclusivamente ao uso pessoal responsável e não à revenda não autorizada.',
        },
        {
          heading: 'Propriedade Intelectual e Foro',
          body: 'Toda a marca, fórmulas, fotografias e conteúdos pertencem à Desert Moon CBD LLC e são regidos pelas leis do Estado da Califórnia.',
        },
      ],
      ctaLabel: 'Falar com o Suporte',
      ctaTarget: 'contact',
    },
    privacy: {
      title: 'Política de Privacidade',
      subtitle: 'Como a Desert Moon CBD protege seus dados',
      bannerQuote: 'Respeitamos sua privacidade e nunca vendemos seus dados.',
      badges: ['Zero Venda de Dados', '21+ Apenas Sessão', 'Descadastro Fácil'],
      sections: [
        {
          heading: 'Dados Coletados',
          body: 'Coletamos apenas o necessário para processar pedidos e oferecer suporte — nome, endereço, e-mail e histórico. A confirmação de idade (21+) fica salva apenas na sessão local do seu navegador.',
        },
        {
          heading: 'Uso das Informações',
          body: 'Seus dados servem exclusivamente para entrega, rastreamento e envio opcional de novidades quando você assina nossa newsletter. Nunca vendemos ou alugamos seus dados.',
        },
        {
          heading: 'Seus Direitos e Exclusão',
          body: 'Você pode cancelar e-mails com um clique ou solicitar acesso, correção ou exclusão total dos seus dados pelo e-mail desertmooncbd@gmail.com.',
        },
      ],
      ctaLabel: 'Falar sobre Privacidade',
      ctaTarget: 'contact',
    },
    'fda-notice': {
      title: 'Aviso 21+ e FDA',
      subtitle: 'Conformidade Federal de Cânhamo e Saúde',
      bannerQuote: 'Compromisso com uso adulto responsável e transparência.',
      badges: ['Adultos 21+', '<0.3% Delta-9 THC', 'Aviso FDA'],
      sections: [
        {
          heading: 'Declaração FDA',
          body: 'As declarações sobre estes produtos não foram avaliadas pela FDA (Food and Drug Administration). Estes produtos não se destinam a diagnosticar, tratar, curar ou prevenir qualquer doença.',
        },
        {
          heading: 'Conformidade Farm Bill 2018',
          body: 'Todos os produtos da Desert Moon CBD LLC são derivados de cânhamo industrial contendo menos de 0,3% de Delta-9 THC em peso seco, conforme diretrizes federais.',
        },
        {
          heading: 'Uso Adulto Responsável (21+)',
          body: 'Venda restrita a maiores de 21 anos. Consulte um médico se estiver grávida, amamentando ou usando medicamentos. Não dirija nem opere máquinas após consumir gomas com THC.',
        },
      ],
      ctaLabel: 'Explorar Coleção CBD',
      ctaTarget: 'shop',
    },
  },
};
