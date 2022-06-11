import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './usuario-normal/home/home.component';
import { VerEvidenciasComponent } from './usuario-normal/ver-evidencias/ver-evidencias.component';
import { CrearEvidenciasComponent } from './usuario-normal/crear-evidencias/crear-evidencias.component';
import { MenuComponent } from './usuario-normal/menu/menu.component';
import { EstadisticasComponent } from './usuario-normal/estadisticas/estadisticas.component';
import { GraficosComponent } from './usuario-normal/graficos/graficos.component';
const routes: Routes = [
  {
    path:'',
    component: MenuComponent,
    children: [
      {path: 'crear-evidencia', component: CrearEvidenciasComponent },
      {path: 'ver-evidencias', component: VerEvidenciasComponent},
      {path: 'home', component: HomeComponent},
      {path: 'estadisticas', component: EstadisticasComponent},
      {path: 'graficos', component: GraficosComponent},
      {path: '**', redirectTo: 'home'},
      /* {path: '', redirectTo: 'home'} */
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
export class UsuarioRoutingModule { }
