export type Category = 'dress' | 'jacket' | 'pants' | 'top' | 'shoes' | 'accessories';

export type Color = 'black' | 'white' | 'beige' | 'brown' | 'red' | 'pink' | 'blue' | 'green' | 'yellow' | 'purple' | 'gray' | 'multicolor';

export type Style = 'vintage' | 'streetwear' | 'minimalist' | 'y2k' | 'cottagecore' | 'grunge' | 'academia' | 'boho' | 'chic' | 'sporty' | 'preppy' | 'kawaii' | 'techwear' | 'classic' | 'fairycore' | 'indie' | 'retro' | 'girly' | 'punk' | 'elegant';

export type Fit = 'oversized' | 'cropped' | 'fitted' | 'flowy' | 'high-waisted' | 'loose' | 'bodycon' | 'layered' | 'structured';

export type Vibe = 'casual' | 'formal' | 'date night' | 'interview' | 'presentation' | 'party' | 'everyday' | 'picnic' | 'beach' | 'festival' | 'cozy' | 'academic' | 'workwear';

export interface ClothingTags {
  category: Category;
  color: Color;
  style: Style;
  fit: Fit;
  vibe: Vibe;
}

export interface ClothingItem {
  id: number;
  name: string;
  owner: string;
  category: string;
  color: string;
  style: string;
  fit: string;
  vibe: string;
  created_at: string;
  imageUrl: string;
}

export interface AIMatchedTags {
  category: Category;
  color: Color;
  style: Style;
  fit: Fit;
  vibe: Vibe;
}

export type TradeStatus = 'in progress' | 'accepted' | 'declined';

export type CampusLocation = 
  | 'Red Square'
  | 'Suzzallo Library'
  | 'HUB (Husky Union Building)'
  | 'Allen Library'
  | 'Odegaard Library'
  | 'By The Ave'
  | 'McMahon Hall'
  | 'Lander Hall'
  | 'Alder Hall'
  | 'IMA (Intramural Activities Building)';

export interface Trade {
  id: string;
  requestedItemId: string;
  requestedItem: ClothingItem;
  offeredItemId: string | null;
  offeredItem: ClothingItem | null;
  requesterName: string;
  ownerName: string;
  meetingPlace: CampusLocation | null;
  meetingTime: string | null;
  status: TradeStatus;
  isIncoming: boolean;
  createdAt: number;
}
