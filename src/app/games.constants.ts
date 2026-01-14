export interface Game {
  name: string;
  id: string;
  defaultSettings: null;
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
    name: 'Counter-Strike 2',
    id: 'cs2',
    defaultSettings: null,
    bgColor: '#6B4423',
    color: '#D58846',
  },
  {
    name: 'Dota 2',
    id: 'dota2',
    defaultSettings: null,
    bgColor: '#6B1A1A',
    color: '#C53B3B',
  },
  {
    name: 'VALORANT',
    id: 'valorant',
    defaultSettings: null,
    bgColor: '#6B1A4A',
    color: '#C53B94',
  },
  {
    name: 'League of Legends',
    id: 'lol',
    defaultSettings: null,
    bgColor: '#1A4A6B',
    color: '#3B94C5',
  },
  {
    name: 'Fortnite',
    id: 'fortnite',
    defaultSettings: null,
    bgColor: '#6B1A4A',
    color: '#C53B94',
  },
  {
    name: 'Minecraft',
    id: 'minecraft',
    defaultSettings: null,
    bgColor: '#1A4A2E',
    color: '#3BC57A',
  },
  {
    name: 'PUBG',
    id: 'pubg',
    defaultSettings: null,
    bgColor: '#6B3A1A',
    color: '#C5743B',
  },
  {
    name: 'GTA V',
    id: 'gta5',
    defaultSettings: null,
    bgColor: '#6B3A1A',
    color: '#C5743B',
  },
  {
    name: 'Rainbow Six Siege',
    id: 'r6',
    defaultSettings: null,
    bgColor: '#1A4A6B',
    color: '#3B94C5',
  },
  {
    name: 'World of Warcraft',
    id: 'wow',
    defaultSettings: null,
    bgColor: '#6B4A3A',
    color: '#C5947A',
  },
  {
    name: 'Cyberpunk 2077',
    id: 'cyberpunk',
    defaultSettings: null,
    bgColor: '#6B1A4A',
    color: '#C53B94',
  },
  {
    name: 'Team Fortress 2',
    id: 'tf2',
    defaultSettings: null,
    bgColor: '#6B3A1A',
    color: '#C5743B',
  },
  {
    name: 'Roblox',
    id: 'roblox',
    defaultSettings: null,
    bgColor: '#6B1A1A',
    color: '#C53B3B',
  },
  {
    name: 'Among Us',
    id: 'among-us',
    defaultSettings: null,
    bgColor: '#6B1A4A',
    color: '#C53B94',
  },
  {
    name: 'Clash Royale',
    id: 'clash-royale',
    defaultSettings: null,
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
