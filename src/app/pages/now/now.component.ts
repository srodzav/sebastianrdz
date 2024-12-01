import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-now',
  standalone: false,
  
  templateUrl: './now.component.html',
  styleUrl: './now.component.css'
})

export class NowComponent implements OnInit {
  
  currentText: string = '';

  constructor(private httpClient: HttpClient) {
  }
  
  ngOnInit(): void {
    this.httpClient.get('assets/files/now.txt', {responseType: 'text'})
    .subscribe(data => this.currentText = data);
  }

}
