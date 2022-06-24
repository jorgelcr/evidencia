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
  


  listaEvidenias : Obteneridevidencias[] = [];
  //listaUnidad : Unidad[] = [];
  listaRol : any[] = [];
  constructor(public dialog: MatDialog, private fb: FormBuilder , 
    private AdministradorService: AdministradorService,    
    @Inject(MAT_DIALOG_DATA) public data: {id_usuarios: string, rut: string,
                                           nombres_usuario: string, apellidos_usuario: string,
                                           correo_usuario: string, contrasena: string,
                                           estado?: boolean, fk_id_unidad: string, fk_id_rol: string}) { 

    this.formularioEvidencia = this.fb.group({
    rut               : [data.rut,[ Validators.required, , Validators.minLength(3)]],
    nombres_usuario   : [data.nombres_usuario, [Validators.required, , Validators.minLength(3)]],
    apellidos_usuario : [data.apellidos_usuario, [Validators.required, , Validators.minLength(3)]],
    correo_usuario    : [data.correo_usuario, [Validators.required, , Validators.minLength(3)]],
    contrasena        : [data.contrasena, [Validators.required, , Validators.minLength(3)]],
    estado            : [data.estado, /* Validators.required */],
    fk_id_unidad      : [data.fk_id_unidad, Validators.required],
    fk_id_rol         : [data.fk_id_rol, Validators.required],
  })

   }

 
 ngOnInit(): void {
   this.cargarUsuarioModal();
   this.cargarUnidad();
   this.cargarRol();
  }


  campoNoEsValido(campo: string){
    return this.formularioEvidencia.controls[campo].errors &&
           this.formularioEvidencia.controls[campo].touched
    }
  
  guardar(){
    
      if ( this.formularioEvidencia.invalid ){
        this.formularioEvidencia.markAllAsTouched();
        Swal.fire('Error', "Lene los campos de forma correcta", 'error');
    console.log("asdfghjklñ");
        return;
      }
  
  if (this.data.id_usuarios){
      this.AdministradorService.actualizarUsuario(this.data.id_usuarios, this.formularioEvidencia.value)
      .subscribe({
        next: data =>{
        Swal.fire('Actualizacion Exitosa', "Datos Actualizados Con Exito ", 'info');
        }, error: error => {
          Swal.fire('Error', "Error al Actualizar", 'error');
        }
      })
  
  }
  if(!this.data.id_usuarios){
    this.AdministradorService.guardarUsuario( this.formularioEvidencia.value ).subscribe(
      {
        next: resp =>{
    console.log("sdasdfghjklñskasskdksjdksdjskld")
    
      Swal.fire('exitosamente', "Datos guardados satisfactoriamente", 'success');
      this.formularioEvidencia.reset();
        
    },error: error => {
      Swal.fire('Error', "Error al ingresar, el codigo debe ser UNICO", 'error');
    
    /* console.log(this.miFormulario.value) */
    }
    })
  }
  
  }
  cargarUsuarioModal(){
      if (this.data.id_usuarios){
      this.estado = true;
      this.titulo = "Actualizar Usuario";
      this.AdministradorService.obtenerUsuarioId(this.data.id_usuarios).subscribe(data =>
        
        console.log("la data es: ",data))
      }
        }

        
  cargarUnidad(){

    this.AdministradorService.obtenerUnidadUsuario().subscribe((data: any) =>{
      /*  console.log(data); */
       //this.listaUnidad = data.resultado;
   /*     this.listaUnidades.reverse() */
     })
   }
   
 
   cargarRol(){

    this.AdministradorService.obtenerRolUsuario().subscribe((data: any) =>{
      /*  console.log(data); */
       this.listaRol = data.resultado;
   /*     this.listaUnidades.reverse() */
   console.log("ROLLLLLLLLLLLL",data.resultado )
     })
   }

 }