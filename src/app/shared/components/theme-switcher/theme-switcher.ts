import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [],
  templateUrl: './theme-switcher.html',
  styleUrls: ['./theme-switcher.css']
})

export class ThemeSwitcher implements OnInit {
  selectedColor: string = '#ff4081';

  onColorChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.setAccentColor(input.value);
  }

  setAccentColor(color: string) {
    this.selectedColor = color;
    document.documentElement.style.setProperty('--accent-color', color);

    const hover = this.darkenColor(color, 0.15);
    document.documentElement.style.setProperty('--accent-color-hover', hover);

    localStorage.setItem('accent-color', color);
    localStorage.setItem('accent-color-hover', hover);
  }

  private darkenColor(hex: string, amount: number): string {
    let col = hex.replace('#', '');
    let num = parseInt(col, 16);

    let r = Math.max(0, (num >> 16) - 255 * amount);
    let g = Math.max(0, ((num >> 8) & 0x00FF) - 255 * amount);
    let b = Math.max(0, (num & 0x0000FF) - 255 * amount);

    return (
      '#' +
      [r, g, b]
        .map(x => {
          const hex = Math.round(x).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
    );
  }

  ngOnInit() {
    const color = localStorage.getItem('accent-color');
    if (color) {
      this.setAccentColor(color);
    }
  }
}
