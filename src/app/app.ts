import { Component, computed, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { GAMES, Language, LANGUAGES } from './games.constants';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private router = inject(Router);
  protected readonly title = signal('nickspin.app');
  protected readonly games = GAMES;
  protected readonly languages = LANGUAGES;

  protected readonly currentUrl = signal(this.router.url);

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl.set(event.url);
      });

    effect(() => {
      const color = this.currentGameColor();
      if (typeof document !== 'undefined') {
        document.body.style.backgroundColor = color;
      }
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
}
