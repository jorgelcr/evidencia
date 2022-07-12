import { Component, OnInit } from '@angular/core';
import { ResponsableService } from 'src/app/services/responsable.service';
import { evidenciaResponsable } from '../../interfaces/responsable/evidenciaResponsable.interface';

@Component({
  selector: 'app-ver-evidencias',
  templateUrl: './ver-evidencias.component.html',
  styleUrls: ['./ver-evidencias.component.css']
})
export class VerEvidenciasComponent implements OnInit {


  listaEvidenciasResponsable  : evidenciaResponsable[] = [];

  constructor(private responsableService: ResponsableService) { }

  ngOnInit(): void {

    this.obtenerEvidencia();
    
  }

  obtenerEvidencia(){
    this.responsableService.obtenerEvidenciasResponsable().subscribe(data =>{
      console.log("INFO MIS EVIDENCIAS RESPONSABLE: ",data);
      this.listaEvidenciasResponsable = data;
      this.listaEvidenciasResponsable.reverse()
      
    })
  }


}
