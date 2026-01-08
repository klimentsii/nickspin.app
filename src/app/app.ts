import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GAMES } from './games.constants';

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

  protected selectGame(gameId: string): void {
    this.router.navigate(['/', gameId]);
  }

  protected isActive(gameId: string): boolean {
    return this.router.url.includes(gameId);
  }
}
