import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-envelope',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './envelope.component.html',
  styleUrl: './envelope.component.css'
})
export class EnvelopeComponent {
  isOpen = false;

  constructor(private router: Router) {}

  openEnvelope() {
    this.isOpen = true;
  }

  @HostListener('animationend', ['$event'])
  onAnimationEnd(event: AnimationEvent) {
    if (event.animationName === 'openAnimation' && this.isOpen) {
      this.navigateToHome();
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

}
