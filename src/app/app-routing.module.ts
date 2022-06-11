import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosModule } from './usuarios/usuarios.module';
import { UsuarioAdministradorModule } from './usuario-administrador/usuario-administrador.module';

const routes: Routes = [
   {
     path: 'autentificacion',
    loadChildren:() => import('./autentificacion/autentificacion.module').then(m => m.AutentificacionModule)
  },
   {
     path: 'usuario-normal',
     loadChildren:() => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
   },
   {
    path: 'usuario-responsable',
    loadChildren:() => import('./usuario-responsable/usuario-responsable.module').then(m => m.UsuarioResponsableModule)
  },
  {
    path: 'usuario-dac',
    loadChildren:() => import('./usuario-dac/usuario-dac.module').then(m => m.UsuarioDacModule )
  },
  {
    path: 'usuario-administrador',
    loadChildren:() => import('./usuario-administrador/usuario-administrador.module').then(m => m.UsuarioAdministradorModule )
  },
  {
    path: 'usuario-director',
    loadChildren:() => import('./usuario-director/usuario-director.module').then(m => m.UsuarioDirectorModule )
  },
  
   {
     path: '**',
      redirectTo: 'usuario-normal'
      
      
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
