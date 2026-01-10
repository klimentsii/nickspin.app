import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GAMES, Language, LANGUAGES } from './games.constants';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { filter } from 'rxjs';

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
  
  protected readonly currentUrl = signal(this.router.url);
  private currentLayer = 1;

  constructor() {this.iconRegistry.addSvgIcon(
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
        
        const activeLayerEl = document.querySelector(`.background-layer-${activeLayer}`) as HTMLElement;
        const inactiveLayerEl = document.querySelector(`.background-layer-${inactiveLayer}`) as HTMLElement;
        
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

  ngOnInit(): void {
    this.loadPinnedState();

    this.games.forEach(game => {
      this.iconRegistry.addSvgIcon(
        game.id,
        this.sanitizer.bypassSecurityTrustResourceUrl(`/assets/icons/${game.id}.svg`)
      );
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl.set(event.url);
      });
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

  protected aiWishes: string = '';
  protected selectedLanguage: string = 'en';
  protected selectedGender: string = 'any';

  protected sidebarPinned: boolean = false;
  protected settingsPanelPinned: boolean = false;

  private readonly SIDEBAR_PIN_KEY = 'nickspin_sidebar_pinned';
  private readonly SETTINGS_PANEL_PIN_KEY = 'nickspin_settings_panel_pinned';

  protected readonly currentGameId = computed(() => {
    const url = this.currentUrl().replace(/^\//, '');
    const game = GAMES.find(g => g.id === url);
    return game ? game.id : 'roblox';
  });

  protected readonly currentGameColor = computed(() => {
    const game = GAMES.find(g => g.id === this.currentGameId());
    return game ? game.bgColor : GAMES.find(g => g.id === 'roblox')?.bgColor || '#6B1A1A';
  });

  protected readonly currentGameAccentColor = computed(() => {
    const game = GAMES.find(g => g.id === this.currentGameId());
    return game ? game.color : GAMES.find(g => g.id === 'roblox')?.color || '#C53B3B';
  });

  protected readonly currentGame = computed(() => {
    const game = GAMES.find(g => g.id === this.currentGameId());
    return game || GAMES.find(g => g.id === 'roblox') || GAMES[0];
  });

  protected getLanguageName(code: string): string {
    const lang = this.languages.find((l) => l.code === code);
    return lang ? lang.name : 'English';
  }

  protected selectLanguage(lang: Language) {
    this.selectedLanguage = lang.code;
    this.dropdownOpen = true;
  }
  protected selectGame(gameId: string): void {
    this.router.navigate(['/', gameId]);
  }

  protected isActive(gameId: string): boolean {
    return this.router.url.includes(gameId);
  }

  protected getGameColor(gameId: string): string {
    const game = GAMES.find(g => g.id === gameId);
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

  private loadPinnedState(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const sidebarPinned = localStorage.getItem(this.SIDEBAR_PIN_KEY);
      const settingsPanelPinned = localStorage.getItem(this.SETTINGS_PANEL_PIN_KEY);

      if (sidebarPinned !== null) {
        this.sidebarPinned = sidebarPinned === 'true';
      }
      
      if (settingsPanelPinned !== null) {
        this.settingsPanelPinned = settingsPanelPinned === 'true';
      }
    }
  }

  private savePinnedState(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.SIDEBAR_PIN_KEY, String(this.sidebarPinned));
      localStorage.setItem(this.SETTINGS_PANEL_PIN_KEY, String(this.settingsPanelPinned));
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
}
