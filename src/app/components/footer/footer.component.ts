import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
    selector: 'app-footer',
    standalone: false,

    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {

    currentYear: string = '';

    ngOnInit(): void {
        this.updateTime();

        setInterval(() => {
        this.updateTime();
        }, 1000);
    }

    updateTime(): void {
        const timeZone = 'America/Mexico_City';

        this.currentYear = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        }).format(new Date());
    }
}
