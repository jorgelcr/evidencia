import { Component, OnInit } from '@angular/core';
import { evidenciaDirector } from 'src/app/interfaces/director/evidenciaDirector.interface';
import { DirectorService } from 'src/app/services/director.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-todas-evidencias',
  templateUrl: './ver-todas-evidencias.component.html',
  styleUrls: ['./ver-todas-evidencias.component.css']
})
export class VerTodasEvidenciasComponent implements OnInit {

  listaEvidencias  : evidenciaDirector[] = [];
 
  constructor(private directorService: DirectorService) { }

  ngOnInit(): void {

    this.obtenerEvidencia();
    
  }

  obtenerEvidencia(){
    this.directorService.obtenerEvidencias().subscribe(data =>{
      console.log("QQQQQQQQQQQQQQQQQQ",data);
      this.listaEvidencias = data;
      this.listaEvidencias.reverse()
      
    })
  }

/*   borrarUnidades(id: any){
 
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
       // ERROR DESDE BACKEND
        //Swal.fire('Error', error.error.msg, 'error');
      }
    }
       
     ) }
   
  })
} */
}
