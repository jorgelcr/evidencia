import { tipoRegistros } from './../../interfaces/administrador/tiposRegistros.intefrace';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AdministradorService } from '../../services/administrador.service';

@Component({
  selector: 'app-tipos-registros',
  templateUrl: './tipos-registros.component.html',
  styleUrls: ['./tipos-registros.component.css']
})
export class TiposRegistrosComponent implements OnInit{

  public listaTipoRegistros : tipoRegistros[] = [];
  suscription?: Subscription;
  estadoBusqueda: boolean = true;

  constructor(public dialog: MatDialog,  private AdministradorService: AdministradorService) { }

  openDialog(tipoRegistros?: any) {
    const dialogRef = this.dialog.open(ModalTiposRegistros1,{ disableClose: true ,
      height: '400px',
      width: '700px',
      data: {id_registros: tipoRegistros?.id_registros, nombre_registros: tipoRegistros?.nombre_registros, 
        estado_registros: tipoRegistros?.estado_registros}
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
ngOnInit(): void {

  this.obtenerTipoRegistros();
  this.suscription = this.AdministradorService.refresh$.subscribe(() =>
  this.obtenerTipoRegistros());

}


  obtenerTipoRegistros(){
    this.AdministradorService.obtenertiposRegistros().subscribe(data =>{
     /*  console.log(data); */
      this.listaTipoRegistros = data;
      this.listaTipoRegistros.reverse()
      
    })
  }
  
  borrarTipoRegistros(id: any){
   
      Swal.fire({
        title: '¿Está seguro?',
        text: `¡La Registros con codigo ${id} sera eliminada!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡ Si, borrar !'
      }).then((result) => {
        if (result.isConfirmed) {
          this.AdministradorService.borrartiposRegistros(id).subscribe(
            {
              next:     data =>{
                
              Swal.fire(
            'Eliminado!',
            'Su Registro ha sido eliminado.',
            'success',
          )
          this.obtenerTipoRegistros()
        },error: error => {
          Swal.fire('Error', "Error al eliminar, esta Registros esta en uso", 'error');
          /* ERROR DESDE BACKEND */
         /*  Swal.fire('Error', error.error.msg, 'error'); */
        }
      }
         
       ) }
     
    })
  }
  
  buscar(termino: string){
    if (termino.length === 0 ){
      this.obtenerTipoRegistros();
      this.estadoBusqueda = true
      return
  }
  console.log(termino)
    termino.trim();
      this.AdministradorService.buscartiposRegistros(termino)
      .subscribe(resultado => {
        this.listaTipoRegistros = resultado
        if ( this.listaTipoRegistros.length ===0 ){
          this.estadoBusqueda = false
        }else{
          this.estadoBusqueda = true
        }
      }
      )
   
  }

}

@Component({
  selector: 'modal-tipos-registros-1',
  templateUrl: './modal-tipos-registros-1.html',
  styleUrls: ['./tipos-registros.component.css']
})

export class ModalTiposRegistros1 implements OnInit{

  
  formularioTipoRegistros !: FormGroup;
  titulo = 'Crear Unidad'
  estado: boolean = false; 
 
  listaTipoRegistros  : tipoRegistros[] = [];

  constructor(public dialog: MatDialog, private fb: FormBuilder , 
    private AdministradorService: AdministradorService,
     @Inject(MAT_DIALOG_DATA) public data: {id_registros: string, nombre_registros: string,
                                           estado_registros: string}) { 

      this.formularioTipoRegistros = this.fb.group({
        nombre_registros      : [data.nombre_registros, [Validators.required, Validators.minLength(3)]],
        estado_registros     : [true, Validators.required]
      });
    }

ngOnInit(): void {

  this. cargarTipoRegistroModal();

}
    

campoNoEsValido(campo: string){
  return this.formularioTipoRegistros.controls[campo].errors &&
         this.formularioTipoRegistros.controls[campo].touched
  }

  guardar(){
  
    if ( this.formularioTipoRegistros.invalid ){
      this.formularioTipoRegistros.markAllAsTouched();
     /*  Swal.fire('Error', "Lene los campos de forma correcta", 'error');
  console.log("asdfghjklñ"); */
      return;
    }

if (this.data.id_registros){
    this.AdministradorService.actualizartiposRegistros(this.data.id_registros, this.formularioTipoRegistros.value)
    .subscribe({
      next: data =>{
      Swal.fire('Actualizacion Exitosa', "Datos Actualizados Con Exito ", 'info');
      }, error: error => {
        Swal.fire('Error', "Error al Actualizar", 'error');
      }
    })

}
if(!this.data.id_registros){
  this.AdministradorService.guardartiposRegistros( this.formularioTipoRegistros.value ).subscribe(
    {
      next: resp =>{
  console.log("sdasdfghjklñskasskdksjdksdjskld")
  
    Swal.fire('exitosamente', "Datos guardados satisfactoriamente", 'success');
  /*   this.formularioTipoRegistros.reset(); */
  this.formularioTipoRegistros.reset({
    estado_registros: true
  })
      
  },error: error => {
    Swal.fire('Error', "Error al ingresar, el codigo debe ser UNICO", 'error');
  
  /* console.log(this.miFormulario.value) */
  }
  })
}

}
  cargarTipoRegistroModal(){

    if (this.data.id_registros){
    this.estado = true;
    this.titulo = "Actualizar Tipo Registro";
    this.AdministradorService.obtenerUnidadId(this.data.id_registros)
    }
      }
    }
  