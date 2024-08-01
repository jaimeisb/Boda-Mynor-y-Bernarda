import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { NgbCarouselConfig, NgbCarouselModule, NgbDropdownModule, NgbScrollSpyModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
	imports: [NgbScrollSpyModule, NgbDropdownModule, NgbCarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  public dateNow = new Date();
  public targetDate = new Date('2024-12-14T15:00:00');
  public timeDifference:any;
  public days:any;
  public hours:any;
  public minutes:any;
  public seconds:any;
  images = ["../../../assets/portada_inicio.png","../../../assets/separador.png","../../../assets/iglesia.jpg"]
  showNavigationArrows = true;
	showNavigationIndicators = true;

  constructor(config: NgbCarouselConfig) {
		// customize default values of carousels used by this component tree
		config.showNavigationArrows = true;
		config.showNavigationIndicators = true;
	}

  ngOnInit() {
    this.subscription = interval(1000).subscribe(() => this.updateCountdown());
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateCountdown() {
    this.dateNow = new Date();
    this.timeDifference = this.targetDate.getTime() - this.dateNow.getTime();
    this.days = Math.floor(this.timeDifference / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((this.timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((this.timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((this.timeDifference % (1000 * 60)) / 1000);
  }
}
