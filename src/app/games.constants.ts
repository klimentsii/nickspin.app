export interface GameSettings {
  theme: 'Dark' | 'Light';
  language: 'Russian' | 'English';
  notifications: boolean;
}

export interface Game {
  name: string;
  logo: string;
  id: string;
  defaultSettings: GameSettings;
}

export const GAMES: Game[] = [
  {
    name: 'Roblox',
    logo: '🎮',
    id: 'roblox',
    defaultSettings: {
      theme: 'Dark',
      language: 'English',
      notifications: true
    }
  },
  {
    name: 'Dota 2',
    logo: '⚔️',
    id: 'dota2',
    defaultSettings: {
      theme: 'Dark',
      language: 'English',
      notifications: true
    }
  }
];

