import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeSwitcher } from './shared/components/theme-switcher/theme-switcher';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeSwitcher],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'BudgetManager';
}
