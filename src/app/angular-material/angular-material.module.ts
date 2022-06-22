import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

    //Angular Material
    import {MatSidenavModule} from '@angular/material/sidenav';
    import {MatToolbarModule} from '@angular/material/toolbar';
    import {MatButtonModule} from '@angular/material/button';
    import {MatIconModule} from '@angular/material/icon';
    import {MatListModule} from '@angular/material/list';
    import {MatMenuModule} from '@angular/material/menu';
    import {MatTableModule} from '@angular/material/table';
    import {MatFormFieldModule} from '@angular/material/form-field';
    import {MatInputModule} from '@angular/material/input';
    import {MatCardModule} from '@angular/material/card';
    import {MatDialogModule} from '@angular/material/dialog';
    import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule

  ]
})
export class AngularMaterialModule { }
