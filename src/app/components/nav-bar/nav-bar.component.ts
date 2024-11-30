import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  resume() : void {
    window.open('/assets/files/resume.pdf', '_blank');
  }

}
