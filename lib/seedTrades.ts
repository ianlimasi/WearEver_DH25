import { Trade, ClothingItem } from './types';
import { createTrade } from './tradeStorage';

export function seedIncomingTrade() {
  if (typeof window === 'undefined') return;
  
  const sampleOfferItem: ClothingItem = {
    id: 'sample-offer-1',
    name: 'Vintage Band Tee',
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=500&fit=crop',
    owner: 'Jordan',
    tags: {
      category: 'top',
      color: ['black'],
      style: ['vintage', 'grunge'],
      fit: ['oversized'],
      vibe: ['casual']
    }
  };

  const userItem: ClothingItem = {
    id: 'sample-user-item-1',
    name: 'Pink Sweater',
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop',
    owner: 'You',
    tags: {
      category: 'top',
      color: ['pink'],
      style: ['cottagecore'],
      fit: ['fitted'],
      vibe: ['cozy']
    }
  };

  const sampleTrade: Trade = {
    id: 'incoming-trade-demo',
    requestedItemId: userItem.id,
    requestedItem: userItem,
    offeredItemId: sampleOfferItem.id,
    offeredItem: sampleOfferItem,
    requesterName: 'Jordan',
    ownerName: 'You',
    meetingPlace: 'Red Square',
    meetingTime: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
    status: 'in progress',
    isIncoming: true,
    createdAt: Date.now()
  };

  createTrade(sampleTrade);
}
