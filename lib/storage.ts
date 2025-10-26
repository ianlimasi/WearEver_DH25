import { ClothingItem } from './types';

const STORAGE_KEY = 'wearever_user_items';

export function getUserUploadedItems(): ClothingItem[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading uploaded items:', error);
    return [];
  }
}

export function saveUserUploadedItem(item: ClothingItem): void {
  if (typeof window === 'undefined') return;
  
  try {
    const existingItems = getUserUploadedItems();
    const updatedItems = [...existingItems, item];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  } catch (error) {
    console.error('Error saving uploaded item:', error);
  }
}

export function deleteUserUploadedItem(itemId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const existingItems = getUserUploadedItems();
    const updatedItems = existingItems.filter(item => item.id.toString() !== itemId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  } catch (error) {
    console.error('Error deleting uploaded item:', error);
  }
}
