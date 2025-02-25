import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  isDarkMode: boolean = false;

  ngOnInit() {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.updateBodyClass();
  }

  resume() : void {
    window.open('/assets/files/resume.pdf', '_blank');
  }

  toggleTheme() : void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.updateBodyClass();
  }

  updateBodyClass(): void {
    if (this.isDarkMode) {
      document.body.classList.add('bg-dark', 'text-light');
      document.body.classList.remove('bg-light', 'text-dark');
    } else {
      document.body.classList.add('bg-light', 'text-dark');
      document.body.classList.remove('bg-dark', 'text-light');
    }
  }

}
