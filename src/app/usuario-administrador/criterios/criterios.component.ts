import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Criterio } from 'src/app/interfaces/administrador/criterios.interface';
import { Subscription} from 'rxjs';
import { AdministradorService } from '../../services/administrador.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css']
})
export class CriteriosComponent implements OnInit{

  public listaCriterios : Criterio[] = [];
  suscription?: Subscription;
  estadoBusqueda: boolean = true;

  constructor(public dialog: MatDialog, private AdministradorService: AdministradorService) { }

  ngOnInit(): void {
    this.obtenerCriterio();
    this.suscription = this.AdministradorService.refresh$.subscribe(() =>
    this.obtenerCriterio());
   
  }

  openDialog(criterio?: any) {
    const dialogRef = this.dialog.open(Modalcriterios1,{ disableClose: true ,
      height: '500px',
      width: '700px',
      data: {id_criterios: criterio?.id_criterios, codigo_criterios: criterio?.codigo_criterios, 
             nombre_criterios: criterio?.nombre_criterios, descripcion_criterios: criterio?.descripcion_criterios,
             estado_criterios: criterio?.estado_criterios}
    })
    
    console.log("la id es:",criterio?.id_criterios)
  }


  obtenerCriterio(){
    this.AdministradorService.obtenerCriterio().subscribe(data =>{
     /*  console.log(data); */
      this.listaCriterios = data;
      this.listaCriterios.reverse()
      
    })
  }
  
  borrarCriterio(id: any){
   
      Swal.fire({
        title: '¿Está seguro?',
        text: `¡La criterio con codigo ${id} sera eliminada!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡ Si, borrar !'
      }).then((result) => {
        if (result.isConfirmed) {
          this.AdministradorService.borrarCriterio(id).subscribe(
            {
              next: data =>{
          Swal.fire(
            'Eliminado!',
            'Su criterio ha sido eliminado.',
            'success',
            
          )
          this.obtenerCriterio()
              }, error: error => {
          Swal.fire('Error', "Error al eliminar, esta criterios esta en uso", 'error');
        }
      }
         
       ) }
     
    })
  }
  buscar(termino: string){

    if (termino.length === 0 ){
      this.obtenerCriterio();
      this.estadoBusqueda = true
      return
  }
  console.log(termino)
    termino.trim();
      this.AdministradorService.buscarCriterio(termino)
      .subscribe(resultado => {
        this.listaCriterios = resultado
        if ( this.listaCriterios.length ===0 ){
          this.estadoBusqueda = false
        }else{
          this.estadoBusqueda = true
        }
      }
      )
   
    }
  }

/* ################################ MODAL 1 ######################################### */


@Component({
  selector: 'modal-criterios-1',
  templateUrl: './modal-criterios-1.html',
  styleUrls: ['./criterios.component.css']
})
export class Modalcriterios1 implements OnInit{

  formularioCriterio!: FormGroup;

  titulo = 'Crear Unidad'
  estado: boolean = false; 


constructor( private fb: FormBuilder, private AdministradorService: AdministradorService,
             private aRouter: ActivatedRoute, private router: Router,
             @Inject(MAT_DIALOG_DATA) public data: {id_criterios: string, codigo_criterios: string,
              nombre_criterios: string, descripcion_criterios: string, estado_criterios: string}) {


                  
  this.formularioCriterio = this.fb.group({
    codigo_criterios      : [data.codigo_criterios, [Validators.required, Validators.minLength(3)]],
    nombre_criterios      : [data.nombre_criterios, [Validators.required, Validators.minLength(3)]],
    descripcion_criterios : [data.descripcion_criterios, [Validators.required, Validators.minLength(3)]],
    estado_criterios      : [true, [Validators.required]],
  });
               }
              
ngOnInit(): void {
    this.cargarUnidadModal();
}
campoNoEsValido(campo: string){
  return this.formularioCriterio.controls[campo].errors &&
         this.formularioCriterio.controls[campo].touched
  }

  guardar(){

    if ( this.formularioCriterio.invalid ){
      this.formularioCriterio.markAllAsTouched();

  console.log("asdfghjklñ");
      return;
    }

    if (this.data.id_criterios){
      this.AdministradorService.actualizarCriterio(this.data.id_criterios, this.formularioCriterio.value)
      .subscribe({
        next: data =>{
        Swal.fire('Actualizacion Exitosa', "Datos Actualizados Con Exito ", 'info');
      /* this.router.navigate(['usuario-administrador/unidades']); */
        }, error: error => {
          Swal.fire('Error', "Error al Actualizar", 'error');
        }
      })
  
  }else{
    this.AdministradorService.guardarCriterio( this.formularioCriterio.value )
    .subscribe({
      next: resp =>{
    
      this.router.navigate(['usuario-administrador/criterios']);

      Swal.fire('exitosamente', "Datos guardados satisfactoriamente", 'success');
      /* this.formularioCriterio.reset(); */
      this.formularioCriterio.reset({
        estado_criterios: true
      })
    }, error: error => {
      Swal.fire('Error', "Error al ingresar, el codigo debe ser UNICO", 'error');
    }
  })
}
}

  cargarUnidadModal(){
    console.log("la id eewewewewewws:",this.data.id_criterios)
    if (this.data.id_criterios){
    this.estado = true;
    this.titulo = "Actualizar Criterio";
    this.AdministradorService.obtenerCriterioId(this.data.id_criterios)
      this.router.navigate(['usuario-administrador/criterios']);
    }
      }
}