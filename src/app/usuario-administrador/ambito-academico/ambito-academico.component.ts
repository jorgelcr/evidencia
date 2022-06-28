import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ambitoAcademico } from 'src/app/interfaces/administrador/ambitoAcademico.interface';
import Swal from 'sweetalert2';
import { AdministradorService } from '../../services/administrador.service';

@Component({
  selector: 'app-ambito-academico',
  templateUrl: './ambito-academico.component.html',
  styleUrls: ['./ambito-academico.component.css']
})
export class AmbitoAcademicoComponent implements OnInit{


  public listaAmbitoAcademico : ambitoAcademico[] = [];
  suscription?: Subscription;
  estadoBusqueda: boolean = true;


  constructor(public dialog: MatDialog, private AdministradorService: AdministradorService) { }


ngOnInit(): void {
  this.obtenerAmbitoAcademico();
  this.suscription = this.AdministradorService.refresh$.subscribe(() =>
  this.obtenerAmbitoAcademico());
 
}

  openDialog(ambitoAcademico?: any) {
    const dialogRef = this.dialog.open(ModalAmbitoAcademico1,{ disableClose: true ,
      height: '300px',
      width: '700px', data: {id_ambito_academico: ambitoAcademico?.id_ambito_academico, nombre_ambito_academico: ambitoAcademico?.nombre_ambito_academico, 
        estado_ambito_academico: ambitoAcademico?.estado_ambito_academico}
    })

  }

  obtenerAmbitoAcademico(){
    this.AdministradorService.obtenerAmbitoAcademico().subscribe(data =>{
     /*  console.log(data); */
      this.listaAmbitoAcademico = data;
      this.listaAmbitoAcademico.reverse()
      
    })
  }
  
  borrarAmbitoAcademico(id: any){
   
      Swal.fire({
        title: '¿Está seguro?',
        text: `¡El Ambito Academico con codigo ${id} sera eliminado!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡ Si, borrar !'
      }).then((result) => {
        if (result.isConfirmed) {
          this.AdministradorService.borrarAmbitoAcademico(id).subscribe(
            {
              next:     data =>{
                
              Swal.fire(
            'Eliminado!',
            'Su Ambito Academico ha sido eliminado.',
            'success',
          )
          this.obtenerAmbitoAcademico()
        },error: error => {
          Swal.fire('Error', "Error al eliminar, este Ambito Academico esta en uso", 'error');
          /* ERROR DESDE BACKEND */
         /*  Swal.fire('Error', error.error.msg, 'error'); */
        }
      }
         
       ) }
     
    })
  }
  
  buscar(termino: string){
  
    if (termino.length === 0 ){
      this.obtenerAmbitoAcademico();
      this.estadoBusqueda = true
      return
  }
  console.log(termino)
    termino.trim();
      this.AdministradorService.buscarAmbitoAcademico(termino)
      .subscribe(resultado => {
        this.listaAmbitoAcademico = resultado
        if ( this.listaAmbitoAcademico.length ===0 ){
          this.estadoBusqueda = false
        }else{
          this.estadoBusqueda = true
        }
      }
      )
   
  }

}


/* ################################## MODAL 1 ################################################## */


@Component({
  selector: 'modal-ambito-academico-1',
  templateUrl: './modal-ambito-academico-1.html',
  styleUrls: ['./ambito-academico.component.css']
})

export class ModalAmbitoAcademico1 implements OnInit{

  formularioAmbitoAcademico!: FormGroup;
  titulo = 'Crear Unidad'
  estado: boolean = false; 
 
  listaAmbitoAcademico : ambitoAcademico[] = [];

  constructor(public dialog: MatDialog, private fb: FormBuilder , 
    private AdministradorService: AdministradorService,
    @Inject(MAT_DIALOG_DATA) public data: {id_ambito_academico: string, nombre_ambito_academico: string,
                                           estado_ambito_academico: string}) { 

      this.formularioAmbitoAcademico = this.fb.group({
        nombre_ambito_academico      : [data.nombre_ambito_academico, [Validators.required, Validators.minLength(3)]],
        estado_ambito_academico     : [true, Validators.required]
      });
    }

ngOnInit(): void {

  this.cargarUnidadModal();
}


campoNoEsValido(campo: string){
  return this.formularioAmbitoAcademico.controls[campo].errors &&
         this.formularioAmbitoAcademico.controls[campo].touched
  }

  guardar(){
  
    if ( this.formularioAmbitoAcademico.invalid ){
      this.formularioAmbitoAcademico.markAllAsTouched();
      Swal.fire('Error', "Lene los campos de forma correcta", 'error');
  console.log("asdfghjklñ");
      return;
    }

if (this.data.id_ambito_academico){
    this.AdministradorService.actualizarAmbitoAcademico(this.data.id_ambito_academico, this.formularioAmbitoAcademico.value)
    .subscribe({
      next: data =>{
      Swal.fire('Actualizacion Exitosa', "Datos Actualizados Con Exito ", 'info');
      }, error: error => {
        Swal.fire('Error', "Error al Actualizar", 'error');
      }
    })

}
if(!this.data.id_ambito_academico){
  this.AdministradorService.guardarAmbitoAcademico( this.formularioAmbitoAcademico.value ).subscribe(
    {
      next: resp =>{
  console.log("sdasdfghjklñskasskdksjdksdjskld")
  
    Swal.fire('exitosamente', "Datos guardados satisfactoriamente", 'success');
    /* this.formularioAmbitoAcademico.reset(); */
    this.formularioAmbitoAcademico.reset({
      estado_ambito_academico: true
    })
      
  },error: error => {
    Swal.fire('Error', "Error al ingresar, el codigo debe ser UNICO", 'error');
  
  /* console.log(this.miFormulario.value) */
  }
  })
}

}
  cargarUnidadModal(){

    if (this.data.id_ambito_academico){
    this.estado = true;
    this.titulo = "Actualizar Ambito  academico";
    this.AdministradorService.obtenerUnidadId(this.data.id_ambito_academico)
    }
      }

}

