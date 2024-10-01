import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { NgbCarouselConfig, NgbCarouselModule, NgbDropdownModule, NgbScrollSpyModule } from '@ng-bootstrap/ng-bootstrap';
import { TimelineAllModule, TimelineItemModel, TimelineModule } from '@syncfusion/ej2-angular-layouts';
import { ActivatedRoute, Params } from '@angular/router';
import { ConexionService, Invitacion } from '../../Servicios/conexion.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
	imports: [NgbScrollSpyModule, NgbDropdownModule, NgbCarouselModule, TimelineAllModule, TimelineModule, HttpClientModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ConexionService],
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

  textoConfirmacion = 'Confirma tu asistencia';
  images = ["../../../assets/Fotos/Pareja1.jpg"
            ,"../../../assets/Fotos/Pareja2.jpg"
            ,"../../../assets/Fotos/Pareja3.jpg"
            ,"../../../assets/Fotos/Pareja4.jpg"
            ,"../../../assets/Fotos/Pareja5.jpg"
            ,"../../../assets/Fotos/Pareja6.jpg"
            ,"../../../assets/Fotos/Pareja7.jpg"
            ,"../../../assets/Fotos/Pareja8.jpg"
          ]
  showNavigationArrows = true;
	showNavigationIndicators = true;

  public tripItenerary: TimelineItemModel[] = [
    { content: `Day 1, 4:00 PM`, oppositeContent: 'Check-in and campsite visit', dotCss: 'e-icons e-check' },
    { content: 'Day 1, 7:00 PM', oppositeContent: 'Dinner with music', dotCss: 'e-icons e-check'  },
    { content: 'Day 2, 5:30 AM', oppositeContent: 'Sunrise between mountains', dotCss: 'e-icons e-check'  },
    { content: 'Day 2, 8:00 AM', oppositeContent: 'Breakfast and check-out', dotCss: 'e-icons e-check'  },
  ];

  id:any;
  invitacion:Invitacion | undefined;
  constructor(config: NgbCarouselConfig, private activatedRoute: ActivatedRoute, private servicio: ConexionService) {
		// customize default values of carousels used by this component tree
		config.showNavigationArrows = true;
		config.showNavigationIndicators = true;
    
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['id']);
    console.log('home');
    console.log(this.id);
    this.servicio.getInvitacion(this.id).subscribe(
      (next) => {
        this.invitacion = next;
        console.log(this.invitacion)
        if(this.invitacion.estado == 'C') this.textoConfirmacion = 'Invitación confirmada!.';
      });
      
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
  Confirmar(){
    if(this.invitacion== undefined) return;
    // Extraer los datos del formulario para confirmar la invitación
    const confirmacion = {
      adultosConfirmados: Number((<HTMLSelectElement>document.getElementById('guest')).value),
      menoresConfirmados: (<HTMLSelectElement>document.getElementById('Menores'))?.value || 0,
      IdInvitacionNavigation: this.invitacion
    };
    console.log(confirmacion);
    // Llamar al servicio para confirmar la invitación
    this.servicio.confirmarInvitacion(this.invitacion.idInvitacion, confirmacion).subscribe({
      next: (respuesta) => {
        // Manejar la respuesta y mostrar un mensaje de éxito
        console.log('Invitación confirmada:', respuesta);
        this.textoConfirmacion = 'Invitación confirmada!.';
      },
      error: (err) => {
        // Manejar errores y mostrar un mensaje de error
        console.error('Error al confirmar la invitación:', err);
        //this.toastService.show({ text: 'Error al confirmar la invitación.', classname: 'bg-danger text-light', delay: 5000 });
      }
    });
  }

}
