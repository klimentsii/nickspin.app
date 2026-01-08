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

export interface Language {
  code: string;
  name: string;
}

export const GAMES: Game[] = [
  {
    name: 'Counter-Strike 2',
    logo: '🔫',
    id: 'cs2',
    defaultSettings: {
      theme: 'Dark',
      language: 'English',
      notifications: true,
    },
  },
  {
    name: 'Dota 2',
    logo: '⚔️',
    id: 'dota2',
    defaultSettings: {
      theme: 'Dark',
      language: 'English',
      notifications: true,
    },
  },
  {
    name: 'VALORANT',
    logo: '🎯',
    id: 'valorant',
    defaultSettings: {
      theme: 'Dark',
      language: 'English',
      notifications: true,
    },
  },
  {
    name: 'League of Legends',
    logo: '🏆',
    id: 'lol',
    defaultSettings: {
      theme: 'Dark',
      language: 'English',
      notifications: true,
    },
  },
  {
    name: 'Fortnite',
    logo: '💣',
    id: 'fortnite',
    defaultSettings: {
      theme: 'Dark',
      language: 'English',
      notifications: true,
    },
  },
  {
    name: 'Minecraft',
    logo: '⛏️',
    id: 'minecraft',
    defaultSettings: {
      theme: 'Dark',
      language: 'English',
      notifications: true,
    },
  },

  {
    name: 'PUBG',
    logo: '🎯',
    id: 'pubg',
    defaultSettings: {
      theme: 'Dark',
      language: 'English',
      notifications: true,
    },
  },
  {
    name: 'GTA V',
    logo: '🚗',
    id: 'gta5',
    defaultSettings: {
      theme: 'Dark',
      language: 'English',
      notifications: true,
    },
  },
  {
    name: 'Rainbow Six Siege',
    logo: '🔍',
    id: 'r6',
    defaultSettings: {
      theme: 'Dark',
      language: 'English',
      notifications: true,
    },
  },
  {
    name: 'World of Warcraft',
    logo: '🐉',
    id: 'wow',
    defaultSettings: {
      theme: 'Dark',
      language: 'English',
      notifications: true,
    },
  },
  {
    name: 'Cyberpunk 2077',
    logo: '🔮',
    id: 'cyberpunk',
    defaultSettings: {
      theme: 'Dark',
      language: 'English',
      notifications: true,
    },
  },
  {
    name: 'Team Fortress 2',
    logo: '🎩',
    id: 'tf2',
    defaultSettings: {
      theme: 'Dark',
      language: 'English',
      notifications: true,
    },
  },
  {
    name: 'Palworld',
    logo: '🐾',
    id: 'palworld',
    defaultSettings: {
      theme: 'Dark',
      language: 'English',
      notifications: true,
    },
  },
  {
    name: 'Roblox',
    logo: '🎮',
    id: 'roblox',
    defaultSettings: {
      theme: 'Dark',
      language: 'English',
      notifications: true,
    },
  },
  {
    name: 'Among Us',
    logo: '👨‍🚀',
    id: 'amongus',
    defaultSettings: {
      theme: 'Dark',
      language: 'English',
      notifications: true,
    },
  },
];

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Russian' },
  { code: 'jp', name: 'Japanese' },
  { code: 'de', name: 'German' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
  { code: 'cn', name: 'Chinese' },
  { code: 'kr', name: 'Korean' },
];
