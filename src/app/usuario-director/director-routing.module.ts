import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { VerEvidenciasComponent } from './ver-evidencias/ver-evidencias.component';
import { CrearEvidenciasComponent } from './crear-evidencias/crear-evidencias.component';
import { VerTodasEvidenciasComponent } from './ver-todas-evidencias/ver-todas-evidencias.component';




const routes: Routes = [
  {
    path:'', component: MenuComponent,
    children: [
      {path: 'home', component: HomeComponent },
      {path: 'crear-evidencia', component: CrearEvidenciasComponent },
      {path: 'mis-evidencias', component: VerEvidenciasComponent },
      {path: 'todas-evidencias', component: VerTodasEvidenciasComponent },
      {path: 'ver-todas-evidencias/:id', component: CrearEvidenciasComponent },
      {path: 'ver-mis-evidencias/:id', component: CrearEvidenciasComponent },
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
export class DirectorRoutingModule { }
