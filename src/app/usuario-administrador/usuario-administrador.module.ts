
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent, DialogContentExampleDialog } from './usuarios/usuarios.component';
import { DebilidadesComponent, ModalDebilidades1 } from './debilidades/debilidades.component';
import { ModalUnidades1, UnidadesComponent } from './unidades/unidades.component';
import { CriteriosComponent, Modalcriterios1 } from './criterios/criterios.component';
import { ModalProcesos1, ProcesosComponent } from './procesos/procesos.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { MenusModule } from '../menus/menus.module';
import { ModalTiposRegistros1, TiposRegistrosComponent } from './tipos-registros/tipos-registros.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AmbitoGeograficoComponent, ModalAmbitoGeografico1 } from './ambito-geografico/ambito-geografico.component';
import { AmbitoAcademicoComponent, ModalAmbitoAcademico1 } from './ambito-academico/ambito-academico.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { GraficosComponent } from './graficos/graficos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { booleanPipe } from '../pipes/boolean.pipe';
@NgModule({
  declarations: [
    UsuariosComponent,
    DebilidadesComponent,
    UnidadesComponent,
    CriteriosComponent,
    ProcesosComponent,
    HomeComponent,
    MenuComponent,
    TiposRegistrosComponent,
    AmbitoGeograficoComponent,
    AmbitoAcademicoComponent,
    EstadisticasComponent,
    GraficosComponent,
    DialogContentExampleDialog,
    ModalDebilidades1,
    Modalcriterios1,
    ModalUnidades1,
    ModalTiposRegistros1,
    ModalProcesos1,
    ModalAmbitoGeografico1,
    ModalAmbitoAcademico1,
    booleanPipe,
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    MenusModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    
  ]
})
export class UsuarioAdministradorModule { }
