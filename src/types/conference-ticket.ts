/**
 * Types pour le système de billetterie de la conférence
 */

export interface IPass {
  id: string;
  name: string;
  price: string;
  amount: number;
  features: string[];
  accent: string;
  badge?: 'Populaire' | 'VIP' | null;
}

export interface IParticipant {
  id?: string;
  reference: string;
  prenom: string;
  nom: string;
  email: string;
  phone: string;
  pass_type: string;
  amount: number;
  mode: 'Presentiel' | 'En ligne';
  pays: string;
  created_at?: string;
}

export interface IBuyer {
  prenom: string;
  nom: string;
  email: string;
  phone: string;
  mode: 'Presentiel' | 'En ligne';
  pays: string;
}

export interface IPaymentTransaction {
  id: string;
  amount: number;
  description: string;
  email: string;
  firstname: string;
  lastname: string;
  phone_number: {
    number: string;
    country: string;
  };
}

export interface ITicketData {
  pass: IPass;
  buyer: IBuyer;
  transactionId: string;
}

export interface IEmailPayload {
  from: string;
  to: string[];
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    content: string;
    contentType?: string;
  }>;
}

export interface IConfig {
  fedapay_key: string;
  fedapay_sandbox: boolean;
  resend_api_key: string;
  email_from: string;
  email_from_name: string;
  supabase_url: string;
  supabase_key: string;
}
