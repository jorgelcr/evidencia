import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { DacRoutingModule } from './dac-routing.module';
import { MenusModule } from '../menus/menus.module';
import { VerEvidenciasComponent } from './ver-evidencias/ver-evidencias.component';
import { AdministrarEvidenciasComponent } from './administrar-evidencias/administrar-evidencias.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { GraficosComponent } from './graficos/graficos.component';



@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    VerEvidenciasComponent,
    AdministrarEvidenciasComponent,
    EstadisticasComponent,
    GraficosComponent
  ],
  imports: [
    CommonModule,
    DacRoutingModule,
    MenusModule
  ]
})
export class UsuarioDacModule { }
