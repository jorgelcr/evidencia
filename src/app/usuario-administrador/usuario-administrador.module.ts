
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent, DialogContentExampleDialog, DialogContentExampleDialog2 } from './usuarios/usuarios.component';
import { DebilidadesComponent, ModalDebilidades1, ModalDebilidades2 } from './debilidades/debilidades.component';
import { ModalUnidades1, ModalUnidades2, UnidadesComponent } from './unidades/unidades.component';
import { CriteriosComponent, Modalcriterios1, Modalcriterios2 } from './criterios/criterios.component';
import { ModalProcesos1, ModalProcesos2, ProcesosComponent } from './procesos/procesos.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { MenusModule } from '../menus/menus.module';
import { ModalTiposRegistros1, ModalTiposRegistros2, TiposRegistrosComponent } from './tipos-registros/tipos-registros.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AmbitoGeograficoComponent, ModalAmbitoGeografico1, ModalAmbitoGeografico2 } from './ambito-geografico/ambito-geografico.component';
import { AmbitoAcademicoComponent, ModalAmbitoAcademico1, ModalAmbitoAcademico2 } from './ambito-academico/ambito-academico.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { GraficosComponent } from './graficos/graficos.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
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
    DialogContentExampleDialog2,
    ModalDebilidades1,
    ModalDebilidades2,
    Modalcriterios1,
    Modalcriterios2,
    ModalUnidades1,
    ModalUnidades2,
    ModalTiposRegistros1,
    ModalTiposRegistros2,
    ModalProcesos1,
    ModalProcesos2,
    ModalAmbitoGeografico1,
    ModalAmbitoGeografico2,
    ModalAmbitoAcademico1,
    ModalAmbitoAcademico2,
    booleanPipe
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
