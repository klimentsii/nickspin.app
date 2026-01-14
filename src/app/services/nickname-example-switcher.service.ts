import { Injectable } from '@angular/core';
import { NICKNAME_EXAMPLES_BY_GAME } from '../games.constants';

@Injectable({
  providedIn: 'root',
})
export class NicknameExampleSwitcherService {
  getExamples(gameName: string): string[] {
    return NICKNAME_EXAMPLES_BY_GAME[gameName] ?? [];
  }
}
