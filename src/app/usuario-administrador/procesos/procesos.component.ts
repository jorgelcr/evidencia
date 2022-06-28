import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdministradorService } from '../../services/administrador.service';
import { Procesos } from '../../interfaces/administrador/procesos.interface';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.css']
})
export class ProcesosComponent implements OnInit{

  public listaProcesos : Procesos[] = [];
  suscription?: Subscription;
  estadoBusqueda: boolean = true;


  constructor(public dialog: MatDialog, private AdministradorService: AdministradorService) { }

 ngOnInit(): void {

  this.obtenerProcesos();
    this.suscription = this.AdministradorService.refresh$.subscribe(() =>
    this.obtenerProcesos());

 }

  openDialog(procesos?: any) {
    const dialogRef = this.dialog.open(ModalProcesos1,{ disableClose: true ,
      height: '400px',
      width: '700px',
      data: {id_procesos: procesos?.id_procesos, codigo_procesos: procesos?.codigo_procesos, 
        nombre_procesos: procesos?.nombre_procesos, estado_procesos: procesos?.estado_procesos}
    })
   
  }
    

  obtenerProcesos(){
    this.AdministradorService.obtenerProcesos().subscribe(data =>{
     /*  console.log(data); */
      this.listaProcesos = data;
      this.listaProcesos.reverse()
      
    })
  }

  borrarProcesos(id: any){
 
    Swal.fire({
      title: '¿Está seguro?',
      text: `¡La unidad con codigo ${id} sera eliminada!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡ Si, borrar !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.AdministradorService.borrarProcesos(id).subscribe(
          {
            next:     data =>{
              
            Swal.fire(
          'Eliminado!',
          'Su Proceso ha sido eliminado.',
          'success',
        )
        this.obtenerProcesos()
      },error: error => {
        Swal.fire('Error', "Error al eliminar, esta Proceso esta en uso", 'error');
        /* ERROR DESDE BACKEND */
       /*  Swal.fire('Error', error.error.msg, 'error'); */
      }
    }
       
     ) }
   
  })
}

buscar(termino: string){

  if (termino.length === 0 ){
    this.obtenerProcesos();
    this.estadoBusqueda = true
    return
}
console.log(termino)
  termino.trim();
    this.AdministradorService.buscarProcesos(termino)
    .subscribe(resultado => {
      this.listaProcesos = resultado
      if ( this.listaProcesos.length ===0 ){
        this.estadoBusqueda = false
      }else{
        this.estadoBusqueda = true
      }
    }
    )
 
}  
  
}

@Component({
  selector: 'modal-Procesos-1',
  templateUrl: './modal-Procesos-1.html',
  styleUrls: ['./Procesos.component.css']
})

export class ModalProcesos1 implements OnInit{

  formularioProcesos!: FormGroup;
  titulo = 'Crear Unidad'
  estado: boolean = false; 
 
  listaProcesos : Procesos[] = [];


  constructor( private fb: FormBuilder , 
    private AdministradorService: AdministradorService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: {id_procesos: string, codigo_procesos: string,
                                           nombre_procesos: string, estado_procesos: string}) { 
            this.formularioProcesos = this.fb.group({
            codigo_procesos      : [data.codigo_procesos, [Validators.required, Validators.minLength(3)]],
            nombre_procesos      : [data.nombre_procesos, [Validators.required, Validators.minLength(3)]],
            estado_procesos     : [true, Validators.required]
             });
}


ngOnInit(): void {
  this.cargarProcesosModal();

}

campoNoEsValido(campo: string){
  return this.formularioProcesos.controls[campo].errors &&
         this.formularioProcesos.controls[campo].touched
  }


  guardar(){
  
    if ( this.formularioProcesos.invalid ){
      this.formularioProcesos.markAllAsTouched();
      Swal.fire('Error', "Llene los campos de forma correcta", 'error');
  console.log("asdfghjklñ");
      return;
    }

if (this.data.id_procesos){
    this.AdministradorService.actualizarProcesos(this.data.id_procesos, this.formularioProcesos.value)
    .subscribe({
      next: data =>{
      Swal.fire('Actualizacion Exitosa', "Datos Actualizados Con Exito ", 'info');
      }, error: error => {
        Swal.fire('Error', "Error al Actualizar", 'error');
      }
    })

}
if(!this.data.id_procesos){
  this.AdministradorService.guardarProcesos( this.formularioProcesos.value ).subscribe(
    {
      next: resp =>{
  console.log("sdasdfghjklñskasskdksjdksdjskld")
   /*  this.router.navigate(['usuario-administrador/unidades']); */
  
    Swal.fire('exitosamente', "Datos guardados satisfactoriamente", 'success');
   /*  this.formularioProcesos.reset(); */
   this.formularioProcesos.reset({
    estado_procesos: true
  })
      
  },error: error => {
    Swal.fire('Error', "Error al ingresar, el codigo debe ser UNICO", 'error');
  
  /* console.log(this.miFormulario.value) */
  }
  })
}

}
  cargarProcesosModal(){

    if (this.data.id_procesos){
    this.estado = true;
    this.titulo = "Actualizar Unidad";
    this.AdministradorService.obtenerProcesosId(this.data.id_procesos)
    
    }
      }
    }

