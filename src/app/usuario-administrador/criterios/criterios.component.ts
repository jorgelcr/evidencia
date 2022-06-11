import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Criterio } from 'src/app/interfaces/criterios.interface';
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

  openDialog() {
    const dialogRef = this.dialog.open(Modalcriterios1,{ disableClose: true ,
      height: '500px',
      width: '700px',})
    /*   this.dialog.open(DialogContentExampleDialog, { disableClose: true }); */
      
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
   
  });

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
          this.AdministradorService.borrarCriterio(id).subscribe(data =>{
          Swal.fire(
            'Eliminado!',
            'Su criterio ha sido eliminado.',
            'success',
  
            
          )
          this.obtenerCriterio()
        }, error => {
          Swal.fire('Error', "Error al eliminar la unidad", 'error');
        }
     
    )}
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
openDialog2() {
  const dialogRef = this.dialog.open(Modalcriterios2, {
    height: '500px',
    width: '700px',
  });

/*   dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  }); */
}
}
/* ################################ MODAL 1 ######################################### */
@Component({
  selector: 'modal-criterios-1',
  templateUrl: './modal-criterios-1.html',
  styleUrls: ['./criterios.component.css']
})
export class Modalcriterios1 {

  
  formularioCriterio: FormGroup = this.fb.group({
    codigo_criterios      : ['', [Validators.required, Validators.minLength(3)]],
    nombre_criterios      : ['', [Validators.required, Validators.minLength(3)]],
    descripcion_criterios : ['', [Validators.required, Validators.minLength(3)]],
  });

constructor( private fb: FormBuilder, private AdministradorService: AdministradorService,
             private aRouter: ActivatedRoute, private router: Router) { }

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
    this.AdministradorService.guardarCriterio( this.formularioCriterio.value ).subscribe(resp =>{
    
      this.router.navigate(['usuario-administrador/criterios']);

      Swal.fire('exitosamente', "Datos guardados satisfactoriamente", 'success');
      this.formularioCriterio.reset();
    })
    
    /* console.log(this.miFormulario.value) */
   
  }

}



@Component({
  selector: 'modal-criterios-2',
  templateUrl: './modal-criterios-2.html',
  styleUrls: ['./criterios.component.css']
})

export class Modalcriterios2 {}
