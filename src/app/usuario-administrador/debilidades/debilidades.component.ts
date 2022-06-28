import { Component, ElementRef, OnInit, ViewChild, Renderer2, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdministradorService } from '../../services/administrador.service';
import { Debilidad } from '../../interfaces/administrador/debilidad.interface';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Criterio } from 'src/app/interfaces/administrador/criterios.interface';
import { Unidad } from '../../interfaces/administrador/unidad.inteface';
@Component({
  selector: 'app-debilidades',
  templateUrl: './debilidades.component.html',
  styleUrls: ['./debilidades.component.css']
})
export class DebilidadesComponent implements OnInit{

  public listaDebilidad : Debilidad[] = [];
  suscription?: Subscription;
  estadoBusqueda: boolean = true;
  
  constructor(public dialog: MatDialog, private AdministradorService: AdministradorService) { }


  ngOnInit(): void {
  this.obtenerDebilidad();
  this.suscription = this.AdministradorService.refresh$.subscribe(() =>
  this.obtenerDebilidad());
 
}


  openDialog(debilidad?: any) {
    const dialogRef = this.dialog.open(ModalDebilidades1,{ disableClose: true ,
      height: '600px',
      width: '700px',
      data: {id_debilidades: debilidad?.id_debilidades, codigo_debilidades: debilidad?.codigo_debilidades, 
            nombre_debilidades: debilidad?.nombre_debilidades, descripcion_debilidades: debilidad?.descripcion_debilidades,
            estado_debilidades: debilidad?.estado_debilidades, fk_id_unidad: debilidad?.fk_id_unidad,
            fk_id_criterio: debilidad?.fk_id_criterio}
    })
    console.log("La clave es: ", debilidad?.fk_id_unidad)
}

obtenerDebilidad(){
  this.AdministradorService.obtenerDebilidad().subscribe(data =>{
    console.log(data);
    this.listaDebilidad = data;
    this.listaDebilidad.reverse()
    
  })
}

borrarUnidades(id: any){
 
    Swal.fire({
      title: '¿Está seguro?',
      text: `¡La Debilidad con codigo ${id} sera eliminada!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡ Si, borrar !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.AdministradorService.borrarDebilidad(id).subscribe(
          {
            next:     data =>{
              
            Swal.fire(
          'Eliminado!',
          'Su Debilidad ha sido eliminado.',
          'success',
        )
        this.obtenerDebilidad()
      },error: error => {
        Swal.fire('Error', "Error al eliminar, esta Debilidad esta en uso", 'error');
        /* ERROR DESDE BACKEND */
       /*  Swal.fire('Error', error.error.msg, 'error'); */
      }
    }
       
     ) }
   
  })
}

buscar(termino: string){

  if (termino.length === 0 ){
    this.obtenerDebilidad();
    this.estadoBusqueda = true
    return
}
console.log(termino)
  termino.trim();
    this.AdministradorService.buscarDebilidad(termino)
    .subscribe(resultado => {
      this.listaDebilidad = resultado
      if ( this.listaDebilidad.length ===0 ){
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
  selector: 'modal-debilidades-1',
  templateUrl: './modal-debilidades-1.html',
  styleUrls: ['./debilidades.component.css']
})

export class ModalDebilidades1 implements OnInit{



  formularioDebilidad!: FormGroup;
  titulo = 'Crear Debilidad'
  estado: boolean = false; 
 
  listaDebilidad : Debilidad[] = [];
  listaCriterio  : Criterio[] = [];
  listaUnidad    : Unidad[] = [];
  
  constructor(public dialog: MatDialog, private fb: FormBuilder, 
              private AdministradorService: AdministradorService,
              @Inject(MAT_DIALOG_DATA) public data: {id_debilidades: string, codigo_debilidades: string,
                                                     nombre_debilidades: string, descripcion_debilidades: string,
                                                     estado_debilidades: string, fk_id_unidad: string,
                                                     fk_id_criterio: string}) { 
                                                      
                this.formularioDebilidad = this.fb.group({
                  codigo_debilidades      : [data.codigo_debilidades, [Validators.required, Validators.minLength(3)]],
                  nombre_debilidades      : [data.nombre_debilidades, [Validators.required, Validators.minLength(3)]],
                  descripcion_debilidades : [data.descripcion_debilidades, [Validators.required, Validators.minLength(3)]],
                  fk_id_unidad            : [data.fk_id_unidad, Validators.required],
                  fk_id_criterio          : [data.fk_id_criterio, Validators.required],
                  estado_debilidades      : [true, Validators.required]
                });
                console.log("WWWWWWWWWWWWWWWWWWWWWWW", data.fk_id_criterio)
              }
            
ngOnInit(): void {
  this.cargarUnidadModal();
  this.cargarUnidadDebilidad();
  this.cargarCriterioDebilidad();
}

campoNoEsValido(campo: string){
  return this.formularioDebilidad.controls[campo].errors &&
         this.formularioDebilidad.controls[campo].touched
  }

  guardar(){
  
    if ( this.formularioDebilidad.invalid ){
      this.formularioDebilidad.markAllAsTouched();
      Swal.fire('Error', "Lene los campos de forma correcta", 'error');
  console.log("asdfghjklñ");
      return;
    }

if (this.data.id_debilidades){
  console.log("ssbbbbbbbbbbbbbbbbbbbbbbbs")
    this.AdministradorService.actualizarDebilidad(this.data.id_debilidades, this.formularioDebilidad.value)
    .subscribe({
      next: data =>{
      Swal.fire('Actualizacion Exitosa', "Datos Actualizados Con Exito ", 'info');
      }, error: error => {
        Swal.fire('Error', "Error al Actualizar", 'error');
      }
    })

}
if(!this.data.id_debilidades){
  this.AdministradorService.guardarDebilidad( this.formularioDebilidad.value ).subscribe(
    {
      next: resp =>{
  console.log("sdasdfghjklñskasskdksjdksdjskld")
  
    Swal.fire('exitosamente', "Datos guardados satisfactoriamente", 'success');
    /* this.formularioDebilidad.reset(); */
    this.formularioDebilidad.reset({
      estado_debilidades: true
    })
      
  },error: error => {
    Swal.fire('Error', "Error al ingresar, el codigo debe ser UNICO", 'error');
  
  /* console.log(this.miFormulario.value) */
  }
  })
}

}

cargarUnidadModal(){
  if (this.data.id_debilidades){

  this.estado = true;
  this.titulo = "Actualizar Unidad";
  this.AdministradorService.obtenerDebilidadId(this.data.id_debilidades)
  }
    }  
cargarUnidadDebilidad(){

  this.AdministradorService.obtenerUnidadDebilidad().subscribe((data: any) =>{
  /*  console.log(data); */
  this.listaUnidad = data.resultado;
 /*     this.listaUnidades.reverse() */
   })
 }

cargarCriterioDebilidad(){

  this.AdministradorService.obtenerCriterioDebilidad().subscribe((data: any) =>{
 /*   console.log(data); */
  this.listaCriterio = data.resultado;
 /*     this.listaUnidades.reverse() */
   })
 } 
}

