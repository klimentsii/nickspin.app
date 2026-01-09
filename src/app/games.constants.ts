

export interface Game {
  name: string;
  logo: string;
  id: string;
  defaultSettings: null;
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
  },
  {
    name: 'Dota 2',
    logo: '⚔️',
    id: 'dota2',
    defaultSettings: null,
  },
  {
    name: 'VALORANT',
    logo: '🎯',
    id: 'valorant',
    defaultSettings: null,
  },
  {
    name: 'League of Legends',
    logo: '🏆',
    id: 'lol',
    defaultSettings: null,
  },
  {
    name: 'Fortnite',
    logo: '💣',
    id: 'fortnite',
    defaultSettings: null,
  },
  {
    name: 'Minecraft',
    logo: '⛏️',
    id: 'minecraft',
    defaultSettings: null,
  },

  {
    name: 'PUBG',
    logo: '🎯',
    id: 'pubg',
    defaultSettings: null,
  },
  {
    name: 'GTA V',
    logo: '🚗',
    id: 'gta5',
    defaultSettings: null,
  },
  {
    name: 'Rainbow Six Siege',
    logo: '🔍',
    id: 'r6',
    defaultSettings: null,
  },
  {
    name: 'World of Warcraft',
    logo: '🐉',
    id: 'wow',
    defaultSettings: null,
  },
  {
    name: 'Cyberpunk 2077',
    logo: '🔮',
    id: 'cyberpunk',
    defaultSettings: null,
  },
  {
    name: 'Team Fortress 2',
    logo: '🎩',
    id: 'tf2',
    defaultSettings: null,
  },
  {
    name: 'Palworld',
    logo: '🐾',
    id: 'palworld',
    defaultSettings: null,
  },
  {
    name: 'Roblox',
    logo: '🎮',
    id: 'roblox',
    defaultSettings: null,
  },
  {
    name: 'Among Us',
    logo: '👨‍🚀',
    id: 'amongus',
    defaultSettings: null,
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
