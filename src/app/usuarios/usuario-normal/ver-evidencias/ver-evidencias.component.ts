import { Component, Inject, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { DatePipe } from '@angular/common';

import { AdministradorService } from 'src/app/services/administrador.service';
import { Evidencias, Obteneridevidencias } from '../../../interfaces/usuario-normal/evidencias.interface';
import { UsuarioNormalService } from 'src/app/services/usuario-normal.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Unidad } from 'src/app/interfaces/administrador/unidad.inteface';



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
  formularioEvidencia!: FormGroup;
  public listaEvidencias : Evidencias[] = [];

  constructor(public dialog: MatDialog, private UsuarioNormalService: UsuarioNormalService,private aRouter: ActivatedRoute) {}

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
  
  
  obtenerEvidencias(){
    this.UsuarioNormalService.obtenerEvidencias().subscribe(data =>{
     /*  console.log(data); */
      this.listaEvidencias = data;
      this.listaEvidencias.reverse()
      
    })
  }

  borrarEvidencia(id: any){
   
    Swal.fire({
      title: '¿Está seguro?',
      text: `¡La Evidencia con ID ${id} sera eliminada!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡ Si, borrar !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.UsuarioNormalService.borrarEvidencias(id).subscribe(
          {
            next:     data =>{
              
            Swal.fire(
          'Eliminado!',
          'La Evidencia ha sido eliminado.',
          'success',
        )
        this.obtenerEvidencias()
      },error: error => {
        Swal.fire('Error', "Error al eliminar, esta Evidencia esta en uso", 'error');
        /* ERROR DESDE BACKEND */
       /*  Swal.fire('Error', error.error.msg, 'error'); */
      }
    }
       
     ) }
   
    })
  }

  
  

  ngOnInit(): void {
    this.obtenerEvidencias();
  }

  openDialog(usuario?: any) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog12,{ disableClose: true ,
      height: '600px',
      width: '700px',
      data: {id_usuarios: usuario?.id_usuarios, rut: usuario?.rut, 
        nombres_usuario: usuario?.nombres_usuario, apellidos_usuario: usuario?.apellidos_usuario,
        correo_usuario: usuario?.correo_usuario, contrasena: usuario?.contrasena,
         estado: usuario?.estado, fk_id_unidad: usuario?.fk_id_unidad,  fk_id_rol: usuario?.fk_id_rol
        }
    })
    console.log("La clave es: ", usuario?.id_usuarios)
  }

  displayedColumns: string[] = ['codigo', 'envio', 'unidad','proceso',
                                'registro', 'ambito', 'estado', 'accion'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


  }
}

/* ####################################### MODAL 1  ################################## */
@Component({
  selector: 'dialog-content-example-dialog12',
  templateUrl: './dialog-content-example-dialog12.html',
  styleUrls: ['./ver-evidencias.component.css']
})

export class DialogContentExampleDialog12 implements OnInit {

  formularioEvidencia!: FormGroup;
  titulo = 'Crear Evidencias'
  estado: boolean = false; 
  
  public listaGetCriterio : any[] = [];
  public listaGetUsuario : Evidencias[] = [];
  public listaGetUnidad : any[] = [];
  public listaGetRegistro : any[] = [];
  public listaGetAmbitoAcademico : any[] = [];
  public listaGetAmbitoGeografico : any[] = [];
  public listaGetProceso : any[] = [];
  public listaGetDebilidad : any[] = [];


  listaEvidenias : Obteneridevidencias[] = [];
  //listaUnidad : Unidad[] = [];
  listaRol : any[] = [];
  constructor(public dialog: MatDialog, private fb: FormBuilder , 
    private UsuarioNormalService: UsuarioNormalService,    
    @Inject(MAT_DIALOG_DATA) public data: {nombre_cliente: string, correo_usuario: string,
                                           fk_id_debilidades: number, fk_id_unidad: number,
                                           fk_id_criterios: number, fk_id_registros: number,
                                           fk_id_procesos: number, fk_id_estado: number, 
                                           fk_id_ambito_academico: number, fk_id_ambito_geografico: number}) { 

    this.formularioEvidencia = this.fb.group({
    nombre_cliente                : [data.nombre_cliente,[ Validators.required, , Validators.minLength(3)]],
    correo_usuario                : [data.correo_usuario, [Validators.required, , Validators.minLength(3)]],
    fk_id_debilidades             : [data.fk_id_debilidades, [Validators.required, , Validators.minLength(3)]],
    fk_id_unidad                  : [data.fk_id_unidad, [Validators.required, , Validators.minLength(3)]],
    fk_id_criterios               : [data.fk_id_criterios, [Validators.required, , Validators.minLength(3)]],
    fk_id_registros               : [data.fk_id_registros, /* Validators.required */],
    fk_id_procesos                : [data.fk_id_procesos, Validators.required],
    fk_id_estado                  : [data.fk_id_estado, Validators.required],
    fk_id_ambito_academico        : [data.fk_id_ambito_academico, Validators.required],
    fk_id_ambito_geografico       : [data.fk_id_ambito_geografico, Validators.required],
  })

   }

 
 ngOnInit(): void {
   

   
    this.obtenerGetUnidad();
    this.obtenerGetRegistro();
    this.obtenerGetAmbitoAcademico();
    this.obtenerGetAmbitoGeografico();
    this.obtenerGetCriterio();
    this.obtenerGetProceso();
    this.obtenerGetDebilidad();
  }


  campoNoEsValido(campo: string){
    return this.formularioEvidencia.controls[campo].errors &&
           this.formularioEvidencia.controls[campo].touched
    }
  
  guardar(){
    
  }


  obtenerGetUnidad(){
    this.UsuarioNormalService.obtenerGetUnidad().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetUnidad = data;
      this.listaGetUnidad.reverse()
      
    })
  }

  obtenerGetRegistro(){
    this.UsuarioNormalService.obtenerGetRegistro().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetRegistro = data;
      this.listaGetRegistro.reverse()
      
    })
  }

  obtenerGetAmbitoAcademico(){
    this.UsuarioNormalService.obtenerGetAmbitoAcademico().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetAmbitoAcademico = data;
      this.listaGetAmbitoAcademico.reverse()
      
    })
  }

  obtenerGetAmbitoGeografico(){
    this.UsuarioNormalService.obtenerGetAmbitoGeografico().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetAmbitoGeografico = data;
      this.listaGetAmbitoGeografico.reverse()
      
    })
  }

  obtenerGetCriterio(){
    this.UsuarioNormalService.obtenerGetCriterio().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetCriterio = data;
      this.listaGetCriterio.reverse()
      
    })
  }

  obtenerGetProceso(){
    this.UsuarioNormalService.obtenerGetProceso().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetProceso = data;
      this.listaGetProceso.reverse()
      
    })
  }

  obtenerGetDebilidad(){
    this.UsuarioNormalService.obtenerGetDebilidad().subscribe(data =>{
     /*  console.log(data); */
      this.listaGetDebilidad = data;
      this.listaGetDebilidad.reverse()
      
    })
  }

 }