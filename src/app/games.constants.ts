export interface Game {
  name: string;
  logo: string;
  id: string;
  defaultSettings: null;
  bgColor: string;
  color: string;
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
    defaultSettings: null,
    bgColor: '#6B4423',
    color: '#D58846',
  },
  {
    name: 'Dota 2',
    logo: '⚔️',
    id: 'dota2',
    defaultSettings: null,
    bgColor: '#6B1A1A',
    color: '#C53B3B',
  },
  {
    name: 'VALORANT',
    logo: '🎯',
    id: 'valorant',
    defaultSettings: null,
    bgColor: '#6B1A4A',
    color: '#C53B94',
  },
  {
    name: 'League of Legends',
    logo: '🏆',
    id: 'lol',
    defaultSettings: null,
    bgColor: '#1A4A6B',
    color: '#3B94C5',
  },
  {
    name: 'Fortnite',
    logo: '💣',
    id: 'fortnite',
    defaultSettings: null,
    bgColor: '#6B1A4A',
    color: '#C53B94',
  },
  {
    name: 'Minecraft',
    logo: '⛏️',
    id: 'minecraft',
    defaultSettings: null,
    bgColor: '#1A4A2E',
    color: '#3BC57A',
  },
  {
    name: 'PUBG',
    logo: '🎯',
    id: 'pubg',
    defaultSettings: null,
    bgColor: '#6B3A1A',
    color: '#C5743B',
  },
  {
    name: 'GTA V',
    logo: '🚗',
    id: 'gta5',
    defaultSettings: null,
    bgColor: '#6B3A1A',
    color: '#C5743B',
  },
  {
    name: 'Rainbow Six Siege',
    logo: '🔍',
    id: 'r6',
    defaultSettings: null,
    bgColor: '#1A4A6B',
    color: '#3B94C5',
  },
  {
    name: 'World of Warcraft',
    logo: '🐉',
    id: 'wow',
    defaultSettings: null,
    bgColor: '#6B4A3A',
    color: '#C5947A',
  },
  {
    name: 'Cyberpunk 2077',
    logo: '🔮',
    id: 'cyberpunk',
    defaultSettings: null,
    bgColor: '#6B1A4A',
    color: '#C53B94',
  },
  {
    name: 'Team Fortress 2',
    logo: '🎩',
    id: 'tf2',
    defaultSettings: null,
    bgColor: '#6B3A1A',
    color: '#C5743B',
  },
  {
    name: 'Palworld',
    logo: '🐾',
    id: 'palworld',
    defaultSettings: null,
    bgColor: '#1A4A3A',
    color: '#3BC57A',
  },
  {
    name: 'Roblox',
    logo: '🎮',
    id: 'roblox',
    defaultSettings: null,
    bgColor: '#6B1A1A',
    color: '#C53B3B',
  },
  {
    name: 'Among Us',
    logo: '👨‍🚀',
    id: 'amongus',
    defaultSettings: null,
    bgColor: '#6B1A4A',
    color: '#C53B94',
  },
];

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
  { code: 'jp', name: '日本語' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'cn', name: '中文' },
  { code: 'kr', name: '한국어' },
];
