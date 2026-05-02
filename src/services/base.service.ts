/* import { supabase } from "@/lib/supabase";

export const createBaseService = <T>(table: string) => ({
  async getAll() {
    const { data, error } = await supabase
      .from(table)
      .select("*");

    if (error) throw error;
    return data as T[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as T;
  },

  async create(payload: Partial<T>) {
    const { data, error } = await supabase
      .from(table)
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, payload: Partial<T>) {
    const { data, error } = await supabase
      .from(table)
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async remove(id: string) {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}); */