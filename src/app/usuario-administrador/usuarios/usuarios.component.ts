import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdministradorService } from '../../services/administrador.service';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/interfaces/administrador/usuario.interface';
import { Unidad } from 'src/app/interfaces/administrador/unidad.inteface';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent  implements OnInit {

  public listaUsuarios : Usuario[] = [];
  suscription?: Subscription;
  estadoBusqueda: boolean = true;


  constructor(public dialog: MatDialog, private AdministradorService: AdministradorService) { }


  ngOnInit(): void {
  this.obtenerUsuario();
  this.suscription = this.AdministradorService.refresh$.subscribe(() =>
  this.obtenerUsuario());
 
}


  openDialog(usuario?: any) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog,{ disableClose: true ,
      height: '600px',
      width: '700px',
      data: {id_usuarios: usuario?.id_usuarios, rut: usuario?.rut, 
        nombres_usuario: usuario?.nombres_usuario, apellidos_usuario: usuario?.apellidos_usuario,
        correo_usuario: usuario?.correo_usuario, contrasena: usuario?.contrasena,
         estado: usuario?.estado, fk_id_unidad: usuario?.fk_id_unidad,  fk_id_rol: usuario?.fk_id_rol
        }
    })
    console.log("La clave es: ", usuario?.id_usuarios)
  }

  obtenerUsuario(){
    this.AdministradorService.obtenerUsuario().subscribe(data =>{
     /*  console.log(data); */
      this.listaUsuarios = data;
      this.listaUsuarios.reverse()
      
    })
  }
  
  borrarUsuario(id: any){
   
      Swal.fire({
        title: '¿Está seguro?',
        text: `¡La Usuario con Rut ${id} sera eliminada!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡ Si, borrar !'
      }).then((result) => {
        if (result.isConfirmed) {
          this.AdministradorService.borrarUsuario(id).subscribe(
            {
              next:     data =>{
                
              Swal.fire(
            'Eliminado!',
            'Su Usuario ha sido eliminado.',
            'success',
          )
          this.obtenerUsuario()
        },error: error => {
          Swal.fire('Error', "Error al eliminar, este Usuario esta en uso", 'error');
          /* ERROR DESDE BACKEND */
         /*  Swal.fire('Error', error.error.msg, 'error'); */
        }
      }
         
       ) }
     
    })
  }
  
  buscar(termino: string){
  
    if (termino.length === 0 ){
      this.obtenerUsuario();
      this.estadoBusqueda = true
      return
  }
  console.log(termino)
    termino.trim();
      this.AdministradorService.buscarUsuario(termino)
      .subscribe(resultado => {
        this.listaUsuarios = resultado
        if ( this.listaUsuarios.length ===0 ){
          this.estadoBusqueda = false
        }else{
          this.estadoBusqueda = true
        }
      }
      )
   
  }
  }

/* ####################################### MODAL 1  ################################## */
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.html',
  styleUrls: ['./usuarios.component.css']
})

export class DialogContentExampleDialog implements OnInit {

  formularioUsuario!: FormGroup;
  titulo = 'Crear Usuario'
  estado: boolean = false; 
  


  listaUsuario : Usuario[] = [];
  listaUnidad : Unidad[] = [];
  listaRol : any[] = [];
  constructor(public dialog: MatDialog, private fb: FormBuilder , 
    private AdministradorService: AdministradorService,    
    @Inject(MAT_DIALOG_DATA) public data: {id_usuarios: string, rut: string,
                                           nombres_usuario: string, apellidos_usuario: string,
                                           correo_usuario: string, contrasena: string,
                                           estado?: boolean, fk_id_unidad: string, fk_id_rol: string}) { 

    this.formularioUsuario = this.fb.group({
    rut               : [data.rut,[ Validators.required, , Validators.minLength(3)]],
    nombres_usuario   : [data.nombres_usuario, [Validators.required, , Validators.minLength(3)]],
    apellidos_usuario : [data.apellidos_usuario, [Validators.required, , Validators.minLength(3)]],
    correo_usuario    : [data.correo_usuario, [Validators.required, , Validators.minLength(3)]],
    contrasena        : [data.contrasena, [Validators.required, , Validators.minLength(3)]],
    estado            : [data.estado, /* Validators.required */],
    fk_id_unidad      : [data.fk_id_unidad, Validators.required],
    fk_id_rol         : [data.fk_id_rol, Validators.required],
  })

   }


ngOnInit(): void {
   this.cargarUsuarioModal();
   this.cargarUnidad();
   this.cargarRol();
  }


  campoNoEsValido(campo: string){
    return this.formularioUsuario.controls[campo].errors &&
           this.formularioUsuario.controls[campo].touched
    }
  
  guardar(){
    
      if ( this.formularioUsuario.invalid ){
        this.formularioUsuario.markAllAsTouched();
        Swal.fire('Error', "Lene los campos de forma correcta", 'error');
    console.log("asdfghjklñ");
        return;
      }
  
  if (this.data.id_usuarios){
      this.AdministradorService.actualizarUsuario(this.data.id_usuarios, this.formularioUsuario.value)
      .subscribe({
        next: data =>{
        Swal.fire('Actualizacion Exitosa', "Datos Actualizados Con Exito ", 'info');
        }, error: error => {
          Swal.fire('Error', "Error al Actualizar", 'error');
        }
      })
  
  }
  if(!this.data.id_usuarios){
    this.AdministradorService.guardarUsuario( this.formularioUsuario.value ).subscribe(
      {
        next: resp =>{
    console.log("sdasdfghjklñskasskdksjdksdjskld")
    
      Swal.fire('exitosamente', "Datos guardados satisfactoriamente", 'success');
      this.formularioUsuario.reset();
        
    },error: error => {
      Swal.fire('Error', "Error al ingresar, el codigo debe ser UNICO", 'error');
    
    /* console.log(this.miFormulario.value) */
    }
    })
  }
  
  }
  cargarUsuarioModal(){
      if (this.data.id_usuarios){
      this.estado = true;
      this.titulo = "Actualizar Usuario";
      this.AdministradorService.obtenerUsuarioId(this.data.id_usuarios).subscribe(data =>
        
        console.log("la data es: ",data))
      }
        }

  cargarUnidad(){

    this.AdministradorService.obtenerUnidadUsuario().subscribe((data: any) =>{
      /*  console.log(data); */
       this.listaUnidad = data.resultado;
   /*     this.listaUnidades.reverse() */
     })
   }
 
   cargarRol(){

    this.AdministradorService.obtenerRolUsuario().subscribe((data: any) =>{
      /*  console.log(data); */
       this.listaRol = data.resultado;
   /*     this.listaUnidades.reverse() */
   console.log("ROLLLLLLLLLLLL",data.resultado )
     })
   }

 }
    

