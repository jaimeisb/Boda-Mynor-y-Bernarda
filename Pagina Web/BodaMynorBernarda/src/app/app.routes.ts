import { Routes } from '@angular/router';
import { EnvelopeComponent } from './Paginas/envelope/envelope.component';
import { HomeComponent } from './Paginas/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'home/:id', component: HomeComponent },

];
