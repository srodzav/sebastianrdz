import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: false,
  
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit, OnDestroy {
  isDarkMode: boolean = false;
  private themeSubscription: Subscription = new Subscription();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeSubscription = this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  get cardBorderClass(): string {
    return this.isDarkMode ? 'card border-light h-100 w-100' : 'card border-dark h-100 w-100';
  }

  get primaryButtonClass(): string {
    return this.isDarkMode ? 'btn btn-teal' : 'btn btn-cornflow';
  }

  get secondaryButtonClass(): string {
    return this.isDarkMode ? 'btn btn-outline-teal' : 'btn btn-outline-cornflow';
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }
}
