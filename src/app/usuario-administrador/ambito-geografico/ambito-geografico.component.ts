import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ambitoGeografico } from 'src/app/interfaces/administrador/ambitoGeografico.interface';
import Swal from 'sweetalert2';
import { AdministradorService } from '../../services/administrador.service';

@Component({
  selector: 'app-ambito-geografico',
  templateUrl: './ambito-geografico.component.html',
  styleUrls: ['./ambito-geografico.component.css']
})
export class AmbitoGeograficoComponent {

  public listaAmbitoGeografico : ambitoGeografico[] = [];
  suscription?: Subscription;
  estadoBusqueda: boolean = true;

  constructor(public dialog: MatDialog, private AdministradorService: AdministradorService) { }

  
ngOnInit(): void {
  this.obtenerAmbitoGeografico();
  this.suscription = this.AdministradorService.refresh$.subscribe(() =>
  this.obtenerAmbitoGeografico());
 
}

openDialog(ambitoGeografico?: any) {
  const dialogRef = this.dialog.open(ModalAmbitoGeografico1,{ disableClose: true ,
    height: '600px',
    width: '700px',
    data: {id_ambito_geografico: ambitoGeografico?.id_ambito_geografico, nombre_ambito_geografico: ambitoGeografico?.nombre_ambito_geografico, 
      estado_ambito_geografico: ambitoGeografico?.estado_ambito_geografico}
  })
 

}
  
obtenerAmbitoGeografico(){
  this.AdministradorService.obtenerAmbitoGeografico().subscribe(data =>{
   /*  console.log(data); */
    this.listaAmbitoGeografico = data;
    this.listaAmbitoGeografico.reverse()
    
  })
}

borrarAmbitoGeografico(id: any){
 
    Swal.fire({
      title: '¿Está seguro?',
      text: `¡La Ambito Geografico con codigo ${id} sera eliminada!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡ Si, borrar !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.AdministradorService.borrarAmbitoGeografico(id).subscribe(
          {
            next:     data =>{
              
            Swal.fire(
          'Eliminado!',
          'Su Ambito Geografico se ha sido eliminado.',
          'success',
        )
        this.obtenerAmbitoGeografico()
      },error: error => {
        Swal.fire('Error', "Error al eliminar, esta el Ambito Geografico esta en uso", 'error');
        /* ERROR DESDE BACKEND */
       /*  Swal.fire('Error', error.error.msg, 'error'); */
      }
    }
       
     ) }
   
  })
}

buscar(termino: string){

  if (termino.length === 0 ){
    this.obtenerAmbitoGeografico();
    this.estadoBusqueda = true
    return
}
console.log(termino)
  termino.trim();
    this.AdministradorService.buscarAmbitoGeografico(termino)
    .subscribe(resultado => {
      this.listaAmbitoGeografico = resultado
      if ( this.listaAmbitoGeografico.length ===0 ){
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
  selector: 'modal-ambito-geografico-1',
  templateUrl: './modal-ambito-geografico-1.html',
  styleUrls: ['./ambito-geografico.component.css']
})

export class ModalAmbitoGeografico1 {


  formularioAmbitoGeografico!: FormGroup;
  titulo = 'Crear Ambito Geografico'
  estado: boolean = false; 
 
  listaAmbitoGeografico : ambitoGeografico[] = [];

  constructor(public dialog: MatDialog, private fb: FormBuilder, 
              private AdministradorService: AdministradorService,
              @Inject(MAT_DIALOG_DATA) public data: {id_ambito_geografico: string, nombre_ambito_geografico: string,
                                                     estado_ambito_geografico: string}) { 

                this.formularioAmbitoGeografico = this.fb.group({
                  nombre_ambito_geografico      : [data.nombre_ambito_geografico, [Validators.required, Validators.minLength(3)]],
                  estado_ambito_geografico     : [true, Validators.required]
                });
              }

ngOnInit(): void {
  
  this.cargarAmbitoGeograficoModal();
}
              

  campoNoEsValido(campo: string){
  return this.formularioAmbitoGeografico.controls[campo].errors &&
         this.formularioAmbitoGeografico.controls[campo].touched
  }

  guardar(){
  
    if ( this.formularioAmbitoGeografico.invalid ){
      this.formularioAmbitoGeografico.markAllAsTouched();
      Swal.fire('Error', "Lene los campos de forma correcta", 'error');
  console.log("asdfghjklñ");
      return;
    }

if (this.data.id_ambito_geografico){
    this.AdministradorService.actualizarAmbitoGeografico(this.data.id_ambito_geografico, this.formularioAmbitoGeografico.value)
    .subscribe({
      next: data =>{
      Swal.fire('Actualizacion Exitosa', "Datos Actualizados Con Exito ", 'info');
      }, error: error => {
        Swal.fire('Error', "Error al Actualizar", 'error');
      }
    })

}
if(!this.data.id_ambito_geografico){
  this.AdministradorService.guardarAmbitoGeografico( this.formularioAmbitoGeografico.value ).subscribe(
    {
      next: resp =>{
  console.log("sdasdfghjklñskasskdksjdksdjskld")
  
    Swal.fire('exitosamente', "Datos guardados satisfactoriamente", 'success');
    this.formularioAmbitoGeografico.reset();
      
  },error: error => {
    Swal.fire('Error', "Error al ingresar, el codigo debe ser UNICO", 'error');
  
  /* console.log(this.miFormulario.value) */
  }
  })
}

}
  cargarAmbitoGeograficoModal(){

    if (this.data.id_ambito_geografico){
    this.estado = true;
    this.titulo = "Actualizar Ambito Geografico";
    this.AdministradorService.obtenerAmbitoGeograficoId(this.data.id_ambito_geografico)
    }
      }

      
}

