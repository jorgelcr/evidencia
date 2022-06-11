import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerEvidenciasComponent } from './ver-evidencias/ver-evidencias.component';
import { HomeComponent } from './home/home.component';
import { ResponsableRoutingModule } from './responsable-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MenusModule } from '../menus/menus.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CrearEvidenciaComponent } from './crear-evidencia/crear-evidencia.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { GraficosComponent } from './graficos/graficos.component';




@NgModule({
  declarations: [
        VerEvidenciasComponent,
        HomeComponent,
        MenuComponent,
        CrearEvidenciaComponent,
        EstadisticasComponent,
        GraficosComponent
  ],
  imports: [
    CommonModule,
    ResponsableRoutingModule,
    MenusModule,
    AngularMaterialModule
  ]
})
export class UsuarioResponsableModule { }
