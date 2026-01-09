import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

declare const $: any;

@Component({
    selector: 'app-home',
    standalone: false,

    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit, OnDestroy {

    currentTime: string = '';
    isDarkTheme: boolean = false;
    private themeSubscription: Subscription = new Subscription();
    
    // Typewriter animation
    typewriterText: string = '';
    private titles: string[] = ['Software Developer', 'Full Stack Developer', 'Software Engineer'];
    private currentTitleIndex: number = 0;
    private currentCharIndex: number = 0;
    private isDeleting: boolean = false;
    private typewriterSpeed: number = 100;

    constructor(private themeService: ThemeService) {}

    ngOnInit(): void {
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
        this.themeSubscription = this.themeService.isDarkMode$.subscribe(isDark => {
            this.isDarkTheme = isDark;
        });
        this.startTypewriter();
    }

    startTypewriter(): void {
        this.typeWriter();
    }

    typeWriter(): void {
        const currentTitle = this.titles[this.currentTitleIndex];
        
        if (!this.isDeleting && this.currentCharIndex <= currentTitle.length) {
            // Escribiendo
            this.typewriterText = currentTitle.substring(0, this.currentCharIndex);
            this.currentCharIndex++;
            
            if (this.currentCharIndex > currentTitle.length) {
                // Pausa cuando termina de escribir
                setTimeout(() => {
                    this.isDeleting = true;
                    this.typeWriter();
                }, 2000);
                return;
            }
            
            setTimeout(() => this.typeWriter(), this.typewriterSpeed);
        } else if (this.isDeleting && this.currentCharIndex >= 0) {
            // Borrando
            this.typewriterText = currentTitle.substring(0, this.currentCharIndex);
            this.currentCharIndex--;
            
            if (this.currentCharIndex < 0) {
                // Cambiar al siguiente título
                this.isDeleting = false;
                this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length;
                this.currentCharIndex = 0;
                setTimeout(() => this.typeWriter(), 500);
                return;
            }
            
            setTimeout(() => this.typeWriter(), this.typewriterSpeed / 2);
        }
    }

    ngOnDestroy(): void {
        this.themeSubscription.unsubscribe();
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

    downloadCV(): void {
        const link = document.createElement('a');
        link.href = '/assets/files/resume.pdf';
        link.download = 'Sebastian_Rodriguez_Resume.pdf';
        link.target = '_blank';
        link.click();
    }

    get buttonClass(): string {
        return this.isDarkTheme ? 'btn btn-outline-light btn-sm w-100' : 'btn btn-outline-dark btn-sm w-100';
    }
}
