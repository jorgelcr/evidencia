import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { DatePipe } from '@angular/common';

export interface PeriodicElement {
  codigo: number;
  fecha_envio: Date ;
  unidad: string;
  proceso: string;
  registro: string;
  ambito: string;
  estado: string;
  accion: string;
}

@Component({
  selector: 'app-ver-evidencias',
  templateUrl: './ver-evidencias.component.html',
  styleUrls: ['./ver-evidencias.component.css']
})
export class VerEvidenciasComponent implements OnInit {

   ELEMENT_DATA: PeriodicElement[] = [
    {codigo: 1, fecha_envio: new Date , unidad: "informatica", proceso: 'Hewewe',
     registro: 'bbbbH', ambito: 'vvvvvvH', estado: 'sdsddsdsdsdsdsdsH', accion: 'visibility'},
    
     {codigo: 2, fecha_envio: new Date , unidad: "borrar", proceso: 'Hewewe',
     registro: 'bbbbH', ambito: 'vvvvvvH', estado: 'sdsddsdsdsdsdsdsH', accion: 'visibility'},
    
     {codigo: 1, fecha_envio: new Date , unidad: "informatica", proceso: 'Hewewe',
     registro: 'bbbbH', ambito: 'vvvvvvH', estado: 'sdsddsdsdsdsdsdsH', accion: 'visibility'},
    
     {codigo: 2, fecha_envio: new Date , unidad: "borrar", proceso: 'Hewewe',
     registro: 'bbbbH', ambito: 'vvvvvvH', estado: 'sdsddsdsdsdsdsdsH', accion: 'visibility'},
    
    
    
  ];
  
  constructor() { }

  ngOnInit(): void {
   
  }
  displayedColumns: string[] = ['codigo', 'envio', 'unidad','proceso',
                                'registro', 'ambito', 'estado', 'accion'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


  }
}