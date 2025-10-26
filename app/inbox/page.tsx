'use client';

import { useState, useEffect } from 'react';
import { Inbox as InboxIcon, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import OutgoingTradeCard from '../../components/OutgoingTradeCard';
import IncomingTradeCard from '../../components/IncomingTradeCard';
import { Trade } from '../../lib/types';
import { getAllTrades, getOutgoingTrades, getIncomingTrades } from '../../lib/tradeStorage';

export default function InboxPage() {
  const [outgoingTrades, setOutgoingTrades] = useState<Trade[]>([]);
  const [incomingTrades, setIncomingTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTrades();
  }, []);

  const loadTrades = async () => {
    try {
      setIsLoading(true);
      
      // Fetch both types of trades in parallel
      const [outgoing, incoming] = await Promise.all([
        getOutgoingTrades(),
        getIncomingTrades()
      ]);
      
      setOutgoingTrades(outgoing);
      setIncomingTrades(incoming);
    } catch (error) {
      console.error('Error loading trades:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-4 border-fairytale-lavender/30">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your trades...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-4 border-fairytale-lavender/30">
          <div className="flex items-center gap-3 mb-8">
            <InboxIcon className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl font-bold text-purple-700">Trade Inbox</h1>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                <ArrowRight className="w-6 h-6" />
                Outgoing Requests
                <span className="text-sm font-normal text-gray-500">
                  ({outgoingTrades.length})
                </span>
              </h2>
              
              {outgoingTrades.length === 0 ? (
                <div className="text-center py-12 bg-fairytale-pink/20 rounded-xl">
                  <p className="text-gray-500">No outgoing trade requests</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Browse the home page and click "Request Trade" on items you like!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {outgoingTrades.map((trade) => (
                    <OutgoingTradeCard 
                      key={trade.id} 
                      trade={trade}
                      onUpdate={loadTrades}
                    />
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                <ArrowRight className="w-6 h-6 rotate-180" />
                Incoming Requests
                <span className="text-sm font-normal text-gray-500">
                  ({incomingTrades.length})
                </span>
              </h2>
              
              {incomingTrades.length === 0 ? (
                <div className="text-center py-12 bg-fairytale-mint/20 rounded-xl">
                  <p className="text-gray-500">No incoming trade requests</p>
                  <p className="text-sm text-gray-400 mt-1">
                    When others want to trade for your items, they'll appear here!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {incomingTrades.map((trade) => (
                    <IncomingTradeCard 
                      key={trade.id} 
                      trade={trade}
                      onUpdate={loadTrades}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}