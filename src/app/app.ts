import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { GAMES, Game } from './games.constants';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private router = inject(Router);
  protected readonly title = signal('nickspin.app');
  protected readonly games = GAMES;

  protected readonly currentUrl = signal(this.router.url);

  constructor() {
    if (this.router.url === '/') {
      this.router.navigate(['/roblox']);
    }
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl.set(event.url);
      });
  }

  protected readonly activeGameId = computed(() => {
    const url = this.currentUrl();
    const match = url.match(/\/([^\/]+)/);
    return match ? match[1] : 'roblox';
  });

  protected readonly currentGame = computed(() => {
    return GAMES.find(game => game.id === this.activeGameId()) || GAMES[0];
  });

  protected isActive(gameId: string): boolean {
    return this.activeGameId() === gameId;
  }

  protected selectGame(gameId: string): void {
    this.router.navigate(['/', gameId]);
  }
}
