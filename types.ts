
export enum Tempo {
  FAST = 'Rapido',
  SLOW = 'Lento'
}

export interface Song {
  title: string;
  key: string;
  tempo: Tempo;
}

export interface SetlistItem {
  order: number;
  type: string;
  title: string;
  key: string;
  tempo: string;
  note: string;
}

export interface GenerationResponse {
  setlist: SetlistItem[];
  commentary: string;
}

export interface UserProfile {
  userName: string;
  churchName: string;
  ministryName: string;
}
