import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export type PracticeSession = {
  id: string;
  date: string;
  overall_score: number;
  questions: any[];
  results: Array<{
    question: {
      text: string;
      category: string;
    };
    analysis: {
      response: { score: number; feedback: string };
      communication: { score: number; feedback: string };
      bodyLanguage: { score: number; feedback: string };
      overall: number;
    };
  }>;
};

export function usePracticeHistory() {
  const [history, setHistory] = useState<PracticeSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const loadHistory = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('practice_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error loading practice history:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user, loadHistory]);

  const addSession = async (results: any[]) => {
    if (!user) return;

    try {
      const overallScore = Math.round(
        results.reduce((acc, result) => acc + result.analysis.overall, 0) / results.length
      );

      const { error } = await supabase
        .from('practice_sessions')
        .insert([
          {
            user_id: user.id,
            questions: results.map(r => r.question),
            results: results,
            overall_score: overallScore,
            date: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      await loadHistory();
    } catch (error) {
      console.error('Error saving practice session:', error);
      throw error;
    }
  };

  const deleteSession = async (sessionId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('practice_sessions')
        .delete()
        .eq('id', sessionId)
        .eq('user_id', user.id);

      if (error) throw error;
      await loadHistory();
    } catch (error) {
      console.error('Error deleting practice session:', error);
      throw error;
    }
  };

  return {
    history,
    addSession,
    deleteSession,
    isLoading
  };
}