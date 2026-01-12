import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GAMES, Language, LANGUAGES } from './games.constants';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private router = inject(Router);
  protected readonly games = GAMES;
  protected readonly languages = LANGUAGES;

  protected iconRegistry: MatIconRegistry = inject(MatIconRegistry);
  protected sanitizer: DomSanitizer = inject(DomSanitizer);
  private http: HttpClient = inject(HttpClient);

  protected readonly currentUrl = signal(this.router.url);
  private currentLayer = 1;
  protected generatedNicknames: Array<{ id: string; nickname: string; liked: boolean }> = [];
  protected favoriteNicknames: Array<{ id: string; nickname: string; liked: boolean }> = [];
  protected historyNicknames: Array<{ id: string; nickname: string; liked: boolean }> = [];
  protected isLoading: boolean = false;
  nickname: string = '';
  loading: boolean = false;
  usedNicknames = new Set<string>();
  private nicknameIdCounter = 0;
  protected showCopyNotification: boolean = false;
  private readonly FAVORITES_STORAGE_KEY = 'nickspin_favorites';
  private readonly HISTORY_STORAGE_KEY = 'nickspin_history';
  private readonly MAX_HISTORY_SIZE = 100;

  constructor() {
    this.iconRegistry.addSvgIcon(
      'game',
      this.sanitizer.bypassSecurityTrustResourceUrl(`/assets/icons/game.svg`)
    );

    if (typeof document !== 'undefined') {
      const initialColor = this.currentGameColor();
      const initialDarkerColor = this.darkenColor(initialColor, 0.5);
      const initialGradient = `linear-gradient(to bottom right, ${initialColor}, ${initialDarkerColor})`;
      document.body.style.background = initialGradient;
      document.body.style.backgroundAttachment = 'fixed';
      document.body.style.backgroundSize = 'cover';

      const layer1 = document.querySelector('.background-layer-1') as HTMLElement;
      const layer2 = document.querySelector('.background-layer-2') as HTMLElement;
      if (layer1) {
        layer1.style.background = initialGradient;
        layer1.style.opacity = '1';
      }
      if (layer2) {
        layer2.style.opacity = '0';
      }
    }
    effect(() => {
      const color = this.currentGameColor();
      if (typeof document !== 'undefined') {
        const darkerColor = this.darkenColor(color, 0.5);
        const newGradient = `linear-gradient(to bottom right, ${color}, ${darkerColor})`;

        const activeLayer = this.currentLayer === 1 ? 2 : 1;
        const inactiveLayer = this.currentLayer;

        const activeLayerEl = document.querySelector(
          `.background-layer-${activeLayer}`
        ) as HTMLElement;
        const inactiveLayerEl = document.querySelector(
          `.background-layer-${inactiveLayer}`
        ) as HTMLElement;

        if (activeLayerEl && inactiveLayerEl) {
          activeLayerEl.style.background = newGradient;
          activeLayerEl.style.opacity = '0';
          activeLayerEl.style.transition = 'none';

          requestAnimationFrame(() => {
            activeLayerEl.style.transition = 'opacity 0.5s ease-in-out';
            inactiveLayerEl.style.transition = 'opacity 0.5s ease-in-out';
            activeLayerEl.style.opacity = '1';
            inactiveLayerEl.style.opacity = '0';
          });

          setTimeout(() => {
            document.body.style.background = newGradient;
          }, 500);

          this.currentLayer = activeLayer;
        }
      }
    });
  }
  generateNickname() {
    let exampleNickNames: string[] = [];

    switch (this.currentGame().name) {
      case 'Dota 2':
        exampleNickNames = ['RAMZES666', 'Mr.ProperAnGeL', 'Lina X', 'klimentsii', 'artlor'];
        break;

      case 'Counter-Strike 2':
        exampleNickNames = [
          's1mple',
          'Captain VAC Sparrow',
          'Friendly Fire',
          'Jean Claude VACban',
          'RushB_Or_Cry',
        ];
        break;

      case 'VALORANT':
        exampleNickNames = [
          'Headshot',
          'Vandal Therapy',
          'NeonWasHere',
          'PlantAndPray',
          'LaggingInHeaven',
        ];
        break;

      case 'League of Legends':
        exampleNickNames = [
          'GankMeMaybe',
          'TeemoRuinedMyLife',
          'MidOrFeed',
          'BaronStealer',
          'AFK_By_Design',
        ];
        break;

      case 'Fortnite':
        exampleNickNames = [
          'BuildFightEnjoyer',
          'CrankedOnSunday',
          'NoScopeBanana',
          'StormIsComing',
          'DefaultDanceLord',
        ];
        break;

      case 'Minecraft':
        exampleNickNames = [
          'Creeper',
          'BlockEnjoyer',
          'Diamond_Depression',
          'SteveFromAccounting',
          'CraftAndSuffer',
        ];
        break;

      case 'PUBG':
        exampleNickNames = [
          'PanOfJustice',
          'BushCamper200IQ',
          'RedZoneVictim',
          'LootAndDie',
          'ThirdPartyEnjoyer',
        ];
        break;

      case 'GTA V':
        exampleNickNames = [
          'LosSantosTaxi',
          'TrustMeImFriendly',
          'HeistWentWrong',
          'NPC_With_Dreams',
          'CopMagnet',
        ];
        break;

      case 'Rainbow Six Siege':
        exampleNickNames = [
          'DronePhasePTSD',
          'WallIsOptional',
          'FriendlyBreach',
          'FlashAndPray',
          'DefuserLostAgain',
        ];
        break;

      case 'World of Warcraft':
        exampleNickNames = [
          'LeeroyMaybe',
          'ManaProblems',
          'TankAndSpank',
          'AFKInStormwind',
          'LootCouncilVictim',
        ];
        break;

      case 'Cyberpunk 2077':
        exampleNickNames = [
          'ChromeInMyVeins',
          'NightCityNPC',
          'JohnnyWasRight',
          'GlitchInReality',
          'CyberPsychosis',
        ];
        break;

      case 'Team Fortress 2':
        exampleNickNames = [
          'MedicIsBusy',
          'SpyBehindYou',
          'SandvichTime',
          'RandomCritsLOL',
          'EngineerGaming',
        ];
        break;

      case 'Roblox':
        exampleNickNames = [
          'FreeRobuxTrust',
          'OofMoment',
          'TycoonAddict',
          'AvatarGoneWrong',
          'KidWithAPlan',
        ];
        break;

      case 'Among Us':
        exampleNickNames = [
          'NotMeIPromise',
          'RedIsAlwaysSus',
          'EmergencyMeeting',
          'VentedAccidentally',
          'TrustIssues',
        ];
        break;
    }

    this.isLoading = true;

    const body = {
      game: this.currentGame().name,
      length: [this.minLength, this.maxLength],
      numbers: this.numbers,
      language: this.getLanguageName(this.selectedLanguage),
      proStyle: this.proPlayerStyle,
      specialSymbols: this.specialSymbols,
      examples: exampleNickNames,
      gender: this.selectedGender,
      tone: this.tone,
      theme: this.theme,
      allowBanned: this.allowBanned,
    };
    this.http.post<any>('https://nickspin.miatselski-artur.workers.dev', body, {}).subscribe({
      next: (res) => {
        console.log(res);
        
        this.generatedNicknames = [];
        
        let nicknames: string[] = [];
        
        if (typeof res.nickname === 'string') {
          try {
            const parsed = JSON.parse(res.nickname);
            nicknames = Array.isArray(parsed) ? parsed : [res.nickname];
          } catch (e) {
            nicknames = [res.nickname];
          }
        } else if (Array.isArray(res.nickname)) {
          nicknames = res.nickname;
        } else {
          nicknames = [res.nickname];
        }
        
        nicknames.forEach((nick: string) => {
          let processedNick = nick;
          
          if (this.usedNicknames.has(processedNick)) {
            processedNick += Math.floor(Math.random() * 100);
          }
          this.usedNicknames.add(processedNick);
          
          const newId = `nickname-${Date.now()}-${++this.nicknameIdCounter}`;
          const isFavorite = this.favoriteNicknames.some(fav => fav.nickname === processedNick);
          
          const nicknameItem = { 
            id: newId, 
            nickname: processedNick, 
            liked: isFavorite 
          };
          
          this.generatedNicknames.push(nicknameItem);
          
          this.addToHistory(nicknameItem);
        });
        
        if (nicknames.length > 0) {
          this.nickname = nicknames[0];
        }
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadPinnedState();
    this.loadFavorites();
    this.loadHistory();

    this.games.forEach((game) => {
      this.iconRegistry.addSvgIcon(
        game.id,
        this.sanitizer.bypassSecurityTrustResourceUrl(`/assets/icons/${game.id}.svg`)
      );
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl.set(event.url);
      });

    if (typeof document !== 'undefined') {
      document.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.custom-dropdown')) {
          this.closeAllDropdowns();
        }
      });

      window.addEventListener('resize', () => {
        if (this.dropdownOpen) this.checkDropdownPosition('language');
        if (this.specialSymbolsDropdownOpen) this.checkDropdownPosition('specialSymbols');
        if (this.themeDropdownOpen) this.checkDropdownPosition('theme');
        if (this.toneDropdownOpen) this.checkDropdownPosition('tone');
        if (this.uniquenessDropdownOpen) this.checkDropdownPosition('uniqueness');
      });
    }
  }

  protected minLength: number = 4;
  protected maxLength: number = 16;
  protected isDraggingMin: boolean = false;
  protected isDraggingMax: boolean = false;

  private boundOnDragMinMouse?: (event: MouseEvent) => void;
  private boundOnDragMinTouch?: (event: TouchEvent) => void;
  private boundOnDragMaxMouse?: (event: MouseEvent) => void;
  private boundOnDragMaxTouch?: (event: TouchEvent) => void;
  private boundStopDragMin?: () => void;
  private boundStopDragMax?: () => void;

  protected numbers: boolean = false;
  protected proPlayerStyle: boolean = false;
  protected dropdownOpen: boolean = false;
  protected specialSymbolsDropdownOpen: boolean = false;
  protected themeDropdownOpen: boolean = false;
  protected toneDropdownOpen: boolean = false;
  protected uniquenessDropdownOpen: boolean = false;

  protected aiWishes: string = '';
  protected selectedLanguage: string = 'en';
  protected selectedGender: string = 'any';
  protected specialSymbols: string = 'any';
  protected theme: string = 'any';
  protected tone: string = 'neutral';
  protected uniqueness: string = 'medium';
  protected allowBanned: boolean = false;

  protected languageMenuTop: boolean = false;
  protected specialSymbolsMenuTop: boolean = false;
  protected themeMenuTop: boolean = false;
  protected toneMenuTop: boolean = false;
  protected uniquenessMenuTop: boolean = false;

  protected sidebarPinned: boolean = false;
  protected settingsPanelPinned: boolean = false;
  protected favoritesPanelPinned: boolean = false;
  protected historyPanelPinned: boolean = false;

  private readonly SIDEBAR_PIN_KEY = 'nickspin_sidebar_pinned';
  private readonly SETTINGS_PANEL_PIN_KEY = 'nickspin_settings_panel_pinned';
  private readonly FAVORITES_PANEL_PIN_KEY = 'nickspin_favorites_panel_pinned';
  private readonly HISTORY_PANEL_PIN_KEY = 'nickspin_history_panel_pinned';

  protected readonly currentGameId = computed(() => {
    const url = this.currentUrl().replace(/^\//, '');
    const game = GAMES.find((g) => g.id === url);
    return game ? game.id : 'roblox';
  });

  protected readonly currentGameColor = computed(() => {
    const game = GAMES.find((g) => g.id === this.currentGameId());
    return game ? game.bgColor : GAMES.find((g) => g.id === 'roblox')?.bgColor || '#6B1A1A';
  });

  protected readonly currentGameAccentColor = computed(() => {
    const game = GAMES.find((g) => g.id === this.currentGameId());
    return game ? game.color : GAMES.find((g) => g.id === 'roblox')?.color || '#C53B3B';
  });

  protected readonly currentGame = computed(() => {
    const game = GAMES.find((g) => g.id === this.currentGameId());
    return game || GAMES.find((g) => g.id === 'roblox') || GAMES[0];
  });

  protected getLanguageName(code: string): string {
    const lang = this.languages.find((l) => l.code === code);
    return lang ? lang.name : 'English';
  }

  protected selectLanguage(lang: Language) {
    this.selectedLanguage = lang.code;
    this.dropdownOpen = false;
    this.closeAllDropdowns();
  }

  protected closeAllDropdowns(): void {
    this.dropdownOpen = false;
    this.specialSymbolsDropdownOpen = false;
    this.themeDropdownOpen = false;
    this.toneDropdownOpen = false;
    this.uniquenessDropdownOpen = false;
  }

  protected toggleDropdown(
    dropdownType: 'language' | 'specialSymbols' | 'theme' | 'tone' | 'uniqueness'
  ): void {
    if (dropdownType !== 'language') this.dropdownOpen = false;
    if (dropdownType !== 'specialSymbols') this.specialSymbolsDropdownOpen = false;
    if (dropdownType !== 'theme') this.themeDropdownOpen = false;
    if (dropdownType !== 'tone') this.toneDropdownOpen = false;
    if (dropdownType !== 'uniqueness') this.uniquenessDropdownOpen = false;

    if (typeof document !== 'undefined') {
      const dropdown = document.querySelector(`[data-dropdown="${dropdownType}"]`) as HTMLElement;
      if (dropdown) {
        const shouldShowTop = this.calculateDropdownPosition(dropdown);

        switch (dropdownType) {
          case 'language':
            this.languageMenuTop = shouldShowTop;
            break;
          case 'specialSymbols':
            this.specialSymbolsMenuTop = shouldShowTop;
            break;
          case 'theme':
            this.themeMenuTop = shouldShowTop;
            break;
          case 'tone':
            this.toneMenuTop = shouldShowTop;
            break;
          case 'uniqueness':
            this.uniquenessMenuTop = shouldShowTop;
            break;
        }
      }
    }

    switch (dropdownType) {
      case 'language':
        this.dropdownOpen = !this.dropdownOpen;
        break;
      case 'specialSymbols':
        this.specialSymbolsDropdownOpen = !this.specialSymbolsDropdownOpen;
        break;
      case 'theme':
        this.themeDropdownOpen = !this.themeDropdownOpen;
        break;
      case 'tone':
        this.toneDropdownOpen = !this.toneDropdownOpen;
        break;
      case 'uniqueness':
        this.uniquenessDropdownOpen = !this.uniquenessDropdownOpen;
        break;
    }
  }

  private calculateDropdownPosition(dropdown: HTMLElement): boolean {
    const rect = dropdown.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const estimatedMenuHeight = 250;
    const padding = 20;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    return spaceBelow < estimatedMenuHeight + padding && spaceAbove > spaceBelow;
  }

  private checkDropdownPosition(
    dropdownType: 'language' | 'specialSymbols' | 'theme' | 'tone' | 'uniqueness'
  ): void {
    if (typeof document === 'undefined') return;

    const dropdown = document.querySelector(`[data-dropdown="${dropdownType}"]`) as HTMLElement;
    if (!dropdown) return;

    const menu = dropdown.querySelector('.dropdown-menu') as HTMLElement;
    if (!menu) return;

    const rect = dropdown.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const menuHeight = menuRect.height;
    const padding = 20;

    if (spaceBelow < menuHeight + padding && spaceAbove > spaceBelow) {
      menu.classList.add('dropdown-menu-top');
    } else {
      menu.classList.remove('dropdown-menu-top');
    }
  }
  protected selectGame(gameId: string): void {
    this.router.navigate(['/', gameId]);
  }

  protected isActive(gameId: string): boolean {
    return this.router.url.includes(gameId);
  }

  protected getGameColor(gameId: string): string {
    const game = GAMES.find((g) => g.id === gameId);
    return game ? game.color : '#6366f1';
  }

  protected getGameColorRgb(gameId: string): string {
    const color = this.getGameColor(gameId);
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }

  protected toggleSidebarPin(): void {
    this.sidebarPinned = !this.sidebarPinned;
    this.savePinnedState();
  }

  protected toggleSettingsPanelPin(): void {
    this.settingsPanelPinned = !this.settingsPanelPinned;
    this.savePinnedState();
  }

  protected toggleFavoritesPanelPin(): void {
    this.favoritesPanelPinned = !this.favoritesPanelPinned;
    this.savePinnedState();
  }

  protected toggleHistoryPanelPin(): void {
    this.historyPanelPinned = !this.historyPanelPinned;
    this.savePinnedState();
  }

  private loadPinnedState(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const sidebarPinned = localStorage.getItem(this.SIDEBAR_PIN_KEY);
      const settingsPanelPinned = localStorage.getItem(this.SETTINGS_PANEL_PIN_KEY);
      const favoritesPanelPinned = localStorage.getItem(this.FAVORITES_PANEL_PIN_KEY);
      const historyPanelPinned = localStorage.getItem(this.HISTORY_PANEL_PIN_KEY);

      if (sidebarPinned !== null) {
        this.sidebarPinned = sidebarPinned === 'true';
      }

      if (settingsPanelPinned !== null) {
        this.settingsPanelPinned = settingsPanelPinned === 'true';
      }

      if (favoritesPanelPinned !== null) {
        this.favoritesPanelPinned = favoritesPanelPinned === 'true';
      }

      if (historyPanelPinned !== null) {
        this.historyPanelPinned = historyPanelPinned === 'true';
      }
    }
  }

  private savePinnedState(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.SIDEBAR_PIN_KEY, String(this.sidebarPinned));
      localStorage.setItem(this.SETTINGS_PANEL_PIN_KEY, String(this.settingsPanelPinned));
      localStorage.setItem(this.FAVORITES_PANEL_PIN_KEY, String(this.favoritesPanelPinned));
      localStorage.setItem(this.HISTORY_PANEL_PIN_KEY, String(this.historyPanelPinned));
    }
  }

  private darkenColor(color: string, amount: number): string {
    const hex = color.replace('#', '');

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const newR = Math.max(0, Math.floor(r * (1 - amount)));
    const newG = Math.max(0, Math.floor(g * (1 - amount)));
    const newB = Math.max(0, Math.floor(b * (1 - amount)));

    const toHex = (n: number) => {
      const hex = n.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
  }

  protected startDragMin(event: MouseEvent | TouchEvent): void {
    this.isDraggingMin = true;
    event.preventDefault();
    if (typeof document !== 'undefined') {
      this.boundOnDragMinMouse = (e: MouseEvent) => {
        if (this.isDraggingMin) {
          this.updateMinValue(e.clientX);
        }
      };
      this.boundOnDragMinTouch = (e: TouchEvent) => {
        if (this.isDraggingMin && e.touches.length > 0) {
          this.updateMinValue(e.touches[0].clientX);
        }
      };
      this.boundStopDragMin = () => this.stopDragMin();
      document.addEventListener('mousemove', this.boundOnDragMinMouse);
      document.addEventListener('mouseup', this.boundStopDragMin);
      document.addEventListener('touchmove', this.boundOnDragMinTouch);
      document.addEventListener('touchend', this.boundStopDragMin);
    }
  }

  protected startDragMax(event: MouseEvent | TouchEvent): void {
    this.isDraggingMax = true;
    event.preventDefault();
    if (typeof document !== 'undefined') {
      this.boundOnDragMaxMouse = (e: MouseEvent) => {
        if (this.isDraggingMax) {
          this.updateMaxValue(e.clientX);
        }
      };
      this.boundOnDragMaxTouch = (e: TouchEvent) => {
        if (this.isDraggingMax && e.touches.length > 0) {
          this.updateMaxValue(e.touches[0].clientX);
        }
      };
      this.boundStopDragMax = () => this.stopDragMax();
      document.addEventListener('mousemove', this.boundOnDragMaxMouse);
      document.addEventListener('mouseup', this.boundStopDragMax);
      document.addEventListener('touchmove', this.boundOnDragMaxTouch);
      document.addEventListener('touchend', this.boundStopDragMax);
    }
  }

  private stopDragMin(): void {
    this.isDraggingMin = false;
    if (typeof document !== 'undefined') {
      if (this.boundOnDragMinMouse) {
        document.removeEventListener('mousemove', this.boundOnDragMinMouse);
      }
      if (this.boundOnDragMinTouch) {
        document.removeEventListener('touchmove', this.boundOnDragMinTouch);
      }
      if (this.boundStopDragMin) {
        document.removeEventListener('mouseup', this.boundStopDragMin);
        document.removeEventListener('touchend', this.boundStopDragMin);
      }
    }
  }

  private stopDragMax(): void {
    this.isDraggingMax = false;
    if (typeof document !== 'undefined') {
      if (this.boundOnDragMaxMouse) {
        document.removeEventListener('mousemove', this.boundOnDragMaxMouse);
      }
      if (this.boundOnDragMaxTouch) {
        document.removeEventListener('touchmove', this.boundOnDragMaxTouch);
      }
      if (this.boundStopDragMax) {
        document.removeEventListener('mouseup', this.boundStopDragMax);
        document.removeEventListener('touchend', this.boundStopDragMax);
      }
    }
  }

  private updateMinValue(clientX: number): void {
    const slider = document.querySelector('.dual-range-slider') as HTMLElement;
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const min = 4;
    const max = 32;
    const newValue = Math.round(min + percent * (max - min));

    if (newValue <= this.maxLength) {
      this.minLength = Math.max(4, Math.min(32, newValue));
    }
  }

  private updateMaxValue(clientX: number): void {
    const slider = document.querySelector('.dual-range-slider') as HTMLElement;
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const min = 4;
    const max = 32;
    const newValue = Math.round(min + percent * (max - min));

    if (newValue >= this.minLength) {
      this.maxLength = Math.max(4, Math.min(32, newValue));
    }
  }

  protected getMinPercent(): number {
    return ((this.minLength - 4) / (32 - 4)) * 100;
  }

  protected getMaxPercent(): number {
    return ((this.maxLength - 4) / (32 - 4)) * 100;
  }

  protected getRangeWidth(): number {
    return this.getMaxPercent() - this.getMinPercent();
  }

  protected copyNickname(nickname: string): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(nickname).then(() => {
        this.showCopyNotification = true;
        setTimeout(() => {
          this.showCopyNotification = false;
        }, 2000);
      });
    }
  }

  protected toggleLike(id: string): void {
    let nicknameItem = this.generatedNicknames.find(item => item.id === id);
    
    if (!nicknameItem) {
      nicknameItem = this.historyNicknames.find(item => item.id === id);
    }
    
    if (nicknameItem) {
      nicknameItem.liked = !nicknameItem.liked;
      
      if (nicknameItem.liked) {
        const exists = this.favoriteNicknames.some(fav => fav.nickname === nicknameItem!.nickname);
        if (!exists) {
          const favoriteItem = { ...nicknameItem };
          this.favoriteNicknames.push(favoriteItem);
        }
      } else {
        this.favoriteNicknames = this.favoriteNicknames.filter(item => item.nickname !== nicknameItem!.nickname);
      }
      
      const historyItem = this.historyNicknames.find(item => item.nickname === nicknameItem!.nickname);
      if (historyItem) {
        historyItem.liked = nicknameItem.liked;
        this.saveHistory();
      }
      
      const generatedItem = this.generatedNicknames.find(item => item.nickname === nicknameItem!.nickname);
      if (generatedItem) {
        generatedItem.liked = nicknameItem.liked;
      }
      
      this.saveFavorites();
    }
  }

  protected removeFromFavorites(id: string): void {
    const favoriteItem = this.favoriteNicknames.find(item => item.id === id);
    if (favoriteItem) {
      this.favoriteNicknames = this.favoriteNicknames.filter(item => item.id !== id);
      
      const nicknameItem = this.generatedNicknames.find(item => item.nickname === favoriteItem.nickname);
      if (nicknameItem) {
        nicknameItem.liked = false;
      }
      
      this.saveFavorites();
    }
  }

  private loadFavorites(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = localStorage.getItem(this.FAVORITES_STORAGE_KEY);
        if (stored) {
          this.favoriteNicknames = JSON.parse(stored);
        }
      } catch (e) {
        console.error('Error loading favorites:', e);
      }
    }
  }

  private saveFavorites(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(this.FAVORITES_STORAGE_KEY, JSON.stringify(this.favoriteNicknames));
      } catch (e) {
        console.error('Error saving favorites:', e);
      }
    }
  }

  private addToHistory(nicknameItem: { id: string; nickname: string; liked: boolean }): void {
    const existingIndex = this.historyNicknames.findIndex(item => item.nickname === nicknameItem.nickname);
    
    if (existingIndex !== -1) {
      const existing = this.historyNicknames[existingIndex];
      existing.liked = nicknameItem.liked;
      this.historyNicknames.splice(existingIndex, 1);
      this.historyNicknames.unshift(existing);
    } else {
      const isFavorite = this.favoriteNicknames.some(fav => fav.nickname === nicknameItem.nickname);
      const historyItem = {
        ...nicknameItem,
        liked: isFavorite
      };
      
      this.historyNicknames.unshift(historyItem);
      
      if (this.historyNicknames.length > this.MAX_HISTORY_SIZE) {
        this.historyNicknames = this.historyNicknames.slice(0, this.MAX_HISTORY_SIZE);
      }
    }
    
    this.saveHistory();
  }

  private loadHistory(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = localStorage.getItem(this.HISTORY_STORAGE_KEY);
        if (stored) {
          this.historyNicknames = JSON.parse(stored);
          this.historyNicknames.forEach(item => {
            item.liked = this.favoriteNicknames.some(fav => fav.nickname === item.nickname);
          });
        }
      } catch (e) {
        console.error('Error loading history:', e);
      }
    }
  }

  private saveHistory(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(this.HISTORY_STORAGE_KEY, JSON.stringify(this.historyNicknames));
      } catch (e) {
        console.error('Error saving history:', e);
      }
    }
  }

  protected removeFromHistory(id: string): void {
    this.historyNicknames = this.historyNicknames.filter(item => item.id !== id);
    this.saveHistory();
  }
}
