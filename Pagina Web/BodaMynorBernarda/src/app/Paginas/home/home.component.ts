import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
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

  showModal = true;

  textoConfirmacion = 'Confirma tu asistencia';
  images = [
    {
      src: "../../../assets/Fotos/Pareja1.jpg",
      fitType: "cover", // Definir el tipo de ajuste para esta imagen
      mobileSrc: "../../../assets/Fotos/Pareja1.jpg", // Versión para móvil
      fitTypeMobile: "cover",
    },
    {
      src: "../../../assets/Fotos/Pareja2.jpg",
      fitType: "cover", // Definir el tipo de ajuste para esta imagen
      mobileSrc: "../../../assets/Fotos/Pareja2-movil.jpg", // Versión para móvil
      fitTypeMobile: "cover",
    },
    {
      src: "../../../assets/Fotos/Pareja3.jpg",
      fitType: "cover", // Definir el tipo de ajuste para esta imagen
      mobileSrc: "../../../assets/Fotos/Pareja3-movil.jpg", // Versión para móvil
      fitTypeMobile: "cover",
    },
    {
      src: "../../../assets/Fotos/Pareja4.jpg",
      fitType: "cover", // Definir el tipo de ajuste para esta imagen
      mobileSrc: "../../../assets/Fotos/Pareja4-movil.jpg", // Versión para móvil
      fitTypeMobile: "cover",
    },
    {
      src: "../../../assets/Fotos/Pareja5.jpg",
      fitType: "cover", // Definir el tipo de ajuste para esta imagen
      mobileSrc: "../../../assets/Fotos/Pareja5-movil.jpg", // Versión para móvil
      fitTypeMobile: "cover",
    },
    {
      src: "../../../assets/Fotos/Pareja6.jpg",
      fitType: "cover", // Definir el tipo de ajuste para esta imagen
      mobileSrc: "../../../assets/Fotos/Pareja6.jpg", // Versión para móvil
      fitTypeMobile: "cover",
    },
    {
      src: "../../../assets/Fotos/Pareja7.jpg",
      fitType: "cover", // Definir el tipo de ajuste para esta imagen
      mobileSrc: "../../../assets/Fotos/Pareja7-movil.jpg", // Versión para móvil
      fitTypeMobile: "cover",
    },
    {
      src: "../../../assets/Fotos/Pareja8.jpg",
      fitType: "cover", // Definir el tipo de ajuste para esta imagen
      mobileSrc: "../../../assets/Fotos/Pareja8.jpg", // Versión para móvil
      fitTypeMobile: "cover",
    },
    
  ];
          
  showNavigationArrows = true;
	showNavigationIndicators = true;

  public tripItenerary = [
    { 
      content: `<b>15:00 PM</b> <br> Ceremonia civil`, 
      oppositeContent: `IMG`, 
      dotCss: ' custom-image',
      imagen:'../../../assets/civil.png'
    },
    { 
      content: `IMG`, 
      oppositeContent: `<b>15:30 PM</b> <br> Ceremonia religiosa`, 
      dotCss: 'custom-image' ,
      imagen:'../../../assets/religiosa.png'
    },
    { 
      content: `<b>16:30 PM</b> <br> Recepción`, 
      oppositeContent: `IMG`, 
      dotCss: 'custom-image' ,
      imagen:'../../../assets/recepcionBoda.png'
    },
    { 
      content: `IMG`, 
      oppositeContent: `<b>17:00 PM</b> <br> Sesión de fotos`, 
      dotCss: 'custom-image' ,
      imagen:'../../../assets/foto.png'
    },
    { 
      content: `<b>17:30 PM</b> <br> Banquete`, 
      oppositeContent: `IMG`, 
      dotCss: 'custom-image' ,
      imagen:'../../../assets/comida.png'
    },
    { 
      content: `IMG`, 
      oppositeContent: `<b>19:00 PM</b> <br> Momento especial`, 
      dotCss: 'custom-image' ,
      imagen:'../../../assets/momento.png'
    },
  ];

  id:any;
  public invitacion:Invitacion | undefined;
  constructor(config: NgbCarouselConfig, private activatedRoute: ActivatedRoute, private servicio: ConexionService, private el: ElementRef) {
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
  isMobile: boolean = false;
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  ngOnInit() {
    this.checkScreenSize();
    this.subscription = interval(1000).subscribe(() => this.updateCountdown());
    const modalElement = this.el.nativeElement.querySelector('#exampleModal');
    console.log(modalElement);
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
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
        if(this.invitacion)
        {
          console.log('Cambio de estado')
          this.invitacion.estado = 'C';
        }
      },
      error: (err) => {
        // Manejar errores y mostrar un mensaje de error
        console.error('Error al confirmar la invitación:', err);
        //this.toastService.show({ text: 'Error al confirmar la invitación.', classname: 'bg-danger text-light', delay: 5000 });
      }
    });
  }

}
