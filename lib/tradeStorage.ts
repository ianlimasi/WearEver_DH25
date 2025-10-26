import { Trade } from './types';
import { supabase } from '../supabaseClient';

export async function getAllTrades(): Promise<Trade[]> {
  try {
    const { data, error } = await supabase
      .from('Trades')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching trades:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching trades:', error);
    return [];
  }
}

export async function getOutgoingTrades(): Promise<Trade[]> {
  try {
    const { data, error } = await supabase
      .from('Trades')
      .select('*')
      .eq('isIncoming', false)
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching outgoing trades:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching outgoing trades:', error);
    return [];
  }
}

export async function getIncomingTrades(): Promise<Trade[]> {
  try {
    const { data, error } = await supabase
      .from('Trades')
      .select('*')
      .eq('isIncoming', true)
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching incoming trades:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching incoming trades:', error);
    return [];
  }
}

export async function createTrade(trade: Trade): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('Trades')
      .insert([trade]);

    if (error) {
      console.error('Error creating trade:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error creating trade:', error);
    return false;
  }
}

export async function updateTrade(tradeId: string, updates: Partial<Trade>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('Trades')
      .update(updates)
      .eq('id', tradeId);

    if (error) {
      console.error('Error updating trade:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating trade:', error);
    return false;
  }
}

export async function deleteTrade(tradeId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('Trades')
      .delete()
      .eq('id', tradeId);

    if (error) {
      console.error('Error deleting trade:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting trade:', error);
    return false;
  }
}