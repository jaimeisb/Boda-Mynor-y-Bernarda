import { Component, OnInit, OnDestroy, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { NgbCarouselConfig, NgbCarouselModule, NgbDropdownModule, NgbScrollSpyModule } from '@ng-bootstrap/ng-bootstrap';
import { TimelineAllModule, TimelineItemModel, TimelineModule } from '@syncfusion/ej2-angular-layouts';
import { ActivatedRoute, Params } from '@angular/router';
import { ConexionService, Invitacion } from '../../Servicios/conexion.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Fancybox } from "@fancyapps/ui";

declare var $: any;

@Component({
  selector: 'app-home',
  standalone: true,
	imports: [NgbScrollSpyModule, NgbDropdownModule, NgbCarouselModule, TimelineAllModule, TimelineModule, HttpClientModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ConexionService],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
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
      src: "/Boda-Mynor-y-Bernarda/assets/Fotos/Pareja1.jpg",
      fitType: "cover", // Definir el tipo de ajuste para esta imagen
      mobileSrc: "/Boda-Mynor-y-Bernarda/assets/Fotos/Pareja1.jpg", // Versión para móvil
      fitTypeMobile: "cover",
    },
    {
      src: "/Boda-Mynor-y-Bernarda/assets/Fotos/Pareja2.jpg",
      fitType: "cover", // Definir el tipo de ajuste para esta imagen
      mobileSrc: "/Boda-Mynor-y-Bernarda/assets/Fotos/Pareja2-movil.jpg", // Versión para móvil
      fitTypeMobile: "cover",
    },
    {
      src: "/Boda-Mynor-y-Bernarda/assets/Fotos/Pareja3.jpg",
      fitType: "cover", // Definir el tipo de ajuste para esta imagen
      mobileSrc: "/Boda-Mynor-y-Bernarda/assets/Fotos/Pareja3-movil.jpg", // Versión para móvil
      fitTypeMobile: "cover",
    },
    {
      src: "/Boda-Mynor-y-Bernarda/assets/Fotos/Pareja4.jpg",
      fitType: "cover", // Definir el tipo de ajuste para esta imagen
      mobileSrc: "/Boda-Mynor-y-Bernarda/assets/Fotos/Pareja4-movil.jpg", // Versión para móvil
      fitTypeMobile: "cover",
    },
    {
      src: "/Boda-Mynor-y-Bernarda/assets/Fotos/Pareja5.jpg",
      fitType: "cover", // Definir el tipo de ajuste para esta imagen
      mobileSrc: "/Boda-Mynor-y-Bernarda/assets/Fotos/Pareja5-movil.jpg", // Versión para móvil
      fitTypeMobile: "cover",
    },
    {
      src: "/Boda-Mynor-y-Bernarda/assets/Fotos/Pareja6.jpg",
      fitType: "cover", // Definir el tipo de ajuste para esta imagen
      mobileSrc: "/Boda-Mynor-y-Bernarda/assets/Fotos/Pareja6.jpg", // Versión para móvil
      fitTypeMobile: "cover",
    },
    {
      src: "/Boda-Mynor-y-Bernarda/assets/Fotos/Pareja7.jpg",
      fitType: "cover", // Definir el tipo de ajuste para esta imagen
      mobileSrc: "/Boda-Mynor-y-Bernarda/assets/Fotos/Pareja7-movil.jpg", // Versión para móvil
      fitTypeMobile: "cover",
    },
    {
      src: "/Boda-Mynor-y-Bernarda/assets/Fotos/Pareja8.jpg",
      fitType: "cover", // Definir el tipo de ajuste para esta imagen
      mobileSrc: "/Boda-Mynor-y-Bernarda/assets/Fotos/Pareja8.jpg", // Versión para móvil
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
      imagen:'/Boda-Mynor-y-Bernarda/assets/civil.png'
    },
    { 
      content: `IMG`, 
      oppositeContent: `<b>15:30 PM</b> <br> Ceremonia religiosa`, 
      dotCss: 'custom-image' ,
      imagen:'/Boda-Mynor-y-Bernarda/assets/religiosa.png'
    },
    { 
      content: `<b>16:30 PM</b> <br> Recepción`, 
      oppositeContent: `IMG`, 
      dotCss: 'custom-image' ,
      imagen:'/Boda-Mynor-y-Bernarda/assets/recepcionBoda.png'
    },
    { 
      content: `IMG`, 
      oppositeContent: `<b>17:00 PM</b> <br> Sesión de fotos`, 
      dotCss: 'custom-image' ,
      imagen:'/Boda-Mynor-y-Bernarda/assets/foto.png'
    },
    { 
      content: `<b>17:30 PM</b> <br> Banquete`, 
      oppositeContent: `IMG`, 
      dotCss: 'custom-image' ,
      imagen:'/Boda-Mynor-y-Bernarda/assets/comida.png'
    },
    { 
      content: `IMG`, 
      oppositeContent: `<b>19:00 PM</b> <br> Momento especial`, 
      dotCss: 'custom-image' ,
      imagen:'/Boda-Mynor-y-Bernarda/assets/momento.png'
    },
  ];

  id:any;
  public invitacion:Invitacion | undefined;
  constructor(config: NgbCarouselConfig, private activatedRoute: ActivatedRoute, private servicio: ConexionService, private el: ElementRef, private elRef: ElementRef) {
		// customize default values of carousels used by this component tree
		config.showNavigationArrows = true;
		config.showNavigationIndicators = true;
    
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.id = params['id']; // Aquí se asigna el ID del query param
      console.log('ID:', this.id);
    });
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
  
  items = [
    { name: 'Item 1', category: 'category1' },
    { name: 'Item 2', category: 'category2' },
    { name: 'Item 3', category: 'category1' },
    { name: 'Item 4', category: 'category2' },
    { name: 'Item 5', category: 'category1' },
  ];

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  ngAfterViewInit() {
    // Inicializa el carrusel una vez que el DOM esté listo
  
    $('.carrusel').slick({
      lazyLoad: 'ondemand',
      autoplay: true,
      autoplaySpeed: 2000,
      centerMode: true,
      dots: true,
      centerPadding: '20px',
      slidesToShow: 3,
      prevArrow: false,
      nextArrow: false,
      responsive: [{
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });
  

  }

  filter(category: string) {
    // if (category === 'all') {
    //   $('.slick-carousel').slick('slickUnfilter');
    // } else {
    //   $('.slick-carousel').slick('slickFilter', function() {
    //     return $(this).find('h3').text().includes(category);
    //   });
    // }
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
    Fancybox.bind(this.elRef.nativeElement, '[data-fancybox]', {
      // Custom options
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    Fancybox.unbind(this.elRef.nativeElement);
    Fancybox.close();
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
