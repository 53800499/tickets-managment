/**
 * Service pour les opérations Supabase
 */

import { IParticipant, IConfig } from '@/types/conference-ticket';

export class SupabaseService {
  private supabaseUrl: string;
  private supabaseKey: string;

  constructor(config: IConfig) {
    this.supabaseUrl = config.supabase_url;
    this.supabaseKey = config.supabase_key;
  }

  async saveParticipant(participant: Omit<IParticipant, 'id' | 'created_at'>): Promise<void> {
    if (!this.supabaseUrl || !this.supabaseKey) {
      console.warn('Supabase credentials not configured');
      return;
    }

    try {
      const response = await fetch(`${this.supabaseUrl}/rest/v1/participants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: this.supabaseKey,
          Authorization: `Bearer ${this.supabaseKey}`,
        },
        body: JSON.stringify(participant),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(JSON.stringify(error));
      }

      console.log('Participant enregistré avec succès');
    } catch (error) {
      console.error('Erreur Supabase:', error);
      throw error;
    }
  }

  async getParticipantByReference(reference: string): Promise<IParticipant | null> {
    if (!this.supabaseUrl || !this.supabaseKey) {
      console.warn('Supabase credentials not configured');
      return null;
    }

    try {
      const response = await fetch(
        `${this.supabaseUrl}/rest/v1/participants?reference=eq.${reference}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            apikey: this.supabaseKey,
            Authorization: `Bearer ${this.supabaseKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch participant');
      }

      const data = await response.json();
      return data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error('Erreur Supabase:', error);
      return null;
    }
  }

  async updateParticipant(id: string, updates: Partial<IParticipant>): Promise<void> {
    if (!this.supabaseUrl || !this.supabaseKey) {
      console.warn('Supabase credentials not configured');
      return;
    }

    try {
      const response = await fetch(`${this.supabaseUrl}/rest/v1/participants?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          apikey: this.supabaseKey,
          Authorization: `Bearer ${this.supabaseKey}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update participant');
      }

      console.log('Participant mis à jour avec succès');
    } catch (error) {
      console.error('Erreur Supabase:', error);
      throw error;
    }
  }
}
