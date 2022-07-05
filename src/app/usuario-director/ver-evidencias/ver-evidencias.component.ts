import { Component, OnInit } from '@angular/core';
import { misEvidenciaDirector } from 'src/app/interfaces/director/misEvidenciasDirector.interface';
import { DirectorService } from 'src/app/services/director.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-evidencias',
  templateUrl: './ver-evidencias.component.html',
  styleUrls: ['./ver-evidencias.component.css']
})
export class VerEvidenciasComponent implements OnInit {

  listaEvidencias  : misEvidenciaDirector[] = [];
 
  constructor(private directorService: DirectorService) { }

  ngOnInit(): void {

    this.obtenerEvidencia();
    
  }

  obtenerEvidencia(){
    this.directorService.obtenerEvidenciasDirector().subscribe(data =>{
      console.log("INFO MIS EVIDENCIAS: ",data);
      this.listaEvidencias = data;
      this.listaEvidencias.reverse()
      
    })
  }

  borrarUnidades(id: any){
 
    Swal.fire({
      title: '¿Está seguro?',
      text: `¡La Evidencia con codigo ${id} sera eliminada!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡ Si, borrar !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.directorService.borrarEvidencia(id).subscribe(
          {
            next:     data =>{
              
            Swal.fire(
          'Eliminado!',
          'Su Evidencia ha sido eliminado.',
          'success',
        )
        this.obtenerEvidencia()
      },error: error => {
        Swal.fire('Error', "Error al eliminar, esta Evidencia esta en uso", 'error');
        console.log(error);
        /* ERROR DESDE BACKEND */
       /*  Swal.fire('Error', error.error.msg, 'error'); */
      }
    }
       
     ) }
   
  })
}

}