import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { MenusModule } from '../menus/menus.module';
import { HomeComponent } from './usuario-normal/home/home.component';
import { CrearEvidenciasComponent } from './usuario-normal/crear-evidencias/crear-evidencias.component';
import { DialogContentExampleDialog12, VerEvidenciasComponent } from './usuario-normal/ver-evidencias/ver-evidencias.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { MenuComponent } from './usuario-normal/menu/menu.component';
import { EstadisticasComponent } from './usuario-normal/estadisticas/estadisticas.component';
import { GraficosComponent } from './usuario-normal/graficos/graficos.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    HomeComponent,
    CrearEvidenciasComponent,
    VerEvidenciasComponent,
    MenuComponent,
    EstadisticasComponent,
    GraficosComponent,
    DialogContentExampleDialog12

  ],
  imports: [
    UsuarioRoutingModule,
    MenusModule,
    AngularMaterialModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class UsuariosModule { }
