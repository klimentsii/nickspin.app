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

  constructor() {
    effect(() => {
      const color = this.currentGameColor();
      if (typeof document !== 'undefined') {
        const darkerColor = this.darkenColor(color, 0.5);
        document.body.style.background = `linear-gradient(to bottom right, ${color}, ${darkerColor})`;
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundSize = 'cover';
      }
    });
  }

  ngOnInit(): void {
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

  protected nameLength: number = 8;

  protected includeNumbers: boolean = false;
  protected proPlayerStyle: boolean = false;
  protected dropdownOpen: boolean = false;

  protected aiWishes: string = '';
  protected selectedLanguage: string = 'en';
  protected selectedGender: string = 'any';

  protected readonly currentGameId = computed(() => {
    const url = this.currentUrl().replace(/^\//, '');
    const game = GAMES.find(g => g.id === url);
    return game ? game.id : 'roblox';
  });

  protected readonly currentGameColor = computed(() => {
    const game = GAMES.find(g => g.id === this.currentGameId());
    return game ? game.bgColor : GAMES.find(g => g.id === 'roblox')?.bgColor || '#6B1A1A';
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
}
