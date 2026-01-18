export interface GameDefaultSettings {
  selectedLength?: string;
  aiWishes?: string;
  numbers?: boolean;
  selectedLanguage?: string;
  specialSymbols?: string;
  theme?: string;
  allowBanned?: boolean;
  selectedGender?: string;
}

export interface ThemeOption {
  value: string;
  label: string;
}

export interface Game {
  name: string;
  id: string;
  defaultSettings: GameDefaultSettings | null;
  themes: ThemeOption[];
  bgColor: string;
  color: string;
}

export interface Language {
  code: string;
  name: string;
}
export type GameName = string;
export interface NicknameApiResponse {
  nickname: string | string[];
}
export const GAMES: Game[] = [
  {
    name: 'Another Game',
    id: 'another-game',
    defaultSettings: null,
    themes: [
      { value: 'any', label: 'Any' },
      { value: 'minimalist', label: 'Minimalist' },
    ],
    bgColor: '#4A4A6B',
    color: '#7A7AC5',
  },
  {
    name: 'Counter-Strike 2',
    id: 'cs2',
    defaultSettings: {
      selectedLength: 'any',
      numbers: true,
      selectedLanguage: 'en',
      specialSymbols: 'yes',
      theme: 'tactical',
      allowBanned: false,
      selectedGender: 'any',
    },
    themes: [
      { value: 'any', label: 'Any' },
      { value: 'tactical', label: 'Tactical' },
      { value: 'military', label: 'Military' },
      { value: 'pro', label: 'Pro Style' },
    ],
    bgColor: '#6B4423',
    color: '#D58846',
  },
  {
    name: 'Dota 2',
    id: 'dota2',
    defaultSettings: {
      selectedLength: 'any',
      numbers: true,
      selectedLanguage: 'en',
      specialSymbols: 'any',
      theme: 'moba',
      allowBanned: false,
      selectedGender: 'any',
    },
    themes: [
      { value: 'any', label: 'Any' },
      { value: 'moba', label: 'MOBA' },
      { value: 'epic', label: 'Epic' },
      { value: 'competitive', label: 'Competitive' },
    ],
    bgColor: '#6B1A1A',
    color: '#C53B3B',
  },
  {
    name: 'VALORANT',
    id: 'valorant',
    defaultSettings: {
      selectedLength: 'short',
      numbers: false,
      selectedLanguage: 'en',
      specialSymbols: 'yes',
      theme: 'agent',
      allowBanned: false,
      selectedGender: 'any',
    },
    themes: [
      { value: 'any', label: 'Any' },
      { value: 'agent', label: 'Agent' },
      { value: 'tactical', label: 'Tactical' },
      { value: 'futuristic', label: 'Futuristic' },
      { value: 'pro', label: 'Pro Style' },
    ],
    bgColor: '#6B1A4A',
    color: '#C53B94',
  },
  {
    name: 'League of Legends',
    id: 'lol',
    defaultSettings: {
      selectedLength: 'short',
      numbers: false,
      selectedLanguage: 'en',
      specialSymbols: 'any',
      theme: 'champion',
      allowBanned: false,
      selectedGender: 'any',
    },
    themes: [
      { value: 'any', label: 'Any' },
      { value: 'champion', label: 'Champion' },
      { value: 'fantasy', label: 'Fantasy' },
      { value: 'epic', label: 'Epic' },
      { value: 'competitive', label: 'Competitive' },
    ],
    bgColor: '#1A4A6B',
    color: '#3B94C5',
  },
  {
    name: 'Fortnite',
    id: 'fortnite',
    defaultSettings: {
      selectedLength: 'any',
      numbers: false,
      selectedLanguage: 'en',
      specialSymbols: 'any',
      theme: 'fun',
      allowBanned: false,
      selectedGender: 'any',
    },
    themes: [
      { value: 'any', label: 'Any' },
      { value: 'fun', label: 'Fun' },
      { value: 'creative', label: 'Creative' },
      { value: 'casual', label: 'Casual' },
    ],
    bgColor: '#6B1A4A',
    color: '#C53B94',
  },
  {
    name: 'Minecraft',
    id: 'minecraft',
    defaultSettings: {
      selectedLength: 'any',
      numbers: false,
      selectedLanguage: 'en',
      specialSymbols: 'no',
      theme: 'blocky',
      allowBanned: false,
      selectedGender: 'any',
    },
    themes: [
      { value: 'any', label: 'Any' },
      { value: 'blocky', label: 'Blocky' },
      { value: 'creative', label: 'Creative' },
      { value: 'adventure', label: 'Adventure' },
    ],
    bgColor: '#1A4A2E',
    color: '#3BC57A',
  },
  {
    name: 'PUBG',
    id: 'pubg',
    defaultSettings: {
      selectedLength: 'any',
      numbers: true,
      selectedLanguage: 'en',
      specialSymbols: 'any',
      theme: 'battle',
      allowBanned: false,
      selectedGender: 'any',
    },
    themes: [
      { value: 'any', label: 'Any' },
      { value: 'battle', label: 'Battle' },
      { value: 'survival', label: 'Survival' },
      { value: 'military', label: 'Military' },
    ],
    bgColor: '#6B3A1A',
    color: '#C5743B',
  },
  {
    name: 'GTA V',
    id: 'gta5',
    defaultSettings: {
      selectedLength: 'any',
      numbers: true,
      selectedLanguage: 'en',
      specialSymbols: 'any',
      theme: 'street',
      allowBanned: false,
      selectedGender: 'any',
    },
    themes: [
      { value: 'any', label: 'Any' },
      { value: 'street', label: 'Street' },
      { value: 'gang', label: 'Gang' },
      { value: 'criminal', label: 'Criminal' },
    ],
    bgColor: '#6B3A1A',
    color: '#C5743B',
  },
  {
    name: 'Rainbow Six Siege',
    id: 'r6',
    defaultSettings: {
      selectedLength: 'short',
      numbers: false,
      selectedLanguage: 'en',
      specialSymbols: 'yes',
      theme: 'operator',
      allowBanned: false,
      selectedGender: 'any',
    },
    themes: [
      { value: 'any', label: 'Any' },
      { value: 'operator', label: 'Operator' },
      { value: 'tactical', label: 'Tactical' },
      { value: 'elite', label: 'Elite' },
    ],
    bgColor: '#1A4A6B',
    color: '#3B94C5',
  },
  {
    name: 'World of Warcraft',
    id: 'wow',
    defaultSettings: {
      selectedLength: 'long',
      numbers: false,
      selectedLanguage: 'en',
      specialSymbols: 'any',
      theme: 'fantasy',
      allowBanned: false,
      selectedGender: 'any',
    },
    themes: [
      { value: 'any', label: 'Any' },
      { value: 'fantasy', label: 'Fantasy' },
      { value: 'epic', label: 'Epic' },
      { value: 'medieval', label: 'Medieval' },
      { value: 'magical', label: 'Magical' },
    ],
    bgColor: '#6B4A3A',
    color: '#C5947A',
  },
  {
    name: 'Cyberpunk 2077',
    id: 'cyberpunk',
    defaultSettings: {
      selectedLength: 'any',
      numbers: true,
      selectedLanguage: 'en',
      specialSymbols: 'yes',
      theme: 'cyberpunk',
      allowBanned: false,
      selectedGender: 'any',
    },
    themes: [
      { value: 'any', label: 'Any' },
      { value: 'cyberpunk', label: 'Cyberpunk' },
      { value: 'neon', label: 'Neon' },
      { value: 'futuristic', label: 'Futuristic' },
      { value: 'tech', label: 'Tech' },
    ],
    bgColor: '#6B1A4A',
    color: '#C53B94',
  },
  {
    name: 'Team Fortress 2',
    id: 'tf2',
    defaultSettings: {
      selectedLength: 'any',
      numbers: true,
      selectedLanguage: 'en',
      specialSymbols: 'any',
      theme: 'cartoon',
      allowBanned: false,
      selectedGender: 'any',
    },
    themes: [
      { value: 'any', label: 'Any' },
      { value: 'cartoon', label: 'Cartoon' },
      { value: 'fun', label: 'Fun' },
      { value: 'casual', label: 'Casual' },
    ],
    bgColor: '#6B3A1A',
    color: '#C5743B',
  },
  {
    name: 'Roblox',
    id: 'roblox',
    defaultSettings: {
      selectedLength: 'any',
      numbers: false,
      selectedLanguage: 'en',
      specialSymbols: 'no',
      theme: 'kid',
      allowBanned: false,
      selectedGender: 'any',
    },
    themes: [
      { value: 'any', label: 'Any' },
      { value: 'kid', label: 'Kid Friendly' },
      { value: 'fun', label: 'Fun' },
      { value: 'creative', label: 'Creative' },
    ],
    bgColor: '#6B1A1A',
    color: '#C53B3B',
  },
  {
    name: 'Among Us',
    id: 'among-us',
    defaultSettings: {
      selectedLength: 'short',
      numbers: false,
      selectedLanguage: 'en',
      specialSymbols: 'any',
      theme: 'sus',
      allowBanned: false,
      selectedGender: 'any',
    },
    themes: [
      { value: 'any', label: 'Any' },
      { value: 'sus', label: 'Sus' },
      { value: 'fun', label: 'Fun' },
      { value: 'minimalist', label: 'Minimalist' },
      { value: 'casual', label: 'Casual' },
    ],
    bgColor: '#6B1A4A',
    color: '#C53B94',
  },
  {
    name: 'Clash Royale',
    id: 'clash-royale',
    defaultSettings: {
      selectedLength: 'short',
      numbers: false,
      selectedLanguage: 'en',
      specialSymbols: 'any',
      theme: 'royal',
      allowBanned: false,
      selectedGender: 'any',
    },
    themes: [
      { value: 'any', label: 'Any' },
      { value: 'royal', label: 'Royal' },
      { value: 'fantasy', label: 'Fantasy' },
      { value: 'epic', label: 'Epic' },
      { value: 'medieval', label: 'Medieval' },
    ],
    bgColor: '#6B4A1A',
    color: '#C5943B',
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

export const NICKNAME_EXAMPLES_BY_GAME: Record<GameName, string[]> = {
  'Another Game': [
    'PlayerOne',
    'GameMaster',
    'ProGamer',
    'ElitePlayer',
    'Champion',
    'Legend',
    'Warrior',
    'Hero',
    'Master',
    'Ace',
  ],

  'Dota 2': [
    'RAMZES666',
    'BuyBackLater',
    'ward pls',
    'MID_OR_FEED',
    'RoshanWasWatching',
    'Agent Gabena',
    'FRESH_MEAT',
    'The_DOTER_OT_BOGA',
    'JIecHuK',
    'WENOK_KAK_DELA',
    'R1o|Er',
  ],

  'Counter-Strike 2': ['s1mple', 'D1[n]eX', 'V Λ C U U M', 'S.T.A.L.K.R', 'SmokeThenPanic'],

  VALORANT: ['PlantAndPray', 'NeonWasHere', 'LagPeekMaster', 'Vandal Therapy', 'UltReadyMaybe'],

  'League of Legends': [
    'MidOrFeed',
    'TeemoRuinedMyLife',
    'JG Diff Again',
    'BaronAt20',
    'AFK_By_Design',
  ],

  Fortnite: [
    'CrankedOnMonday',
    'BuildThenPanic',
    'DefaultDanceEnjoyer',
    'StormIsPersonal',
    'NoScopeBanana',
  ],

  Minecraft: [
    'SteveFromAccounting',
    'Creeper_Insurance',
    'BlockByBlock',
    'Diamond_Depression',
    'CraftAndRegret',
  ],

  PUBG: ['BushCamper200IQ', 'PanOfJustice', 'LootAndDie', 'RedZoneVictim', 'ThirdPartyEnjoyer'],

  'GTA V': ['NPC_With_Dreams', 'LosSantosTaxi', 'TrustMeImFriendly', 'HeistWentWrong', 'CopMagnet'],

  'Rainbow Six Siege': [
    'DronePhasePTSD',
    'WallIsOptional',
    'FlashAndPray',
    'DefuserLostAgain',
    'FriendlyBreach',
  ],

  'World of Warcraft': [
    'LeeroyMaybe',
    'AFKInStormwind',
    'LootCouncilVictim',
    'ManaProblems',
    'TankAndSpank',
  ],

  'Cyberpunk 2077': [
    'ChromeInMyVeins',
    'NightCityNPC',
    'JohnnyWasRight',
    'GlitchInReality',
    'CyberPsychosis',
  ],

  'Team Fortress 2': [
    'RandomCritsLOL',
    'MedicIsBusy',
    'SpyBehindYou',
    'SandvichTime',
    'EngineerGaming',
  ],

  Roblox: ['FreeRobuxTrust', 'OofMoment', 'AvatarGoneWrong', 'TycoonAddict', 'KidWithAPlan'],

  'Among Us': [
    'RedIsAlwaysSus',
    'NotMeIPromise',
    'EmergencyMeeting',
    'VentedAccidentally',
    'TrustIssues',
  ],
};
