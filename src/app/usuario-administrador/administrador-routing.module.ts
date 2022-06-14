import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UnidadesComponent } from './unidades/unidades.component';
import { ProcesosComponent } from './procesos/procesos.component';
import { DebilidadesComponent } from './debilidades/debilidades.component';
import { CriteriosComponent } from './criterios/criterios.component';
import { TiposRegistrosComponent } from './tipos-registros/tipos-registros.component';
import { AmbitoGeograficoComponent } from './ambito-geografico/ambito-geografico.component';
import { AmbitoAcademicoComponent } from './ambito-academico/ambito-academico.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { GraficosComponent } from './graficos/graficos.component';



const routes: Routes = [
  {
    path:'', component: MenuComponent,
    children: [
      {path: 'home', component: HomeComponent },
      {path: 'usuarios', component: UsuariosComponent },      
      {path: 'debilidades', component: DebilidadesComponent },
      {path: 'unidades', component: UnidadesComponent },
  /*     {path: 'credits/:id_unidad', component: UnidadesComponent }, */
      {path: 'criterios', component: CriteriosComponent },
      {path: 'procesos', component: ProcesosComponent },      
      {path: 'tipo-registro', component: TiposRegistrosComponent},
      {path: 'ambito-geografico', component: AmbitoGeograficoComponent },
      {path: 'ambito-academico', component: AmbitoAcademicoComponent },
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
export class AdministradorRoutingModule { }
