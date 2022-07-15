import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerEvidenciasComponent } from './ver-evidencias/ver-evidencias.component';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { CrearEvidenciaComponent } from './crear-evidencia/crear-evidencia.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { GraficosComponent } from './graficos/graficos.component';

const routes: Routes = [
  {
    path:'', component: MenuComponent,
    children: [
      {path: 'home', component: HomeComponent },
      {path: 'ver-evidencias', component: VerEvidenciasComponent },
      {path: 'administrar-evidencia', component: CrearEvidenciaComponent },
      {path: 'administrar-evidencia/:id', component: CrearEvidenciaComponent },
      {path: 'estadisticas', component: EstadisticasComponent },
      {path: 'graficos', component: GraficosComponent },
      {path: '**', redirectTo: 'home'}
    ]
  }       
];
@NgModule({
  imports: [
    RouterModule.forChild (routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ResponsableRoutingModule { }
