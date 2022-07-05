import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerEvidenciasComponent } from './ver-evidencias/ver-evidencias.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { DirectorRoutingModule } from './director-routing.module';
import { MenusModule } from '../menus/menus.module';
import { CrearEvidenciasComponent } from './crear-evidencias/crear-evidencias.component';
import { VerTodasEvidenciasComponent } from './ver-todas-evidencias/ver-todas-evidencias.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    VerEvidenciasComponent,
    MenuComponent,
    HomeComponent,
    CrearEvidenciasComponent,
    VerTodasEvidenciasComponent
  ],
  imports: [
    CommonModule,
    DirectorRoutingModule,
    MenusModule,
    ReactiveFormsModule,
  ],
  providers:[
    DatePipe,
  ]
})
export class UsuarioDirectorModule { }
