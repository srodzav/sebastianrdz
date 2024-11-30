import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: false,
  
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  
  goToLink(url: string) {
    window.open(url, '_blank');
  }
}
