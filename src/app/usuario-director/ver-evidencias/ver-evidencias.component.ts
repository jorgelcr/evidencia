import { Component, OnInit } from '@angular/core';
import { misEvidenciaDirector } from 'src/app/interfaces/director/misEvidenciasDirector.interface';
import { DirectorService } from 'src/app/services/director.service';

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
}