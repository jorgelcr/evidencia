import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdministradorService } from '../../services/administrador.service';
import { Unidad } from '../../interfaces/unidad.inteface';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription, Observable } from 'rxjs';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {

  public listaUnidades : Unidad[] = [];
  suscription?: Subscription;
  estadoBusqueda: boolean = true;

  constructor(public dialog: MatDialog, private AdministradorService: AdministradorService,private aRouter: ActivatedRoute) {}

ngOnInit(): void {
  this.obtenerUnidades();
  this.suscription = this.AdministradorService.refresh$.subscribe(() =>
  this.obtenerUnidades());
 
}
  openDialog(unidad?: any) {
    const dialogRef = this.dialog.open(ModalUnidades1,{ disableClose: true ,
      height: '400px',
      width: '700px',
      data: {id_unidad: unidad?.id_unidad, codigo_unidad: unidad?.codigo_unidad, 
        nombre_unidad: unidad?.nombre_unidad}
    })
  }
  
openDialog2() {
 
  const dialogRef = this.dialog.open(ModalUnidades2, {
    height: '400px',
    width: '700px',
  });

/*   dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  }); */
}


obtenerUnidades(){
  this.AdministradorService.obtenerUnidad().subscribe(data =>{
   /*  console.log(data); */
    this.listaUnidades = data;
    this.listaUnidades.reverse()
    
  })
}

borrarUnidades(id: any){
 
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
        this.AdministradorService.borrarUnidad(id).subscribe(data =>{
        Swal.fire(
          'Eliminado!',
          'Su unidad ha sido eliminado.',
          'success',

          
        )
        this.obtenerUnidades()
      }, error => {
        Swal.fire('Error', "Error al eliminar la unidad", 'error');
      }
   
  )}
})
    
}
buscar(termino: string){

  if (termino.length === 0 ){
    this.obtenerUnidades();
    this.estadoBusqueda = true
    return
}
console.log(termino)
  termino.trim();
    this.AdministradorService.buscarUnidad(termino)
    .subscribe(resultado => {
      this.listaUnidades = resultado
      if ( this.listaUnidades.length ===0 ){
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
  selector: 'modal-unidades-1',
  templateUrl: './modal-unidades-1.html',
  styleUrls: ['./unidades.component.css']
})

export class ModalUnidades1 implements OnInit{

  miFormulario!: FormGroup;
  titulo = 'Crear Unidad'
  estado: boolean = false; 
 
  listaUnidades : Unidad[] = [];

  constructor(public dialog: MatDialog, private fb: FormBuilder , 
              private AdministradorService: AdministradorService,
              private aRouter: ActivatedRoute, private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: {id_unidad: string, codigo_unidad: string,
                                                     nombre_unidad: string}) { 

                this.miFormulario = this.fb.group({
                  codigo_unidad      : [data.codigo_unidad, [Validators.required, Validators.minLength(3)]],
                  nombre_unidad      : [data.nombre_unidad, [Validators.required, Validators.minLength(3)]],
                });
              }

ngOnInit(): void {
  
  this.editarUnidad();
 
}
              

  campoNoEsValido(campo: string){
  return this.miFormulario.controls[campo].errors &&
         this.miFormulario.controls[campo].touched
  }

  guardar(){

    if ( this.miFormulario.invalid ){
      this.miFormulario.markAllAsTouched();

  console.log("asdfghjklñ");
      return;
    }
    this.AdministradorService.guardarUnidad( this.miFormulario.value ).subscribe(resp =>{
    
      this.router.navigate(['usuario-administrador/unidades']);

      Swal.fire('exitosamente', "Datos guardados satisfactoriamente", 'success');
      this.miFormulario.reset();
    })
    
    /* console.log(this.miFormulario.value) */
   
  }

  editarUnidad(){

    if (this.data.id_unidad){
    console.log("EDITAR UNIDAD")
    console.log("LA ID EdsdsdsS: ",this.data.id_unidad)
    this.estado = true;
    this.titulo = "Actualizar Unidad";
    this.AdministradorService.obtenerUnidadId(this.data.id_unidad)
      .subscribe(data => console.log("TTT", data))
      this.router.navigate(['usuario-administrador/unidades']);
    }
      }
    }
  
@Component({
  selector: 'modal-unidades-2',
  templateUrl: './modal-unidades-2.html',
  styleUrls: ['./unidades.component.css']
})

export class ModalUnidades2 {}

