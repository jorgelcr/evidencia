import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MenuItem, MenuItem2, MenuItem3, MenuItemFinal } from 'src/app/interfaces/menu.interface';
@Component({
  selector: 'app-menu-usuarionormal',
  templateUrl: './menu-usuarionormal.component.html',
  styleUrls: ['./menu-usuarionormal.component.css']
})
export class MenuUsuarionormalComponent implements OnInit {


/*   @ViewChild('borrar') title?: ElementRef;
 */
borrar:boolean = false;


  menuFinal: any[] = [
    {
     titulo: "Inicio",
     ruta: "home",
     icono: "fa-solid fa-house",
     subtitulo: 'Evidencia Usuarios',
     subicono: 'fa-solid fa-clipboard-list',
     submenu: [
       {titulo: 'Crear Evidencias', ruta: 'crear-evidencia', icono:'fa-solid fa-plus'},
       {titulo: 'Ver Evidencias', ruta: 'ver-evidencias',  icono:'fa-solid fa-eye'},
       
   ],
   submenufinal: [
     {titulo2: 'Estadisticas', ruta: 'estadisticas', icono:'trending_up'},
     {titulo2: 'Graficos', ruta: 'graficos', icono:'pie_chart'},
     {titulo3: '********* MENU RESPONSABLE *********'},
 ],
   },
   {
    titulo: "Inicio",
    ruta: "home",
    icono: "fa-solid fa-house",
    subtitulo: 'Evidencia Responsable',
    subicono: 'fa-solid fa-clipboard-list',
    submenu: [
      {titulo: 'Ver Evidencias', ruta: 'ver-evidencias',  icono:'fa-solid fa-eye'},
      
  ],
  submenufinal: [
    {titulo2: 'Estadisticas', ruta: 'estadisticas', icono:'trending_up'},
    {titulo2: 'Graficos', ruta: 'graficos', icono:'pie_chart'},
    {titulo3: '************ MENU DAC ************'},
],
  }
  ,
   {
    titulo: "Inicio",
    ruta: "home",
    icono: "fa-solid fa-house",
    subtitulo: 'Evidencia Dac',
    subicono: 'fa-solid fa-clipboard-list',
    submenu: [
      {titulo: 'Ver Evidencias', ruta: 'ver-evidencias',  icono:'fa-solid fa-eye'},
      
  ],
  submenufinal: [
    {titulo2: 'Estadisticas', ruta: 'estadisticas', icono:'trending_up'},
    {titulo2: 'Graficos', ruta: 'graficos', icono:'pie_chart'},
    {titulo3: '********** MENU DIRECTOR *********'},
],
   }
   ,
   {
    titulo: "Inicio",
    ruta: "home",
    icono: "fa-solid fa-house",
    subtitulo: 'Evidencia Director',
    subicono: 'fa-solid fa-clipboard-list',
    submenu: [
      {titulo: 'Crear Evidencias', ruta: 'crear-evidencia', icono:'fa-solid fa-plus'},
      {titulo: 'Ver Evidencias', ruta: 'todas-evidencias',  icono:'fa-solid fa-eye'},
      {titulo: 'Mis Evidencias', ruta: 'mis-evidencias',  icono:'fa-solid fa-briefcase'},
      
  ],
  submenufinal: [
    {titulo2: 'Estadisticas', ruta: 'estadisticas', icono:'trending_up'},
    {titulo2: 'Graficos', ruta: 'graficos', icono:'pie_chart'},
    {titulo3: '******** MENU ADMINISTRADOR ******'},
],
   }
   ,


   {
    titulo: "Inicio",
    ruta: "home",
    icono: "fa-solid fa-house",
    subtitulo: 'Administrador',
    subicono: 'fa-solid fa-user-gear',
    submenu: [
      {titulo: 'Usuarios', ruta: 'usuarios',  icono:'text-dark fa-solid fa-users'},
      {titulo: 'Debilidades', ruta: 'debilidades',  icono:'text-dark fa-solid fa-thumbs-down'},
      {titulo: 'Unidades', ruta: 'unidades',  icono:'text-dark fa-solid fa-building-user'},
      {titulo: 'Criterios', ruta: 'criterios',  icono:'text-dark fa-solid fa-ruler'},
      {titulo: 'Procesos', ruta: 'procesos',  icono:'text-dark fa-solid fa-microchip'},
      {titulo: 'Tipo De Registro', ruta: 'tipo-registro',  icono:'text-dark fa-solid fa-cash-register'},
      {titulo: 'Ambito Geografico', ruta: 'ambito-geografico',  icono:'text-dark fa-solid fa-flag'},
      {titulo: 'Ambito Academico', ruta: 'ambito-academico',  icono:'text-dark fa-solid fa-graduation-cap'},
      
  ],
  submenufinal: [
    {titulo2: 'Estadisticas', ruta: 'estadisticas', icono:'trending_up'},
    {titulo2: 'Graficos', ruta: 'graficos', icono:'pie_chart'},
],
   }
  ]     
  menuside: MenuItem[]  = [
    {
      titulo: 'Estadisticas',
      ruta: 'estadisticas',
      icono: "trending_up",
    },
    {
      titulo: 'Graficos',
      ruta: 'graficos',
      icono: "pie_chart",
    },
  ]
  menuside2: MenuItem2[]  = [
    {
      titulo: 'Evidencia Usuarios',
      icono: "expand_more",
      subtitulo: 'Nueva Evidencia',
      subruta: 'crear-evidencia',
      subicono: "add",
    },
    {
      subtitulo: 'Ver Evidencias',
      subruta: 'ver-evidencias',
      subicono: "visibility",
    },    
      ]

menuside3: MenuItem3[]  = [
        {
          titulo: "Inicio",
          ruta: "home",
          icono: "home",
        },
      ]
  constructor(private render2: Renderer2 ) {}

  ngOnInit(): void {

  }
  borrar2() {
    if ( this.borrar == true){
      this.borrar = false;
    }else{
      this.borrar = true;
    }}
    
/*     change(){
      const li = this.render2.createElement('br');
      const lii = this.render2.createElement('br');
      const liii = this.render2.createElement('br');
      const liiii = this.render2.createElement('br');
      this.render2.appendChild(this.title?.nativeElement, li);
      this.render2.appendChild(this.title?.nativeElement, lii);
      this.render2.appendChild(this.title?.nativeElement, liii);
      this.render2.appendChild(this.title?.nativeElement, liiii);
   console.log("sdsdsdsdsdsdsdsd")
    }*/
  } 