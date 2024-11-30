import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
    selector: 'app-home',
    standalone: false,

    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit {

    currentTime: string = '';

    ngOnInit(): void {
        this.updateTime();

        setInterval(() => {
        this.updateTime();
        }, 1000);
    }

    updateTime(): void {
        const timeZone = 'America/Mexico_City';
    
        this.currentTime = new Intl.DateTimeFormat('en-US', {
            timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).format(new Date());
    }

    email(): void {
        const recipient = 'contact@sebastianrdz.com';
        const subject = 'Contact Opportunity';
        const body = `Hi Sebastian,%0A%0A
                        I hope this email finds you well.%0A%0A
                        I have an opportunity I'd like to discuss with you. Please let me know a convenient time to connect.%0A%0A
                        Best regards,%0A[Your Name]`;
        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
        subject
        )}&body=${body}`;
        window.location.href = mailtoLink;
    }

    goToLink(url: string) {
        window.open(url, '_blank');
    }
}
