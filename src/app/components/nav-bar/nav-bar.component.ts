import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  isDarkMode: boolean = false;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
      this.updateTheme();
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.themeService.setTheme(e.matches);
      }
    });
  }

  resume() : void {
    window.open('/assets/files/resume.pdf', '_blank');
  }

  toggleTheme() : void {
    this.themeService.toggleTheme();
  }

  private updateTheme(): void {
    const htmlElement = this.document.documentElement;
    
    if (this.isDarkMode) {
      this.renderer.setAttribute(htmlElement, 'data-bs-theme', 'dark');
      this.renderer.addClass(this.document.body, 'bg-dark');
      this.renderer.addClass(this.document.body, 'text-light');
      this.renderer.removeClass(this.document.body, 'bg-light');
      this.renderer.removeClass(this.document.body, 'text-dark');
    } else {
      this.renderer.setAttribute(htmlElement, 'data-bs-theme', 'light');
      this.renderer.addClass(this.document.body, 'bg-light');
      this.renderer.addClass(this.document.body, 'text-dark');
      this.renderer.removeClass(this.document.body, 'bg-dark');
      this.renderer.removeClass(this.document.body, 'text-light');
    }
  }

}
