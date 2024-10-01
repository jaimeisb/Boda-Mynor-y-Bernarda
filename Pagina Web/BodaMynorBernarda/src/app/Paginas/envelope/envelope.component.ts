import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-envelope',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './envelope.component.html',
  styleUrl: './envelope.component.css'
})
export class EnvelopeComponent {
  isOpen = false;
  id:any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    console.log(this.activatedRoute.queryParams);
    this.activatedRoute.queryParams.subscribe(params => {
      if(params != undefined){
        this.id = params['id'];
        console.log(this.id); // Print the parameter to the console. 
      }
    });
  }

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
    if(this.id != undefined)
      this.router.navigate(['/home',this.id]);
    else
      this.router.navigate(['/home']);
  }

}
