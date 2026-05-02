/**
 * Configuration centralisée
 */

import { IConfig } from '@/types/conference-ticket';

export const CONFERENCE_CONFIG: IConfig = {
  fedapay_key: process.env.NEXT_PUBLIC_FEDAPAY_KEY || 'pk_sandbox_z8sJl3QVIa1VLIsAdG1S9aan',
  fedapay_sandbox: process.env.NEXT_PUBLIC_FEDAPAY_SANDBOX === 'true' || false,
  resend_api_key: process.env.RESEND_API_KEY || '',
  email_from: process.env.EMAIL_FROM || 'billets@excellence-en-action.bj',
  email_from_name: process.env.EMAIL_FROM_NAME || 'Excellence en Action',
  supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  supabase_key: process.env.NEXT_PUBLIC_SUPABASE_KEY || '',
};

export const PASS_OPTIONS = [
  {
    id: 'decouverte',
    name: 'Decouverte',
    price: '10 000',
    amount: 10000,
    features: ['Acces a la conference presentiel', 'Acces en ligne disponible'],
    accent: '#8a9bb0',
    badge: null,
  },
  {
    id: 'ascension',
    name: 'Ascension',
    price: '30 000',
    amount: 30000,
    features: [
      'Tous les avantages Decouverte',
      'Livre electronique du Docteur',
      'Photo avec le Docteur',
      'Replay integral de la conference',
    ],
    accent: '#d4a017',
    badge: null,
  },
  {
    id: 'impact',
    name: 'Impact',
    price: '50 000',
    amount: 50000,
    features: [
      'Tous les avantages Ascension',
      'Carnet de notes personnalise',
      'Brunch prive Dim 12/07 17h-22h',
      'Replay formation du Dr',
    ],
    accent: '#c8102e',
    badge: 'Populaire' as const,
  },
  {
    id: 'incontournable',
    name: 'Incontournable',
    price: '150 000',
    amount: 150000,
    features: [
      'Tous les avantages Impact',
      'Consultation de projet avec Dr Claudel et son equipe',
    ],
    accent: '#009a44',
    badge: 'VIP' as const,
  },
];

export const EVENT_INFO = {
  name: 'Conference au Benin 2026',
  date: '11 Juillet 2026',
  location: 'Benin Royal Hotel',
  contact: '+229 0163 350 339',
  website: 'excellence-en-action.bj',
  whatsappLink: 'https://chat.whatsapp.com/Fe9VdseztjV05KcArUYF77',
};
