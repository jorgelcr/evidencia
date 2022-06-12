import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdministradorService } from '../../services/administrador.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent  {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog,{ disableClose: true ,
      height: '600px',
      width: '700px',})
    /*   this.dialog.open(DialogContentExampleDialog, { disableClose: true }); */
      
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
   
  });

  }
  
openDialog2() {
  const dialogRef = this.dialog.open(DialogContentExampleDialog2, {
    height: '600px',
    width: '700px',
  });

/*   dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  }); */
}
}
/* ####################################### MODAL 1  ################################## */
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.html',
  styleUrls: ['./usuarios.component.css']
})

export class DialogContentExampleDialog implements OnInit {

  public listaRol : any = [];
  public listaUnidades : any = [];
  suscription?: Subscription;

  formularioUsuario: FormGroup = this.fb.group({
    rut               : ['', Validators.required],
    nombres_usuario   : ['', Validators.required],
    apellidos_usuario : ['', Validators.required],
    correo_usuario    : ['', Validators.required],
    contrasena        : ['', Validators.required],
    fk_id_unidad     : ['', Validators.required],
    fk_id_rol     : ['', Validators.required],
  })


constructor(public dialog: MatDialog, private fb: FormBuilder,  private AdministradorService: AdministradorService) { }

ngOnInit(): void {
    this.obtenerRol();
    this.obtenerUnidades();
   
  }

  campoNoEsValido(campo: string){
    return this.formularioUsuario.controls[campo].errors &&
           this.formularioUsuario.controls[campo].touched
    }
  
    guardar(){
    
      if ( this.formularioUsuario.invalid ){
        this.formularioUsuario.markAllAsTouched();
  
    console.log("asdfghjklñ", this.formularioUsuario.value.fk_id_rol);
        return;
      }
 
      this.AdministradorService.guardarUsuario( this.formularioUsuario.value ).subscribe(resp =>{
console.log("Los datos guarados son: ",resp)
        Swal.fire('exitosamente', "Datos guardados satisfactoriamente", 'success');
        this.formularioUsuario.reset();
      }, error => {
        Swal.fire('Error', "Error al ingresar el usuario", 'error');
      })
      
      /* console.log(this.miFormulario.value) */
     
    }
obtenerRol(){
  this.AdministradorService.obtenerRolUsuario().subscribe((data: any) =>{
   
    this.listaRol  = data.resultado;
     console.log(data.resultado);
/*     this.listaRol.reverse() */
    
  })
}
obtenerUnidades(){
  this.AdministradorService.obtenerUnidadUsuario().subscribe((data: any) =>{
   /*  console.log(data); */
    this.listaUnidades = data.resultado;
/*     this.listaUnidades.reverse() */
    
  })
}

}

@Component({
  selector: 'dialog-content-example-dialog2',
  templateUrl: './dialog-content-example-dialog2.html',
  styleUrls: ['./usuarios.component.css']
})

export class DialogContentExampleDialog2 {}
