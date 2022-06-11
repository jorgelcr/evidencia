import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { VerEvidenciasComponent } from './ver-evidencias/ver-evidencias.component';
import { AdministrarEvidenciasComponent } from './administrar-evidencias/administrar-evidencias.component';
import { EstadisticasComponent } from '../usuario-responsable/estadisticas/estadisticas.component';
import { GraficosComponent } from './graficos/graficos.component';



const routes: Routes = [
  {
    path:'', component: MenuComponent,
    children: [
      {path: 'home', component: HomeComponent },
      {path: 'ver-evidencias', component: VerEvidenciasComponent },
      {path: 'administrar-Evidencias', component: AdministrarEvidenciasComponent },
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
export class DacRoutingModule { }
