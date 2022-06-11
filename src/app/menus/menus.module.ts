import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuUsuarionormalComponent } from './menusUsers/menu-usuarionormal.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MenuUsuarionormalComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    
  ],
  exports: [
    MenuUsuarionormalComponent
  ]
})
export class MenusModule { }
